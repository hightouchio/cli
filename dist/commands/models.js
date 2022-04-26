"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const got_1 = (0, tslib_1.__importDefault)(require("got"));
const util_1 = require("../util");
const cli_ux_1 = (0, tslib_1.__importDefault)(require("cli-ux"));
class Models extends core_1.Command {
    async run() {
        const { serverAddress, token } = (0, util_1.getConfig)();
        const { data } = await got_1.default
            .get(`${serverAddress}/api/v1/models`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .json();
        cli_ux_1.default.table(data, {
            id: {
                minWidth: 7,
                get: (row) => `models/${row.slug}`,
            },
            name: {},
            created: {
                get: (row) => util_1.timeAgo.format(new Date(`${row.createdAt}`)),
            },
        });
    }
}
exports.default = Models;
Models.aliases = ["model"];
Models.description = "List all models in current workspace";
Models.examples = [`$ ht models`];
