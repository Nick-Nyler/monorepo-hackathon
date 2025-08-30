import { AIProvider, AIContext, AIAnalysis, AIAnalysisOptions } from './types';
import { OpenAIProvider } from './providers/openai-provider';

export class AIAnalyzer {
  private providers: Map<string, AIProvider>;
  private defaultProvider: string;

  constructor(options: AIAnalysisOptions = { provider: 'openai' }) {
    this.providers = new Map();
    this.defaultProvider = options.provider;

    // Initialize default providers
    this.initializeProviders();
  }

  private initializeProviders(): void {
    // Add OpenAI provider if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.providers.set('openai', new OpenAIProvider({
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.DEFAULT_AI_MODEL || 'gpt-4'
      }));
    }
  }

  async analyzeCode(code: string, context: AIContext, options?: AIAnalysisOptions): Promise<AIAnalysis> {
    const providerName = options?.provider || this.defaultProvider;
    const provider = this.providers.get(providerName);

    if (!provider) {
      throw new Error(`AI provider '${providerName}' not available. Please check your configuration.`);
    }

    return await provider.analyzeCode(code, context);
  }

  async generateSuggestion(code: string, issue: string, providerName?: string): Promise<string> {
    const provider = this.providers.get(providerName || this.defaultProvider);

    if (!provider) {
      throw new Error(`AI provider not available. Please check your configuration.`);
    }

    return await provider.generateSuggestion(code, issue);
  }

  async explainCode(code: string, providerName?: string): Promise<string> {
    const provider = this.providers.get(providerName || this.defaultProvider);

    if (!provider) {
      throw new Error(`AI provider not available. Please check your configuration.`);
    }

    return await provider.explainCode(code);
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  isProviderAvailable(providerName: string): boolean {
    return this.providers.has(providerName);
  }
}
