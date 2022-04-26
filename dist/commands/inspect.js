"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspect = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const got_1 = (0, tslib_1.__importDefault)(require("got"));
const util_1 = require("../util");
class Inspect extends core_1.Command {
    async run() {
        const { args } = await this.parse(Inspect);
        const index = args.resource.lastIndexOf("/");
        if (index == -1) {
            console.log("ID doesn't follow resourceType/name format");
            return;
        }
        const resourceType = args.resource.substring(0, index + 1);
        const slug = args.resource.substring(index + 1, args.resource.length);
        const { serverAddress, token } = (0, util_1.getConfig)();
        const data = await inspect(serverAddress, token, resourceType, slug);
        console.log(JSON.stringify(data, undefined, 2));
        return;
    }
}
exports.default = Inspect;
Inspect.description = "Inspect resources in the current workspace";
Inspect.examples = [`$ ht inspect model/run-user`];
Inspect.flags = {
    format: core_1.Flags.string({
        char: "f",
        description: "Output format(yaml/json)",
        required: true,
        default: "json",
    }),
};
Inspect.args = [
    { name: "resource", description: "Resource ID", required: true },
];
async function inspect(server, token, resourceType, slug) {
    const { data } = await got_1.default
        .get(`${server}/api/v1/${resourceType}?slug=${slug}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .json();
    return data[0];
}
exports.inspect = inspect;
