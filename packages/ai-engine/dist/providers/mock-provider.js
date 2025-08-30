export class MockProvider {
    constructor(_config) {
        // TODO: Use config when implementing
    }
    get name() {
        return 'Mock';
    }
    async analyzeCode(_code, _context) {
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
    async generateSuggestion(_code, _issue) {
        return 'Mock suggestion: This is a placeholder for testing without AI API keys.';
    }
    async explainCode(_code) {
        return 'Mock explanation: This is a placeholder for testing without AI API keys.';
    }
}
//# sourceMappingURL=mock-provider.js.map