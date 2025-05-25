// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all interactive components
  initializeDropdowns()
  initializeModals()
  initializeFAQs()
  initializeSlider()
  initializeBookingSteps()
  initializeSeatSelection()
  initializeCountdowns()
  initializeFormValidation()
  initializeAnimations()
  initializeAuth()
})

// Dropdown menus (for ticket actions)
function initializeDropdowns() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation()
      const dropdown = this.nextElementSibling

      // Close all other dropdowns
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== dropdown) {
          menu.style.display = "none"
        }
      })

      // Toggle current dropdown
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block"
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.style.display = "none"
    })
  })
}

// Modal functionality (for ticket changes and cancellations)
function initializeModals() {
  // Open modals
  const changeTicketButtons = document.querySelectorAll(".change-ticket")
  const cancelTicketButtons = document.querySelectorAll(".cancel-ticket")
  const closeModalButtons = document.querySelectorAll(".close-modal")

  changeTicketButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      document.getElementById("change-ticket-modal").style.display = "flex"
    })
  })

  cancelTicketButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      document.getElementById("cancel-ticket-modal").style.display = "flex"
    })
  })

  // Close modals
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modals = document.querySelectorAll(".modal")
      modals.forEach((modal) => {
        modal.style.display = "none"
      })
    })
  })

  // Close modal when clicking outside the content
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none"
      }
    })
  })
}

// FAQ accordion functionality
function initializeFAQs() {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling
      const icon = this.querySelector(".faq-toggle i")

      // Toggle answer visibility
      if (answer.style.display === "block") {
        answer.style.display = "none"
        icon.classList.remove("fa-chevron-up")
        icon.classList.add("fa-chevron-down")
      } else {
        answer.style.display = "block"
        icon.classList.remove("fa-chevron-down")
        icon.classList.add("fa-chevron-up")
      }
    })
  })
}

// Testimonial slider
function initializeSlider() {
  const testimonials = document.querySelectorAll(".testimonial")
  if (testimonials.length === 0) return

  let currentSlide = 0
  const prevButton = document.querySelector(".slider-controls .prev")
  const nextButton = document.querySelector(".slider-controls .next")

  // Show only the current slide
  function showSlide(index) {
    testimonials.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none"
    })
  }

  // Initialize with first slide
  showSlide(currentSlide)

  // Previous slide button
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length
      showSlide(currentSlide)
    })
  }

  // Next slide button
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % testimonials.length
      showSlide(currentSlide)
    })
  }

  // Auto-rotate slides every 5 seconds
  setInterval(() => {
    if (document.querySelector(".testimonial-slider")) {
      currentSlide = (currentSlide + 1) % testimonials.length
      showSlide(currentSlide)
    }
  }, 5000)
}

// Booking process steps
function initializeBookingSteps() {
  const nextButtons = document.querySelectorAll(".next-step")
  const prevButtons = document.querySelectorAll(".prev-step")
  const steps = document.querySelectorAll(".booking-steps .step")
  const stepContents = document.querySelectorAll(".booking-step-content")

  if (steps.length === 0 || stepContents.length === 0) return

  let currentStep = 0

  // Show the current step
  function showStep(index) {
    steps.forEach((step, i) => {
      if (i <= index) {
        step.classList.add("active")
      } else {
        step.classList.remove("active")
      }
    })

    stepContents.forEach((content, i) => {
      if (i === index) {
        content.classList.add("active")
      } else {
        content.classList.remove("active")
      }
    })

    // Scroll to top of booking container
    const bookingContainer = document.querySelector(".booking-container")
    if (bookingContainer) {
      bookingContainer.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Next step buttons
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++
        showStep(currentStep)
      }
    })
  })

  // Previous step buttons
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--
        showStep(currentStep)
      }
    })
  })
}

