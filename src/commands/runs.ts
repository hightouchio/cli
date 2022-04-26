import { Command, Flags } from "@oclif/core";
import got from "got";
import { calculateDuration, getConfig, timeAgo } from "../util";
import cli from "cli-ux";
import { inspect } from "./inspect";

export default class Runs extends Command {
  static aliases = ["run"];

  static description = "List all syncs run for a given sync";

  static examples = [`$ ht runs`];

  static flags = {
    sync: Flags.string({
      char: "s",
      description: "Specify sync name to list runs",
      required: true,
    }),
    limit: Flags.integer({
      char: "l",
      description: "Limit the number of runs to output",
      default: 5,
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Runs);

    const { serverAddress, token } = getConfig();
    if (flags.sync.lastIndexOf("/") !== -1) {
      flags.sync = flags.sync.substring(flags.sync.lastIndexOf("/") + 1);
    }

    const sync = await inspect(serverAddress, token, "syncs", flags.sync);

    const { data } = await got
      .get(
        `${serverAddress}/api/v1/syncs/${sync.id}/runs?limit=${flags.limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .json();

    cli.table(data, {
      id: {},
      duration: {
        get: (row) => {
          if (row.finishedAt) {
            return calculateDuration(
              new Date(`${row.finishedAt}`).getTime() -
                new Date(`${row.startedAt}`).getTime(),
            );
          }
        },
      },
      status: {},
      querySize: {
        header: "Queried",
      },
      diff: {
        header: "Planned(Added/Changed/Removed)",
        get: (row) => {
          const diff = row.plannedRows as {
            addedCount: number;
            changedCount: number;
            removedCount: number;
          };
          return `${diff.addedCount}/${diff.changedCount}/${diff.removedCount}`;
        },
      },
      success: {
        header: "Succeeded(Added/Changed/Removed)",
        get: (row) => {
          const success = row.successfulRows as {
            addedCount: number;
            changedCount: number;
            removedCount: number;
          };
          return `${success.addedCount}/${success.changedCount}/${success.removedCount}`;
        },
      },
      fail: {
        header: "Failed(Added/Changed/Removed)",
        get: (row) => {
          const fail = row.failedRows as {
            addedCount: number;
            changedCount: number;
            removedCount: number;
          };
          return `${fail.addedCount}/${fail.changedCount}/${fail.removedCount}`;
        },
      },
      started: {
        get: (row) => timeAgo.format(new Date(`${row.startedAt}`)),
      },
    });
  }
}
