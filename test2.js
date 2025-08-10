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
    'https://utqsystem.com/',
    'https://fayed.org.sa/',
    'https://tqb.org.sa/portal/'
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