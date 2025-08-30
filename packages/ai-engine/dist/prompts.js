export function generateAnalysisPrompt(code, context) {
    return `Please analyze the following ${context.language} code for quality, security, performance, and maintainability issues.

Context:
- Language: ${context.language}
- File: ${context.filePath || 'Unknown'}
- Project Type: ${context.projectType || 'General'}
- Framework: ${context.framework || 'None'}

Code:
\`\`\`${context.language}
${code}
\`\`\`

Please provide your analysis in the following format:

Score: [0-100 score]
Issues: [List any issues found]
Suggestion: [Provide improvement suggestions]
Explanation: [Brief explanation of your analysis]

Focus on:
1. Code quality and best practices
2. Potential security vulnerabilities
3. Performance optimizations
4. Maintainability improvements
5. Readability enhancements

${context.customInstructions ? `Additional Instructions: ${context.customInstructions}` : ''}`;
}
export function generateSuggestionPrompt(code, issue) {
    return `Please provide a specific, actionable suggestion to fix the following issue in this code:

Issue: ${issue}

Code:
\`\`\`
${code}
\`\`\`

Please provide:
1. A clear explanation of the problem
2. A specific code example showing the fix
3. Any additional considerations or best practices to follow

Make your suggestion practical and easy to implement.`;
}
export function generateExplanationPrompt(code) {
    return `Please explain the following code in a clear, concise manner:

\`\`\`
${code}
\`\`\`

Please provide:
1. A high-level overview of what the code does
2. Key concepts and patterns used
3. Any important implementation details
4. Potential use cases or scenarios

Make your explanation accessible to developers of varying skill levels.`;
}
export function generateRefactoringPrompt(code, context) {
    return `Please suggest refactoring improvements for the following ${context.language} code:

\`\`\`${context.language}
${code}
\`\`\`

Context:
- Language: ${context.language}
- File: ${context.filePath || 'Unknown'}

Please provide:
1. Specific refactoring suggestions
2. Code examples showing the improvements
3. Benefits of each refactoring
4. Any potential risks or considerations

Focus on improving:
- Code readability
- Maintainability
- Performance
- Testability
- Adherence to best practices`;
}
export function generateDocumentationPrompt(code, context) {
    return `Please generate comprehensive documentation for the following ${context.language} code:

\`\`\`${context.language}
${code}
\`\`\`

Context:
- Language: ${context.language}
- File: ${context.filePath || 'Unknown'}

Please provide:
1. Function/class documentation with JSDoc format
2. Parameter descriptions and types
3. Return value descriptions
4. Usage examples
5. Any important notes or warnings

Make the documentation clear, complete, and follow standard documentation conventions for ${context.language}.`;
}
//# sourceMappingURL=prompts.js.map