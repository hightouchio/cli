"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const got_1 = (0, tslib_1.__importDefault)(require("got"));
const util_1 = require("../util");
const cli_ux_1 = (0, tslib_1.__importDefault)(require("cli-ux"));
const inspect_1 = require("./inspect");
class Runs extends core_1.Command {
    async run() {
        const { flags } = await this.parse(Runs);
        const { serverAddress, token } = (0, util_1.getConfig)();
        const sync = await (0, inspect_1.inspect)(serverAddress, token, "syncs", flags.sync);
        const { data } = await got_1.default
            .get(`${serverAddress}/api/v1/syncs/${sync.id}/runs?limit=${flags.limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .json();
        cli_ux_1.default.table(data, {
            id: {},
            duration: {
                get: (row) => {
                    if (row.finishedAt) {
                        return (0, util_1.calculateDuration)(new Date(`${row.finishedAt}`).getTime() -
                            new Date(`${row.startedAt}`).getTime());
                    }
                },
            },
            status: {},
            querySize: {
                header: "Size",
            },
            diff: {
                header: "Diff(Added/Changed/Removed)",
                get: (row) => {
                    const diff = row.diff;
                    return `${diff.added}/${diff.changed}/${diff.removed}`;
                },
            },
            success: {
                header: "Success(Added/Changed/Removed)",
                get: (row) => {
                    const success = row.success;
                    return `${success.added}/${success.changed}/${success.removed}`;
                },
            },
            fail: {
                header: "Fail(Added/Changed/Removed)",
                get: (row) => {
                    const fail = row.fail;
                    return `${fail.added}/${fail.changed}/${fail.removed}`;
                },
            },
            started: {
                get: (row) => util_1.timeAgo.format(new Date(`${row.startedAt}`)),
            },
        });
    }
}
exports.default = Runs;
Runs.aliases = ["run"];
Runs.description = "List all syncs run for a given sync";
Runs.examples = [`$ ht runs`];
Runs.flags = {
    sync: core_1.Flags.string({
        char: "s",
        description: "Specify sync name to list runs",
        required: true,
    }),
    limit: core_1.Flags.integer({
        char: "l",
        description: "Limit the number of runs to output",
        default: 5,
    }),
};
