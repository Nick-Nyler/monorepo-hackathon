import * as path from 'path';

export function detectLanguage(filePath: string, content: string): string {
  const extension = path.extname(filePath).toLowerCase();
  
  // Map file extensions to languages
  const languageMap: Record<string, string> = {
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.json': 'json',
    '.md': 'markdown',
    '.html': 'html',
    '.css': 'css',
    '.scss': 'scss',
    '.sass': 'sass',
    '.less': 'less',
    '.py': 'python',
    '.java': 'java',
    '.cpp': 'cpp',
    '.c': 'c',
    '.go': 'go',
    '.rs': 'rust',
    '.php': 'php',
    '.rb': 'ruby'
  };
  
  if (languageMap[extension]) {
    return languageMap[extension];
  }
  
  // Try to detect by content for common cases
  if (content.includes('function') || content.includes('const') || content.includes('let')) {
    return 'javascript';
  }
  
  if (content.includes('interface') || content.includes('type') || content.includes('enum')) {
    return 'typescript';
  }
  
  if (content.includes('import') || content.includes('export')) {
    return 'javascript';
  }
  
  return 'text';
}

export function isTextFile(content: string): boolean {
  // Check if content contains null bytes (binary files)
  if (content.includes('\0')) {
    return false;
  }
  
  // Check if content is mostly printable characters
  const printableChars = content.replace(/[\x00-\x1F\x7F-\x9F]/g, '').length;
  const totalChars = content.length;
  
  // If more than 90% are printable, consider it a text file
  return (printableChars / totalChars) > 0.9;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  return `${(ms / 60000).toFixed(2)}m`;
}

export function getRelativePath(basePath: string, filePath: string): string {
  return path.relative(basePath, filePath);
}

export function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export function createProgressBar(current: number, total: number, width: number = 30): string {
  const progress = Math.round((current / total) * width);
  const bar = '█'.repeat(progress) + '░'.repeat(width - progress);
  const percentage = Math.round((current / total) * 100);
  return `[${bar}] ${percentage}% (${current}/${total})`;
}
