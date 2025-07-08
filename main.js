window.addEventListener("DOMContentLoaded", () => {
        // === Shrink Header on Scroll ===
    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // prevent negative scroll
    });

    // === Smooth Scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
        e.preventDefault();
        const headerOffset = header.offsetHeight;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset + 10;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
        }
    });
    });

    // === Intersection Observer: Fade-in animation ===
    const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        }
    });
    }, observerOptions);

    document.querySelectorAll(".section, .stat-card, .service-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
    });

    // === Mobile Menu Toggle ===
    const navLinks = document.querySelector(".nav-links");

    if (window.innerWidth <= 768) {
    const menuButton = document.createElement("button");
    menuButton.innerHTML = "☰";
    menuButton.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #ffffff;
        cursor: pointer;
        display: block;
    `;

    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.style.display === "flex";
        navLinks.style.display = isOpen ? "none" : "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "100%";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.background = "rgba(20, 20, 20, 0.95)";
        navLinks.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        navLinks.style.padding = "1rem";
    });

    document.querySelector("nav").appendChild(menuButton);
    }

});

window.addEventListener("DOMContentLoaded", () => {
  const typeTarget = document.getElementById("type-text");
  typeTarget.classList.add("visible");

  const lines = [
    "Don't settle for mediocrity,",
    "Strive for the best",
  ];
  let lineIndex = 0;
  let charIndex = 0;

  // Add blinking cursor span
  typeTarget.innerHTML = '<span id="typed-text"></span><span class="cursor">|</span>';
  const typedText = document.getElementById("typed-text");
  const cursor = document.querySelector(".cursor");

  function typeLine() {
    if (lineIndex >= lines.length) {
      cursor.style.display = "none"; // Hide cursor at end
      return;
    }

    if (charIndex < lines[lineIndex].length) {
      typedText.textContent += lines[lineIndex].charAt(charIndex);
      charIndex++;

      // Randomize typing speed between 30ms to 70ms
      const delay = 30 + Math.random() * 40;
      setTimeout(typeLine, delay);
    } else {
      lineIndex++;
      charIndex = 0;

      if (lineIndex < lines.length) {
        typedText.textContent += "\n"; // Use \n for pre-wrap white space
        setTimeout(typeLine, 800); // Pause before next line
      } else {
        cursor.style.display = "none"; // Hide cursor when done
      }
    }
  }

  typeLine();
});
