---
title: "OCR ไทยทำไมพัง? โรงพยาบาลเผา 180 ล้าน/ปี"
description: "เจาะลึกปัญหา OCR ภาษาไทย Tesseract >20% Error ลายมือแพทย์ พร้อมทางออก Typhoon OCR ลดผิดพลาดเหลือ <5%"
publishDate: "15 May 2026"
tags: ["thai-ai", "ocr", "typhoon", "healthcare-ai", "handwriting", "local-ai"]
wordCount: 1200
---

**เคยสงสัยไหมครับว่าทำไมทีมคุณยังต้องนั่งพิมพ์เอกสารด้วยมือ ทั้งๆ ที่มี AI?** ที่เห็นกันจริงคือการประมวลผลด้วยมือเสียค่าใช้จ่ายถึง **350 บาทต่อฉบับ** และใช้เวลานาน **12-18 วัน** ครับ

ปัญหาไม่ใช่ที่เราไม่มีเทคโนโลยี แต่เป็นเพราะ OCR ทั่วไปถูกฝึกมากับภาษาอังกฤษล้วนๆ พอเจอเอกสารไทยที่เขียนด้วยมือ ซึ่งมีสระซ้อนแนวตั้งหรือ **Vertical Stacking (การซ้อนตัวอักษรแนวตั้ง)** และไม่มีช่องว่างระหว่างคำ ผลที่ตามมาคือเครื่องอ่านไม่ออกเลยครับ

ในบทความนี้ เราจะมาวิเคราะห์ว่าทำไม OCR ไทยถึงพัง และเสนอแนวทางแก้ไขด้วย **Typhoon OCR**

---

## 📊 ตัวเลขที่น่าตกใจ: 180 ล้านบาทต่อปี

| ตัวชี้วัด | ค่าปัจจุบัน | ผลกระทบ |
|---------|----------|--------|
| ค่าใช้จ่าย/ฉบับ (Manual) | 350 บาท | เผาเงินซ้ำซาก |
| เวลาประมวลผล/ฉบับ | 12-18 วัน | ช้าเกินไปสำหรับธุรกิจ |
| เวลาทีมเสียไปกับ Manual Entry | 60-70% | ทำงานถีบหลังเต่า |
| โรงพยาบาลเผาเงินต่อปี | 180 ล้านบาท | จ้างคนพิมพ์ประวัติคนไข้ |
| Tesseract CER ลายมือแพทย์ | > 20% | อ่านผิดระนาว |
| Frontier VLM CER | 8-12% | ยังห่างจากมาตรฐาน |
| มาตรฐานอุตสาหกรรม | < 1% CER | ที่ต้องการจริง |

## 🔍 ทำไม OCR ถึงอ่านลายมือไทยไม่ออก?

### 1. Training Data Bias

OCR รุ่นเก่าอย่าง Tesseract ถูกฝึกมากับเอกสารพิมพ์ดีดภาษาอังกฤษ ไม่ใช่ลายมือแพทย์ไทยที่เขียนรีบๆ บนกระดาษรักษาพยาบาล ผลคือ **CER (Character Error Rate / อัตราผิดพลาดตัวอักษร)** สูงกว่า 20%

### 2. Vertical Stacking ภาษาไทย

สระและวรรณยุกต์ภาษาไทยซ้อนกันในแนวตั้ง ทำให้ระบบที่ออกแบบมาสำหรับภาษาอังกฤษ (แนวนอนล้วน) อ่านผิดหมด

### 3. Handwriting Variability

ลายมือแพทย์มีความแปรปรวนสูง บวกกับคำย่อทางการแพทย์ที่ OCR ไม่รู้จัก ทำให้ความแม่นยำตกต่ำมาก

## 🔧 ทางออก: Typhoon OCR + Local RAG

**Typhoon OCR** คือโมเดล Open-source ของไทยเอง ที่ลดอัตราผิดพลาดตัวอักษรเหลือต่ำกว่า **5%** และลดต้นทุนคำนวณลงถึง **45 เท่า** เมื่อเทียบกับระบบ Cloud ขนาดใหญ่

| โมเดล | CER (ลายมือไทย) | WER | ต้นทุน |
|-------|----------------|-----|--------|
| Tesseract 5.x | > 20% | สูง | ต่ำ |
| Frontier VLM | 8-12% | ปานกลาง | สูงมาก |
| Typhoon OCR 1.5 | < 5% | < 10% | ปานกลาง (Edge/Local) |
| มาตรฐานอุตสาหกรรม | < 1% | < 2% | - |

วางระบบดึงข้อมูลจากฐานความรู้เฉพาะทาง หรือ **RAG (Retrieval-Augmented Generation / ระบบดึงข้อมูลเสริม)** ที่ทำงานบนเครื่องในองค์กร ให้ AI ทำงานซ้ำ แล้วคนเช็กเฉพาะข้อยกเว้น

---

> 🎯 **ข้อคิดทิ้งท้าย:** ถ้าคุณไม่อยากให้ทีมเสียเวลาเป็นวันๆ กับการพิมพ์เอกสารซ้ำๆ แก้ผิดแก้ถูก ถึงเวลาต้องคิดใหม่แล้วเปลี่ยนมาวางระบบแทนครับ

---

## 🔗 อ่านเพิ่มเติม / ร่วมสนทนา

- [Discuss on LinkedIn](https://www.linkedin.com/in/krittinsetdhavanich/) — มาคุยเรื่อง OCR ไทยใน Healthcare
- [View on GitHub](https://github.com/krittin-nt) — ดู Pipeline ตัวอย่างสำหรับเอกสารลายมือ

## 📚 อ้างอิง

1. LUT — [Invoice Processing Cost Analysis](https://lutpub.lut.fi/bitstream/handle/10024/171236/Mastersthesis_Bhaskar_Harshith.pdf)
2. Infrrd — [Invoice Parsing Automation](https://www.infrrd.ai/blog/invoice-parsing-automation)
3. CoverGo — [Insurance IDP OCR to AI](https://covergo.com/blog/insurance-idp-ocr-to-ai/)
4. Dev.to — [OCR Doctor Handwriting 2026](https://dev.to/kaniel_outis/how-well-can-ocr-read-doctor-handwriting-in-2026-54hn)
5. Hugging Face — [Typhoon OCR 1.5](https://huggingface.co/typhoon-ai/typhoon-ocr1.5-2b)
6. Open Typhoon — [ASR OCR Technical Reports](https://opentyphoon.ai/blog/en/technical-reports-asr-ocr)
