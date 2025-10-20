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

// --- Hero slider ---
(function () {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  const dotsWrap = slider.querySelector('.slider-dots');

  let i = 0;

  // Build dots
  slides.forEach((_, idx) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    if (idx === 0) b.setAttribute('aria-current', 'true');
    b.addEventListener('click', () => goTo(idx));
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    slides.forEach((s, idx) => s.setAttribute('aria-hidden', idx !== i));
    dots.forEach((d, idx) => d.setAttribute('aria-current', idx === i ? 'true' : 'false'));
  }

  prev.addEventListener('click', () => goTo(i - 1));
  next.addEventListener('click', () => goTo(i + 1));

  // Keyboard
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(i + 1);
    if (e.key === 'ArrowLeft') goTo(i - 1);
  });

  // Basic swipe (pointer events)
  let startX = null;
  slider.addEventListener('pointerdown', (e) => { startX = e.clientX; slider.setPointerCapture(e.pointerId); });
  slider.addEventListener('pointerup', (e) => {
    if (startX == null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) (dx < 0 ? goTo(i + 1) : goTo(i - 1));
    startX = null;
  });

  // Optional autoplay
  let timer = setInterval(() => goTo(i + 1), 6000);
  slider.addEventListener('mouseenter', () => { clearInterval(timer); });
  slider.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(i + 1), 6000); });

  goTo(0);
})();

