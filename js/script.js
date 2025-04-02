// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links li');

  // Career Journey Animation
  const careerJourney = document.querySelector('.career-evolution');
  const journeyProgress = document.querySelector('.journey-progress');
  const milestones = document.querySelectorAll('.milestone');
  
  // Intersection Observer for career journey animation
  if (careerJourney && 'IntersectionObserver' in window) {
    const journeyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reset animation classes
          journeyProgress.style.animation = 'none';
          milestones.forEach(milestone => {
            milestone.style.animation = 'none';
          });
          
          // Force reflow
          void careerJourney.offsetWidth;
          
          // Restart animations
          journeyProgress.style.animation = 'grow-journey 1.5s 0.5s ease-out forwards';
          milestones[0].style.animation = 'fade-in-milestone 0.5s 0.8s ease-out forwards';
          milestones[1].style.animation = 'fade-in-milestone 0.5s 1.2s ease-out forwards';
          milestones[2].style.animation = 'fade-in-milestone 0.5s 1.6s ease-out forwards';
          milestones[3].style.animation = 'fade-in-milestone 0.5s 2.0s ease-out forwards';
          milestones[4].style.animation = 'fade-in-milestone 0.5s 2.4s ease-out forwards';
          milestones[5].style.animation = 'fade-in-milestone 0.5s 2.8s ease-out forwards';
          
          // Only disconnect if we need this to run once
          journeyObserver.disconnect();
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% of the element is visible
    });
    
    journeyObserver.observe(careerJourney);
  }
  
  // Add hover interactions to milestones
  milestones.forEach(milestone => {
    milestone.addEventListener('mouseenter', () => {
      const year = milestone.getAttribute('data-year');
      highlightTimelineByYear(year);
    });
    
    milestone.addEventListener('mouseleave', () => {
      removeTimelineHighlights();
    });
    
    milestone.addEventListener('click', () => {
      const year = milestone.getAttribute('data-year');
      scrollToExperienceByYear(year);
    });
  });
  
  // Function to highlight relevant experience in the timeline
  function highlightTimelineByYear(year) {
    document.querySelectorAll('.timeline-item').forEach(item => {
      const periodText = item.querySelector('.period').textContent;
      if ((year === '2014' && periodText.includes('2014')) ||
          (year === '2016' && periodText.includes('2016')) ||
          (year === '2018' && periodText.includes('2018')) ||
          (year === '2020' && periodText.includes('2020')) ||
          (year === '2023' && periodText.includes('2022')) || // Map 2023 to 2022 to maintain highlighting
          (year === '2025' && periodText.includes('Present'))) {
        item.classList.add('highlighted');
      }
    });
  }
  
  // Function to remove all timeline highlights
  function removeTimelineHighlights() {
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.classList.remove('highlighted');
    });
  }
  
  // Function to scroll to relevant experience section
  function scrollToExperienceByYear(year) {
    const experienceSection = document.getElementById('experience');
    
    let targetPeriod = year;
    // Map milestone years to actual timeline items
    if (year === '2023') targetPeriod = '2022';
    if (year === '2025') targetPeriod = 'Present';
    
    const targetItem = Array.from(document.querySelectorAll('.timeline-item')).find(item => {
      const periodText = item.querySelector('.period').textContent;
      return periodText.includes(targetPeriod);
    });
    
    if (experienceSection && targetItem) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
      
      // Add a delay to highlight the specific item
      setTimeout(() => {
        removeTimelineHighlights(); // Clear any previous highlights
        targetItem.classList.add('highlighted');
        
        // Add a small scroll to ensure the item is well in view
        window.scrollBy({
          top: -50,
          behavior: 'smooth'
        });
      }, 1000);
    }
  }

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

  // Timeline animation functionality with IntersectionObserver to trigger when in view
  const timeline = document.querySelector('.animated-timeline');
  if (timeline && 'IntersectionObserver' in window) {
    const yearMarkers = timeline.querySelectorAll('.year-marker');
    const progressLine = timeline.querySelector('.progress-line');
    const trackerDot = timeline.querySelector('.tracker-dot');
    const roleCards = timeline.querySelectorAll('.role-card');
    
    let currentIndex = 0;
    let animationInterval;
    let timelineObserver;
    let isAnimating = false;
    
    // Function to show a specific role card
    function showRoleCard(index) {
      // Hide all cards
      roleCards.forEach((card, i) => {
        card.classList.remove('active');
        card.style.opacity = '0';
      });
      
      // Show and position only the current card
      const currentCard = roleCards[index];
      if (currentCard) {
        currentCard.classList.add('active');
        
        // Position the card based on the tracker dot position
        const totalMarkers = yearMarkers.length;
        const percentage = (index / (totalMarkers - 1)) * 100;
        currentCard.style.left = `${percentage}%`;
        
        // Special animation for future growth card
        if (index === yearMarkers.length - 1) {
          // Scale effect for future card
          currentCard.style.transform = 'translateX(-50%) scale(0.8)';
          currentCard.style.opacity = '1';
          
          setTimeout(() => {
            currentCard.style.transform = 'translateX(-50%) scale(1)';
          }, 100);
        } else {
          // Make it visible
          currentCard.style.opacity = '1';
        }
      }
    }
    
    // Function to animate the timeline progression
    function animateTimeline(targetIndex, duration) {
      if (isAnimating) return;
      isAnimating = true;
      
      // Calculate target percentage
      const totalMarkers = yearMarkers.length;
      const targetPercentage = (targetIndex / (totalMarkers - 1)) * 100;
      
      // Get current position
      const startWidth = parseFloat(progressLine.style.width || '0');
      const startLeft = parseFloat(trackerDot.style.left || '0');
      const startTime = performance.now();
      
      // Update year markers
      yearMarkers.forEach((marker, i) => {
        marker.classList.toggle('active', i <= targetIndex);
      });
      
      // Check if we're moving to the future section
      if (targetIndex === yearMarkers.length - 1) {
        progressLine.classList.add('future-section');
        // Make tracker dot match the future card color scheme
        trackerDot.style.backgroundColor = '#F2A900'; // Golden/yellow color for 2025
        trackerDot.style.borderColor = '#F2A900';
        trackerDot.style.boxShadow = '0 0 15px rgba(242, 169, 0, 0.9)';
      } else {
        progressLine.classList.remove('future-section');
        trackerDot.style.backgroundColor = 'white';
        trackerDot.style.borderColor = '#4285F4';
        trackerDot.style.boxShadow = '0 0 10px rgba(66, 133, 244, 0.5)';
      }
      
      // Animation function
      function step(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const eased = progress < 0.5 ? 
          4 * progress * progress * progress : 
          1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        // Calculate current position
        const currentWidth = startWidth + (targetPercentage - startWidth) * eased;
        const currentLeft = startLeft + (targetPercentage - startLeft) * eased;
        
        // Update DOM elements
        progressLine.style.width = `${currentWidth}%`;
        trackerDot.style.left = `${currentLeft}%`;
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          progressLine.style.width = `${targetPercentage}%`;
          trackerDot.style.left = `${targetPercentage}%`;
          
          showRoleCard(targetIndex);
          currentIndex = targetIndex;
          isAnimating = false;
        }
      }
      
      requestAnimationFrame(step);
    }
    
    // Initialize timeline
    function initTimeline() {
      // Reset to initial state
      progressLine.style.width = '0%';
      trackerDot.style.left = '0%';
      currentIndex = 0;
      
      // Hide all cards initially
      roleCards.forEach(card => {
        card.classList.remove('active');
        card.style.opacity = '0';
      });
      
      // Show only the first card
      if (roleCards.length > 0) {
        roleCards[0].classList.add('active');
        roleCards[0].style.opacity = '1';
        roleCards[0].style.left = '0%';
      }
      
      // Set first year marker as active
      yearMarkers.forEach((marker, i) => {
        marker.classList.toggle('active', i === 0);
      });
      
      // Add click handling for year markers
      yearMarkers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
          if (!isAnimating) {
            animateTimeline(index, 1500);
            
            // Clear and restart the auto animation interval
            clearInterval(animationInterval);
            animationInterval = setInterval(nextPoint, 6000);
          }
        });
      });
    }
    
    // Function to advance to the next point
    function nextPoint() {
      const nextIndex = (currentIndex + 1) % yearMarkers.length;
      
      // Use longer duration for animation to the future state (last card)
      if (nextIndex === yearMarkers.length - 1) {
        animateTimeline(nextIndex, 1250); // 50% faster for future section (2500 * 0.5 = 1250)
      } else {
        animateTimeline(nextIndex, 1000); // 50% faster for regular animation (2000 * 0.5 = 1000)
      }
    }
    
    // Initialize observer to start animation when timeline is visible
    timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Initialize timeline when it enters viewport
          initTimeline();
          
          // Start automatic progression with the updated faster speed (50% faster)
          animationInterval = setInterval(nextPoint, 3000); // 50% faster (6000 * 0.5 = 3000)
          
          // Show first card immediately
          showRoleCard(0);
          
          // Only trigger once
          timelineObserver.disconnect();
        }
      });
    }, {
      threshold: 0.2
    });
    
    timelineObserver.observe(timeline);
  }
}); 