import { Command } from "@oclif/core";
export default class Trigger extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        "full-sync": import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        quiet: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static args: {
        name: string;
        description: string;
        required: boolean;
    }[];
    run(): Promise<void>;
}
