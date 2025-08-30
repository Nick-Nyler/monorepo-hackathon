export interface CodeFile {
    path: string;
    content: string;
    language: string;
    size: number;
    lines: number;
}
export interface AnalysisResult {
    file: CodeFile;
    score: number;
    issues: Issue[];
    suggestions: Suggestion[];
    metrics: FileMetrics;
    timestamp: Date;
}
export interface Issue {
    id: string;
    type: 'error' | 'warning' | 'info';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    line?: number;
    column?: number;
    code?: string;
    suggestion?: string;
}
export interface Suggestion {
    id: string;
    type: 'improvement' | 'optimization' | 'best-practice';
    message: string;
    priority: 'low' | 'medium' | 'high';
    code?: string;
    explanation?: string;
}
export interface FileMetrics {
    complexity: number;
    maintainability: number;
    readability: number;
    testCoverage?: number;
    dependencies: number;
    functions: number;
    classes: number;
}
export interface ProjectAnalysis {
    projectPath: string;
    files: AnalysisResult[];
    summary: ProjectSummary;
    timestamp: Date;
}
export interface ProjectSummary {
    totalFiles: number;
    averageScore: number;
    totalIssues: number;
    criticalIssues: number;
    highPriorityIssues: number;
    recommendations: string[];
}
export interface AnalysisOptions {
    includePatterns?: string[];
    excludePatterns?: string[];
    maxFileSize?: number;
    enableAI?: boolean;
    aiModel?: string;
    customRules?: Rule[];
}
export interface Rule {
    id: string;
    name: string;
    description: string;
    pattern: string | RegExp;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    fix?: string;
}
//# sourceMappingURL=types.d.ts.map