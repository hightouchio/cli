import { Command, Flags } from "@oclif/core";
import got from "got";
import { getConfig } from "../util";

export default class Inspect extends Command {
  static description = "Inspect resources in the current workspace";

  static examples = [`$ ht inspect model/run-user`];

  static flags = {
    format: Flags.string({
      char: "f",
      description: "Output format(yaml/json)",
      required: true,
      default: "json",
    }),
  };

  static args = [
    { name: "resource", description: "Resource ID", required: true },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(Inspect);

    const index: number = args.resource.lastIndexOf("/");
    if (index == -1) {
      console.log("ID doesn't follow resourceType/name format");
      return;
    }
    const resourceType = args.resource.substring(0, index + 1);
    const slug = args.resource.substring(index + 1, args.resource.length);

    const { serverAddress, token } = getConfig();
    const data = await inspect(serverAddress, token, resourceType, slug);

    console.log(JSON.stringify(data, undefined, 2));
    return;
  }
}

export async function inspect(
  server: string,
  token: string,
  resourceType: string,
  slug: string,
): Promise<Record<string, unknown>> {
  const { data } = await got
    .get(`${server}/api/v1/${resourceType}?slug=${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json();
  return data[0];
}
