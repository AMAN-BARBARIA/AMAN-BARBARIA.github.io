// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links li');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      // Toggle navigation menu
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');

      // Animate links
      navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
    });
  }

  // Close mobile menu when a link is clicked
  navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');

        navLinksItems.forEach(link => {
          link.style.animation = '';
        });
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Resume download functionality
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Implement resume download functionality or redirect to resume page
      alert('Resume download functionality will be implemented here. Replace with actual download link.');
    });
  }

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Basic validation
      if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }

      // Here you would typically send the form data using fetch or XMLHttpRequest
      // Since this is a GitHub Pages site (static), we're showing a success message instead
      // In a real application, you might use a service like Formspree, Netlify Forms, or a custom backend

      // Simulate form submission success
      showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  // Function to show form submission messages
  function showFormMessage(message, type) {
    // Check if there's already a message displayed
    let messageElement = document.querySelector('.form-message');

    // If not, create one
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      contactForm.appendChild(messageElement);
    }

    // Set message and styling
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;

    // Hide message after 3 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Add additional CSS to handle navbar scrolled state
  const style = document.createElement('style');
  style.textContent = `
    #navbar.scrolled {
      background-color: var(--primary-color);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 10px 0;
    }
    
    .form-message {
      padding: 10px;
      margin-top: 15px;
      border-radius: var(--border-radius);
      text-align: center;
    }
    
    .form-message.success {
      background-color: rgba(76, 175, 80, 0.2);
      color: var(--success-color);
      border: 1px solid var(--success-color);
    }
    
    .form-message.error {
      background-color: rgba(244, 67, 54, 0.2);
      color: var(--error-color);
      border: 1px solid var(--error-color);
    }
    
    @keyframes navLinkFade {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;
  document.head.appendChild(style);
}); 