import { Command } from "@oclif/core";
export default class Runs extends Command {
    static aliases: string[];
    static description: string;
    static examples: string[];
    static flags: {
        sync: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        limit: import("@oclif/core/lib/interfaces").OptionFlag<number>;
    };
    run(): Promise<void>;
}
