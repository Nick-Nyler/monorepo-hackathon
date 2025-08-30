import { AIProvider, AIContext, AIAnalysis, AIProviderConfig } from '../types';
export declare class AnthropicProvider implements AIProvider {
    constructor(_config: AIProviderConfig);
    get name(): string;
    analyzeCode(_code: string, _context: AIContext): Promise<AIAnalysis>;
    generateSuggestion(_code: string, _issue: string): Promise<string>;
    explainCode(_code: string): Promise<string>;
}
//# sourceMappingURL=anthropic-provider.d.ts.map