import path from "path";
import os from "os";
import { readFileSync, existsSync } from "fs";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

export const timeAgo = new TimeAgo("en-US");

export function getConfig(): { serverAddress: string; token: string } {
  const configPath = path.resolve(os.homedir(), ".hightouch/config.json");
  if (!existsSync(configPath)) {
    return { serverAddress: "", token: "" };
  }
  return JSON.parse(readFileSync(configPath).toString());
}

export function calculateDuration(durationInMs: number): string {
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