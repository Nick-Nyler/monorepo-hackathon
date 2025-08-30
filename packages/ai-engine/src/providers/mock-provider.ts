import { AIProvider, AIContext, AIAnalysis, AIProviderConfig } from '../types';

export class MockProvider implements AIProvider {
  constructor(_config: AIProviderConfig) {
    // TODO: Use config when implementing
  }

  get name(): string {
    return 'Mock';
  }

  async analyzeCode(_code: string, _context: AIContext): Promise<AIAnalysis> {
    // Mock analysis for testing
    return {
      score: 75,
      issues: [
        {
          id: 'mock-issue-1',
          type: 'maintainability',
          severity: 'medium',
          message: 'Mock issue for testing purposes',
          explanation: 'This is a mock issue to demonstrate the system'
        }
      ],
      suggestions: [
        {
          id: 'mock-suggestion-1',
          type: 'refactor',
          priority: 'medium',
          message: 'Mock suggestion for testing',
          explanation: 'This is a mock suggestion to demonstrate the system',
          impact: 'Improves code quality'
        }
      ],
      explanation: 'Mock AI analysis completed for testing',
      confidence: 0.9
    };
  }

  async generateSuggestion(_code: string, _issue: string): Promise<string> {
    return 'Mock suggestion: This is a placeholder for testing without AI API keys.';
  }

  async explainCode(_code: string): Promise<string> {
    return 'Mock explanation: This is a placeholder for testing without AI API keys.';
  }
}
