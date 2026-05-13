# AGENTS.md — Krit.Tech

> Agent-focused guidance for developing, writing, and optimizing the Krit.Tech Astro blog.
> Human contributors: see README.md for quick start.

---

## 1. Project Overview

- **Site:** https://krit.tech
- **Author:** Krittin Setdhavanich (JJ)
- **Framework:** Astro v6 + Tailwind v4 + Cloudflare Pages (Wrangler)
- **Theme:** Astro Cactus (customized)
- **Language:** Primary Thai (th-TH), Secondary English (en-GB)
- **Focus:** MLOps, AI Automation, Thai-language AI, Legacy System Integration, SME Automation

---

## 2. Architecture

```
src/
├── components/
│   ├── JsonLd.astro          # JSON-LD structured data injection
│   └── BaseHead.astro        # Meta tags, OG, canonical
├── layouts/
│   ├── Base.astro            # Person schema (site-wide)
│   └── BlogPost.astro        # Article schema (per-post)
├── lib/
│   ├── jsonld.ts             # schema-dts type-safe JSON-LD generators
│   └── wordCount.ts          # Thai/Latin word count calculator
├── content/
│   ├── post/                 # Blog posts (.md/.mdx)
│   ├── note/                 # Short notes
│   └── tag/                  # Tag override pages
└── pages/
    └── llms.txt.ts           # LLM-friendly site overview endpoint
```

---

## 3. Generative Engine Optimization (GEO)

### 3.1 Entity Layer (JSON-LD)

Every page MUST have structured data:

- **Base pages** (`Base.astro`): Inject `Person` schema with `sameAs` links to LinkedIn/GitHub.
- **Blog posts** (`BlogPost.astro`): Inject `Article` schema with:
  - `headline` — post title
  - `author` — Krittin Setdhavanich
  - `publisher` — Krit.Tech
  - `datePublished` / `dateModified`
  - `wordCount` — calculated or frontmatter override
  - `inLanguage: "th-TH"`
  - `keywords` — comma-separated tags
  - `image` — OG image URL

Use `src/components/JsonLd.astro` with `type="article"` and pass the data object.

### 3.2 The `llms.txt` Endpoint

`src/pages/llms.txt.ts` serves a condensed, markdown-only overview of the entire site. When adding a new post:

1. Append the post title + URL + 1-line summary to the "Recent Posts" section.
2. If the post introduces new key concepts, add them to the "Key Concepts" section in bilingual format: `**Concept (คำศัพท์):** definition`.

### 3.3 Sitemap & Robots

Already configured via `@astrojs/sitemap` and `astro-robots-txt`.

`robots.txt` explicitly allows:
- `GPTBot`
- `Claude-Web`
- `PerplexityBot`
- `Google-Extended`
- `ChatGPT-User`

Disallows only `/og-image/` for general crawlers.

### 3.4 Cloudflare Edge Caching

`public/_headers` configures Stale-While-Revalidate:
- HTML pages: `max-age=0, stale-while-revalidate=86400`
- Static assets (OG images): `max-age=31536000, immutable`
- RSS / Sitemap / llms.txt: `max-age=3600, stale-while-revalidate=86400`

### 3.5 Technical Performance

- **Tailwind 4.2** utility classes keep CSS bundle microscopic.
- **Astro `<Image />`** component for optimized images.
- **Alt text** must describe the *utility* of the image, not just the visual.
- Target render time <500ms for AI crawler compatibility.

---

## 4. Content Writing Rules (Thai Blog Posts)

### 4.1 TL;DR Block (MANDATORY)

Place a **bold TL;DR paragraph** immediately after frontmatter. AI models prioritize the first 200 tokens for citations.

```markdown
**ทำไมคุณส่งเอกสารกู้เงินแล้วต้องรอ 3-5 วัน?** นี่คือความจริงที่เจ็บปวดของระบบ AI ไทยปี 2026...
```

### 4.2 Question-Based H2 Headings

Use questions that match natural language prompts. This improves match probability in generative answers.

✅ Good:
- `## ทำไม AI ถึง "หลอน" กับระบบเก่า?`
- `## Batch Processing คืออะไร และทำไมถึงช้า?`

❌ Bad:
- `## ปัญหา Batch Processing`
- `## บทนำ`

