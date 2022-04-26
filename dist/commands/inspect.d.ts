import { Command } from "@oclif/core";
export default class Inspect extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        format: import("@oclif/core/lib/interfaces").OptionFlag<string>;
    };
    static args: {
        name: string;
        description: string;
        required: boolean;
    }[];
    run(): Promise<void>;
}
export declare function inspect(server: string, token: string, resourceType: string, slug: string): Promise<Record<string, unknown>>;
