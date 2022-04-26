"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const got_1 = (0, tslib_1.__importDefault)(require("got"));
const util_1 = require("../util");
const cli_ux_1 = (0, tslib_1.__importDefault)(require("cli-ux"));
const inspect_1 = require("./inspect");
class Trigger extends core_1.Command {
    async run() {
        const { args, flags } = await this.parse(Trigger);
        console.log(flags["full-sync"]);
        const { serverAddress, token } = (0, util_1.getConfig)();
        if (args.sync.lastIndexOf("/") !== -1) {
            args.sync = args.sync.substring(args.sync.lastIndexOf("/") + 1);
        }
        const sync = await (0, inspect_1.inspect)(serverAddress, token, "syncs", args.sync);
        const { id } = await got_1.default
            .post(`${serverAddress}/api/v1/syncs/${sync.id}/trigger`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            json: {
                fullResync: flags["full-sync"],
            },
        })
            .json();
        if (flags.quiet) {
            console.log(id);
            return;
        }
        cli_ux_1.default.action.start("querying");
        let total = 0;
        await new Promise((resolve) => {
            const timer1 = setInterval(async () => {
                const { data } = await got_1.default
                    .get(`${serverAddress}/api/v1/syncs/${sync.id}/runs?runId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .json();
                if (data && data.length > 0) {
                    if (data[0].error) {
                        console.log(`Sync run failed: error: ${data[0].error}`);
                        clearInterval(timer1);
                        resolve();
                        process.exit(1);
                    }
                    total =
                        data[0].plannedRows.addedCount +
                            data[0].plannedRows.changedCount +
                            data[0].plannedRows.removedCount;
                    if (total > 0) {
                        clearInterval(timer1);
                        resolve();
                    }
                }
            }, 1000);
        });
        cli_ux_1.default.action.stop("done");
        console.log("Processing");
        const bar = cli_ux_1.default.progress({
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            fps: 100,
            stream: process.stdout,
            barsize: 30,
            format: "[{bar}] {progress}% | ETA: {eta}s | Total: {processed}/{total} | Success: {success} | Fail: {fail} | Speed: {speed} rows/second",
        });
        bar.start(total, 0, {
            speed: "N/A",
        });
        let current = 0;
        return new Promise((resolve) => {
            const timer2 = setInterval(async () => {
                const { data } = await got_1.default
                    .get(`${serverAddress}/api/v1/syncs/${sync.id}/runs?runId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .json();
                if (data[0].error) {
                    console.log(`Sync run failed: error: ${data[0].error}`);
                    clearInterval(timer2);
                    bar.stop();
                    process.exit(1);
                }
                const successCount = data[0].successfulRows.addedCount +
                    data[0].successfulRows.changedCount +
                    data[0].successfulRows.removedCount;
                const failCount = data[0].failedRows.addedCount +
                    data[0].failedRows.changedCount +
                    data[0].failedRows.removedCount;
                const speed = successCount + failCount - current;
                current = successCount + failCount;
                const eta = (0, util_1.calculateDuration)(((bar.getTotal() - current) / speed) * 1000);
                bar.update(current, {
                    speed,
                    eta: eta,
                    processed: current,
                    progress: Math.floor(data[0].completionRatio * 100),
                    success: successCount,
                    fail: failCount,
                });
                if (current == bar.getTotal()) {
                    clearInterval(timer2);
                    bar.stop();
                    resolve();
                }
            }, 1000);
        });
    }
}
exports.default = Trigger;
Trigger.description = "Trigger sync to run";
Trigger.examples = [`$ ht trigger --sync test123`];
Trigger.flags = {
    "full-sync": core_1.Flags.boolean({
        char: "f",
        description: "Whether to run a full sync",
        default: false,
    }),
    quiet: core_1.Flags.boolean({
        char: "q",
        description: "Whether to show run progress",
        default: false,
    }),
};
Trigger.args = [{ name: "sync", description: "Sync ID", required: true }];
