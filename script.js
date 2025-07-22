// Handle navigation dots
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navDots = document.querySelectorAll('.nav-dots a');
  const mainContent = document.querySelector('.main-content');

  // Update active dot based on scroll position
  const updateNavDots = () => {
    const scrollPosition = mainContent.scrollTop;
    const windowHeight = window.innerHeight;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop - sectionHeight / 4 && 
          scrollPosition < sectionTop + sectionHeight - sectionHeight / 4) {
        navDots.forEach(dot => dot.classList.remove('active'));
        navDots[index].classList.add('active');
      }
    });
  };

  // Add click event listeners to dots for smooth scrolling
  navDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Listen for scroll events
  mainContent.addEventListener('scroll', () => {
    updateNavDots();
  });
  
  // Initial update of dots
  updateNavDots();
});

// Function to create and animate a new orange
function createOrange() {
  // Create random starting position and direction
  const positions = [
    { start: { left: '-100px', top: '20%' }, x: window.innerWidth + 100, y: 0 },
    { start: { right: '-100px', top: '40%' }, x: -(window.innerWidth + 100), y: 0 },
    { start: { left: '30%', top: '-100px' }, x: 0, y: window.innerHeight + 100 },
    { start: { left: '60%', bottom: '-100px' }, x: 0, y: -(window.innerHeight + 100) },
    { start: { left: '-100px', top: '60%' }, x: window.innerWidth + 100, y: window.innerHeight/2 },
    { start: { right: '-100px', bottom: '30%' }, x: -(window.innerWidth + 100), y: -window.innerHeight/3 }
  ];

  // Create new orange element
  const container = document.createElement('div');
  container.className = 'orange-container';
  const img = document.createElement('img');
  img.src = './images/orange.PNG';
  img.className = 'orange';
  img.alt = 'Orange';
  container.appendChild(img);
  document.body.appendChild(container);

  // Pick random position configuration
  const pos = positions[Math.floor(Math.random() * positions.length)];
  
  // Apply initial position
  Object.assign(container.style, pos.start);

  // Animate the orange
  gsap.to(container, {
    x: pos.x,
    y: pos.y,
    rotation: (Math.random() < 0.5 ? 360 : -360) * (2 + Math.floor(Math.random() * 3)),
    duration: 5 + Math.random() * 5,
    ease: "power1.inOut",
    onComplete: () => {
      // Remove the orange when animation completes
      document.body.removeChild(container);
      // Create a new orange
      createOrange();
    }
  });
}

// Start with multiple oranges
for (let i = 0; i < 4; i++) {
  setTimeout(() => createOrange(), i * 1500);
}

// Gallery fullsize modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('fullsize-modal');
  const modalImage = document.getElementById('fullsize-image');
  const modalTitle = document.getElementById('fullsize-title');
  const closeBtn = document.querySelector('.close-btn');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const fullsizeButtons = document.querySelectorAll('.fullsize-btn');

  // Function to open modal with animation
  function openModal(imageSrc, title) {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    
    // Show modal
    modal.classList.add('active');
    
    // Animate modal entrance with GSAP
    gsap.fromTo(modal, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    
    gsap.fromTo('.fullsize-art-container', 
      { scale: 0.8, opacity: 0, rotationY: -15 }, 
      { scale: 1, opacity: 1, rotationY: 0, duration: 0.5, ease: "back.out(1.7)", delay: 0.1 }
    );
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  // Function to close modal with animation
  function closeModal() {
    gsap.to('.fullsize-art-container', {
      scale: 0.8,
      opacity: 0,
      rotationY: 15,
      duration: 0.3,
      ease: "power2.in"
    });
    
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => {
        modal.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Add click event listeners to fullsize buttons
  fullsizeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      const imageSrc = button.getAttribute('data-image');
      const title = button.getAttribute('data-title');
      openModal(imageSrc, title);
    });
  });

  // Close modal when clicking close button
  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking backdrop
  modalBackdrop.addEventListener('click', closeModal);

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
