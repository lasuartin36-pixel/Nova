const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.toggle('active', x === t));
  panels.forEach(p => p.classList.toggle('active', p.id === t.dataset.tab));
  revealIn(document.getElementById(t.dataset.tab));
}));
document.getElementById('y').textContent = new Date().getFullYear();

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Elemente beim Scrollen einblenden
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Karten im Menü gestaffelt einblenden
function revealIn(panel) {
  panel.querySelectorAll('.card').forEach((c, i) => {
    c.classList.remove('in'); c.style.setProperty('--d', i * 0.12 + 's');
    requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in')));
  });
}
document.querySelectorAll('.card').forEach(c => c.classList.add('reveal'));
document.querySelectorAll('.card').forEach(c => io.observe(c));

// Scroll-Fortschritt, Header, Parallax
const bar = document.querySelector('.progress');
const header = document.querySelector('.site-header');
const hero = document.querySelector('[data-hero]');
const text = document.querySelector('.hero-text');
const parallax = [...document.querySelectorAll('[data-speed]')];
let lastY = 0, ticking = false;
function update() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  header.classList.toggle('hide', y > lastY && y > 120);
  lastY = y;
  if (!reduce) {
    if (y < innerHeight * 1.2) {
      const p = Math.min(1, y / (innerHeight * 0.8));
      hero.style.setProperty('--p', p);
      hero.style.setProperty('--cap', Math.max(0, (p - 0.6) / 0.4));
      text.style.transform = `translateX(${-p * 60}px)`;
      text.style.opacity = 1 - p * 0.7;
    }
    parallax.forEach(el => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed)}px)`;
    });
  }
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
update();
