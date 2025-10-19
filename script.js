const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');   // slide in menu
  hamburger.classList.toggle('toggle'); // animate hamburger
});


// carasouel
const track = document.querySelector('.carousel-track');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const slides = Array.from(track.children);
let currentIndex = 0;

// Update carousel position
function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width + 8; // 8px gap
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Manual navigation
next.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Auto-slide every 3 seconds
let autoSlide = setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 3000); // change 3000 to desired interval in ms

// Reset auto-slide timer on manual navigation
[next, prev].forEach(btn => {
  btn.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 3000);
  });
});

// Adjust carousel on window resize
window.addEventListener('resize', updateCarousel);
updateCarousel();


//go to top button
const goTopBtn = document.getElementById("goTopBtn");

// Show button when scrolled down 200px
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    goTopBtn.style.display = "block";
  } else {
    goTopBtn.style.display = "none";
  }
});

// Scroll smoothly to top
goTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

//practice marquee
// === Practice Areas Marquee ===
(() => {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  let speed = 50; // pixels per second (adjustable)
  let position = 0;

  // Track width of first set (before duplication)
  const marqueeWidth = track.scrollWidth / 2;
  let lastTime = null;

  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    position -= (speed * delta) / 1000;

    if (Math.abs(position) >= marqueeWidth) {
      position = 0; // seamless reset
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // Optional: pause on hover for desktop
  track.addEventListener('mouseenter', () => speed = 0);
  track.addEventListener('mouseleave', () => speed = 50);

  // Optional: faster scroll on mobile
  const handleResize = () => {
    speed = window.innerWidth < 768 ? 80 : 50;
  };
  window.addEventListener('resize', handleResize);
  handleResize();
})();

// === Theme Toggle ===
(() => {
  const root = document.documentElement; // <html>
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  };

  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });
})();
