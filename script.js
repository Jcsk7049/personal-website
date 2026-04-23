// Load editable content from CMS data file
(async () => {
  try {
    const res = await fetch('_data/content.json');
    if (!res.ok) return;
    const d = await res.json();

    const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };

    set('hero-greeting', d.hero?.greeting);
    set('hero-name',     d.hero?.name);
    set('hero-title',    d.hero?.title);
    set('hero-desc',     d.hero?.desc);
    set('about-bio-1',   d.about?.bio1);
    set('about-bio-2',   d.about?.bio2);

    if (d.contact?.email) {
      const link = document.getElementById('contact-email-link');
      const text = document.getElementById('contact-email-text');
      if (link) link.href = 'mailto:' + d.contact.email;
      if (text) text.textContent = d.contact.email;
    }
  } catch (_) {}
})();

// Nav: scrolled style
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Nav: mobile toggle
const toggle = document.querySelector('.nav-toggle');
const menu   = document.querySelector('.nav-menu');
toggle?.addEventListener('click', () => {
  menu.classList.toggle('open');
});

// Close mobile menu on link click
menu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => menu.classList.remove('open'));
});
