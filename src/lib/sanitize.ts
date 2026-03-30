const HTML_TAG_REGEX = /<[^>]*>?/gm;
const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

export function stripHtml(input: string): string {
  return input.replace(SCRIPT_REGEX, "").replace(HTML_TAG_REGEX, "").trim();
}

export function sanitizeText(input: string): string {
  return stripHtml(input).replace(/\s+/g, " ").trim();
}

export function sanitizeMultiline(input: string): string {
  return stripHtml(input).replace(/\r/g, "").trim();
}
