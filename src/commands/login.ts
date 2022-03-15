import { Command, Flags } from "@oclif/core";
import cli from "cli-ux";
import { mkdir, writeFileSync } from "fs";
import path from "path";
import os from "os";
import { getConfig } from "../util";

const baseDir = path.resolve(os.homedir(), ".hightouch");

export default class Login extends Command {
  static description = "Login hightouch with api key";

  static examples = [`$ ht login`];

  async run(): Promise<void> {
    const config = getConfig();
    const serverAddress = config.serverAddress
      ? config.serverAddress
      : "https://api.hightouch.io";
    const defaultToken = config.token ? config.token : "";

    const token = await cli.prompt("Hightouch API key", {
      type: "hide",
      default: defaultToken,
    });

    mkdir(
      path.resolve(os.homedir(), ".hightouch"),
      { recursive: true },
      (err) => {
        if (err) {
          return err;
        }
        writeFileSync(
          path.resolve(baseDir, "config.json"),
          JSON.stringify({ serverAddress, token }),
        );
        console.log("Config saved to ~/.hightouch/config.json");
      },
    );
  }
}
