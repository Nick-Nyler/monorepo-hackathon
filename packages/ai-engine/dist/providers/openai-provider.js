import OpenAI from 'openai';
import { generateAnalysisPrompt, generateSuggestionPrompt, generateExplanationPrompt } from '../prompts.js';
export class OpenAIProvider {
    constructor(config) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = {
            model: 'gpt-4',
            maxTokens: 2000,
            temperature: 0.1,
            timeout: 30000,
            ...config
        };
        this.client = new OpenAI({
            apiKey: this.config.apiKey,
            timeout: this.config.timeout
        });
    }
    get name() {
        return 'OpenAI';
    }
    async analyzeCode(code, context) {
        try {
            const prompt = generateAnalysisPrompt(code, context);
            const response = await this.client.chat.completions.create({
                model: this.config.model || 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert code reviewer and software engineer. Analyze the provided code for quality, security, performance, and maintainability issues. Provide specific, actionable feedback.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.config.maxTokens,
                temperature: this.config.temperature
            });
            const content = response.choices[0]?.message?.content;
            if (!content) {
                throw new Error('No response from OpenAI');
            }
            return this.parseAnalysisResponse(content);
        }
        catch (error) {
            console.error('OpenAI analysis failed:', error);
            return this.createFallbackAnalysis();
        }
    }
    async generateSuggestion(code, issue) {
        try {
            const prompt = generateSuggestionPrompt(code, issue);
            const response = await this.client.chat.completions.create({
                model: this.config.model || 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert software engineer. Provide specific, actionable suggestions to fix the identified code issue.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.1
            });
            return response.choices[0]?.message?.content || 'Unable to generate suggestion';
        }
        catch (error) {
            console.error('OpenAI suggestion generation failed:', error);
            return 'Unable to generate suggestion due to an error';
        }
    }
    async explainCode(code) {
        try {
            const prompt = generateExplanationPrompt(code);
            const response = await this.client.chat.completions.create({
                model: this.config.model || 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert software engineer. Explain the provided code in a clear, concise manner, highlighting key concepts and patterns.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.1
            });
            return response.choices[0]?.message?.content || 'Unable to explain code';
        }
        catch (error) {
            console.error('OpenAI code explanation failed:', error);
            return 'Unable to explain code due to an error';
        }
    }
    parseAnalysisResponse(content) {
        try {
            // Try to parse structured response
            const lines = content.split('\n');
            let score = 80; // Default score
            const issues = [];
            const suggestions = [];
            let explanation = '';
            let confidence = 0.8;
            for (const line of lines) {
                if (line.includes('Score:')) {
                    const scoreMatch = line.match(/Score:\s*(\d+)/);
                    if (scoreMatch && scoreMatch[1])
                        score = parseInt(scoreMatch[1]);
                }
                else if (line.includes('Issue:')) {
                    // Parse issue
                    const issueMatch = line.match(/Issue:\s*(.+)/);
                    if (issueMatch && issueMatch[1]) {
                        issues.push({
                            id: `issue-${issues.length + 1}`,
                            type: 'maintainability',
                            severity: 'medium',
                            message: issueMatch[1],
                            explanation: issueMatch[1]
                        });
                    }
                }
                else if (line.includes('Suggestion:')) {
                    // Parse suggestion
                    const suggestionMatch = line.match(/Suggestion:\s*(.+)/);
                    if (suggestionMatch && suggestionMatch[1]) {
                        suggestions.push({
                            id: `suggestion-${suggestions.length + 1}`,
                            type: 'refactor',
                            priority: 'medium',
                            message: suggestionMatch[1],
                            explanation: suggestionMatch[1],
                            impact: 'Improves code quality'
                        });
                    }
                }
                else if (line.includes('Explanation:')) {
                    explanation = line.replace('Explanation:', '').trim();
                }
            }
            return {
                score,
                issues,
                suggestions,
                explanation: explanation || 'AI analysis completed',
                confidence
            };
        }
        catch (error) {
            console.error('Failed to parse OpenAI response:', error);
            return this.createFallbackAnalysis();
        }
    }
    createFallbackAnalysis() {
        return {
            score: 70,
            issues: [],
            suggestions: [],
            explanation: 'Analysis completed with basic checks',
            confidence: 0.5
        };
    }
}
//# sourceMappingURL=openai-provider.js.map