# 🚀 Quick Start Guide

Get up and running with the AI-Powered Code Review & Quality Analyzer in minutes!

## Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **pnpm 8+** - Install with `npm install -g pnpm`

## 🏃‍♂️ Quick Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Build All Packages

```bash
pnpm build
```

### 3. Test the Analyzer

```bash
# Run the demo
node scripts/demo.js

# Test with sample project
node scripts/test-analyzer.js
```

### 4. Try the CLI

```bash
# Analyze the sample project
pnpm cli analyze examples/sample-project

# Generate HTML report
pnpm cli analyze examples/sample-project -o html

# Enable AI analysis (requires API key)
pnpm cli analyze examples/sample-project --ai
```

### 5. Start Web Dashboard

```bash
pnpm web-dashboard dev
```

Visit `http://localhost:3000` to see the beautiful web interface!

## 🔑 AI Features Setup

### 1. Get API Keys

- **OpenAI**: [Get API key](https://platform.openai.com/api-keys)
- **Anthropic**: [Get API key](https://console.anthropic.com/)

### 2. Configure Environment

```bash
cp env.example .env
# Edit .env with your API keys
```

### 3. Enable AI Analysis

```bash
pnpm cli analyze ./your-project --ai --model gpt-4
```

## 📁 Project Structure

```
monorepo-hackathon/
├── packages/
│   ├── core/           # Core analysis engine
│   ├── ai-engine/      # AI integration
│   ├── cli/            # Command line interface
│   ├── web-dashboard/  # Web UI
│   └── plugins/        # Plugin system
├── examples/            # Sample projects
├── scripts/             # Utility scripts
└── docs/               # Documentation
```

## 🧪 Sample Projects

The `examples/` directory contains sample projects to test the analyzer:

- **sample-project/**: JavaScript project with intentional issues
- **typescript-project/**: TypeScript project for testing
- **react-project/**: React component analysis

## 🛠️ Development Commands

```bash
# Development mode (watch for changes)
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Type checking
pnpm type-check

# Clean builds
pnpm clean
```

## 📊 What You'll See

### CLI Output
- Project quality score (0-100)
- File-by-file analysis
- Issue detection and suggestions
- Quality metrics breakdown
- Actionable recommendations

### Web Dashboard
- Beautiful charts and visualizations
- Interactive file explorer
- Issue tracking and management
- Historical analysis trends
- Export capabilities

### AI Insights
- Code pattern recognition
- Best practice suggestions
- Security vulnerability detection
- Performance optimization hints
- Automated documentation

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**: Run `pnpm clean && pnpm install && pnpm build`
2. **TypeScript errors**: Run `pnpm type-check` to see issues
3. **AI not working**: Check your `.env` file and API keys
4. **CLI not found**: Ensure you've run `pnpm build`

### Getting Help

- Check the main [README.md](README.md)
- Review error messages in the console
- Ensure all dependencies are installed
- Verify Node.js and pnpm versions

## 🎯 Next Steps

1. **Analyze your own projects** with `pnpm cli analyze ./your-project`
2. **Customize rules** by creating custom rule files
3. **Extend the analyzer** by adding new plugins
4. **Integrate with CI/CD** for automated code quality checks
5. **Build custom reports** using the API

## 🏆 Hackathon Ready!

This project demonstrates:
- ✅ Modern monorepo architecture
- ✅ AI-assisted development tools
- ✅ Professional-grade code quality analysis
- ✅ Beautiful, responsive web interface
- ✅ Comprehensive CLI tooling
- ✅ TypeScript throughout
- ✅ Best practices and patterns

Ready to impress the judges! 🚀
