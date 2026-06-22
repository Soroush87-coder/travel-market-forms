// Multi-step wizard for the Spain assessment forms.
// Progressive enhancement: if this script doesn't run, all sections stay visible
// and the form still works exactly as before.
(function () {
  var form = document.querySelector('form.wizard');
  if (!form) return;
  var steps = Array.prototype.slice.call(form.querySelectorAll('.fblock'));
  if (steps.length < 2) return;

  var bar = form.querySelector('.wiz-bar i');
  var stepLabel = form.querySelector('.wiz-step');
  var titleLabel = form.querySelector('.wiz-title');
  var back = form.querySelector('.wiz-back');
  var next = form.querySelector('.wiz-next');
  var submit = form.querySelector('.wiz-submit');
  var rtl = document.documentElement.dir === 'rtl';
  var stepWord = form.getAttribute('data-step-word') || 'Step';
  var ofWord = form.getAttribute('data-of-word') || 'of';
  var idx = 0;

  form.classList.add('is-wizard');

  function fa(n) {
    return rtl ? String(n).replace(/[0-9]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; }) : String(n);
  }
  function titleOf(step) {
    var h = step.querySelector('.fblock-head h3');
    return h ? h.textContent.trim() : '';
  }
  function render() {
    steps.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
    var pct = Math.round(((idx + 1) / steps.length) * 100);
    if (bar) bar.style.width = pct + '%';
    if (stepLabel) stepLabel.textContent = stepWord + ' ' + fa(idx + 1) + ' ' + ofWord + ' ' + fa(steps.length);
    if (titleLabel) titleLabel.textContent = titleOf(steps[idx]);
    back.style.visibility = idx === 0 ? 'hidden' : 'visible';
    var last = idx === steps.length - 1;
    next.hidden = last;
    submit.hidden = !last;
    var top = form.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
  function valid() {
    var fields = steps[idx].querySelectorAll('input, select, textarea');
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].checkValidity()) { fields[i].reportValidity(); return false; }
    }
    return true;
  }
  next.addEventListener('click', function () {
    if (valid() && idx < steps.length - 1) { idx++; render(); }
  });
  back.addEventListener('click', function () {
    if (idx > 0) { idx--; render(); }
  });
  // Enter advances the step instead of submitting early (except in a textarea / last step)
  form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && idx < steps.length - 1) {
      e.preventDefault();
      next.click();
    }
  });

  render();
})();
