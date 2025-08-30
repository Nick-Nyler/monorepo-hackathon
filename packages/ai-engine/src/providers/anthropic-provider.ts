import { AIProvider, AIContext, AIAnalysis, AIProviderConfig } from '../types';

export class AnthropicProvider implements AIProvider {
  constructor(_config: AIProviderConfig) {
    // TODO: Use config when implementing
  }

  get name(): string {
    return 'Anthropic';
  }

  async analyzeCode(_code: string, _context: AIContext): Promise<AIAnalysis> {
    // TODO: Implement Anthropic Claude integration
    throw new Error('Anthropic provider not yet implemented');
  }

  async generateSuggestion(_code: string, _issue: string): Promise<string> {
    // TODO: Implement Anthropic Claude integration
    throw new Error('Anthropic provider not yet implemented');
  }

  async explainCode(_code: string): Promise<string> {
    // TODO: Implement Anthropic Claude integration
    throw new Error('Anthropic provider not yet implemented');
  }
}
