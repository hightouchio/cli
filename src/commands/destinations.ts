import { Command } from "@oclif/core";
import got from "got";
import { getConfig, timeAgo } from "../util";
import cli from "cli-ux";

export default class Destinations extends Command {
  static aliases = ["destination"];

  static description = "List all destinations in current workspace";

  static examples = [`$ ht destinations`];

  async run(): Promise<void> {
    const { serverAddress, token } = getConfig();
    const { data } = await got
      .get(`${serverAddress}/api/v1/destinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    cli.table(data, {
      id: {
        minWidth: 7,
        get: (row) => `destinations/${row.slug}`,
      },
      name: {},
      type: {},
      created: {
        get: (row) => timeAgo.format(new Date(`${row.createdAt}`)),
      },
    });
  }
}