// Seat selection functionality
function initializeSeatSelection() {
  const availableSeats = document.querySelectorAll(".seat.available")
  const selectedSeatsList = document.getElementById("selected-seats")
  const totalPriceElement = document.getElementById("total-price")

  if (!availableSeats.length || !selectedSeatsList) return

  const basePrice = 45 // Base price per seat
  const bookingFee = 5 // Booking fee
  let selectedSeats = []

  availableSeats.forEach((seat) => {
    seat.addEventListener("click", function () {
      const seatId = this.getAttribute("data-seat")

      if (this.classList.contains("selected")) {
        // Deselect seat
        this.classList.remove("selected")
        this.classList.add("available")
        selectedSeats = selectedSeats.filter((id) => id !== seatId)
      } else {
        // Select seat
        this.classList.remove("available")
        this.classList.add("selected")
        selectedSeats.push(seatId)
      }

      // Update selected seats list
      if (selectedSeats.length === 0) {
        selectedSeatsList.innerHTML = "<p>No seats selected yet</p>"
      } else {
        selectedSeatsList.innerHTML = selectedSeats
          .map(
            (id) =>
              `<div class="selected-seat-item">
                        <span>Seat ${id}</span>
                        <span>$${basePrice.toFixed(2)}</span>
                    </div>`,
          )
          .join("")
      }

      // Update total price
      if (totalPriceElement) {
        const total = basePrice * selectedSeats.length + bookingFee
        totalPriceElement.textContent = `$${total.toFixed(2)}`
      }
    })
  })
}

// Countdown timers for free cancellation
function initializeCountdowns() {
  const countdownElements = document.querySelectorAll(".countdown")

  countdownElements.forEach((element) => {
    // Set a random time between 30-60 minutes for demo purposes
    let minutes = Math.floor(Math.random() * 30) + 30
    let seconds = 59

    const countdownInterval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          element.innerHTML = "Free cancellation period has expired"
          element.style.backgroundColor = "#f44336"
          clearInterval(countdownInterval)
          return
        }
        minutes--
        seconds = 59
      } else {
        seconds--
      }

      element.querySelector("span").textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }, 1000)
  })

  // Update current time
  const currentTimeElement = document.getElementById("current-time")
  const cancellationDeadlineElement = document.getElementById("cancellation-deadline")

  if (currentTimeElement && cancellationDeadlineElement) {
    function updateTime() {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"
      const formattedHours = hours % 12 || 12

      currentTimeElement.textContent = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`

      // Set deadline 1 hour from now
      const deadline = new Date(now.getTime() + 60 * 60 * 1000)
      const deadlineHours = deadline.getHours()
      const deadlineMinutes = deadline.getMinutes()
      const deadlineAmpm = deadlineHours >= 12 ? "PM" : "AM"
      const formattedDeadlineHours = deadlineHours % 12 || 12

      cancellationDeadlineElement.textContent = `${formattedDeadlineHours}:${deadlineMinutes.toString().padStart(2, "0")} ${deadlineAmpm}`
    }

    updateTime()
    setInterval(updateTime, 60000) // Update every minute
  }
}

// Form validation
function initializeFormValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      let isValid = true

      // Check required fields
      const requiredFields = form.querySelectorAll("[required]")
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")

          // Add error message if it doesn't exist
          let errorMessage = field.nextElementSibling
          if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("p")
            errorMessage.classList.add("error-message")
            errorMessage.style.color = "#f44336"
            errorMessage.style.fontSize = "0.875rem"
            errorMessage.style.marginTop = "0.25rem"
            errorMessage.textContent = "This field is required"
            field.parentNode.insertBefore(errorMessage, field.nextSibling)
          }
        } else {
          field.classList.remove("error")

          // Remove error message if it exists
          const errorMessage = field.nextElementSibling
          if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.remove()
          }
        }
      })

      // Validate email fields
      const emailFields = form.querySelectorAll('input[type="email"]')
      emailFields.forEach((field) => {
        if (field.value.trim() && !isValidEmail(field.value)) {
          isValid = false
          field.classList.add("error")

          // Add error message if it doesn't exist
          let errorMessage = field.nextElementSibling
          if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("p")
            errorMessage.classList.add("error-message")
            errorMessage.style.color = "#f44336"
            errorMessage.style.fontSize = "0.875rem"
            errorMessage.style.marginTop = "0.25rem"
            errorMessage.textContent = "Please enter a valid email address"
            field.parentNode.insertBefore(errorMessage, field.nextSibling)
          }
        }
      })

      // If form is not valid, prevent submission
      if (!isValid) {
        e.preventDefault()
      } else {
        // For demo purposes, show success message instead of submitting
        if (!form.classList.contains("newsletter-form") && !form.classList.contains("status-form")) {
          e.preventDefault()
          showSuccessMessage(form)
        }
      }
    })
  })

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Show success message after form submission
  function showSuccessMessage(form) {
    // Hide the form
    form.style.display = "none"

    // Create success message
    const successMessage = document.createElement("div")
    successMessage.classList.add("success-message")
    successMessage.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #4caf50; margin-bottom: 1rem;"></i>
                <h3>Thank You!</h3>
                <p>Your submission has been received successfully.</p>
                <p>We will get back to you shortly.</p>
            </div>
        `

    // Insert success message after the form
    form.parentNode.insertBefore(successMessage, form.nextSibling)
  }
}

