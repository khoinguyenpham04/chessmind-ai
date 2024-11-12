export function cleanAnalysisText(text: string): string {
  // Remove markdown syntax
  return text
    .replace(/\*\*/g, '') // Remove bold syntax
    .replace(/\n+/g, ' ') // Replace multiple newlines with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
} 