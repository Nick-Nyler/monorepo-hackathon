import { AIContext } from './types';
export declare function generateAnalysisPrompt(code: string, context: AIContext): string;
export declare function generateSuggestionPrompt(code: string, issue: string): string;
export declare function generateExplanationPrompt(code: string): string;
export declare function generateRefactoringPrompt(code: string, context: AIContext): string;
export declare function generateDocumentationPrompt(code: string, context: AIContext): string;
//# sourceMappingURL=prompts.d.ts.map