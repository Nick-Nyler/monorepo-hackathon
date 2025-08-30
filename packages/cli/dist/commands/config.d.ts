import { CommandOptions } from 'commander';
interface ConfigOptions extends CommandOptions {
    set?: string;
    get?: string;
    list?: boolean;
}
export declare function configCommand(options: ConfigOptions): Promise<void>;
export {};
//# sourceMappingURL=config.d.ts.map