// Animations
function initializeAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in, .pulse")

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Add animation class when element is in viewport
  function checkAnimations() {
    animatedElements.forEach((element) => {
      if (isInViewport(element) && !element.classList.contains("animated")) {
        element.classList.add("animated")
      }
    })
  }

  // Check animations on scroll
  window.addEventListener("scroll", checkAnimations)

  // Check animations on page load
  checkAnimations()

  // Pulse animation for CTA buttons
  const pulseButtons = document.querySelectorAll(".pulse")
  pulseButtons.forEach((button) => {
    setInterval(() => {
      button.classList.add("pulsing")
      setTimeout(() => {
        button.classList.remove("pulsing")
      }, 1000)
    }, 3000)
  })
}

// Add CSS for animations
const animationStyles = document.createElement("style")
animationStyles.textContent = `
    .fade-in {
        opacity: 0;
        transition: opacity 1s ease-in-out;
    }
    
    .fade-in.animated {
        opacity: 1;
    }
    
    .slide-in {
        transform: translateY(50px);
        opacity: 0;
        transition: transform 0.8s ease-out, opacity 0.8s ease-out;
    }
    
    .slide-in.animated {
        transform: translateY(0);
        opacity: 1;
    }
    
    .pulse {
        transition: transform 0.3s ease-in-out;
    }
    
    .pulse.pulsing {
        animation: pulse-animation 1s ease-in-out;
    }
    
    @keyframes pulse-animation {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`
document.head.appendChild(animationStyles)

// Schedule search functionality
const scheduleSearchForm = document.getElementById("schedule-search-form")
if (scheduleSearchForm) {
  scheduleSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const departure = document.getElementById("departure").value
    const arrival = document.getElementById("arrival").value
    const date = document.getElementById("date").value

    // In a real application, this would make an API call to fetch train schedules
    // For demo purposes, we'll just show a loading indicator and then reveal results

    const resultsSection = document.querySelector(".schedule-results")
    resultsSection.innerHTML =
      '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching for trains...</div>'

    setTimeout(() => {
      resultsSection.scrollIntoView({ behavior: "smooth" })
      resultsSection.innerHTML = document.querySelector(".schedule-results").innerHTML

      // Update the route information in the results
      const departureStations = document.querySelectorAll(".departure .station")
      const arrivalStations = document.querySelectorAll(".arrival .station")
      const dateElements = document.querySelectorAll(".date")

      departureStations.forEach((station) => {
        station.textContent = document.querySelector(`#departure option[value="${departure}"]`).textContent
      })

      arrivalStations.forEach((station) => {
        station.textContent = document.querySelector(`#arrival option[value="${arrival}"]`).textContent
      })

      dateElements.forEach((dateEl) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        dateEl.textContent = formattedDate
      })
    }, 1500)
  })
}

