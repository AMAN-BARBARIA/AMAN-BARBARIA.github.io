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
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scrolling for nav links
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
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

  // Project data
  const projectData = {
    jam: {
      title: "Jam - Decentralized Social App",
      subtitle: "Product Owner | 2022 - 2023",
      domain: "Blockchain",
      description: `
        <p>Jam is the first fully functional social dApp built on the Farcaster protocol, providing a web3 social media experience with advanced features.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
        <li><b>Led the engineering team</b> in building a decentralized social media platform, with over <b>15,000+ active users</b> while maintaining a fast-paced release cycle.</li>
          <li><b>Implemented AI-powered semantic search</b> using Weaviate vector database, improving content discovery by 45%</li>
          <li>Designed and launched <b>trending topics</b> and <b>curated news</b> features, leading to a 28% increase in user engagement</li>
          <li>Enabled <b>auto-scaling and dynamic preview environments</b> using Kubernetes, allowing seamless load-based scaling and on-demand testing of new features during development</li>
          <li>Integrated with Farcaster Hubs for decentralized data synchronization, ensuring data persistence, user control, and platform resilience</li>
        </ul>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/jam" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    moxie: {
      title: "Moxie - Online Fitness Platform",
      subtitle: "Lead Engineer - Consumer Team | 2020 - 2022",
      domain: "E-commerce",
      description: `
        <p>Moxie was an all-in-one solution for fitness coaches to manage every aspect of their business including live-streaming of classes, scheduling, payments, and promotions.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
          <li>Led the Consumer Team, responsible for user onboarding, classes management, marketplace, and discovery.</li>
          <li>Designed and developed REST APIs for mobile and web apps allowing 1,00,000+ users streaming live classes in the first year.</p>
          <li>Built an internal CMS & CRM tool on Slack for the Moxie admin team, increasing operational efficiency by 2x-3x.</p>
        </ul>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/moxie" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    thursday: {
      title: "Thursday - Remote Team Socialization",
      subtitle: "Lead Engineer | 2019 - 2020",
      domain: "SaaS",
      description: `
        <p>Thursday was developed to help remote teams socialize and engage through planned activities and events, addressing the growing demand for virtual team-building solutions.</p>
        
        <h4>Key Achievements:</h4>
        <ul>
          <li>Led a team of developers in building a platform that was adopted by over 200 companies</li>
          <li>Improved system observability through comprehensive logging and monitoring with NewRelic</li>
          <li>Integrated Slack APIs for enhanced user engagement, achieving a 65% active user rate</li>
          <li>Implemented automated deployment pipelines, reducing deployment time from hours to minutes</li>
          <li>Designed and built a scalable event scheduling system that handled thousands of concurrent events</li>
        </ul>
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/thursday" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    ost: {
      title: "OST - Blockchain Ecosystem",
      subtitle: "Senior Software Engineer | 2017 - 2019",
      domain: "Blockchain SaaS",
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
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/ost" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    pepo: {
      title: "Pepo Campaigns - Email Marketing Platform",
      subtitle: "Backend Engineer | 2016 - 2017",
      domain: "SaaS",
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
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/pepo-campaigns" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    },
    hem: {
      title: "Hem.com - BI Solutions",
      subtitle: "Business Intelligence Engineer | 2014 - 2016",
      domain: "E-commerce",
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
        
        <div class="modal-links">
          <a href="https://truesparrow.com/case-study/hem" class="project-link" target="_blank"><i class="fas fa-file-alt"></i> View Full Case Study</a>
        </div>
      `
    }
  };

  // Ensure project cards and sliders are properly clickable
  // Open modal with project details when clicking on the card (but not on the image slider)
  projectCards.forEach(card => {
    // Remove any existing click handler to avoid duplication
    card.removeEventListener('click', handleCardClick);
    
    // Add click handler
    card.addEventListener('click', handleCardClick);
    
    // Define the click handler as a named function so we can remove it if needed
    function handleCardClick(e) {
      // Check if the click originated from or within an image-slider
      if (e.target.closest('.image-slider')) {
        // Don't open project details modal when clicking on image slider
        return;
      }
      
      const projectId = card.getAttribute('data-project');
      const project = projectData[projectId];

      if (project) {
        // Parse the subtitle to extract role and years
        const subtitleParts = project.subtitle.split('|');
        const role = subtitleParts[0].trim();
        const years = subtitleParts[1] ? subtitleParts[1].trim() : '';

        // Extract background gradient colors from project card for consistency
        const cardStyle = window.getComputedStyle(card);
        const bgColor = cardStyle.background;
        
        // Determine domain badge color and icon based on project type
        let domainBadgeStyle = '';
        let domainIcon = '';
        let headerImage = '';
        let lightBgColor = '';
        
        if (projectId === 'jam' || projectId === 'ost') {
          domainBadgeStyle = 'background: linear-gradient(135deg, #4E1B53 0%, #8A3BAD 100%);'; // Purple for blockchain
          domainIcon = '<i class="fab fa-ethereum"></i> ';
          headerImage = projectId === 'jam' ? './images/jam-hero-image.png' : './images/ost-kyc.png';
          lightBgColor = 'rgba(138, 59, 173, 0.03)'; // Very light purple
        } else if (projectId === 'moxie' || projectId === 'hem') {
          domainBadgeStyle = 'background: linear-gradient(135deg, #D28568 0%, #E5A189 100%);'; // Orange for e-commerce
          domainIcon = '<i class="fas fa-shopping-cart"></i> ';
          headerImage = projectId === 'moxie' ? './images/moxie-web-mobile.png' : './images/hem-shelf-configurator.png';
          lightBgColor = 'rgba(229, 161, 137, 0.03)'; // Very light orange
        } else if (projectId === 'thursday' || projectId === 'pepo') {
          domainBadgeStyle = 'background: linear-gradient(135deg, #30B3C5 0%, #4CCAD9 100%);'; // Blue for SaaS
          domainIcon = '<i class="fas fa-cloud"></i> ';
          headerImage = projectId === 'thursday' ? './images/thursday-hero-image.png' : './images/pepo-hero-image.png';
          lightBgColor = 'rgba(76, 202, 217, 0.03)'; // Very light blue
        }

        // Completely redesigned modal with more elegant, professional layout
        modalContent.innerHTML = `
          <div class="md-showcase">
            <div class="md-showcase__header" style="${domainBadgeStyle.replace('background', 'background-image')}">
              <div class="md-showcase__header-bg" style="background-image: url('${headerImage}')"></div>
              <div class="md-showcase__header-content">
                <div class="md-showcase__domain-badge" style="${domainBadgeStyle}">${domainIcon}${project.domain}</div>
                <h2 class="md-showcase__title">${project.title}</h2>
                <div class="md-showcase__meta">
                  <span class="md-showcase__role-period"><i class="fas fa-user-tie"></i> ${role}</span>
                  <span class="md-showcase__separator">•</span>
                  <span class="md-showcase__time-period"><i class="far fa-calendar-alt"></i> ${years}</span>
                </div>
              </div>
            </div>
            
            <div class="md-showcase__content" style="background-color: ${lightBgColor};">
              <div class="md-showcase__section md-showcase__overview">
                <div class="md-showcase__description">
                  ${project.description.split('<h4>Key Achievements:</h4>')[0]}
                </div>
              </div>
              
              <div class="md-showcase__section">
                <div class="md-showcase__section-header">
                  <h3 class="md-showcase__section-title"><i class="fas fa-trophy" style="color: ${lightBgColor.replace('0.03', '1')}"></i> Key Achievements</h3>
                  <div class="md-showcase__section-bar" style="${domainBadgeStyle}"></div>
                </div>
                <div class="md-showcase__achievements">
                  ${project.description.includes('<h4>Key Achievements:</h4>') ? 
                    project.description.split('<h4>Key Achievements:</h4>')[1].split('<h4>Technologies Used:</h4>')[0] : ''}
                </div>
              </div>
              
              <div class="md-showcase__section md-showcase__hire-me" style="border-color: ${lightBgColor.replace('0.03', '0.2')};">
                <div class="md-showcase__hire-message">
                  <div class="md-showcase__hire-icon" style="${domainBadgeStyle}">
                    <i class="fas fa-lightbulb"></i>
                  </div>
                  <div class="md-showcase__hire-text">
                    <h4>How I can add value to your team</h4>
                    <p>My work on this project demonstrates expertise in ${project.domain} development, combining technical skills with product vision. I can bring this same passion and dedication to your organization.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="md-showcase__footer" style="background-color: ${lightBgColor};">
              ${project.description.includes('<div class="modal-links">') ? 
                project.description.split('<div class="modal-links">')[1].split('</div>')[0]
                  .replace(/project-link/g, 'md-showcase__button') : ''}
              <a href="#contact" class="md-showcase__contact-button" onclick="document.getElementById('project-modal').classList.remove('active'); document.body.style.overflow = ''; setTimeout(() => { document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); }, 300);"><i class="fas fa-envelope"></i> Contact Me</a>
            </div>
          </div>
        `;

        // Hide the navigation buttons for project details modal
        const navButtons = document.querySelector('.modal-nav-buttons');
        if (navButtons) {
          navButtons.style.display = 'none';
        }

        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      }
    }
  });

  // Image Slider Functionality
  const sliders = document.querySelectorAll('.image-slider');
  
  sliders.forEach((slider, sliderIndex) => {
    const images = slider.querySelectorAll('.slider-image');
    const dots = slider.querySelectorAll('.slider-dot');
    let currentIndex = 0;
    let intervalId;

    // Auto slide every 3 seconds, but with a staggered start delay for each card
    function startAutoSlide() {
      // Base interval of 3 seconds with a slight variation per slider (300-500ms)
      const baseInterval = 3000;
      const cardInterval = baseInterval + (sliderIndex * 450);
      
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
      }, cardInterval);
    }

    function stopAutoSlide() {
      clearInterval(intervalId);
    }

    function updateSlider() {
      images.forEach((img, index) => {
        img.style.opacity = index === currentIndex ? '1' : '0';
      });
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    // Click on dots to change slides
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering card click
        currentIndex = index;
        updateSlider();
        stopAutoSlide();
        startAutoSlide();
      });
    });

    // Pause auto slide on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Ensure click handlers for sliders work properly
    // Remove any existing click listeners to avoid duplication
    slider.removeEventListener('click', handleSliderClick);
    
    // Add click handler as a named function
    slider.addEventListener('click', handleSliderClick);
    
    function handleSliderClick(e) {
      e.stopPropagation(); // Prevent triggering the project card click event
      const projectCard = slider.closest('.project-card');
      const projectId = projectCard.getAttribute('data-project');
      openImageModal(projectId, currentIndex);
    }

    // Start auto slide
    startAutoSlide();
  });

  // Modal image functionality with navigation
  function openImageModal(projectId, initialImageIndex = 0) {
    const projectCard = document.querySelector(`.project-card[data-project="${projectId}"]`);
    const sliderImages = projectCard.querySelectorAll('.slider-image');
    
    // Clear modal content
    modalContent.innerHTML = '';
    
    // Create a container for the image
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-modal-container');
    imageContainer.style.backgroundColor = 'white';
    imageContainer.style.padding = '20px';
    imageContainer.style.borderRadius = '8px';
    imageContainer.style.width = '100%';
    imageContainer.style.height = '100%';
    imageContainer.style.display = 'flex';
    imageContainer.style.justifyContent = 'center';
    imageContainer.style.alignItems = 'center';
    
    // Create full-size image element
    const fullImage = document.createElement('img');
    fullImage.classList.add('modal-fullsize-image');
    fullImage.dataset.currentIndex = initialImageIndex;
    fullImage.dataset.projectId = projectId;
    fullImage.src = sliderImages[initialImageIndex].src;
    fullImage.alt = sliderImages[initialImageIndex].alt || 'Project image';
    fullImage.style.backgroundColor = 'white';
    
    // Add image to container and container to modal
    imageContainer.appendChild(fullImage);
    modalContent.appendChild(imageContainer);
    
    // Show modal
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Get navigation buttons
    const navButtons = document.querySelector('.modal-nav-buttons');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    // Show/hide navigation buttons based on image count
    if (sliderImages.length <= 1) {
      navButtons.style.display = 'none';
    } else {
      navButtons.style.display = 'flex';
      
      // Set up event listeners for navigation buttons
      prevButton.onclick = (e) => {
        e.stopPropagation();
        navigateModalImage(projectId, 'prev');
      };
      
      nextButton.onclick = (e) => {
        e.stopPropagation();
        navigateModalImage(projectId, 'next');
      };
    }
  }
  
  // Navigate between images in modal
  function navigateModalImage(projectId, direction) {
    const projectCard = document.querySelector(`.project-card[data-project="${projectId}"]`);
    const sliderImages = projectCard.querySelectorAll('.slider-image');
    const modalImage = document.querySelector('.modal-fullsize-image');
    
    let currentIndex = parseInt(modalImage.dataset.currentIndex);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % sliderImages.length;
    } else {
      newIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
    }
    
    // Add transition effect
    modalImage.style.opacity = '0.5';
    modalImage.style.transform = direction === 'next' ? 'translateX(20px)' : 'translateX(-20px)';
    
    // Update modal image after a short delay (for transition effect)
    setTimeout(() => {
      modalImage.src = sliderImages[newIndex].src;
      modalImage.alt = sliderImages[newIndex].alt || 'Project image';
      modalImage.dataset.currentIndex = newIndex;
      
      // Reset the opacity and position with transition
      setTimeout(() => {
        modalImage.style.opacity = '1';
        modalImage.style.transform = 'translateX(0)';
      }, 50);
    }, 150);
  }

  // Close modal when clicking outside content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Add keyboard navigation
  window.addEventListener('keydown', (e) => {
    const modalImage = document.querySelector('.modal-fullsize-image');
    
    if (modal.classList.contains('active')) {
      // Handle Escape key to close modal
      if (e.key === 'Escape') {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
        return;
      }
      
      // Handle arrow keys for image navigation if we're viewing an image
      if (modalImage) {
        const projectId = modalImage.dataset.projectId;
        
        if (e.key === 'ArrowLeft') {
          navigateModalImage(projectId, 'prev');
        } else if (e.key === 'ArrowRight') {
          navigateModalImage(projectId, 'next');
        }
      }
    }
  });

  // Replace original project card image click handler
  document.querySelectorAll('.project-card .project-image').forEach(imageContainer => {
    imageContainer.addEventListener('click', function(e) {
      // The click event will be handled by the slider or direct image click
      // functionality defined above
    });
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
      // This function is now primarily used for initial setup
      // The animation itself handles card transitions
      
      // Calculate position
      const totalMarkers = yearMarkers.length;
      const percentage = (index / (totalMarkers - 1)) * 100;
      
      // Reset all cards first
      roleCards.forEach((card, i) => {
        // Add transitions for smooth changes
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        if (i !== index) {
          card.classList.remove('active');
          card.style.opacity = '0';
        }
      });
      
      // Show target card
      const currentCard = roleCards[index];
      if (currentCard) {
        currentCard.classList.add('active');
        currentCard.style.left = `${percentage}%`;
        currentCard.style.opacity = '1';
        
        // Special handling for future card
        if (index === yearMarkers.length - 1) {
          currentCard.style.transform = 'translateX(-50%) scale(1)';
        } else {
          currentCard.style.transform = 'translateX(-50%) translateY(0)';
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
      
      // Set up cards for animation
      const nextCard = roleCards[targetIndex];
      const currentActiveCard = roleCards[currentIndex];
      
      // IMPORTANT: Disable all transitions on cards during animation
      roleCards.forEach(card => {
        card.style.transition = 'none';
        // Force reflow
        void card.offsetWidth;
      });
      
      // Ensure current and next cards are visible but everything else is hidden
      roleCards.forEach((card, i) => {
        if (i !== currentIndex && i !== targetIndex) {
          card.classList.remove('active');
          card.style.opacity = '0';
        }
      });
      
      // Prepare next card at the same position as current dot
      if (nextCard) {
        nextCard.style.left = `${startLeft}%`;
        nextCard.style.opacity = '0';
        nextCard.classList.add('active');
        
        // Pre-position it slightly below and scaled down for upcoming animation
        nextCard.style.transform = 'translateX(-50%) translateY(5px) scale(0.95)';
        
        // Set z-index lower at start
        nextCard.style.zIndex = '1';
      }
      
      // Make sure current card is visible and positioned correctly
      if (currentActiveCard) {
        currentActiveCard.style.left = `${startLeft}%`;
        currentActiveCard.style.opacity = '1';
        currentActiveCard.classList.add('active');
        
        // Set initial transform - will be animated during transition
        currentActiveCard.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        
        // Start with higher z-index
        currentActiveCard.style.zIndex = '2';
      }
      
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
        
        // Enhanced easing function for smoother transitions
        const eased = progress < 0.5 ? 
          4 * progress * progress * progress : 
          1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        // Calculate current position
        const currentWidth = startWidth + (targetPercentage - startWidth) * eased;
        const currentLeft = startLeft + (targetPercentage - startLeft) * eased;
        
        // Update DOM elements
        progressLine.style.width = `${currentWidth}%`;
        trackerDot.style.left = `${currentLeft}%`;
        
        // Enhanced card transition logic - calculate phase-specific animations
        // First half of animation: current card fades out and scales down
        // Second half: next card fades in and scales up
        const exitPhase = Math.min(progress * 2, 1); // 0->1 during first half
        const entryPhase = Math.max(0, (progress - 0.5) * 2); // 0->1 during second half
        
        // Move both cards with tracker dot in exact synchronization
        if (currentActiveCard) {
          // Position card at tracker dot
          currentActiveCard.style.left = `${currentLeft}%`; 
          
          // Apply exit animation - fade out + scale down + slight Y offset
          const exitOpacity = Math.max(0, 1 - (exitPhase * 1.5));
          const exitScale = 1 - (exitPhase * 0.1); // Subtle scale down to 0.9
          const exitY = exitPhase * 5; // Small upward movement (5px max)
          
          currentActiveCard.style.opacity = exitOpacity;
          currentActiveCard.style.transform = `translateX(-50%) translateY(${exitY}px) scale(${exitScale})`;
          
          // Adjust z-index based on animation phase
          currentActiveCard.style.zIndex = progress > 0.5 ? '1' : '2';
        }
        
        if (nextCard) {
          // Position card at tracker dot
          nextCard.style.left = `${currentLeft}%`;
          
          // Apply entry animation - fade in + scale up + slight Y offset
          let entryOpacity, entryScale, entryY;
          
          // Special animation for future card (last card)
          if (targetIndex === yearMarkers.length - 1) {
            // Golden card gets special animation
            entryOpacity = Math.min(1, entryPhase * 2); // Faster fade in
            entryScale = 0.9 + (entryPhase * 0.1); // Scale from 0.9 to 1
            entryY = (1 - entryPhase) * -8; // Move upward from -8px to 0
          } else {
            // Standard cards
            entryOpacity = Math.min(1, entryPhase * 2); // Faster fade in
            entryScale = 0.95 + (entryPhase * 0.05); // More subtle scale for regular cards
            entryY = (1 - entryPhase) * -5; // Move upward from -5px to 0
          }
          
          nextCard.style.opacity = entryOpacity;
          nextCard.style.transform = `translateX(-50%) translateY(${entryY}px) scale(${entryScale})`;
          
          // Adjust z-index based on animation phase
          nextCard.style.zIndex = progress > 0.5 ? '2' : '1';
        }
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Animation complete
          progressLine.style.width = `${targetPercentage}%`;
          trackerDot.style.left = `${targetPercentage}%`;
          
          // Hide all cards except target card
          roleCards.forEach((card, i) => {
            // Restore transitions for smooth future interactions
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            if (i !== targetIndex) {
              card.classList.remove('active');
              card.style.opacity = '0';
              card.style.zIndex = '1';
            }
          });
          
          // Make sure target card is fully visible and positioned correctly
          if (nextCard) {
            nextCard.classList.add('active');
            nextCard.style.opacity = '1';
            nextCard.style.left = `${targetPercentage}%`;
            nextCard.style.zIndex = '2';
            
            // Special styling for future card
            if (targetIndex === yearMarkers.length - 1) {
              nextCard.style.transform = 'translateX(-50%) scale(1)';
            } else {
              nextCard.style.transform = 'translateX(-50%) translateY(0)';
            }
          }
          
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
      
      // Reset all cards first
      roleCards.forEach(card => {
        // Remove any transitions initially for instant positioning
        card.style.transition = 'none';
        card.classList.remove('active');
        card.style.opacity = '0';
        card.style.left = '0%';
        card.style.transform = 'translateX(-50%) scale(0.95)';
        card.style.zIndex = '1';
      });
      
      // Force reflow to ensure style changes take effect immediately
      void timeline.offsetWidth;
      
      // Now show the first card with transition
      if (roleCards.length > 0) {
        const firstCard = roleCards[0];
        firstCard.classList.add('active');
        firstCard.style.zIndex = '2';
        
        // Add transition for smooth effects after initial positioning
        setTimeout(() => {
          firstCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          firstCard.style.opacity = '1';
          firstCard.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        }, 50);
      }
      
      // Set first year marker as active
      yearMarkers.forEach((marker, i) => {
        marker.classList.toggle('active', i === 0);
      });
      
      // Add click handling for year markers
      yearMarkers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
          if (!isAnimating) {
            animateTimeline(index, 800); // Faster animation for better responsiveness
            
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