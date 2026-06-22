# راه‌اندازی فرم‌ها روی form.travelmarket.agency

این ZIP مخصوص ساب‌دامین فرم‌هاست.

## روش پیشنهادی روی Vercel
1. یک Repository جدید در GitHub بسازید، مثلاً `travelmarket-forms`.
2. محتوای این ZIP را داخل Repository آپلود کنید.
3. در Vercel یک Project جدید از همین Repository بسازید.
4. از بخش Settings → Domains دامنه زیر را اضافه کنید:

`form.travelmarket.agency`

5. اگر Vercel DNS Record خواست، همان را در Hostinger DNS وارد کنید.

## اتصال ایمیل
اتصال Google Apps Script همان قبلی است و داخل `script.js` باقی مانده؛ نیاز به ساخت Script یا تنظیم Gmail جدید نیست.

## صفحات
- `/` لندینگ‌پیج فرم‌ها
- `/programs/spain-eligibility-assessment-en.html` فرم انگلیسی
- `/programs/spain-eligibility-assessment-fa.html` فرم فارسی
- `/thank-you.html` صفحه تشکر
