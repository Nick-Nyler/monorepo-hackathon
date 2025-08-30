import { glob } from 'glob';
import { promises as fsPromises } from 'fs';
import { calculateMetrics } from './metrics.js';
import { detectLanguage, isTextFile } from './utils.js';
export class CodeAnalyzer {
    constructor(options = {}) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rules", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.options = {
            includePatterns: ['**/*.{js,ts,jsx,tsx}'],
            excludePatterns: ['**/node_modules/**', '**/dist/**', '**/build/**'],
            maxFileSize: 1024 * 1024, // 1MB
            enableAI: false,
            aiModel: 'gpt-4',
            customRules: [],
            ...options
        };
        this.rules = this.initializeDefaultRules();
        if (this.options.customRules) {
            this.rules.push(...this.options.customRules);
        }
    }
    async analyzeProject(projectPath) {
        const files = await this.discoverFiles(projectPath);
        const analysisResults = [];
        for (const file of files) {
            try {
                const result = await this.analyzeFile(file);
                analysisResults.push(result);
            }
            catch (error) {
                console.warn(`Failed to analyze ${file.path}:`, error);
            }
        }
        const summary = this.generateProjectSummary(analysisResults);
        return {
            projectPath,
            files: analysisResults,
            summary,
            timestamp: new Date()
        };
    }
    async analyzeFile(file) {
        const issues = this.detectIssues(file);
        const suggestions = this.generateSuggestions(file);
        const metrics = calculateMetrics(file);
        const score = this.calculateScore(issues, metrics);
        return {
            file,
            score,
            issues,
            suggestions,
            metrics,
            timestamp: new Date()
        };
    }
    async discoverFiles(projectPath) {
        const patterns = this.options.includePatterns;
        const excludePatterns = this.options.excludePatterns;
        const files = [];
        for (const pattern of patterns) {
            const matches = await glob(pattern, {
                cwd: projectPath,
                ignore: excludePatterns,
                absolute: true
            });
            for (const filePath of matches) {
                try {
                    const stats = await fsPromises.stat(filePath);
                    if (stats.isFile() && stats.size <= this.options.maxFileSize) {
                        const content = await fsPromises.readFile(filePath, 'utf-8');
                        if (isTextFile(content)) {
                            const language = detectLanguage(filePath, content);
                            files.push({
                                path: filePath,
                                content,
                                language,
                                size: stats.size,
                                lines: content.split('\n').length
                            });
                        }
                    }
                }
                catch (error) {
                    console.warn(`Failed to read file ${filePath}:`, error);
                }
            }
        }
        return files;
    }
    detectIssues(file) {
        const issues = [];
        for (const rule of this.rules) {
            if (rule.pattern instanceof RegExp) {
                const matches = file.content.match(rule.pattern);
                if (matches) {
                    issues.push({
                        id: rule.id,
                        type: 'warning',
                        severity: rule.severity,
                        message: rule.message,
                        suggestion: rule.fix
                    });
                }
            }
            else if (typeof rule.pattern === 'string') {
                if (file.content.includes(rule.pattern)) {
                    issues.push({
                        id: rule.id,
                        type: 'warning',
                        severity: rule.severity,
                        message: rule.message,
                        suggestion: rule.fix
                    });
                }
            }
        }
        return issues;
    }
    generateSuggestions(file) {
        const suggestions = [];
        // Basic suggestions based on file metrics
        if (file.lines > 500) {
            suggestions.push({
                id: 'file-too-long',
                type: 'improvement',
                message: 'Consider breaking this file into smaller modules',
                priority: 'medium',
                explanation: 'Large files can be harder to maintain and understand'
            });
        }
        if (file.content.includes('TODO') || file.content.includes('FIXME')) {
            suggestions.push({
                id: 'todo-comments',
                type: 'improvement',
                message: 'Address TODO/FIXME comments',
                priority: 'low',
                explanation: 'These comments indicate incomplete work'
            });
        }
        return suggestions;
    }
    calculateScore(issues, metrics) {
        let score = 100;
        // Deduct points for issues
        for (const issue of issues) {
            switch (issue.severity) {
                case 'critical':
                    score -= 20;
                    break;
                case 'high':
                    score -= 10;
                    break;
                case 'medium':
                    score -= 5;
                    break;
                case 'low':
                    score -= 2;
                    break;
            }
        }
        // Adjust score based on metrics
        if (metrics.complexity > 10)
            score -= 10;
        if (metrics.maintainability < 50)
            score -= 15;
        if (metrics.readability < 60)
            score -= 10;
        return Math.max(0, score);
    }
    generateProjectSummary(results) {
        const totalFiles = results.length;
        const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
        const criticalIssues = results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'critical').length, 0);
        const highPriorityIssues = results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'high').length, 0);
        const averageScore = totalFiles > 0
            ? results.reduce((sum, r) => sum + r.score, 0) / totalFiles
            : 0;
        const recommendations = this.generateRecommendations(results);
        return {
            totalFiles,
            averageScore: Math.round(averageScore * 100) / 100,
            totalIssues,
            criticalIssues,
            highPriorityIssues,
            recommendations
        };
    }
    generateRecommendations(results) {
        const recommendations = [];
        if (results.some(r => r.score < 50)) {
            recommendations.push('Focus on improving low-scoring files first');
        }
        if (results.some(r => r.issues.some(i => i.severity === 'critical'))) {
            recommendations.push('Address critical issues immediately');
        }
        if (results.some(r => r.metrics.complexity > 15)) {
            recommendations.push('Consider refactoring highly complex functions');
        }
        return recommendations;
    }
    initializeDefaultRules() {
        return [
            {
                id: 'console-log',
                name: 'Console Log in Production',
                description: 'Detect console.log statements',
                pattern: /console\.log\(/,
                severity: 'medium',
                message: 'Console.log statements should be removed in production',
                fix: 'Use a proper logging library or remove console.log statements'
            },
            {
                id: 'var-usage',
                name: 'Var Declaration',
                description: 'Detect var declarations',
                pattern: /\bvar\s+/,
                severity: 'low',
                message: 'Consider using const or let instead of var',
                fix: 'Replace var with const or let for better scoping'
            },
            {
                id: 'magic-numbers',
                name: 'Magic Numbers',
                description: 'Detect magic numbers in code',
                pattern: /\b\d{3,}\b/,
                severity: 'low',
                message: 'Consider extracting magic numbers to named constants',
                fix: 'Define constants for magic numbers to improve readability'
            }
        ];
    }
}
//# sourceMappingURL=analyzer.js.map