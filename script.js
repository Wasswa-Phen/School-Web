// Page Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader")
  setTimeout(() => {
    loader.style.opacity = "0"
    setTimeout(() => {
      loader.style.display = "none"
    }, 500)
  }, 1500)
})

// Navigation
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navClose = document.getElementById("navClose")
const navLinks = document.querySelectorAll(".nav-link")

// Enhanced Navigation
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }

  // Animate hamburger
  const hamburger = navToggle.querySelector(".hamburger")
  hamburger.classList.toggle("active")
})

navClose.addEventListener("click", () => {
  navMenu.classList.remove("active")
  navToggle.classList.remove("active")
  document.body.style.overflow = "auto"

  const hamburger = navToggle.querySelector(".hamburger")
  hamburger.classList.remove("active")
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
    document.body.style.overflow = "auto"

    const hamburger = navToggle.querySelector(".hamburger")
    hamburger.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Counter Animation for Metrics
function animateCounters() {
  const counters = document.querySelectorAll(".metric-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"

      // Trigger counter animation for metrics section
      if (entry.target.classList.contains("metrics-bar")) {
        animateCounters()
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".testimonial-card, .news-card, .gallery-item, .metrics-bar").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Academic Pillars Carousel
let currentSlide = 0
const slides = document.querySelectorAll(".pillar-slide")
const totalSlides = slides.length

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"))
  slides[index].classList.add("active")
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  showSlide(currentSlide)
}

function changeSlide(direction) {
  if (direction === 1) {
    nextSlide()
  } else {
    prevSlide()
  }
}

// Auto-advance carousel
setInterval(nextSlide, 5000)

// Admissions Wizard
let currentStep = 1
const totalSteps = 3

function showStep(step) {
  // Hide all steps
  document.querySelectorAll(".form-step").forEach((s) => s.classList.remove("active"))
  document.querySelectorAll(".step").forEach((s) => s.classList.remove("active"))

  // Show current step
  document.querySelector(`[data-step="${step}"]`).classList.add("active")
  document.querySelector(`.form-step[data-step="${step}"]`).classList.add("active")

  // Update navigation buttons
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const submitBtn = document.querySelector(".submit-btn")

  prevBtn.style.display = step === 1 ? "none" : "inline-block"
  nextBtn.style.display = step === totalSteps ? "none" : "inline-block"
  submitBtn.style.display = step === totalSteps ? "inline-block" : "none"
}

function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++
    showStep(currentStep)
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--
    showStep(currentStep)
  }
}

// Form Validation
function validateStep(step) {
  const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`)
  const requiredFields = currentStepElement.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#e74c3c"
      isValid = false
    } else {
      field.style.borderColor = "#ddd"
    }
  })

  return isValid
}

// Override nextStep to include validation
const originalNextStep = nextStep
nextStep = () => {
  if (validateStep(currentStep)) {
    originalNextStep()
  } else {
    alert("Please fill in all required fields.")
  }
}

// Chatbot Functionality
const chatbot = document.getElementById("chatbot")
const chatbotMessages = document.getElementById("chatbotMessages")
const chatbotInput = document.getElementById("chatbotInput")

function toggleChatbot() {
  chatbot.classList.toggle("active")
}

function sendMessage() {
  const message = chatbotInput.value.trim()
  if (!message) return

  // Add user message
  addMessage(message, "user")
  chatbotInput.value = ""

  // Simulate bot response
  setTimeout(() => {
    const response = getBotResponse(message)
    addMessage(response, "bot")
  }, 1000)
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}-message`
  messageDiv.innerHTML = `<p>${text}</p>`
  chatbotMessages.appendChild(messageDiv)
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

function getBotResponse(message) {
  const responses = {
    hello: "Hello! Welcome to T&T Junior School. How can I help you today?",
    admissions: "Our admissions are open year-round. You can apply through our online form or visit our campus.",
    fees: "Our fees range from UGX 150,000 to UGX 250,000 per term depending on the grade level.",
    contact: "You can reach us at +256 752 783883 or email info@tandtjuniorschools.com",
    location: "We are located on Nakawuka Road, Kasenge, Uganda.",
    programs: "We offer Nursery, Pre-Primary, and Primary education (P1-P7) with excellent facilities.",
    default:
      "Thank you for your question. For detailed information, please contact our admissions office at +256 752 783883.",
  }

  const lowerMessage = message.toLowerCase()

  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }

  return responses.default
}

// Enter key for chatbot
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage()
  }
})

// Back to Top Button
const backToTop = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }
})

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Form Submissions
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault()

    // Add loading state
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.innerHTML = '<span class="spinner"></span>Sending...'
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you! Your message has been sent successfully.")
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false

      // Reset wizard if it's the admission form
      if (this.id === "admissionForm") {
        currentStep = 1
        showStep(currentStep)
      }
    }, 2000)
  })
})

