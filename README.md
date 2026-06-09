# Landing Page ระบบงานสวน (GitHub Pages + PWA)

หน้า launcher สำหรับลงมือถือเป็นแอป (ไอคอนเอง + เปิดเต็มจอ) แล้วกดเข้าเว็บแอป Apps Script
สร้างตามบทเรียนจากระบบ JaideeMarket — แก้ปัญหาไอคอน "G" + ปุ่มติดตั้ง Chrome

## ไฟล์ (อัปขึ้น GitHub repo + เปิด Pages)
- `index.html` — หน้าเปิด: ปุ่มเข้าเว็บแอป (หน่วง 4 วิให้ manifest โหลดทัน) + ปุ่มติดตั้ง Android + คำแนะนำตามอุปกรณ์
- `manifest.json` — ชื่อ/สี/ไอคอน PWA
- `sw.js` — service worker (จำเป็นให้ Chrome เด้งปุ่ม "ติดตั้งแอป")
- `icon.png` — ไอคอนที่ออกแบบเอง (สี่เหลี่ยมจัตุรัส 512×512)

## ติดตั้ง (ครั้งเดียว)
1. สร้าง GitHub repo ใหม่ (Public) เช่น `garden`
2. อัปโหลด 4 ไฟล์ (รวม `icon.png` ของคุณ)
3. แก้ `APP_URL` ใน `index.html` ให้เป็นลิงก์ /exec ของเว็บแอปงานสวน
4. Settings → Pages → branch `main` / root → Save
5. ได้ลิงก์ `https://<user>.github.io/<repo>/` → ส่งให้คนสวนในกลุ่มไลน์

## บทเรียนที่ใส่ไว้แล้ว
- ไม่ auto-redirect — ใช้ปุ่มกดเอง (กัน manifest โหลดไม่ทัน → ไอคอนพัง)
- ปุ่มเปิด disable 4 วิแรก / ถ้าเปิดจาก standalone ใช้ได้ทันที
- detect platform: iOS Safari / iOS อื่น / Android Chrome / LINE → คำแนะนำต่างกัน
- มี sw.js ให้ Chrome ขึ้นปุ่มติดตั้ง
- เปลี่ยนโค้ดเว็บแอปต้อง re-deploy (Manage deployments → New version) URL คงเดิม
