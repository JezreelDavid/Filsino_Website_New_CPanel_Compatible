// Main JavaScript for Filsino Website

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initScrollAnimations();
  initContactForm();
  initBackToTop();
  initMobileMenu();
  initSmoothScrolling();
  initTypingAnimation();
  initParallaxEffects();
  initHeroTextTrail();
  initModernCards();
  initDestinationsCarousel(); // Add carousel initialization
});

// Destinations Carousel Functionality
function initDestinationsCarousel() {
  const carousel = document.getElementById("destinationsCarousel");
  if (!carousel) return;

  // Auto-scroll functionality
  let autoScrollInterval;

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      scrollCarousel("next");
    }, 5000); // Auto-scroll every 5 seconds
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
  };

  // Start auto-scroll
  startAutoScroll();

  // Stop auto-scroll on hover
  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);

  // Touch/swipe support for mobile
  let startX = 0;
  let scrollLeft = 0;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    stopAutoScroll();
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!startX) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  carousel.addEventListener("touchend", () => {
    startX = 0;
    startAutoScroll();
  });

  // Intersection Observer for carousel cards animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const carouselObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe destination cards
  const destinationCards = document.querySelectorAll(".destination-card");
  destinationCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    carouselObserver.observe(card);
  });

  // Observe overview cards
  const overviewCards = document.querySelectorAll(".overview-card");
  overviewCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.2
    }s, transform 0.6s ease ${index * 0.2}s`;
    carouselObserver.observe(card);
  });
}

// Carousel scroll function
function scrollCarousel(direction) {
  const carousel = document.getElementById("destinationsCarousel");
  if (!carousel) return;

  const cardWidth = 350 + 32; // card width + gap
  const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time

  if (direction === "next") {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    // If at the end, scroll back to beginning
    setTimeout(() => {
      if (
        carousel.scrollLeft + carousel.clientWidth >=
        carousel.scrollWidth - 10
      ) {
        setTimeout(() => {
          carousel.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }, 1000);
      }
    }, 500);
  } else {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });

    // If at the beginning, scroll to end
    setTimeout(() => {
      if (carousel.scrollLeft <= 10) {
        setTimeout(() => {
          carousel.scrollTo({
            left: carousel.scrollWidth,
            behavior: "smooth",
          });
        }, 1000);
      }
    }, 500);
  }
}

// Smooth scroll to carousel
function scrollToCarousel() {
  const destinationsSection = document.getElementById("destinations");
  if (destinationsSection) {
    destinationsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar");
  let scrolled = false;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100 && !scrolled) {
      navbar.classList.add("navbar-scrolled");
      scrolled = true;
    } else if (scrollTop <= 100 && scrolled) {
      navbar.classList.remove("navbar-scrolled");
      scrolled = false;
    }
  });

  // Active nav link highlighting
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Handle click events for nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      });
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        // Add stagger animation for children
        const children = entry.target.querySelectorAll(".animate-on-scroll");
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("animate");
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// Contact form functionality
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Validate form first
    if (!validateForm(form)) {
      showNotification("Please fix the errors before submitting.", "error");
      return;
    }

    // Show loading state
    submitBtn.innerHTML = `
            <span class="loading-spinner"></span>
            Sending...
        `;
    submitBtn.disabled = true;

    // Prepare form data
    const formData = new FormData(form);

    try {
      const response = await fetch("contact_handler.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showNotification(result.message, "success");
        form.reset();

        // Add success animation
        form.classList.add("scale-105");
        setTimeout(() => {
          form.classList.remove("scale-105");
        }, 300);
      } else {
        if (result.errors) {
          result.errors.forEach((error) => {
            showNotification(error, "error");
          });
        } else {
          showNotification(
            result.message || "Failed to send message.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showNotification("Failed to send message. Please try again.", "error");
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  // Form validation with real-time feedback
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearValidationError);
  });
}

// Field validation
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  let isValid = true;
  let message = "";

  // Remove existing error styling
  field.classList.remove("border-red-500", "ring-red-500");

  // Validation rules
  switch (field.type) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = "Please enter a valid email address";
      }
      break;
    case "text":
      if (value.length < 2) {
        isValid = false;
        message = "This field must be at least 2 characters long";
      }
      break;
    default:
      if (field.hasAttribute("required") && value === "") {
        isValid = false;
        message = "This field is required";
      }
  }

  if (!isValid) {
    showFieldError(field, message);
  }
  return isValid;
}

function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField({ target: input })) {
      isValid = false;
    }
  });

  return isValid;
}

function clearValidationError(e) {
  const field = e.target;
  field.classList.remove("border-red-500", "ring-red-500");
  const errorMsg = field.parentNode.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.remove();
  }
}

function showFieldError(field, message) {
  field.classList.add("border-red-500");

  // Remove existing error message
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Add new error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message text-red-500 text-sm mt-1";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

// Back to top functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");

    if (isOpen) {
      mobileMenu.classList.add("hidden");
      mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
    } else {
      mobileMenu.classList.remove("hidden");
      mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
    }
  });

  // Close mobile menu when clicking on links
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Typing animation for hero text
function initTypingAnimation() {
  const heroText = document.getElementById("heroText");
  const letters = heroText.querySelectorAll(".letter");

  if (!letters.length) return;

  // Initially hide all letters
  letters.forEach((letter) => {
    letter.style.opacity = "0";
    letter.style.transform = "translateY(20px)";
  });

  // Type each letter with animation
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.transition = "all 0.3s ease";
      letter.style.opacity = "1";
      letter.style.transform = "translateY(0)";

      // Add typing sound effect (visual)
      letter.style.textShadow = "0 0 20px #16a34a";
      setTimeout(() => {
        letter.style.textShadow = "";
      }, 200);
    }, (index + 1) * 200); // 200ms delay between each letter
  });

  // Add cursor blink effect after typing is complete
  setTimeout(() => {
    heroText.classList.add("cursor-blink");
    setTimeout(() => {
      heroText.classList.remove("cursor-blink");
    }, 2000);
  }, letters.length * 200 + 500);
}

// Cursor Trail Effect for Hero Text
function initHeroTextTrail() {
  const heroText = document.getElementById("heroText");
  const letters = heroText.querySelectorAll(".letter");

  if (!letters.length) return;

  // Wait for typing animation to complete before enabling cursor trail
  setTimeout(() => {
    letters.forEach((letter, index) => {
      let trails = [];
      let isHovering = false;

      letter.addEventListener("mouseenter", () => {
        isHovering = true;
      });

      letter.addEventListener("mouseleave", () => {
        isHovering = false;
        // Clear existing trails after a delay
        setTimeout(() => {
          trails.forEach((trail) => {
            if (trail.parentNode) {
              trail.parentNode.removeChild(trail);
            }
          });
          trails = [];
        }, 1000);
      });

      letter.addEventListener("mousemove", (e) => {
        if (!isHovering) return;

        const rect = letter.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create trail element
        const trail = document.createElement("div");
        trail.className = "cursor-trail active";
        trail.style.left = x - 4 + "px";
        trail.style.top = y - 4 + "px";

        // Add random variation to trail size and intensity
        const size = Math.random() * 8 + 6;
        const intensity = Math.random() * 0.3 + 0.7;
        trail.style.width = size + "px";
        trail.style.height = size + "px";
        trail.style.opacity = intensity;

        // Add slight delay for smoother effect
        setTimeout(() => {
          letter.appendChild(trail);
          trails.push(trail);
        }, Math.random() * 50);

        // Remove trail after animation
        setTimeout(() => {
          if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
          }
          const index = trails.indexOf(trail);
          if (index > -1) {
            trails.splice(index, 1);
          }
        }, 800);

        // Limit number of trails
        if (trails.length > 15) {
          const oldTrail = trails.shift();
          if (oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail);
          }
        }
      });

      // Add paint effect on hover
      letter.addEventListener("mouseenter", () => {
        // Create paint sweep effect
        const paintSweep = document.createElement("div");
        paintSweep.className = "paint-sweep";
        paintSweep.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(22, 163, 74, 0.6) 50%, transparent 100%);
          z-index: 1;
          pointer-events: none;
          animation: paintSweep 0.8s ease-out;
        `;

        letter.appendChild(paintSweep);

        setTimeout(() => {
          if (paintSweep.parentNode) {
            paintSweep.parentNode.removeChild(paintSweep);
          }
        }, 800);
      });
    });
  }, 1500); // Wait 1.5 seconds for typing animation to complete
}

