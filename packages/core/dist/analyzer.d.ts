import { CodeFile, AnalysisResult, ProjectAnalysis, AnalysisOptions } from './types.js';
export declare class CodeAnalyzer {
    private options;
    private rules;
    constructor(options?: AnalysisOptions);
    analyzeProject(projectPath: string): Promise<ProjectAnalysis>;
    analyzeFile(file: CodeFile): Promise<AnalysisResult>;
    private discoverFiles;
    private detectIssues;
    private generateSuggestions;
    private calculateScore;
    private generateProjectSummary;
    private generateRecommendations;
    private initializeDefaultRules;
}
//# sourceMappingURL=analyzer.d.ts.map