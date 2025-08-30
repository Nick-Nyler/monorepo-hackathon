#!/usr/bin/env node

import { CodeAnalyzer } from '../packages/core/dist/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testCoreAnalyzer() {
  console.log('🧪 Testing Core Code Analyzer...\n');
  
  try {
    // Initialize analyzer
    const analyzer = new CodeAnalyzer({
      includePatterns: ['**/*.{js,ts,jsx,tsx}'],
      excludePatterns: ['**/node_modules/**', '**/dist/**'],
      enableAI: false
    });

    // Analyze the sample project
    const projectPath = path.join(__dirname, '../examples/sample-project');
    console.log(`📁 Analyzing project: ${projectPath}\n`);
    
    const startTime = Date.now();
    const analysis = await analyzer.analyzeProject(projectPath);
    const duration = Date.now() - startTime;

    // Display results
    console.log('📊 Core Analysis Results:');
    console.log('═'.repeat(50));
    console.log(`Project: ${analysis.projectPath}`);
    console.log(`Total Files: ${analysis.summary.totalFiles}`);
    console.log(`Average Score: ${analysis.summary.averageScore.toFixed(1)}/100`);
    console.log(`Total Issues: ${analysis.summary.totalIssues}`);
    console.log(`Critical Issues: ${analysis.summary.criticalIssues}`);
    console.log(`High Priority Issues: ${analysis.summary.highPriorityIssues}`);
    console.log(`Analysis Time: ${duration}ms\n`);

    // Show recommendations
    if (analysis.summary.recommendations.length > 0) {
      console.log('💡 Recommendations:');
      analysis.summary.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
      });
      console.log();
    }

    // Show file details
    console.log('📄 File Analysis:');
    analysis.files.forEach((result, index) => {
      const relativePath = path.relative(analysis.projectPath, result.file.path);
      const scoreColor = result.score >= 80 ? '🟢' : result.score >= 60 ? '🟡' : '🔴';
      
      console.log(`\n  ${index + 1}. ${relativePath}`);
      console.log(`     Score: ${scoreColor} ${result.score}/100`);
      console.log(`     Language: ${result.file.language}`);
      console.log(`     Size: ${(result.file.size / 1024).toFixed(1)} KB`);
      console.log(`     Lines: ${result.file.lines}`);
      
      if (result.issues.length > 0) {
        console.log(`     Issues: ${result.issues.length}`);
        result.issues.forEach(issue => {
          const severityIcon = issue.severity === 'critical' ? '🔴' : 
                              issue.severity === 'high' ? '🟠' : 
                              issue.severity === 'medium' ? '🟡' : '🔵';
          console.log(`       ${severityIcon} ${issue.severity.toUpperCase()}: ${issue.message}`);
        });
      }
      
      if (result.suggestions.length > 0) {
        console.log(`     Suggestions: ${result.suggestions.length}`);
        result.suggestions.forEach(suggestion => {
          console.log(`       💡 ${suggestion.message}`);
        });
      }
    });

    // Show metrics summary
    console.log('\n📈 Quality Metrics Summary:');
    const avgComplexity = analysis.files.reduce((sum, f) => sum + f.metrics.complexity, 0) / analysis.files.length;
    const avgMaintainability = analysis.files.reduce((sum, f) => sum + f.metrics.maintainability, 0) / analysis.files.length;
    const avgReadability = analysis.files.reduce((sum, f) => sum + f.metrics.readability, 0) / analysis.files.length;
    
    console.log(`  Average Complexity: ${avgComplexity.toFixed(1)}`);
    console.log(`  Average Maintainability: ${avgMaintainability.toFixed(1)}/100`);
    console.log(`  Average Readability: ${avgReadability.toFixed(1)}/100`);

    console.log('\n✅ Core analysis completed successfully!');
    
  } catch (error) {
    console.error('❌ Core analysis failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testCoreAnalyzer();
