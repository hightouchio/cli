import { Command } from "@oclif/core";
export default class Models extends Command {
    static aliases: string[];
    static description: string;
    static examples: string[];
    run(): Promise<void>;
}
