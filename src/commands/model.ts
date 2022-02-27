import { Command } from "@oclif/core";
import got from "got";
import { getConfig, timeAgo } from "../util";
import cli from "cli-ux";

export default class Models extends Command {
  static aliases = ["models"];

  static description = "List all models in current workspace";

  static examples = [`$ ht model`];

  async run(): Promise<void> {
    const { serverAddress, token } = getConfig();
    const { data } = await got
      .get(`${serverAddress}/api/v1/models`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    cli.table(data, {
      id: {
        minWidth: 7,
        get: (row) => `models/${row.slug}`,
      },
      name: {},
      created: {
        get: (row) => timeAgo.format(new Date(`${row.createdAt}`)),
      },
    });
  }
}
