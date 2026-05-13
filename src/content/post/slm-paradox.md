---
title: "SLM Paradox: โมเดลเล็ก 27B เกือบเท่า 397B?"
description: "เจาะลึก BFCL-V4 Benchmark ทำไมโมเดล 27B ทำคะแนน 68.5% ใกล้เคียงรุ่น 397B ที่ 72.9% พร้องทางออก Deterministic Layer"
publishDate: "15 May 2026"
tags: ["ai-benchmark", "slm", "bfcl-v4", "qwen", "deterministic-layer", "technical-sovereignty"]
wordCount: 1150
---

**รู้ไหมครับว่าโมเดล 27B พารามิเตอร์ทำคะแนน Tool Calling ได้ 68.5% ใกล้เคียงรุ่น 397B ที่ 72.9%?** แต่ราคาถูกกว่าเกือบครึ่ง นี่คือ **SLM Paradox (ปริศนาโมเดลภาษาขนาดเล็ก)** ที่หลายคนยังไม่รู้ตัวครับ

ทีมวิจัยรันการทดสอบ BFCL-V4 พบว่างานที่มีลำดับขั้นตายตัว เช่น สร้างโครงสร้างโค้ดหรือเช็กรูปแบบการเชื่อมต่อ โมเดลเล็กทำได้เกือบเท่ารุ่นใหญ่ แต่พอเป็นงานที่ต้องใช้ความรู้กว้าง แม้โมเดลใหญ่สุดอย่าง 397B ก็ยังมีอาการหลอนสูงถึง 88%

ในบทความนี้ เราจะมาวิเคราะห์ว่าทำไมพารามิเตอร์มากไม่ใช่คำตอบเสมอไป และเสนอแนวทาง **Deterministic Layer**

---

## 📊 BFCL-V4: โมเดลเล็ก vs โมเดลใหญ่

| โมเดล | พารามิเตอร์ | BFCL-V4 Score | ราคา Input/1M | ราคา Output/1M |
|-------|-----------|--------------|--------------|---------------|
| Qwen3.5-27B | 27B | 68.5% | $0.30 | $2.34 |
| Qwen3.5-122B-A10B | 122B | 72.2% | $0.35 | $2.80 |
| Qwen3.5-397B-A17B | 397B | 72.9% | $0.39 | $3.20 |

ต่างกันแค่ 4.4% แต่ราคาต่างกันเกือบเท่าตัว!

## 🔍 ทำไมโมเดลใหญ่ถึง "หลอน" 88%?

### 1. State Saturation: อาการเน่าภายในหน่วยความจำ

สถาปัตยกรรมแบบ **Subquadratic (รูปแบบย่อยกำลังสอง)** ที่โมเดลใหญ่ใช้ บีบอัดข้อมูลเข้าช่องเก็บขนาดตายตัวเพื่อประหยัดหน่วยความจำ ปัญหาคืออัตราการเรียนรู้ถูกบังคับให้เท่ากันทุกมิติ พอเอกสารยาวขึ้น ข้อมูลเก่าถูกทับซ้อนแบบไม่เลือกหน้า เกิด **State Saturation (อาการเน่าภายในหน่วยความจำ)**

### 2. Hardware Bug: TPS ตก 22%

การเอาไปรันบนเครื่องท้องถิ่นแบบ RTX PRO 6000 ถ้าเปิดการทำนายหลายตัวอักษรพร้อมกัน ผ่าน CUTLASS มีบั๊กที่ทำความเร็วตก 22% จาก 50.5 TPS เหลือแค่ 39.6 TPS

| โหมด | TPS | ลดลง |
|-----|-----|------|
| Standard | 50.5 | - |
| Multi-Token Prediction | 39.6 | -22% |
| Hardcoded StageCount=2 | 4.8 | -90% |

## 🔧 ทางออก: Deterministic Layer

แนวทางมาตรฐานคือการใช้ **Deterministic Layer (ชั้นควบคุมแบบลำดับขั้นตายตัว)** เพื่อกำหนดขอบเขตการเข้าถึงข้อมูลก่อนถึงตัวโมเดล โดยใช้ **Model Context Protocol (MCP)** เป็นกรอบ Logic-Gate ที่บังคับ JSON Schema และ Role-Based Access Control

อีกท่านึงคือย้ายไปใช้โมเดลขนาดเล็กที่ประมวลผลบนเครื่องเอง แทนการพึ่งโมเดลใหญ่ที่มีอาการหน่วยความจำเต็ม วิธีนี้ช่วยลดความเปราะบางและให้เราคุมโครงสร้างพื้นฐานเองได้ 100%

---

> 🎯 **ข้อคิดทิ้งท้าย:** ถ้าคุณกำลังเลือกโมเดลสำหรับใช้จริง อย่าดูแค่ตัวเลขทดสอบตัวเดียวครับ โมเดลเล็กประหยัดค่าตัวอักษร แต่ถ้าเผลอใช้ผิดลักษณะงาน ต้นทุนซ่อนมหาศาลครับ

---

## 🔗 อ่านเพิ่มเติม / ร่วมสนทนา

- [Discuss on LinkedIn](https://www.linkedin.com/in/krittinsetdhavanich/) — มาคุยเรื่องเลือกโมเดลให้เหมาะกับงาน
- [View on GitHub](https://github.com/krittin-nt) — ดูตัวอย่าง Deterministic Layer

## 📚 อ้างอิง

1. LLM Stats — [BFCL-V4 Benchmark](https://llm-stats.com/benchmarks/bfcl-v4)
2. Artificial Analysis — [Qwen3.5 397B Analysis](https://artificialanalysis.ai/articles/qwen3-5-397b-a17b-everything-you-need-to-know)
3. arXiv — [Gated DeltaNet Architecture](https://arxiv.org/html/2603.05931v1)
4. Reddit LocalLLaMA — [MOE Backend Benchmark](https://www.reddit.com/r/LocalLLaMA/comments/1rrfqlu/i_spent_8_hours_benchmarking_every_moe_backend/)
5. Towards AI — [Native Multimodality Enterprise Standard](https://pub.towardsai.net/beyond-the-chatbox-why-native-multimodality-is-the-new-enterprise-standard-a6736aac47a6)
