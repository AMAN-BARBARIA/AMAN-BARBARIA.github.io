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

  // Project cards and modal functionality
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content-container');
  const closeButton = document.querySelector('.close-button');

  // Project data
  const projectData = {
    jam: {
      title: "Jam - Decentralized Social App",
      subtitle: "Product Lead | 2022 - Present",
      description: `
        <p>Jam is the first fully functional social dApp built on the Farcaster protocol, providing a web3 social media experience with advanced features.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
          <li>Led the development team in creating a decentralized social media platform with over 15,000 active users</li>
          <li>Implemented AI-powered semantic search using Weaviate vector database, improving content discovery by 45%</li>
          <li>Developed trending topics algorithm and curated news features, increasing user engagement by 28%</li>
          <li>Integrated with Farcaster Hubs for decentralized data synchronization, ensuring data persistence and user sovereignty</li>
          <li>Built a responsive frontend interface with React Native, providing consistent experiences across web and mobile platforms</li>
        </ul>
        
        <h4>Technologies Used:</h4>
        <div class="modal-tech-stack">
          <span class="tech">Golang</span>
          <span class="tech">MongoDB</span>
          <span class="tech">Weaviate (Vector DB)</span>
          <span class="tech">React</span>
          <span class="tech">React Native</span>
          <span class="tech">Farcaster Protocol</span>
        </div>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/jam" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    moxie: {
      title: "Moxie - Online Fitness Platform",
      subtitle: "Lead Engineer - Consumer Team | 2020 - 2022",
      description: `
        <p>Moxie was built from scratch during the COVID-19 pandemic to connect fitness instructors with clients through live online classes.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
          <li>Designed and developed RESTful APIs and microservices architecture for a platform that scaled to 50,000+ instructors in the first year</li>
          <li>Implemented real-time video streaming infrastructure using AWS Chime, supporting thousands of concurrent sessions</li>
          <li>Created a robust payment processing system with Stripe, handling millions in transaction volume</li>
          <li>Built comprehensive analytics dashboards to track user engagement and instructor performance</li>
          <li>Optimized backend systems for high-volume traffic, reducing latency by 40%</li>
        </ul>
        
        <h4>Technologies Used:</h4>
        <div class="modal-tech-stack">
          <span class="tech">Node.js</span>
          <span class="tech">MySQL</span>
          <span class="tech">Redis</span>
          <span class="tech">AWS Chime</span>
          <span class="tech">Stripe</span>
          <span class="tech">React</span>
        </div>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/moxie" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    thursday: {
      title: "Thursday - Remote Team Socialization",
      subtitle: "Lead Engineer | 2019 - 2020",
      description: `
        <p>Thursday was developed to help remote teams socialize and engage through planned activities and events, addressing the growing demand for virtual team-building solutions.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
          <li>Led a team of developers in creating a platform that was adopted by over 200 companies in the first six months</li>
          <li>Improved system observability through comprehensive logging and monitoring with Datadog</li>
          <li>Integrated Slack APIs for enhanced user engagement, achieving a 65% active user rate</li>
          <li>Implemented automated deployment pipelines, reducing deployment time from hours to minutes</li>
          <li>Designed and built a scalable event scheduling system that handled thousands of concurrent events</li>
        </ul>
        
        <h4>Technologies Used:</h4>
        <div class="modal-tech-stack">
          <span class="tech">Golang</span>
          <span class="tech">PostgreSQL</span>
          <span class="tech">Kubernetes</span>
          <span class="tech">Datadog</span>
          <span class="tech">Docker</span>
          <span class="tech">Slack API</span>
        </div>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/thursday" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    ost: {
      title: "OST - Blockchain Ecosystem",
      subtitle: "Senior Software Engineer | 2017 - 2019",
      description: `
        <p>OST provides blockchain infrastructure for businesses, simplifying the integration of cryptocurrency and blockchain features into applications.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
          <li>Developed OST SDKs for multiple platforms, enabling seamless blockchain integration for developers</li>
          <li>Built an analytics platform for tracking blockchain transactions and user activities</li>
          <li>Led backend development for Pepo, a blockchain-powered social video app with over 100,000 users</li>
          <li>Productized the ICO platform into a B2B product, reducing KYC processing time by 75%</li>
          <li>Implemented smart contract integrations and wallet management systems</li>
        </ul>
        
        <h4>Technologies Used:</h4>
        <div class="modal-tech-stack">
          <span class="tech">Ruby on Rails</span>
          <span class="tech">Node.js</span>
          <span class="tech">Ethereum</span>
          <span class="tech">MySQL</span>
          <span class="tech">Redis</span>
          <span class="tech">Docker</span>
        </div>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/ost" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    pepo: {
      title: "Pepo Campaigns - Email Marketing Platform",
      subtitle: "Backend Engineer | 2016 - 2017",
      description: `
        <p>Pepo Campaigns is a scalable email marketing platform built on AWS SES, designed to handle millions of emails while maintaining cost-effectiveness.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
          <li>Implemented horizontal scaling using database sharding techniques, enabling the system to handle 10M+ emails per day</li>
          <li>Automated customer onboarding, reducing time from 1-2 days to just 1 hour</li>
          <li>Built a comprehensive analytics dashboard for campaign performance monitoring</li>
          <li>Developed real-time email tracking and analytics capabilities</li>
          <li>Created an automated email template management system</li>
        </ul>
        
        <h4>Technologies Used:</h4>
        <div class="modal-tech-stack">
          <span class="tech">Ruby on Rails</span>
          <span class="tech">MySQL</span>
          <span class="tech">AWS (S3, SES, SQS, SNS)</span>
          <span class="tech">DynamoDB</span>
          <span class="tech">Redis</span>
        </div>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/pepo-campaigns" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    hem: {
      title: "Hem.com - BI Solutions",
      subtitle: "Business Intelligence Engineer | 2014 - 2016",
      description: `
        <p>Developed business intelligence solutions for Hem.com, a customizable online furniture store, enabling data-driven decision making across the organization.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
          <li>Developed OLAP cubes and reporting tools for stakeholders, improving business insight capabilities</li>
          <li>Built data pipelines using Pentaho, integrating data from multiple sources including sales, inventory, and marketing</li>
          <li>Created a comprehensive data warehouse for efficient dashboard generation</li>
          <li>Implemented automated reporting systems for business metrics</li>
          <li>Designed and deployed predictive analytics models for inventory management</li>
        </ul>
        
        <h4>Technologies Used:</h4>
        <div class="modal-tech-stack">
          <span class="tech">Pentaho</span>
          <span class="tech">OLAP</span>
          <span class="tech">ETL pipelines</span>
          <span class="tech">Data Warehousing</span>
          <span class="tech">SQL</span>
        </div>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/hem" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    }
  };

  // Open modal with project details
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const project = projectData[projectId];

      if (project) {
        modalContent.innerHTML = `
          <h2>${project.title}</h2>
          <p class="modal-subtitle">${project.subtitle}</p>
          <div class="modal-description">
            ${project.description}
          </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      }
    });
  });

  // Close modal on close button click
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });

  // Close modal on escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });

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

  // Highlight active section in navigation
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100; // Adjust for navbar
      const sectionId = section.getAttribute('id');

      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
        document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  }

  // Run highlight function on scroll
  window.addEventListener('scroll', highlightActiveSection);

  // Add additional CSS to handle navbar scrolled state and other dynamic styles
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
    
    .nav-links a.active {
      position: relative;
    }
    
    .nav-links a.active::after {
      width: 100%;
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
    
    .modal-subtitle {
      color: var(--text-light);
      font-size: 1.1rem;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .modal-description h4 {
      color: var(--primary-color);
      margin: 20px 0 15px;
      font-size: 1.2rem;
    }
    
    .modal-description p {
      margin-bottom: 15px;
      line-height: 1.6;
    }
    
    .modal-description ul {
      margin-bottom: 20px;
      padding-left: 20px;
    }
    
    .modal-description li {
      margin-bottom: 8px;
      position: relative;
      list-style-type: disc;
    }
    
    .modal-tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 20px 0;
    }
    
    .modal-links {
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid var(--border-color);
    }
  `;
  document.head.appendChild(style);

  // Initialize
  highlightActiveSection();
}); 