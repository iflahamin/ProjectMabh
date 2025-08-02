// Smooth Scroll

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });




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

// Typing Effect

  const phrases = ["Passion", "Pixels", "Purpose"];
  const typingElement = document.querySelector(".typing-text");
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetween = 1500;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, erasingSpeed);
      }
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex++);
      if (charIndex > currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetween);
      } else {
        setTimeout(typeEffect, typingSpeed);
      }
    }
  }

  // Start typing effect on page load
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
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


// Section 4
// Image Carousal
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carousel-img");
  const indicator = document.querySelector(".carousel-indicator");
  let currentIndex = 0;
  const totalImages = images.length;

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
    indicator.innerHTML = `0${index + 1}<sup>/0${totalImages}</sup>`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    showSlide(currentIndex);
  }

  // Initial display
  showSlide(currentIndex);

  // Auto-slide every 3 seconds
  setInterval(nextSlide, 3000);
});





















// Contact Page

// Form Validation
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  let valid = true;

  const fields = [
    { name: "name", required: true },
    { name: "email", required: true, type: "email" },
    { name: "phone", required: false, type: "phone" },
    { name: "company", required: false },
    { name: "subject1", required: false },
    { name: "subject2", required: false },
    { name: "message", required: true }
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d+\-\s]{7,15}$/;

  // Clear old errors
  form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
  form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

  const getField = (name) => form.querySelector(`[name="${name}"]`);

  // Validate fields
  for (const field of fields) {
    const input = getField(field.name);
    if (!input) continue;

    const value = input.value.trim();
    const errorEl = input.parentElement.querySelector('.error-message');

    if (field.required && value === "") {
      errorEl.textContent = "This field is required.";
      errorEl.style.display = "block";
      input.classList.add('error');
      valid = false;
    } else if (field.type === "email" && value && !emailRegex.test(value)) {
      errorEl.textContent = "Enter a valid email.";
      errorEl.style.display = "block";
      input.classList.add('error');
      valid = false;
    } else if (field.type === "phone" && value && !phoneRegex.test(value)) {
      errorEl.textContent = "Enter a valid phone number.";
      errorEl.style.display = "block";
      input.classList.add('error');
      valid = false;
    }
  }

  // Require at least one subject
  const s1 = getField("subject1")?.value.trim();
  const s2 = getField("subject2")?.value.trim();
  if (s1 === "" && s2 === "") {
    const input = getField("subject1");
    const errorEl = input?.parentElement.querySelector('.error-message');
    errorEl.textContent = "Enter at least one subject.";
    errorEl.style.display = "block";
    input.classList.add('error');
    valid = false;
  }

  if (!valid) return;

  // ✅ If valid, send form (replace URL below with your backend endpoint)
  const formData = new FormData(form);

  try {
    const response = await fetch("https://your-backend-url.com/submit-form", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      alert("Message sent successfully!");
      form.reset();
    } else {
      alert("Something went wrong. Please try again later.");
    }
  } catch (err) {
    alert("Failed to send. Please check your connection.");
  }
});
