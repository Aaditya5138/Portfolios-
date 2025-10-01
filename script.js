// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced mobile menu toggle
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    hamburger.style.cssText = `
        display: none;
        flex-direction: column;
        justify-content: space-around;
        width: 30px;
        height: 30px;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        transition: all 0.3s ease;
    `;
    
    // Add hamburger line styles
    const style = document.createElement('style');
    style.textContent = `
        .hamburger-line {
            width: 100%;
            height: 3px;
            background: #447F98;
            border-radius: 2px;
            transition: all 0.3s ease;
            transform-origin: center;
        }
        .hamburger.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        .hamburger.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    navbar.appendChild(hamburger);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #447F98, #629BB6);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add back to top button
function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #447F98;
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(backToTop);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced animation effects
function animateElements() {
    const elements = document.querySelectorAll('.hero-content, .about-content, .projects-grid, .contact-form, .skills-grid');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation when element enters viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced navbar styling on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Form validation and success message
function enhanceContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Mobile touch optimizations
function addMobileOptimizations() {
    // Add touch-friendly hover states for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Improve touch scrolling
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Prevent zoom on double tap for buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add mobile-specific styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        .touch-device .btn:hover,
        .touch-device .social-icon:hover,
        .touch-device .project-link:hover {
            transform: none;
        }
        
        .touch-device .btn:active,
        .touch-device .social-icon:active,
        .touch-device .project-link:active {
            transform: scale(0.95);
        }
        
        @media (max-width: 768px) {
            .btn, .social-icon, .project-link {
                min-height: 44px;
                min-width: 44px;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
}

// Enhanced scroll behavior for mobile
function enhanceMobileScroll() {
    let ticking = false;
    
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
        
        // Update back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createMobileMenu();
    addScrollProgress();
    addBackToTop();
    animateElements();
    enhanceContactForm();
    animateSkillBars();
    addMobileOptimizations();
    enhanceMobileScroll();
});