// Live chat functionality
const startChatButton = document.querySelector(".start-chat")
if (startChatButton) {
  startChatButton.addEventListener("click", () => {
    // Create chat window
    const chatWindow = document.createElement("div")
    chatWindow.classList.add("chat-window")
    chatWindow.innerHTML = `
            <div class="chat-header">
                <h3>Live Chat</h3>
                <button class="close-chat"><i class="fas fa-times"></i></button>
            </div>
            <div class="chat-messages">
                <div class="message agent">
                    <div class="message-content">
                        <p>Hello! Welcome to TrainEase customer support. How can I help you today?</p>
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message here...">
                <button class="send-message"><i class="fas fa-paper-plane"></i></button>
            </div>
        `

    document.body.appendChild(chatWindow)

    // Add chat window styles
    const chatStyles = document.createElement("style")
    chatStyles.textContent = `
            .chat-window {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 450px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                z-index: 1000;
                overflow: hidden;
            }
            
            .chat-header {
                background-color: var(--primary-color);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chat-header h3 {
                margin: 0;
                color: white;
            }
            
            .close-chat {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1.2rem;
            }
            
            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
            }
            
            .message {
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
            }
            
            .message.agent .message-content {
                background-color: var(--primary-light);
                color: white;
                align-self: flex-start;
                border-radius: 15px 15px 15px 0;
            }
            
            .message.user .message-content {
                background-color: var(--accent-color);
                color: var(--text-color);
                align-self: flex-end;
                border-radius: 15px 15px 0 15px;
            }
            
            .message-content {
                padding: 10px 15px;
                max-width: 80%;
            }
            
            .message-content p {
                margin: 0;
            }
            
            .message-time {
                font-size: 0.75rem;
                color: var(--gray-dark);
                margin-top: 5px;
            }
            
            .message.agent .message-time {
                align-self: flex-start;
            }
            
            .message.user .message-time {
                align-self: flex-end;
            }
            
            .chat-input {
                display: flex;
                padding: 10px;
                border-top: 1px solid var(--gray);
            }
            
            .chat-input input {
                flex: 1;
                padding: 10px;
                border: 1px solid var(--gray);
                border-radius: 20px;
                margin-right: 10px;
            }
            
            .send-message {
                background-color: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
            }
        `
    document.head.appendChild(chatStyles)

    // Close chat window
    const closeChat = document.querySelector(".close-chat")
    closeChat.addEventListener("click", () => {
      chatWindow.remove()
    })

    // Send message
    const sendMessage = document.querySelector(".send-message")
    const messageInput = document.querySelector(".chat-input input")

    function sendUserMessage() {
      const message = messageInput.value.trim()
      if (message) {
        const chatMessages = document.querySelector(".chat-messages")
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        // Add user message
        chatMessages.innerHTML += `
                    <div class="message user">
                        <div class="message-content">
                            <p>${message}</p>
                        </div>
                        <div class="message-time">${time}</div>
                    </div>
                `

        // Clear input
        messageInput.value = ""

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight

        // Simulate agent response after a delay
        setTimeout(() => {
          const responses = [
            "Thank you for your message. How can I assist you further?",
            "I understand. Let me check that for you.",
            "Is there anything else you'd like to know about our train services?",
            "I'll connect you with a specialist who can help with that specific issue.",
            "Our customer service team is available 24/7 to assist you with any concerns.",
          ]

          const randomResponse = responses[Math.floor(Math.random() * responses.length)]

          chatMessages.innerHTML += `
                        <div class="message agent">
                            <div class="message-content">
                                <p>${randomResponse}</p>
                            </div>
                            <div class="message-time">Just now</div>
                        </div>
                    `

          // Scroll to bottom
          chatMessages.scrollTop = chatMessages.scrollHeight
        }, 1000)
      }
    }

    sendMessage.addEventListener("click", sendUserMessage)

    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendUserMessage()
      }
    })

    // Focus on input
    messageInput.focus()
  })
}

