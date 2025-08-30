#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { analyzeCommand } from './commands/analyze.js';
import { reportCommand } from './commands/report.js';
import { configCommand } from './commands/config.js';
const version = '1.0.0';

const program = new Command();

program
  .name('code-analyzer')
  .description('AI-Powered Code Review & Quality Analyzer')
  .version(version)
  .option('-v, --verbose', 'Enable verbose output')
  .option('--no-color', 'Disable colored output');

// Analyze command
program
  .command('analyze <path>')
  .description('Analyze a project or file for code quality')
  .option('-o, --output <format>', 'Output format (json, text, html)', 'text')
  .option('--ai', 'Enable AI-powered analysis')
  .option('--model <model>', 'AI model to use', 'gpt-4')
  .option('--rules <rules>', 'Custom rules file path')
  .option('--exclude <patterns>', 'Exclude patterns (comma-separated)')
  .action(analyzeCommand);

// Report command
program
  .command('report <path>')
  .description('Generate a detailed report from analysis results')
  .option('-f, --format <format>', 'Report format (html, pdf, markdown)', 'html')
  .option('-o, --output <path>', 'Output file path')
  .action(reportCommand);

// Config command
program
  .command('config')
  .description('Configure the analyzer settings')
  .option('--set <key> <value>', 'Set a configuration value')
  .option('--get <key>', 'Get a configuration value')
  .option('--list', 'List all configuration values')
  .action(configCommand);

// Global error handler
program.exitOverride();

try {
  program.parse();
} catch (err) {
  if (err instanceof Error) {
    console.error(chalk.red('Error:'), err.message);
  } else {
    console.error(chalk.red('An unexpected error occurred'));
  }
  process.exit(1);
}
