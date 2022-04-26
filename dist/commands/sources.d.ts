import { Command } from "@oclif/core";
export default class Sources extends Command {
    static aliases: string[];
    static description: string;
    static examples: string[];
    run(): Promise<void>;
}