// Gallery Modal (if needed)
function openGalleryModal(imageSrc) {
  const modal = document.createElement("div")
  modal.className = "gallery-modal"
  modal.innerHTML = `
        <div class="modal-overlay" onclick="closeGalleryModal()">
            <div class="modal-content">
                <img src="${imageSrc}" alt="Gallery Image">
                <button class="modal-close" onclick="closeGalleryModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"
}

function closeGalleryModal() {
  const modal = document.querySelector(".gallery-modal")
  if (modal) {
    modal.remove()
    document.body.style.overflow = "auto"
  }
}

// Add click events to gallery items
document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    openGalleryModal(img.src)
  })
})

// PWA Installation
let deferredPrompt

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault()
  deferredPrompt = e

  // Show install button
  const installBtn = document.createElement("button")
  installBtn.textContent = "Install App"
  installBtn.className = "install-btn btn btn-primary"
  installBtn.style.position = "fixed"
  installBtn.style.bottom = "100px"
  installBtn.style.left = "20px"
  installBtn.style.zIndex = "1000"

  installBtn.addEventListener("click", () => {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
      }
      deferredPrompt = null
      installBtn.remove()
    })
  })

  document.body.appendChild(installBtn)
})

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img)
})

// Hero Image Slider
let currentHeroSlideIndex = 0
const heroSlides = document.querySelectorAll(".slide")
const heroDots = document.querySelectorAll(".dot")
const totalHeroSlides = heroSlides.length

// Hero Image Slider with synchronized content
function showHeroSlide(index) {
  // Hide all slides and content
  heroSlides.forEach((slide) => slide.classList.remove("active"))
  heroDots.forEach((dot) => dot.classList.remove("active"))

  // Hide all slide content
  const slideContents = document.querySelectorAll(".slide-content")
  slideContents.forEach((content) => content.classList.remove("active"))

  // Show current slide and content
  heroSlides[index].classList.add("active")
  heroDots[index].classList.add("active")

  // Show corresponding slide content
  const currentContent = document.querySelector(`[data-slide="${index}"]`)
  if (currentContent) {
    currentContent.classList.add("active")
  }
}

function nextHeroSlide() {
  currentHeroSlideIndex = (currentHeroSlideIndex + 1) % totalHeroSlides
  showHeroSlide(currentHeroSlideIndex)
}

function prevHeroSlide() {
  currentHeroSlideIndex = (currentHeroSlideIndex - 1 + totalHeroSlides) % totalHeroSlides
  showHeroSlide(currentHeroSlideIndex)
}

function changeHeroSlide(direction) {
  if (direction === 1) {
    nextHeroSlide()
  } else {
    prevHeroSlide()
  }
}

function currentHeroSlide(index) {
  currentHeroSlideIndex = index - 1
  showHeroSlide(currentHeroSlideIndex)
}

// Auto-advance hero slider
let heroSliderInterval = setInterval(nextHeroSlide, 5000)

// Pause auto-advance on hover
const heroSection = document.querySelector(".hero")
heroSection.addEventListener("mouseenter", () => {
  clearInterval(heroSliderInterval)
})

heroSection.addEventListener("mouseleave", () => {
  heroSliderInterval = setInterval(nextHeroSlide, 5000)
})

// Touch/swipe support for mobile
let touchStartX = 0
let touchEndX = 0

heroSection.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

heroSection.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      nextHeroSlide()
    } else {
      // Swipe right - previous slide
      prevHeroSlide()
    }
  }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevHeroSlide()
  } else if (e.key === "ArrowRight") {
    nextHeroSlide()
  }
})

// Preload hero images
function preloadHeroImages() {
  const slides = document.querySelectorAll(".slide img")
  slides.forEach((img, index) => {
    if (index === 0) {
      // First image loads immediately
      img.style.opacity = "1"
    } else {
      // Preload other images
      const imageLoader = new Image()
      imageLoader.onload = () => {
        img.style.opacity = "1"
      }
      imageLoader.src = img.src
    }
  })
}

// Add hamburger animation styles
const style = document.createElement("style")
style.textContent = `
  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
`
document.head.appendChild(style)

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize first step of wizard
  showStep(1)

  // Add loading class to forms
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function () {
      this.classList.add("loading")
    })
  })

  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== "undefined") {
    if (typeof AOS.init === "function") {
      AOS.init({
        duration: 800,
        once: true,
      })
    }
  }

  // Show first slide
  showHeroSlide(0)

  // Add loading animation to slides
  heroSlides.forEach((slide, index) => {
    slide.style.animationDelay = `${index * 0.2}s`
  })

  // Call preload function
  preloadHeroImages()
})

// Auto-update copyright year
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear()
  const yearElement = document.getElementById("currentYear")
  if (yearElement) {
    yearElement.textContent = currentYear
  }
})