// Authentication functionality
function initializeAuth() {
  initializeLoginForm()
  initializeRegisterForm()
  initializePasswordToggles()
  initializePasswordStrength()
  initializePasswordMatch()
}

// Login form functionality
function initializeLoginForm() {
  const loginForm = document.getElementById("login-form")
  if (!loginForm) return

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const rememberMe = document.getElementById("remember-me").checked

    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]')
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    btnText.style.display = "none"
    btnLoading.style.display = "inline-flex"
    submitBtn.disabled = true

    // Simulate API call
    try {
      await simulateLogin(email, password, rememberMe)

      // Show success modal
      document.getElementById("login-success-modal").style.display = "flex"

      // Store user session (for demo purposes)
      localStorage.setItem("userEmail", email)
      localStorage.setItem("isLoggedIn", "true")
    } catch (error) {
      // Show error message
      showFormError(loginForm, error.message)
    } finally {
      // Reset button state
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
      submitBtn.disabled = false
    }
  })
}

// Register form functionality
function initializeRegisterForm() {
  const registerForm = document.getElementById("register-form")
  if (!registerForm) return

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
      terms: document.getElementById("terms").checked,
      newsletter: document.getElementById("newsletter").checked,
    }

    // Validate form
    if (!validateRegistrationForm(formData)) {
      return
    }

    // Show loading state
    const submitBtn = registerForm.querySelector('button[type="submit"]')
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    btnText.style.display = "none"
    btnLoading.style.display = "inline-flex"
    submitBtn.disabled = true

    // Simulate API call
    try {
      await simulateRegistration(formData)

      // Show success modal
      document.getElementById("register-success-modal").style.display = "flex"

      // Store user session (for demo purposes)
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("userName", formData.fullName)
      localStorage.setItem("isLoggedIn", "true")
    } catch (error) {
      // Show error message
      showFormError(registerForm, error.message)
    } finally {
      // Reset button state
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
      submitBtn.disabled = false
    }
  })
}

// Password toggle functionality
function initializePasswordToggles() {
  const passwordToggles = document.querySelectorAll(".password-toggle")

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const passwordInput = this.parentElement.querySelector("input")
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })
}

// Password strength indicator
function initializePasswordStrength() {
  const passwordInput = document.getElementById("password")
  if (!passwordInput) return

  const strengthFill = document.querySelector(".strength-fill")
  const strengthText = document.querySelector(".strength-text")

  if (!strengthFill || !strengthText) return

  passwordInput.addEventListener("input", function () {
    const password = this.value
    const strength = calculatePasswordStrength(password)

    // Remove all strength classes
    strengthFill.classList.remove("weak", "fair", "good", "strong")

    if (password.length === 0) {
      strengthFill.style.width = "0%"
      strengthText.textContent = "Password strength"
      return
    }

    switch (strength.level) {
      case 1:
        strengthFill.classList.add("weak")
        strengthText.textContent = "Weak password"
        break
      case 2:
        strengthFill.classList.add("fair")
        strengthText.textContent = "Fair password"
        break
      case 3:
        strengthFill.classList.add("good")
        strengthText.textContent = "Good password"
        break
      case 4:
        strengthFill.classList.add("strong")
        strengthText.textContent = "Strong password"
        break
    }
  })
}

