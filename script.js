const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

const closeMenu = () => {
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
};

menuButton?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(element => observer.observe(element));
} else {
  revealItems.forEach(element => element.classList.add('visible'));
}

const filters = document.querySelectorAll('.works-filter');
const cards = document.querySelectorAll('.work-card');
const filterStatus = document.querySelector('#works-status');

filters.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    let visibleCount = 0;

    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    cards.forEach(card => {
      const visible = selected === 'all' || card.dataset.category === selected;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (filterStatus) filterStatus.textContent = `${visibleCount} жоба көрсетілуде`;
  });
});
