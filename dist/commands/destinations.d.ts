import { Command } from "@oclif/core";
export default class Destinations extends Command {
    static aliases: string[];
    static description: string;
    static examples: string[];
    run(): Promise<void>;
}
