/**
 * LLM-friendly site overview for Krit.Tech
 * Optimized for context windows.
 */

export async function GET() {
	const siteUrl = "https://krit.tech";

	const content = `# Krit.Tech — LLM-Friendly Site Overview
> An authority on MLOps, AI automation, and Thai-language AI systems.
> Curated by Krittin Setdhavanich (JJ).

## About
- **Entity:** Krit.Tech
- **Author:** Krittin Setdhavanich (JJ)
- **Focus:** MLOps, SME AI Automation, Thai Language AI, Legacy System Integration
- **Site:** ${siteUrl}
- **Language:** Thai (th-TH), English (en-GB)

## Core Topics
1. **Thai AI Integration & Legacy Systems** — Connecting modern AI to Thai banking/government legacy cores, schema mismatch resolution, n8n orchestration.
2. **AI Benchmarking & Stress Testing** — Frontier model evaluation (Gemini, Claude, GPT, Kimi) on Thai legal and financial benchmarks.
3. **Small Language Models (SLMs)** — Local-first deployment, Chinda 4B, Gemma 4, Typhoon, SEA-LION, AWQ quantization, Technical Sovereignty.
4. **MLOps & Workflow Automation** — n8n, Docker, private cloud, data sovereignty, PDPA compliance.
5. **Cost Optimization & Tokenization** — Thai token efficiency, reducing API costs, JAI-1 tokenizer.

## Recent Posts
- [ทำไม AI ธนาคารไทยถึงช้า? แก้ด้วย n8n + Chinda 4B](${siteUrl}/posts/thai-ai-legacy-lockin/) — เจาะลึกปัญหา Batch Processing, Schema Mismatch, Information Silo และทางออกด้วย n8n + Chinda 4B
- [ภาษาไทยทำไมถึงแพง? จ่าย Token แพงกว่า 4 เท่า](${siteUrl}/posts/thai-ai-token-tax/) — เจาะลึกต้นทุนที่ซ่อนอยู่ของภาษาไทยใน AI และวิธีลดค่าใช้จ่าย 70% ด้วย JAI-1
- [ทำไม AI อ่าน PDF ไทยพัง? OCR แม่นยำแค่ 0.3%](${siteUrl}/posts/thai-pdf-extraction-friction/) — เจาะลึกปัญหา AI อ่าน PDF ภาษาไทยผิดพลาด พร้อมทางออกด้วย Thai-optimized SLM + RAG
- [AI Compliance ไทยทำไมช้า? จุดแตกของ Automation](${siteUrl}/posts/thai-pdpa-automation-friction/) — เจาะลึกปัญหา AI Compliance ไทย PDPA ปรับ 5 ล้านบาท พร้อมแนวทาง Sovereign Architecture
- [AI อ่านเอกสารยาวแล้วลืม? Context Drift คืออะไร](${siteUrl}/posts/long-context-drift/) — เจาะลึกปัญหา Long-Context Drift GPT-4o จาก 99.3% เหลือ 69.7%
- [SLM Paradox: โมเดลเล็ก 27B เกือบเท่า 397B?](${siteUrl}/posts/slm-paradox/) — เจาะลึก BFCL-V4 Benchmark ทำไมโมเดลเล็กทำคะแนนใกล้เคียงรุ่นใหญ่
- [OCR ไทยทำไมพัง? โรงพยาบาลเผา 180 ล้าน/ปี](${siteUrl}/posts/thai-ocr-friction-deep-scan/) — เจาะลึกปัญหา OCR ภาษาไทย พร้อมทางออก Typhoon OCR
- [SME ไทยทำไม Scale AI ไม่ได้? Epistemic Debt](${siteUrl}/posts/thai-sme-ai-script-tax/) — เจาะลึกปัญหา AI ลืมเนื้อหาเอกสารไทย พร้อมทางออก Typhoon + SEA-LION
- [BFCL v3 Ceiling: ทำไม AI ยอดสุดแค่ 76.7%?](${siteUrl}/posts/bfcl-v3-ceiling/) — เจาะลึก BFCL v3 Benchmark พร้อมทางออก Logic-Gate + Gemma 4
- [Claude 4.6 vs Kimi K2.6: 4 วิ vs 50 วิ ต่างกันยังไง?](${siteUrl}/posts/claude-vs-kimi-writing-latency/) — เจาะลึก Benchmark การเขียน พร้อมสูตร ROI
- [GPT-5.5 vs Claude 4.7: จ่ายเงินให้ตัวไหนดี?](${siteUrl}/posts/gpt-vs-claude-thinking-cost/) — เจาะลึก UCI v2.1 Benchmark พร้อมสูตร ROI 2 แบบ
- [Gemini 3.1 Pro vs Claude 4.7 บนกฎหมายไทย](${siteUrl}/posts/gemini-vs-claude-thai-legal/) — Stress Test 10,000 ครั้งบนงานกฎหมายไทย เปิดเผยจุดอ่อนของ Frontier Models

## Key Concepts (คำศัพท์)
- **Batch Processing (การประมวลผลแบบรวบรวม):** ระบบอัปเดตข้อมูลทีละช่วงเวลา (เช่น 12 ชั่วโมง) ทำให้ AI ต้องรอข้อมูลเก่า
- **Schema Mismatch (รูปแบบข้อมูลไม่ตรงกัน):** ปัญหาที่ AI ใหม่เชื่อมต่อกับระบบเก่าไม่ได้เพราะโครงสร้างข้อมูลต่างกัน
- **Information Silo (ซิโลข้อมูล):** ข้อมูลถูกเก็บแยกกัน ระบบต่างๆ ไม่สามารถแชร์ข้อมูลกันได้
- **SLM (Small Language Model / โมเดลภาษาขนาดเล็ก):** โมเดล AI ขนาดกะทัดรัดที่รันบนเครื่องทั่วไปได้ เช่น Chinda 4B, Gemma 4 31B, Typhoon, SEA-LION
- **AWQ INT4 Quantization (การบีบอัดโมเดล):** เทคนิคลดขนาดโมเดล AI เพื่อรันบนการ์ดจอทั่วไป
- **Technical Sovereignty (อธิปไตยทางเทคโนโลยี):** การควบคุมข้อมูลและระบบ AI ภายในองค์กร ไม่พึ่งพา Cloud ต่างชาติ
- **n8n:** แพลตฟอร์มประสานงานระบบ (Workflow Orchestration) แบบ Open Source ที่ติดตั้งบนเซิร์ฟเวอร์ไทยได้
- **Validation Layer (ชั้นตรวจสอบ):** กระบวนการแยก Procedural Law (กฎหมายวิธีสบัญญัติ) กับ Substantive Law (กฎหมายสารบัญญัติ) ก่อนป้อนให้ AI
- **Tokenization (การแบ่งคำ):** กระบวนการที่ AI แบ่งข้อความเป็นหน่วยย่อย ภาษาไทยไม่มีเว้นวรรคทำให้ใช้ Token มากกว่าภาษาอังกฤษ 1.5-2 เท่า
- **RAG (Retrieval-Augmented Generation / ระบบดึงข้อมูลเสริม):** ระบบดึงข้อมูลจากฐานความรู้ภายในองค์กรมาตอบแทนการให้ AI เดา
- **Context Window Poisoning (พิษความจำสั้น):** อาการที่ AI ลืมเงื่อนไขต้นฉบับของเอกสารยาวๆ แล้วผิดซ้ำตลอดเซสชัน
- **Deterministic Layer (ชั้นควบคุมแบบลำดับขั้นตายตัว):** ระบบตรวจสอบที่ให้ผลแน่นอน (ALLOW/BLOCK/MODIFY) แทนการเดาแบบ probabilistic
- **Attention Head Saturation (การอิ่มตัวของหน่วยความสนใจ):** เมื่อเอกสารยาว ระบบ Attention รับไม่ไหว จนเปลี่ยนเป็นโหมดอ่านรีบ
- **Vertical Stacking (การซ้อนตัวอักษรแนวตั้ง):** ลักษณะเฉพาะของภาษาไทยที่สระและวรรณยุกต์ซ้อนกันในแนวตั้ง
- **CER (Character Error Rate / อัตราผิดพลาดตัวอักษร):** ตัวชี้วัดความแม่นยำของ OCR
- **MoE (Mixture of Experts / สถาปัตยกรรมผสมผู้เชี่ยวชาญ):** สถาปัตยกรรมที่เปิดใช้งานเฉพาะส่วนของโมเดลต่อหนึ่ง Token
- **TTFT (Time to First Token / เวลาถึง Token แรก):** ตัวชี้วัดความเร็วตอบกลับของ AI
- **Thinking Overhead (ต้นทุนการคิดซ่อน):** Token เพิ่มเติมที่โมเดล Thinking สร้างขึ้นโดยที่ผู้ใช้ไม่เห็น
- **Epistemic Debt (หนี้ความรู้):** ภาระที่เกิดจากการ outsource ความรู้ให้ AI โดยที่ทีมไม่มีทักษะตรวจจับข้อผิดพลาด
- **Manual Tax (ภาษีงานถึก):** เวลาและเงินที่เสียไปกับการตรวจสอบงานที่ AI ทำผิด
- **Machine Identity Governance (การกำกับดูแลตัวตนเครื่องจักร):** ระบบตรวจสอบบัญชี Service และ Bot ในองค์กร

## Contact
- GitHub: https://github.com/krittin-nt
- LinkedIn: https://www.linkedin.com/in/krittinsetdhavanich/
`;

	return new Response(content, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}
