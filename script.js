const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const toTop = document.querySelector('.to-top');
const cursorGlow = document.querySelector('.cursor-glow');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  toTop.classList.toggle('show', window.scrollY > 500);
});

toTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

document.addEventListener('mousemove', e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: .12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin: '-35% 0px -55% 0px'});
sections.forEach(section => sectionObserver.observe(section));

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-link-wrap');
filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;
    projects.forEach(project => {
      const card = project.querySelector('.project-card');
      const categories = card.dataset.category.split(' ');
      project.classList.toggle('hidden', category !== 'all' && !categories.includes(category));
    });
  });
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const target = 'your.email@example.com';
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${target}?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
