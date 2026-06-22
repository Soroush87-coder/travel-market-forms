

// Mobile menu
(function(){
  document.querySelectorAll('.navbar').forEach(navbar => {
    if (navbar.querySelector('.menu-toggle')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-toggle';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span>☰</span>';
    const navBtn = navbar.querySelector('.navbtn');
    if (navBtn) navbar.insertBefore(btn, navBtn);
    else navbar.appendChild(btn);

    btn.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.innerHTML = isOpen ? '<span>×</span>' : '<span>☰</span>';
    });

    navbar.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span>☰</span>';
      });
    });
  });
})();

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(item => obs.observe(item));
} else {
  items.forEach(item => item.classList.add('visible'));
}

// IMPORTANT: paste your Google Apps Script Web App URL here after deployment.
// The email address stays private inside Google Apps Script, not inside GitHub.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyE-ppkpO3Emd6bPNhDQ7a_JfnYkGSMclO4ym5sYjYPH9_odFIrhAfkS0pGcN5zrjeu/exec';

function getThankYouUrl() {
  const isProgramPage = window.location.pathname.includes('/programs/');
  return isProgramPage ? '../thank-you.html' : 'thank-you.html';
}

function getPageTitle() {
  const h1 = document.querySelector('h1');
  return h1 ? h1.textContent.trim() : document.title;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        data: result.includes(',') ? result.split(',')[1] : result
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function buildPayload(form) {
  const data = new FormData(form);
  const fields = {};
  const files = [];

  for (const [key, value] of data.entries()) {
    if (value instanceof File) {
      if (value.name) files.push(await fileToBase64(value));
    } else {
      if (fields[key]) fields[key] = `${fields[key]} | ${value}`;
      else fields[key] = value;
    }
  }

  return {
    source: 'Travel Market Website',
    page: getPageTitle(),
    url: window.location.href,
    submitted_at: new Date().toISOString(),
    fields,
    files
  };
}

function setFormStatus(form, type, message) {
  let box = form.querySelector('.form-status');
  if (!box) {
    box = document.createElement('div');
    box.className = 'form-status';
    form.appendChild(box);
  }
  box.className = `form-status ${type}`;
  box.textContent = message;
}

document.querySelectorAll('form[data-gas-form], form.smart-form, section.request form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('PASTE_GOOGLE_APPS_SCRIPT')) {
      setFormStatus(form, 'error', document.documentElement.dir === 'rtl'
        ? 'اتصال فرم هنوز فعال نشده است. ابتدا Google Apps Script URL را داخل script.js قرار دهید.'
        : 'Form connection is not active yet. Paste the Google Apps Script URL inside script.js first.');
      return;
    }

    const btn = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalText = btn ? (btn.textContent || btn.value || '') : '';
    if (btn) {
      if (btn.tagName === 'INPUT') btn.value = document.documentElement.dir === 'rtl' ? 'در حال ارسال...' : 'Sending...';
      else btn.textContent = document.documentElement.dir === 'rtl' ? 'در حال ارسال...' : 'Sending...';
      btn.disabled = true;
    }

    setFormStatus(form, 'pending', document.documentElement.dir === 'rtl' ? 'در حال ثبت و ارسال اطلاعات...' : 'Submitting your request...');

    try {
      const payload = await buildPayload(form);
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      setFormStatus(form, 'success', document.documentElement.dir === 'rtl' ? 'درخواست شما با موفقیت ثبت شد.' : 'Your request has been submitted successfully.');
      setTimeout(() => { window.location.href = getThankYouUrl(); }, 900);
    } catch (error) {
      console.error(error);
      setFormStatus(form, 'error', document.documentElement.dir === 'rtl'
        ? 'ارسال انجام نشد. لطفاً اینترنت را بررسی کنید و دوباره تلاش کنید.'
        : 'Submission failed. Please check your connection and try again.');
      if (btn) {
        if (btn.tagName === 'INPUT') btn.value = originalText;
        else btn.textContent = originalText;
        btn.disabled = false;
      }
    }
  });
});
