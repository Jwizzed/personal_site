---
title: "AI อ่านเอกสารยาวแล้วลืม? Context Drift คืออะไร"
description: "เจาะลึกปัญหา Long-Context Drift GPT-4o จาก 99.3% เหลือ 69.7% พร้อมทางออกด้วย Gemma 4 MoE และ Local-First Pipeline"
publishDate: "15 May 2026"
tags: ["ai-benchmark", "long-context", "gemma-4", "attention-mechanism", "local-ai"]
wordCount: 1250
---

**รู้ไหมครับว่า GPT-4o แม่นยำ 99.3% ตอนเอกสารสั้น แต่พอขยายเป็น 32,000 ตัวอักษร เหลือแค่ 69.7%?** นี่ไม่ใช่ทฤษฎีนะครับ แต่ถ้า AI อ่านสัญญาหรืองบการเงินของคุณผิดช่วงท้าย คุณอาจเสียหายหลักล้านได้ แถมยังเชื่อมั่นผิดๆ ว่าระบบอ่านถูกต้อง

ทีมวิจัย Adobe รันการทดสอบโดยเอาคำสำคัญออกจากเอกสารทั้งหมด แล้วบังคับให้ AI หาข้อมูลจากตรรกะแบบที่คนกฎหมายใช้จริงๆ ผลคือ **10 จาก 12 ตัวระบบ ตกต่ำกว่า 50%** ที่ขนาดเอกสาร 32,000 ตัวอักษร

ในบทความนี้ เราจะมาวิเคราะห์ว่าทำไม AI ถึง "ลืม" เอกสารยาว และเสนอแนวทางแก้ไขด้วย **Gemma 4 Mixture of Experts**

---

## 📊 ตัวเลขที่ตกใจ: ความแม่นยำดิ่งเหว

| โมเดล | @ 1,000 ตัวอักษร | @ 32,000 ตัวอักษร | ความสูญเสีย |
|-------|------------------|-------------------|------------|
| GPT-4o | 99.3% | 69.7% | -29.6% |
| Llama 3.3 70B | 97.3% | 42.7% | -54.6% |
| 10/12 โมเดล | > 90% | < 50% | - |

## 🔬 ทำไม AI ถึง "ลืม" เอกสารยาว?

### 1. Attention Head Saturation: สมอง AI ล้า

**Attention Head Saturation (การอิ่มตัวของหน่วยความสนใจ):** เมื่อเอกสารยาว ระบบ Attention หรือการจัดสรรความสนใจ รับไม่ไหว จนเปลี่ยนเป็นโหมดอ่านรีบ เหมือนคนอ่านสรุป แล้วหันไปพึ่งสัญชาตญาณเดิมแทนข้อมูลจริงในเอกสาร

### 2. Softmax Dilution: คะแนนความสนใจถูกแบ่ง

สมการคณิตศาสตร์ภายในบังคับให้คะแนนความสนใจรวมกันเป็น 1 พอตัวอักษรเยอะ แต่ละตัวได้รับความสนใจน้อยลง ทำให้ข้อมูลสำคัญกลางเอกสารถูกมองข้าม

### 3. Attention Sinks: ตัวแรกดูดความสนใจไปหมด

ตัวอักษรแรกๆ กลายเป็นที่รวมคะแนน ดูดความสนใจไปทั้งหมดแม้ไม่เกี่ยวข้อง ทำให้ข้อมูลสำคัญกลางเอกสารถูกมองข้าม

### 4. Context Window Poisoning: ข้อมูลในหน่วยความจำถูกวางยา

ถ้าเอกสารสัญญาหรือข้อมูลลูกค้าถูกส่งขึ้นระบบนอก แล้วมีคำสั่งซ่อนในข้อมูลแนบเอกสาร ระบบอาจทำตามโดยไม่รู้ตัวแล้วพังเงียบๆ ด้วยความมั่นใจเต็มร้อย

## 🔧 ทางออก: Gemma 4 Mixture of Experts

**Gemma 4** ใช้สถาปัตยกรรม **Mixture of Experts (MoE / สถาปัตยกรรมผสมผู้เชี่ยวชาญ)** เปิดใช้งานแค่ 3.8 พันล้านตัว จากทั้งหมด 26 พันล้านตัว ต่อหนึ่ง Token แต่ได้ผลลัพธ์ใกล้เคียงโมเดลเต็มขนาด 31B โดยใช้ทรัพยากรน้อยกว่าถึง 8 เท่า

| สถาปัตยกรรม | พารามิเตอร์ทั้งหมด | ใช้งานจริง/Token | ประสิทธิภาพ |
|-----------|------------------|----------------|------------|
| Dense Model | 31B | 31B | 100% |
| Gemma 4 MoE | 26B | 3.8B | 97% |
| ประหยัด | - | - | 8x Compute |

แต่สิ่งที่สำคัญกว่าคือความปลอดภัยข้อมูลครับ แนวทางมาตรฐานคือการย้ายมาใช้ระบบ Open Source ที่ติดตั้งในเครื่องเอง เพื่อให้ข้อมูลอยู่บนเครื่องเรา 100% นี่คือการสร้าง **Technical Sovereignty (อธิปไตยทางเทคโนโลยี)**

---

> 🎯 **ข้อคิดทิ้งท้าย:** ถ้าคุณกำลังใช้ AI อ่านเอกสารยาวๆ อยู่ อย่าเชื่อตัวเลขบนกล่องครับ Context Window ไม่ใช่ Context Accuracy เสมอไป

---

## 🔗 อ่านเพิ่มเติม / ร่วมสนทนา

- [Discuss on LinkedIn](https://www.linkedin.com/in/krittinsetdhavanich/) — มาคุยเรื่องระบบอ่านเอกสารยาว
- [View on GitHub](https://github.com/krittin-nt) — ดูโค้ดและตัวอย่าง Local-First Pipeline

## 📚 อ้างอิง

1. Digital Alps — [NoLiMa Reveals LLM Performance Drops](https://digialps.com/nolima-reveals-llm-performance-drops-beyond-1k-contexts/)
2. Adobe Research — [NoLiMa Benchmark](https://github.com/adobe-research/NoLiMa)
3. OpenReview — [NoLiMa Paper](https://openreview.net/forum?id=0OshX1hiSa)
4. Diffray AI — [Context Dilution](https://diffray.ai/blog/context-dilution/)
5. My Next Developer — [Gemma 4 vs Llama 4](https://mynextdeveloper.com/blogs/gemma-4-vs-llama-4-which-open-model-actually-wins-in-2026/)
6. Knostic AI — [Context Window Poisoning](https://www.knostic.ai/blog/context-window-poisoning-coding-assistants/)
