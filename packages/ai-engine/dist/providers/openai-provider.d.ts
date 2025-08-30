import { AIProvider, AIContext, AIAnalysis, AIProviderConfig } from '../types.js';
export declare class OpenAIProvider implements AIProvider {
    private client;
    private config;
    constructor(config: AIProviderConfig);
    get name(): string;
    analyzeCode(code: string, context: AIContext): Promise<AIAnalysis>;
    generateSuggestion(code: string, issue: string): Promise<string>;
    explainCode(code: string): Promise<string>;
    private parseAnalysisResponse;
    private createFallbackAnalysis;
}
//# sourceMappingURL=openai-provider.d.ts.map