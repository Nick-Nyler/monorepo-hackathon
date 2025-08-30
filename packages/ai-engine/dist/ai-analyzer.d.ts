import { AIContext, AIAnalysis, AIAnalysisOptions } from './types.js';
export declare class AIAnalyzer {
    private providers;
    private defaultProvider;
    constructor(options?: AIAnalysisOptions);
    private initializeProviders;
    analyzeCode(code: string, context: AIContext, options?: AIAnalysisOptions): Promise<AIAnalysis>;
    generateSuggestion(code: string, issue: string, providerName?: string): Promise<string>;
    explainCode(code: string, providerName?: string): Promise<string>;
    getAvailableProviders(): string[];
    isProviderAvailable(providerName: string): boolean;
}
//# sourceMappingURL=ai-analyzer.d.ts.map