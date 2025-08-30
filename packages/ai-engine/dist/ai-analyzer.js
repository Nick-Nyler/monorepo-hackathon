import { OpenAIProvider } from './providers/openai-provider';
export class AIAnalyzer {
    constructor(options = { provider: 'openai' }) {
        Object.defineProperty(this, "providers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.providers = new Map();
        this.defaultProvider = options.provider;
        // Initialize default providers
        this.initializeProviders();
    }
    initializeProviders() {
        // Add OpenAI provider if API key is available
        if (process.env.OPENAI_API_KEY) {
            this.providers.set('openai', new OpenAIProvider({
                apiKey: process.env.OPENAI_API_KEY,
                model: process.env.DEFAULT_AI_MODEL || 'gpt-4'
            }));
        }
    }
    async analyzeCode(code, context, options) {
        const providerName = options?.provider || this.defaultProvider;
        const provider = this.providers.get(providerName);
        if (!provider) {
            throw new Error(`AI provider '${providerName}' not available. Please check your configuration.`);
        }
        return await provider.analyzeCode(code, context);
    }
    async generateSuggestion(code, issue, providerName) {
        const provider = this.providers.get(providerName || this.defaultProvider);
        if (!provider) {
            throw new Error(`AI provider not available. Please check your configuration.`);
        }
        return await provider.generateSuggestion(code, issue);
    }
    async explainCode(code, providerName) {
        const provider = this.providers.get(providerName || this.defaultProvider);
        if (!provider) {
            throw new Error(`AI provider not available. Please check your configuration.`);
        }
        return await provider.explainCode(code);
    }
    getAvailableProviders() {
        return Array.from(this.providers.keys());
    }
    isProviderAvailable(providerName) {
        return this.providers.has(providerName);
    }
}
//# sourceMappingURL=ai-analyzer.js.map