// Add paint sweep animation
const paintSweepStyle = document.createElement("style");
paintSweepStyle.textContent = `
  @keyframes paintSweep {
    0% {
      left: -100%;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      left: 100%;
      opacity: 0;
    }
  }
`;
document.head.appendChild(paintSweepStyle);

// Parallax effects
function initParallaxEffects() {
  const shapes = document.querySelectorAll(".shape");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1;
      shape.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500"
  } text-white`;

  notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;

  document.body.appendChild(notification);

  // Slide in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// About Cards Sub-card functionality
let activeSubCard = null;

function openSubCard(cardType) {
  // Close any previously open sub-card
  closeSubCard();

  // Get the sub-card and overlay elements
  const subCard = document.getElementById(`sub-card-${cardType}`);
  const overlay = document.getElementById("modal-overlay");

  if (subCard && overlay) {
    // Set active sub-card
    activeSubCard = cardType;

    // Show overlay and sub-card
    overlay.classList.add("active");
    subCard.classList.add("active");

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Add click outside to close functionality
    overlay.addEventListener("click", closeSubCard);

    // Add escape key to close functionality
    document.addEventListener("keydown", handleEscapeKey);
  }
}

function closeSubCard() {
  if (activeSubCard) {
    // Get the sub-card and overlay elements
    const subCard = document.getElementById(`sub-card-${activeSubCard}`);
    const overlay = document.getElementById("modal-overlay");

    if (subCard && overlay) {
      // Hide overlay and sub-card
      overlay.classList.remove("active");
      subCard.classList.remove("active");

      // Restore body scroll
      document.body.style.overflow = "auto";

      // Remove event listeners
      overlay.removeEventListener("click", closeSubCard);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    // Reset active sub-card
    activeSubCard = null;
  }
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeSubCard();
  }
}

// Initialize card animations on scroll
function initializeCardAnimations() {
  const cards = document.querySelectorAll(".about-card");

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

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Modern Cards Animation
function initModernCards() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all modern cards
  const modernCards = document.querySelectorAll(".modern-card");
  modernCards.forEach((card) => {
    observer.observe(card);
  });

  // Add hover sound effects (optional)
  modernCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Enhanced scroll animations for the new about section
function initAboutAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Special handling for staggered animations
        if (entry.target.classList.contains("stagger-parent")) {
          const children = entry.target.querySelectorAll(".stagger-child");
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("animate");
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  const animateElements = document.querySelectorAll(
    ".animate-on-scroll, .destination-card, .overview-card"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

// Call the about animations on load
document.addEventListener("DOMContentLoaded", function () {
  initAboutAnimations();
});

// Close sub-card when clicking outside
document.addEventListener("click", function (event) {
  if (
    activeSubCard &&
    !event.target.closest(".sub-card") &&
    !event.target.closest(".read-more-btn")
  ) {
    closeSubCard();
  }
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add cursor blink animation styles
const style = document.createElement("style");
style.textContent = `
    .cursor-blink::after {
        content: '|';
        animation: blink 1s infinite;
        color: #16a34a;
        margin-left: 5px;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page load time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}
