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



