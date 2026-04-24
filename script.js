// ─── Scroll reveal (Apple IntersectionObserver) ───────────────
// Kept at module scope so newly rendered elements can be observed
let revealIO;

function initReveal() {
  revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -56px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => revealIO.observe(el));
}

function observeNewReveal(container) {
  if (!revealIO) return;
  container.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => revealIO.observe(el));
}

// ─── Reading progress bar (Medium) ────────────────────────────
function initProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive: true });
}

// ─── Hero animation (Apple) ───────────────────────────────────
function animateHero() {
  const nameEl = document.getElementById('hero-name');
  if (nameEl && !nameEl.dataset.split) {
    nameEl.dataset.split = '1';
    const text = nameEl.textContent.trim();
    nameEl.innerHTML = [...text].map((ch, i) => {
      const delay = (0.1 + i * 0.045).toFixed(3);
      return ch === ' '
        ? '<span class="char" style="display:inline-block;width:.3em"></span>'
        : `<span class="char" style="animation-delay:${delay}s">${ch}</span>`;
    }).join('');
  }

  const items = [
    { id: 'hero-greeting', delay: 0.05 },
    { id: 'hero-title',    delay: 0.55 },
    { id: 'hero-desc',     delay: 0.72 },
    { id: 'hero-actions',  delay: 0.88 },
    { id: 'hero-scroll',   delay: 1.05 },
  ];
  items.forEach(({ id, delay }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.filter    = 'blur(4px)';
    el.style.transition = [
      `opacity .85s cubic-bezier(.16,1,.3,1) ${delay}s`,
      `transform .85s cubic-bezier(.16,1,.3,1) ${delay}s`,
      `filter .85s cubic-bezier(.16,1,.3,1) ${delay}s`,
    ].join(',');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
      el.style.filter    = 'blur(0)';
    }));
  });
}

// ─── Parallax hero dot-grid (Apple) ───────────────────────────
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    hero.style.setProperty('--py', window.scrollY * 0.22 + 'px');
  }, { passive: true });
}

// ─── Nav ──────────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');
  toggle?.addEventListener('click', () => menu.classList.toggle('open'));
  menu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-menu a[href^="#"]');
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-menu a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--c-accent)';
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => io.observe(s));
}

// ─── Project card renderer ────────────────────────────────────
function buildCard(project, index) {
  const stagger = ['d1','d2','d3','d4','d5'][index] || '';
  const tagsHtml = project.tags
    .map(t => `<span class="tag">${escHtml(t)}</span>`)
    .join('');
  const detailHref = escHtml(project.links?.detail || '#');
  const githubHref = escHtml(project.links?.github || '#');

  const article = document.createElement('article');
  article.className = `project-card reveal ${stagger}`;
  article.innerHTML = `
    <div class="card-image card-image--${escHtml(project.theme)}">
      <span class="card-icon">${escHtml(project.icon)}</span>
    </div>
    <div class="card-body">
      <div class="card-tags">${tagsHtml}</div>
      <h3 class="card-title">${escHtml(project.title)}</h3>
      <p class="card-desc">${escHtml(project.desc)}</p>
      <div class="card-footer">
        <a href="${detailHref}" class="btn btn-sm btn-primary">查看詳情</a>
        <a href="${githubHref}" class="btn btn-sm btn-ghost">GitHub →</a>
      </div>
    </div>
  `;
  return article;
}

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Load projects from JSON ──────────────────────────────────
async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const res = await fetch('_data/projects.json');
    if (!res.ok) throw new Error('fetch failed');
    const { projects } = await res.json();

    grid.innerHTML = '';
    projects.forEach((p, i) => {
      grid.appendChild(buildCard(p, i));
    });

    // Let the IO observe the newly created cards
    observeNewReveal(grid);
  } catch (_) {
    // Silently keep whatever fallback HTML is already in the grid
  }
}

// ─── Load site content from CMS JSON ─────────────────────────
async function loadContent() {
  try {
    const res = await fetch('_data/content.json');
    if (!res.ok) return;
    const d = await res.json();

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el && val) el.textContent = val;
    };

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

  animateHero();
}

// ─── Boot ─────────────────────────────────────────────────────
initProgress();
initReveal();
initParallax();
initNav();
initActiveNav();
loadContent();
loadProjects();
