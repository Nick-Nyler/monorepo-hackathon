import { CommandOptions } from 'commander';
interface ReportOptions extends CommandOptions {
    format: string;
    output?: string;
}
export declare function reportCommand(path: string, options: ReportOptions): Promise<void>;
export {};
//# sourceMappingURL=report.d.ts.map