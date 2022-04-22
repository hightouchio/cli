import { Command, Flags } from "@oclif/core";
import got from "got";
import { calculateDuration, getConfig } from "../util";
import cli from "cli-ux";
import { inspect } from "./inspect";
import { Run } from "../types";

export default class Trigger extends Command {
  static description = "Trigger sync to run";

  static examples = [`$ ht trigger --sync test123`];

  static flags = {
    fullSync: Flags.boolean({
      name: "full-sync",
      char: "f",
      description: "Whether to run a full sync",
      default: false,
    }),

    quiet: Flags.boolean({
      char: "q",
      description: "Whether to show run progress",
      default: false,
    }),
  };

  static args = [{ name: "sync", description: "Sync ID", required: true }];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Trigger);

    const { serverAddress, token } = getConfig();
    if (args.sync.lastIndexOf("/") !== -1) {
      args.sync = args.sync.substring(args.sync.lastIndexOf("/") + 1);
    }
    const sync = await inspect(serverAddress, token, "syncs", args.sync);
    const { id } = await got
      .post(`${serverAddress}/api/v1/syncs/${sync.id}/trigger`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: {
          fullSync: flags.fullSync,
        },
      })
      .json();
    if (flags.quiet) {
      console.log(id);
      return;
    }
    cli.action.start("querying");
    let total = 0;
    await new Promise<void>((resolve) => {
      const timer1 = setInterval(async () => {
        const { data } = await got
          .get(`${serverAddress}/api/v1/syncs/${sync.id}/runs?runId=${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .json<{
            data: Run[];
          }>();
        if (data && data.length > 0) {
          if (data[0].error) {
            console.log(`Sync run failed: error: ${data[0].error}`);
            clearInterval(timer1);
            resolve();
            process.exit(1);
          }
          total =
            data[0].plannedRows.addedCount +
            data[0].plannedRows.changedCount +
            data[0].plannedRows.removedCount;
          if (total > 0) {
            clearInterval(timer1);
            resolve();
          }
        }
      }, 1000);
    });
    cli.action.stop("done");

    console.log("Processing");
    const bar = cli.progress({
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      fps: 100,
      stream: process.stdout,
      barsize: 30,
      format:
        "[{bar}] {progress}% | ETA: {eta}s | Total: {processed}/{total} | Success: {success} | Fail: {fail} | Speed: {speed} rows/second",
    });

    bar.start(total, 0, {
      speed: "N/A",
    });

    let current = 0;
    return new Promise((resolve) => {
      const timer2 = setInterval(async () => {
        const { data } = await got
          .get(`${serverAddress}/api/v1/syncs/${sync.id}/runs?runId=${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .json<{
            data: Run[];
          }>();
        if (data[0].error) {
          console.log(`Sync run failed: error: ${data[0].error}`);
          clearInterval(timer2);
          bar.stop();
          process.exit(1);
        }
        const successCount =
          data[0].successfulRows.addedCount +
          data[0].successfulRows.changedCount +
          data[0].successfulRows.removedCount;
        const failCount =
          data[0].failedRows.addedCount +
          data[0].failedRows.changedCount +
          data[0].failedRows.removedCount;
        const speed = successCount + failCount - current;
        current = successCount + failCount;
        const eta = calculateDuration(
          ((bar.getTotal() - current) / speed) * 1000,
        );
        bar.update(current, {
          speed,
          eta: eta,
          processed: current,
          progress: Math.floor(data[0].completionRatio * 100),
          success: successCount,
          fail: failCount,
        });
        if (current == bar.getTotal()) {
          clearInterval(timer2);
          bar.stop();
          resolve();
        }
      }, 1000);
    });
  }
}
