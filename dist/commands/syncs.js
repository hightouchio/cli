"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const got_1 = (0, tslib_1.__importDefault)(require("got"));
const util_1 = require("../util");
const cli_ux_1 = (0, tslib_1.__importDefault)(require("cli-ux"));
class Syncs extends core_1.Command {
    async run() {
        const { serverAddress, token } = (0, util_1.getConfig)();
        const { data } = await got_1.default
            .get(`${serverAddress}/api/v1/syncs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .json();
        cli_ux_1.default.table(data.sort((a, b) => {
            return new Date(a["lastRunAt"]) > new Date(b["lastRunAt"]);
        }), {
            id: {
                minWidth: 7,
                get: (row) => `syncs/${row.slug}`,
            },
            status: {},
            created: {
                get: (row) => util_1.timeAgo.format(new Date(`${row.createdAt}`)),
            },
            lastRunAt: {
                header: "LastRun",
                get: (row) => {
                    if (row.lastRunAt) {
                        return util_1.timeAgo.format(new Date(`${row.lastRunAt}`));
                    }
                    return "";
                },
            },
        });
    }
}
exports.default = Syncs;
Syncs.aliases = ["sync"];
Syncs.description = "List all syncs in current workspace";
Syncs.examples = [`$ ht syncs`];
