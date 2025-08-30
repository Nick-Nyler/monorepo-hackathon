import { CodeFile, FileMetrics } from './types';

export function calculateMetrics(file: CodeFile): FileMetrics {
  const complexity = calculateComplexity(file.content);
  const maintainability = calculateMaintainability(file.content, file.lines);
  const readability = calculateReadability(file.content);
  const dependencies = countDependencies(file.content);
  const functions = countFunctions(file.content);
  const classes = countClasses(file.content);

  return {
    complexity,
    maintainability,
    readability,
    dependencies,
    functions,
    classes
  };
}

function calculateComplexity(content: string): number {
  let complexity = 1; // Base complexity
  
  // Count control flow statements
  const controlFlowPatterns = [
    /\bif\b/g,
    /\belse\b/g,
    /\bfor\b/g,
    /\bwhile\b/g,
    /\bdo\b/g,
    /\bswitch\b/g,
    /\bcase\b/g,
    /\bcatch\b/g,
    /\b\?\b/g, // ternary operator
    /\b&&\b/g, // logical AND
    /\b\|\|\b/g // logical OR
  ];

  for (const pattern of controlFlowPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      complexity += matches.length;
    }
  }

  return complexity;
}

function calculateMaintainability(content: string, lines: number): number {
  let maintainability = 100;
  
  // Penalize long files
  if (lines > 100) maintainability -= 10;
  if (lines > 300) maintainability -= 20;
  if (lines > 500) maintainability -= 30;
  
  // Penalize high complexity
  const complexity = calculateComplexity(content);
  if (complexity > 10) maintainability -= 15;
  if (complexity > 20) maintainability -= 25;
  
  // Penalize long functions (approximate)
  const longFunctions = (content.match(/function\s+\w+\s*\([^)]*\)\s*\{/g) || []).length;
  maintainability -= longFunctions * 5;
  
  // Penalize deep nesting
  const maxNesting = calculateMaxNesting(content);
  if (maxNesting > 3) maintainability -= 10;
  if (maxNesting > 5) maintainability -= 20;
  
  return Math.max(0, maintainability);
}

function calculateReadability(content: string): number {
  let readability = 100;
  
  // Penalize long lines
  const lines = content.split('\n');
  const longLines = lines.filter(line => line.length > 120).length;
  readability -= longLines * 2;
  
  // Penalize lack of comments
  const commentLines = content.match(/\/\/.*$/gm)?.length || 0;
  const totalLines = lines.length;
  const commentRatio = commentLines / totalLines;
  
  if (commentRatio < 0.05) readability -= 20;
  if (commentRatio < 0.1) readability -= 10;
  
  // Penalize inconsistent indentation
  const indentationIssues = detectIndentationIssues(lines);
  readability -= indentationIssues * 5;
  
  return Math.max(0, readability);
}

function countDependencies(content: string): number {
  const importPatterns = [
    /import\s+.*\s+from\s+['"][^'"]+['"]/g,
    /require\s*\(\s*['"][^'"]+['"]\s*\)/g,
    /import\s*\(\s*['"][^'"]+['"]\s*\)/g
  ];
  
  let dependencies = 0;
  for (const pattern of importPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      dependencies += matches.length;
    }
  }
  
  return dependencies;
}

function countFunctions(content: string): number {
  const functionPatterns = [
    /function\s+\w+\s*\(/g,
    /const\s+\w+\s*=\s*\([^)]*\)\s*=>/g,
    /let\s+\w+\s*=\s*\([^)]*\)\s*=>/g,
    /async\s+function\s+\w+\s*\(/g,
    /async\s+\([^)]*\)\s*=>/g
  ];
  
  let functions = 0;
  for (const pattern of functionPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      functions += matches.length;
    }
  }
  
  return functions;
}

function countClasses(content: string): number {
  const classPatterns = [
    /class\s+\w+/g,
    /class\s+\w+\s+extends/g
  ];
  
  let classes = 0;
  for (const pattern of classPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      classes += matches.length;
    }
  }
  
  return classes;
}

function calculateMaxNesting(content: string): number {
  let maxNesting = 0;
  let currentNesting = 0;
  
  for (const char of content) {
    if (char === '{') {
      currentNesting++;
      maxNesting = Math.max(maxNesting, currentNesting);
    } else if (char === '}') {
      currentNesting = Math.max(0, currentNesting - 1);
    }
  }
  
  return maxNesting;
}

function detectIndentationIssues(lines: string[]): number {
  let issues = 0;
  let expectedIndent = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    
    const trimmed = line.trim();
    
    if (trimmed.length === 0) continue;
    
    const currentIndent = line.length - line.trimStart().length;
    
    // Check if indentation is consistent
    if (currentIndent % 2 !== 0 && currentIndent !== 0) {
      issues++;
    }
    
    // Track expected indentation based on braces
    if (trimmed.includes('{')) {
      expectedIndent += 2;
    }
    if (trimmed.includes('}')) {
      expectedIndent = Math.max(0, expectedIndent - 2);
    }
  }
  
  return issues;
}