### 4.3 Data Tables for Metrics

LLMs parse structured tables **40% more accurately** than prose. Always use Markdown tables for:
- Benchmark comparisons
- Latency metrics
- Cost analysis
- Checklists

```markdown
| ตัวชี้วัด | ค่าปัจจุบัน | ผลกระทบ |
|---------|----------|--------|
| Latency | +500-2,000 ms | Agentic Loops ไม่เป็นไปได้ |
```

### 4.4 Bilingual Tagging (Concept Format)

When introducing technical terms, use this format:

```markdown
**Term (คำศัพท์):** definition in Thai
```

Examples:
- `**Batch Processing (การประมวลผลแบบรวบรวม):** ระบบอัปเดตข้อมูลทีละช่วงเวลา`
- `**Schema Mismatch (รูปแบบข้อมูลไม่ตรงกัน):** ปัญหาเชื่อมต่อระบบเก่า`

This bridges Thai context to global English training data.

### 4.5 Clear Section Breaks

Thai script without spaces can confuse older tokenizers. Use:

```markdown
---
```

or visual separators between major sections. Keep paragraphs short (2-4 sentences max).

### 4.6 Canonical & Cross-Posting

If cross-posting to Medium/Facebook/LinkedIn:
1. Ensure the Astro post has `rel="canonical"` (handled by `BaseHead.astro`).
2. The Astro site is the **Original Source of Truth**.

### 4.7 Authority Signals ("Consensus" Loop)

End every post with:

```markdown
---

## 🔗 อ่านเพิ่มเติม / ร่วมสนทนา

- [Discuss on LinkedIn](https://www.linkedin.com/in/krittinsetdhavanich/) — มาคุยเรื่อง...
- [View on GitHub](https://github.com/krittin-nt) — ดูโค้ดและตัวอย่าง...
```

External traffic pointing to specific URLs increases "Authority Score" in generative answers.

### 4.8 Frontmatter Template

```yaml
---
title: "Question-based title in Thai (max 60 chars)"
description: "SEO description 50-160 chars in Thai"
publishDate: "DD MMM YYYY"
tags: ["thai-ai", "legacy-system", "n8n", "concept-in-english"]
wordCount: 1200  # optional override; auto-calculated if omitted
---
```

---

## 5. Workflow: TikTok Script → Thai Blog Post

1. **Receive script** from `/Users/krittinsetdhavanich/Documents/krit.tech/Results/.../script.md`
2. **Extract core message:** Diagnostic hook → System gap → Deep insight → Solution → CTA
3. **Write TL;DR** (first 200 tokens, bold, question-based)
4. **Structure with H2s** using question format
5. **Add data tables** for any metrics mentioned
6. **Tag concepts** in bilingual format
7. **Insert sources** as footnotes/references at bottom
8. **Add authority CTAs** (LinkedIn + GitHub)
9. **Set frontmatter:** title, description, publishDate, tags, wordCount
10. **Verify JSON-LD:** Article schema with wordCount, dateModified, author

---

## 6. Build & Deploy

```bash
# Dev
pnpm dev

# Build + search index
pnpm build && pnpm postbuild

# Deploy (Cloudflare Pages via Wrangler)
wrangler pages deploy dist
```

---

## 7. Dependencies Added for GEO

- `schema-dts` — Type-safe JSON-LD generation
- Custom `src/lib/jsonld.ts` — Person, Article, WebPage schemas
- Custom `src/lib/wordCount.ts` — Thai/Latin mixed text word counting
- Custom `src/components/JsonLd.astro` — Astro component for schema injection
- Custom `src/pages/llms.txt.ts` — LLM context window endpoint
- `public/_headers` — Cloudflare Stale-While-Revalidate caching rules

---

## 8. Key File Checklist for New Posts

- [ ] Post file in `src/content/post/[slug].md`
- [ ] Frontmatter with title, description, publishDate, tags
- [ ] TL;DR paragraph in first 200 tokens
- [ ] Question-based H2 headings
- [ ] Data tables for metrics
- [ ] Bilingual concept tagging
- [ ] LinkedIn + GitHub CTAs at bottom
- [ ] Sources/references cited
- [ ] `llms.txt.ts` updated with post summary
- [ ] Build passes (`pnpm build`)