// Password match indicator
function initializePasswordMatch() {
  const passwordInput = document.getElementById("password")
  const confirmPasswordInput = document.getElementById("confirmPassword")
  const matchIndicator = document.querySelector(".password-match-indicator")

  if (!passwordInput || !confirmPasswordInput || !matchIndicator) return

  function checkPasswordMatch() {
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value

    if (confirmPassword.length === 0) {
      matchIndicator.textContent = ""
      matchIndicator.classList.remove("match", "no-match")
      return
    }

    if (password === confirmPassword) {
      matchIndicator.textContent = "✓ Passwords match"
      matchIndicator.classList.remove("no-match")
      matchIndicator.classList.add("match")
    } else {
      matchIndicator.textContent = "✗ Passwords do not match"
      matchIndicator.classList.remove("match")
      matchIndicator.classList.add("no-match")
    }
  }

  passwordInput.addEventListener("input", checkPasswordMatch)
  confirmPasswordInput.addEventListener("input", checkPasswordMatch)
}

// Calculate password strength
function calculatePasswordStrength(password) {
  let score = 0
  let level = 0

  // Length check
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  // Determine level
  if (score <= 2) level = 1
  else if (score <= 3) level = 2
  else if (score <= 4) level = 3
  else level = 4

  return { score, level }
}

// Validate registration form
function validateRegistrationForm(formData) {
  let isValid = true

  // Clear previous errors
  document.querySelectorAll(".error-message").forEach((msg) => msg.remove())
  document.querySelectorAll(".error").forEach((input) => input.classList.remove("error"))

  // Full name validation
  if (formData.fullName.trim().length < 2) {
    showFieldError("fullName", "Full name must be at least 2 characters long")
    isValid = false
  }

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  if (!isValidEmail(formData.email)) {
    showFieldError("email", "Please enter a valid email address")
    isValid = false
  }

  // Phone validation
  if (!isValidPhone(formData.phone)) {
    showFieldError("phone", "Please enter a valid phone number")
    isValid = false
  }

  // Password validation
  const passwordStrength = calculatePasswordStrength(formData.password)
  if (passwordStrength.level < 2) {
    showFieldError("password", "Password is too weak. Use at least 8 characters with mixed case, numbers, and symbols")
    isValid = false
  }

  // Password confirmation validation
  if (formData.password !== formData.confirmPassword) {
    showFieldError("confirmPassword", "Passwords do not match")
    isValid = false
  }

  // Terms validation
  if (!formData.terms) {
    showFieldError("terms", "You must agree to the Terms of Service")
    isValid = false
  }

  return isValid
}

// Show field error
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId)
  if (!field) return

  field.classList.add("error")

  const errorMessage = document.createElement("div")
  errorMessage.classList.add("error-message")
  errorMessage.textContent = message

  field.parentNode.insertBefore(errorMessage, field.nextSibling)
}

// Show form error
function showFormError(form, message) {
  // Remove existing error
  const existingError = form.querySelector(".form-error")
  if (existingError) existingError.remove()

  const errorDiv = document.createElement("div")
  errorDiv.classList.add("form-error")
  errorDiv.style.cssText = `
    background-color: #ffebee;
    color: #c62828;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    border-left: 4px solid #c62828;
  `
  errorDiv.textContent = message

  form.insertBefore(errorDiv, form.firstChild)
}

// Validate phone number
function isValidPhone(phone) {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  const cleanPhone = phone.replace(/[\s\-$$$$]/g, "")
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10
}

// Simulate login API call
async function simulateLogin(email, password, rememberMe) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo validation - in real app, this would be server-side
      if (email === "demo@trainease.com" && password === "password123") {
        resolve({ success: true, user: { email, name: "Demo User" } })
      } else if (email && password) {
        // For demo, accept any valid email/password combination
        resolve({ success: true, user: { email, name: "User" } })
      } else {
        reject(new Error("Invalid email or password"))
      }
    }, 1500)
  })
}

// Simulate registration API call
async function simulateRegistration(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo validation - in real app, this would be server-side
      if (formData.email === "existing@trainease.com") {
        reject(new Error("An account with this email already exists"))
      } else {
        resolve({ success: true, user: formData })
      }
    }, 2000)
  })
}
