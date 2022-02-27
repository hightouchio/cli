import { Command, Flags } from "@oclif/core";
import got from "got";
import { getConfig, timeAgo } from "../util";
import cli from "cli-ux";

export default class Sync extends Command {
  static aliases = ["syncs"];

  static description = "List all syncs in current workspace";

  static examples = [`$ ht sync`];

  async run(): Promise<void> {
    const { serverAddress, token } = getConfig();
    const { data } = await got
      .get(`${serverAddress}/api/v1/syncs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    cli.table(data, {
      id: {
        minWidth: 7,
        get: (row) => `syncs/${row.slug}`,
      },
      status: {},
      created: {
        get: (row) => timeAgo.format(new Date(`${row.createdAt}`)),
      },
      lastRunAt: {
        header: "LastRun",
        get: (row) => {
          if (row.lastRunAt) {
            return timeAgo.format(new Date(`${row.lastRunAt}`));
          }
          return "";
        },
      },
    });
  }
}
