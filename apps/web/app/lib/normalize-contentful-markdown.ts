/**
 * Light cleanup for Markdown pasted from Contentful long-text fields.
 * Keeps valid syntax; fixes common editor quirks.
 */
export function normalizeContentfulMarkdown(text: string): string {
  let s = text.replace(/\r\n/g, "\n");

  // Stray "__" on its own line (unclosed bold from Contentful)
  s = s.replace(/^\s*__\s*$/gm, "");

  // Empty blockquote line before a numbered list → end quote, start list
  s = s.replace(/^>\s*\n(?=\d+\.\s)/gm, ">\n\n");

  // Orphan italic wrapper lines: "*\n" or line that is only "*"
  s = s.replace(/^\s*\*\s*$/gm, "");

  // Collapse extra blank lines left after removals
  s = s.replace(/\n{3,}/g, "\n\n");

  return s.trim();
}
