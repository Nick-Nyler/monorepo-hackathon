export interface AIProvider {
  name: string;
  analyzeCode(code: string, context: AIContext): Promise<AIAnalysis>;
  generateSuggestion(code: string, issue: string): Promise<string>;
  explainCode(code: string): Promise<string>;
}

export interface AIContext {
  language: string;
  filePath?: string;
  projectType?: string;
  framework?: string;
  customInstructions?: string;
}

export interface AIAnalysis {
  score: number;
  issues: AIIssue[];
  suggestions: AISuggestion[];
  explanation: string;
  confidence: number;
}

export interface AIIssue {
  id: string;
  type: 'security' | 'performance' | 'maintainability' | 'readability' | 'best-practice';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  line?: number;
  code?: string;
  explanation: string;
  fix?: string;
}

export interface AISuggestion {
  id: string;
  type: 'refactor' | 'optimization' | 'documentation' | 'testing';
  priority: 'low' | 'medium' | 'high';
  message: string;
  code?: string;
  explanation: string;
  impact: string;
}

export interface AIProviderConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
}

export interface AIAnalysisOptions {
  provider: 'openai' | 'anthropic' | 'custom';
  model?: string;
  enableDetailedAnalysis?: boolean;
  includeCodeExplanations?: boolean;
  maxSuggestions?: number;
  customPrompt?: string;
}
