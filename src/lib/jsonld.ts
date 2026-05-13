import type { Graph, Person, Article, WebPage } from "schema-dts";
import { siteConfig } from "@/site.config";

interface PersonSchemaProps {
	url?: string;
	linkedin?: string;
	github?: string;
	jobTitle?: string;
}

export function generatePersonSchema(props: PersonSchemaProps = {}): Graph {
	const { url = siteConfig.url, linkedin, github, jobTitle = "MLOps Engineer & AI Automation Specialist" } = props;

	const person: Person = {
		"@type": "Person",
		"@id": `${url}#person`,
		name: siteConfig.author,
		url: url,
		jobTitle: jobTitle,
		sameAs: [
			...(linkedin ? [linkedin] : []),
			...(github ? [github] : []),
		],
		knowsAbout: [
			"MLOps",
			"AI Automation",
			"Thai Language AI",
			"Small Language Models",
			"n8n Workflow Orchestration",
			"Legacy System Integration",
		],
	};

	return {
		"@context": "https://schema.org",
		"@graph": [person],
	};
}

interface ArticleSchemaProps {
	title: string;
	description: string;
	url: string;
	publishDate: string;
	updatedDate?: string;
	authorName?: string;
	authorUrl?: string;
	wordCount?: number;
	tags?: string[];
	coverImage?: string;
}

export function generateArticleSchema(props: ArticleSchemaProps): Graph {
	const {
		title,
		description,
		url,
		publishDate,
		updatedDate,
		authorName = siteConfig.author,
		authorUrl = siteConfig.url,
		wordCount,
		tags = [],
		coverImage,
	} = props;

	const article: Article = {
		"@type": "Article",
		"@id": `${url}#article`,
		headline: title,
		description: description,
		url: url,
		author: {
			"@type": "Person",
			name: authorName,
			url: authorUrl,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.title,
			url: siteConfig.url,
			logo: {
				"@type": "ImageObject",
				url: new URL("/social-card.png", siteConfig.url).toString(),
			},
		},
		datePublished: publishDate,
		...(updatedDate && { dateModified: updatedDate }),
		...(wordCount && { wordCount: wordCount }),
		inLanguage: "th-TH",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		...(tags.length > 0 && { keywords: tags.join(", ") }),
		...(coverImage && {
			image: {
				"@type": "ImageObject",
				url: new URL(coverImage, siteConfig.url).toString(),
			},
		}),
	};

	return {
		"@context": "https://schema.org",
		"@graph": [article],
	};
}

export function generateWebPageSchema(props: {
	title: string;
	description: string;
	url: string;
}): Graph {
	const { title, description, url } = props;

	const webPage: WebPage = {
		"@type": "WebPage",
		"@id": `${url}#webpage`,
		name: title,
		description: description,
		url: url,
		inLanguage: "th-TH",
		publisher: {
			"@type": "Organization",
			name: siteConfig.title,
			url: siteConfig.url,
		},
	};

	return {
		"@context": "https://schema.org",
		"@graph": [webPage],
	};
}
