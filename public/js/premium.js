/**
 * TOZ YAPI - ULTRA PREMIUM WEBSITE
 * Advanced JavaScript with Particles, Animations & Interactions
 * £3000+ Professional Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    LoadingScreen.init();
    Particles.init();
    Header.init();
    MobileMenu.init();
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    HeroSlider.init();
    StatsCounter.init();
    Testimonials.init();
    ScrollToTop.init();
    SmoothScroll.init();
});

/**
 * Premium Loading Screen
 */
const LoadingScreen = {
    screen: null,
    
    init() {
        this.screen = document.getElementById('loadingScreen');
        
        if (!this.screen) return;
        
        // Hide after 2.5 seconds
        setTimeout(() => this.hide(), 2500);
    },
    
    hide() {
        this.screen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            this.screen.style.display = 'none';
        }, 600);
    }
};

/**
 * Particles.js Background
 */
const Particles = {
    init() {
        if (typeof particles === 'undefined') return;
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#d4af37'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#d4af37',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
};

/**
 * Premium Header with Scroll Effects
 */
const Header = {
    header: null,
    lastScroll: 0,
    
    init() {
        this.header = document.getElementById('header');
        if (!this.header) return;
        
        window.addEventListener('scroll', () => this.handleScroll());
    },
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        // Hide/show on scroll
        if (currentScroll > this.lastScroll && currentScroll > 200) {
            this.header.style.transform = 'translateY(-100%)';
        } else {
            this.header.style.transform = 'translateY(0)';
        }
        
        this.lastScroll = currentScroll;
    }
};

/**
 * Mobile Menu Toggle
 */
const MobileMenu = {
    toggle: null,
    nav: null,
    
    init() {
        this.toggle = document.getElementById('mobileToggle');
        this.nav = document.getElementById('megaNav');
        
        if (!this.toggle) return;
        
        this.toggle.addEventListener('click', () => this.toggleMenu());
    },
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.nav.classList.toggle('active');
        
        // Animate spans
        const spans = this.toggle.querySelectorAll('span');
        if (this.toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
};

/**
 * Hero Slider with Auto-advance
 */
const HeroSlider = {
    slides: [],
    currentSlide: 0,
    interval: null,
    
    init() {
        this.slides = document.querySelectorAll('.hero-slide');
        if (this.slides.length === 0) return;
        
        this.startSlider();
    },
    
    startSlider() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 6000);
    },
    
    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }
};

/**
 * Animated Stats Counter
 */
const StatsCounter = {
    counters: [],
    
    init() {
        this.counters = document.querySelectorAll('.stat-number[data-count]');
        if (this.counters.length === 0) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        this.counters.forEach((counter) => observer.observe(counter));
    },
    
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }
};

/**
 * Testimonials Swiper
 */
const Testimonials = {
    init() {
        if (typeof Swiper === 'undefined') return;
        
        new Swiper('.testimonials-swiper', {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            effect: 'slide',
            slidesPerView: 1
        });
    }
};

/**
 * Scroll to Top Button
 */
const ScrollToTop = {
    button: null,
    
    init() {
        this.button = document.getElementById('scrollTop');
        if (!this.button) return;
        
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    },
    
    toggleVisibility() {
        if (window.pageYOffset > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

/**
 * Smooth Scroll for Anchor Links
 */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href.length === 1) return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileToggle = document.getElementById('mobileToggle');
                if (mobileToggle && mobileToggle.classList.contains('active')) {
                    mobileToggle.click();
                }
            });
        });
    }
};

/**
 * Premium Ripple Effect on Buttons
 */
document.querySelectorAll('.premium-btn').forEach((btn) => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

/**
 * Language Switcher (Placeholder)
 */
document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
        
        const lang = this.getAttribute('data-lang');
        console.log('Language switched to:', lang);
        // Implement actual language switching logic here
    });
});

/**
 * 3D Tilt Effect on Product Cards
 */
document.querySelectorAll('.product-card.premium-3d').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/**
 * Console Branding
 */
console.log('%c TOZ YAPI ', 'background: linear-gradient(135deg, #047857, #d4af37); color: white; font-size: 40px; font-weight: bold; padding: 20px;');
console.log('%c Ultra-Premium Website ', 'color: #047857; font-size: 20px; font-weight: bold;');
console.log('%c Designed & Developed with Excellence ', 'color: #666; font-size: 14px;');
