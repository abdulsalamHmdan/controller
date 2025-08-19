/*
Simple Express redirector
- كل مرة يدخل الزائر على / سيتم تحويله عشوائياً إلى واحد من 5 روابط
- لتشغيل:
  1. npm init -y
  2. npm install express
  3. node redirect-server.js
- يمكن تعديل مصفوفة الروابط أدناه أو إضافة سياسات اختيار أخرى
*/

const express = require('express');
const crypto = require('crypto');
const app = express();

// ضع هنا روابطك الخمسة
const links = [
    'https://youtube.com/shorts/PxU48dh-Qlc',
    'https://youtube.com/shorts/WBh5mNcP6bg',
    'https://youtube.com/shorts/glVS1fLopHc',
    'https://youtube.com/shorts/AoucqvZgGGU',
    'https://youtube.com/shorts/h21xRQnTqOo',
    'https://youtube.com/shorts/4gnxaiQqDxE',
    'https://youtube.com/shorts/OTenaEmFqSU',
];

// مسار الجذر: يقوم بالتحويل العشوائي
app.get('/', (req, res) => {
    // اختيار رقم عشوائي متساوي الاحتمال
    const idx = crypto.randomInt(0, links.length);
    const target = links[idx];

    // إضافة هيدر اختياري للتتبع (غير مطلوب)
    res.set('X-Redirect-Index', String(idx));

    // إعادة التوجيه
    res.redirect(target);
});

// مسار اختياري لعرض الروابط (للتجريب)
app.get('/links', (req, res) => {
    res.json({ count: links.length, links });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Redirect server running on http://localhost:${PORT}`));