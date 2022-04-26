"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const cli_ux_1 = (0, tslib_1.__importDefault)(require("cli-ux"));
const fs_1 = require("fs");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const os_1 = (0, tslib_1.__importDefault)(require("os"));
const util_1 = require("../util");
const baseDir = path_1.default.resolve(os_1.default.homedir(), ".hightouch");
class Login extends core_1.Command {
    async run() {
        const config = (0, util_1.getConfig)();
        const serverAddress = config.serverAddress
            ? config.serverAddress
            : "https://api.hightouch.io";
        const defaultToken = config.token ? config.token : "";
        const token = await cli_ux_1.default.prompt("Hightouch API key", {
            type: "hide",
            default: defaultToken,
        });
        (0, fs_1.mkdir)(path_1.default.resolve(os_1.default.homedir(), ".hightouch"), { recursive: true }, (err) => {
            if (err) {
                return err;
            }
            (0, fs_1.writeFileSync)(path_1.default.resolve(baseDir, "config.json"), JSON.stringify({ serverAddress, token }));
            console.log("Config saved to ~/.hightouch/config.json");
        });
    }
}
exports.default = Login;
Login.description = "Login hightouch with api key";
Login.examples = [`$ ht login`];
