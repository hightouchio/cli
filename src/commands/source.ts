import { Command } from "@oclif/core";
import got from "got";
import { getConfig, timeAgo } from "../util";
import cli from "cli-ux";

export default class Sources extends Command {
  static aliases = ["sources"];

  static description = "List all sources in current workspace";

  static examples = [`$ ht source`];

  async run(): Promise<void> {
    const { serverAddress, token } = getConfig();
    const { data } = await got
      .get(`${serverAddress}/api/v1/sources`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    cli.table(data, {
      id: {
        minWidth: 7,
        get: (row) => `sources/${row.slug}`,
      },
      name: {},
      type: {},
      created: {
        get: (row) => timeAgo.format(new Date(`${row.createdAt}`)),
      },
    });
  }
}
