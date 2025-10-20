document.getElementById("year").textContent = new Date().getFullYear();
const projects = [
  { title: "Fatty Acid Chains Affect on Organoid Growth", desc: "How do fatty acid chains affect the growth of organoids?", link: "#" },
  { title: "Olivia Trevino's Project", desc: "What it does", link: "#" },
  { title: "Kate Trevino's Project", desc: "What it does", link: "#" },
  { title: "Carolina's Project", desc: "what is does", link: "#" } 
  
];
document.getElementById("projects").innerHTML = projects.map(p => `
  <article class="card">
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <a href="${p.link}">View →</a>
  </article>
`).join("");

// --- Cleaner hero fade slider ---
(function () {
  const root = document.querySelector('.hero-fade');
  if (!root) return;

  const slider = root.querySelector('.fade-slider');
  const slides = Array.from(root.querySelectorAll('.fade-slide'));
  const dotsWrap = root.querySelector('.fade-dots');

  let i = 0;
  let timer = null;
  const interval = parseInt(slider.getAttribute('data-autoplay') || '0', 10);

  // Build dots
  slides.forEach((_, idx) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    if (idx === 0) b.setAttribute('aria-current', 'true');
    b.addEventListener('click', () => goTo(idx, true));
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(n, user) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
    dots.forEach((d, idx) => d.setAttribute('aria-current', idx === i ? 'true' : 'false'));
    // reset autoplay when user interacts
    if (user && interval) restart();
  }

  function next() { goTo(i + 1, false); }

  function start() {
    if (!interval) return;
    timer = setInterval(next, interval);
  }
  function stop()  { if (timer) clearInterval(timer); }
  function restart(){ stop(); start(); }

  // Pause on hover/focus (nice UX)
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);

  // Keyboard left/right
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') goTo(i - 1, true);
  });

  // Respect tab visibility (save battery)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  goTo(0, false);
  start();
})();
