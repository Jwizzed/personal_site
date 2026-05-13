/**
 * Calculate approximate word count for Thai and mixed-language text
 * Thai script doesn't use spaces, so we count characters as a proxy
 * Latin words are counted by spaces
 */
export function calculateWordCount(text: string): number {
	if (!text) return 0;

	// Remove frontmatter
	const cleanText = text.replace(/^---[\s\S]*?---/, "");

	// Count Thai characters (each character ≈ 1 word unit in Thai NLP)
	const thaiChars = (cleanText.match(/[\u0E00-\u0E7F]/g) || []).length;

	// Count Latin words by spaces
	const latinText = cleanText.replace(/[\u0E00-\u0E7F]/g, " ");
	const latinWords = latinText.trim().split(/\s+/).filter(w => w.length > 0).length;

	// Thai character count is roughly equivalent to word count for tokenization purposes
	// We divide by 3 as a heuristic since Thai words average 3-4 characters
	const thaiWords = Math.ceil(thaiChars / 3);

	return thaiWords + latinWords;
}
