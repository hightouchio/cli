import { Command, Flags } from "@oclif/core";
import got from "got";
import { calculateDuration, getConfig, timeAgo } from "../util";
import cli from "cli-ux";
import { inspect } from "./inspect";

export default class Runs extends Command {
  static aliases = ["runs"];

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
        header: "Size",
      },
      diff: {
        header: "Diff(Added/Changed/Removed)",
        get: (row) => {
          const diff = row.diff as {
            added: number;
            changed: number;
            removed: number;
          };
          return `${diff.added}/${diff.changed}/${diff.removed}`;
        },
      },
      success: {
        header: "Success(Added/Changed/Removed)",
        get: (row) => {
          const success = row.success as {
            added: number;
            changed: number;
            removed: number;
          };
          return `${success.added}/${success.changed}/${success.removed}`;
        },
      },
      fail: {
        header: "Fail(Added/Changed/Removed)",
        get: (row) => {
          const fail = row.fail as {
            added: number;
            changed: number;
            removed: number;
          };
          return `${fail.added}/${fail.changed}/${fail.removed}`;
        },
      },
      started: {
        get: (row) => timeAgo.format(new Date(`${row.startedAt}`)),
      },
    });
  }
}
