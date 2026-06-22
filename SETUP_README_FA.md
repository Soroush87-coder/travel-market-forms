# راه‌اندازی ارسال فرم‌ها به ایمیل + Google Sheets

ایمیل مقصد داخل فایل‌های GitHub نمایش داده نمی‌شود. ایمیل فقط داخل Google Apps Script خصوصی شما قرار می‌گیرد.

## مراحل

1. وارد Google Sheets شوید و یک Sheet جدید بسازید.
2. از منوی بالا بروید به: Extensions → Apps Script
3. محتوای فایل `GOOGLE_APPS_SCRIPT_PRIVATE.txt` را داخل Apps Script کپی کنید.
4. در خط اول، `PRIVATE_RECEIVER_EMAIL` را با ایمیل مقصد خودتان جایگزین کنید.
5. Save بزنید.
6. Deploy → New deployment را بزنید.
7. Type را روی Web app بگذارید.
8. Execute as: Me
9. Who has access: Anyone
10. Deploy را بزنید و اجازه‌های گوگل را تایید کنید.
11. Web app URL را کپی کنید.
12. فایل `script.js` را باز کنید و این خط را پیدا کنید:

```js
const GOOGLE_SCRIPT_URL = 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

13. لینک Web App را جای آن بگذارید.
14. همه فایل‌ها را روی GitHub آپلود/Replace کنید.

بعد از این، فرم‌ها:
- پیام «در حال ارسال» نشان می‌دهند.
- بعد از ارسال به صفحه Thank You می‌روند.
- اطلاعات را داخل Google Sheets ذخیره می‌کنند.
- ایمیل هم برای شما ارسال می‌شود.

نکته: اگر بعداً Apps Script را تغییر دادید، باید دوباره Deploy → Manage deployments → Edit → New version بزنید.
