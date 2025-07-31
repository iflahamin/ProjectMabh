// Page 1
// hamburger
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const mobileMenu = document.getElementById("mobileMenu");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("show");

    // Switch icon
    if (mobileMenu.classList.contains("show")) {
      hamburgerIcon.classList.remove("fa-bars");
      hamburgerIcon.classList.add("fa-times");
    } else {
      hamburgerIcon.classList.remove("fa-times");
      hamburgerIcon.classList.add("fa-bars");
    }
  };

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", () => {
    if (mobileMenu.classList.contains("show")) {
      toggleMenu();
    }
  });

  mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent closing when clicking inside
  });

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", toggleMenu);
  });
});



/* Arrow Working*/
document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelector(".bouncing-arrow");

  if (arrow) {
    arrow.addEventListener("click", () => {
      const target = document.querySelector("#section2");
      if (!target) return;

      const targetY = target.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 1000;
      let startTime = null;

      function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startY + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    });
  }
});



// Page 3
document.addEventListener("DOMContentLoaded", () => {
  const leftArrow = document.querySelector('.sec3-arrow-left');
  const rightArrow = document.querySelector('.sec3-arrow-right');
  const allCards = Array.from(document.querySelectorAll('.card'));
  const sliderLine = document.querySelector('.slider-line-indicator');
  let activeIndex = 1;
  function updateCards() {
    allCards.forEach(card => card.classList.remove('card-left','card-center','card-right'));
    const total = allCards.length;
    const left = (activeIndex + total -1) % total;
    const right = (activeIndex +1) % total;
    allCards[left].classList.add('card-left');
    allCards[activeIndex].classList.add('card-center');
    allCards[right].classList.add('card-right');
    if (sliderLine) {
      sliderLine.style.transform = `translateX(${(activeIndex % total) * 100}%)`;
    }
  }
  leftArrow.addEventListener('click', ()=> {
    activeIndex = (activeIndex + allCards.length - 1) % allCards.length;
    updateCards();
  });
  rightArrow.addEventListener('click', ()=> {
    activeIndex = (activeIndex + 1) % allCards.length;
    updateCards();
  });
  // optional swipe behavior:
  let startX = 0;
  document.querySelector('.card-carousel').addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  document.querySelector('.card-carousel').addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) leftArrow.click();
    else if (startX - endX > 50) rightArrow.click();
  });
  updateCards();
});
