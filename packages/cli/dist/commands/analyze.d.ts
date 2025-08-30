import { CommandOptions } from 'commander';
interface AnalyzeOptions extends CommandOptions {
    output: string;
    ai: boolean;
    model: string;
    rules?: string;
    exclude?: string;
}
export declare function analyzeCommand(projectPath: string, options: AnalyzeOptions): Promise<void>;
export {};
//# sourceMappingURL=analyze.d.ts.map