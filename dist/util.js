"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDuration = exports.getConfig = exports.timeAgo = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const os_1 = (0, tslib_1.__importDefault)(require("os"));
const fs_1 = require("fs");
const javascript_time_ago_1 = (0, tslib_1.__importDefault)(require("javascript-time-ago"));
const en_json_1 = (0, tslib_1.__importDefault)(require("javascript-time-ago/locale/en.json"));
javascript_time_ago_1.default.addDefaultLocale(en_json_1.default);
exports.timeAgo = new javascript_time_ago_1.default("en-US");
function getConfig() {
    let config = { serverAddress: "", token: "" };
    const configPath = path_1.default.resolve(os_1.default.homedir(), ".hightouch/config.json");
    if ((0, fs_1.existsSync)(configPath)) {
        config = JSON.parse((0, fs_1.readFileSync)(configPath).toString());
    }
    if (process.env.HIGHTOUCH_APIKEY) {
        config.token = process.env.HIGHTOUCH_APIKEY;
    }
    if (process.env.HIGHTOUCH_APISITE) {
        config.serverAddress = process.env.HIGHTOUCH_APISITE;
    }
    if (config.serverAddress === "") {
        config.serverAddress = "https://api.hightouch.io";
    }
    return config;
}
exports.getConfig = getConfig;
function calculateDuration(durationInMs) {
    const hours = Math.floor(durationInMs / (3600 * 1000));
    durationInMs -= hours * 3600 * 1000;
    const minutes = Math.floor(durationInMs / (60 * 1000));
    durationInMs -= minutes * 60 * 1000;
    const seconds = Math.floor(durationInMs / 1000);
    if (hours > 0) {
        return `${hours}h ${minutes > 0 ? `${minutes} m` : ""}`;
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds > 0 ? `${seconds} s` : ""}`;
    }
    return `${seconds}s`;
}
exports.calculateDuration = calculateDuration;
