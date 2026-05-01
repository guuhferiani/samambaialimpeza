// --- GLOBAL SETUP ---
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- NAVIGATION: Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- HEADER: Scroll Effects ---
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Background toggle (Add/Remove 'scrolled' class)
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/Show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
    });

    // --- FAQ: Accordion Logic ---
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Close other FAQ items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // --- SLIDER: Image Comparison ---
    document.querySelectorAll('.slider-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const sliderValue = e.target.value;
            const container = e.target.parentElement;
            const imgAfter = container.querySelector('.img-after');
            const sliderLine = container.querySelector('.comparison-slider');

            imgAfter.style.clipPath = `inset(0 ${100 - sliderValue}% 0 0)`;
            sliderLine.style.left = `${sliderValue}%`;
        });
    });

    // --- GSAP: Premium Animations ---

    // 1. Hero Reveal (Premium & Stable)
    const heroTl = gsap.timeline();
    heroTl.from(".hero h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".hero p", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6")
    .from(".hero .hero-list li", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out"
    }, "-=0.4")
    .from(".hero .btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all" // Ensures the button stays visible and stable
    }, "-=0.3");

    // 2. Section Titles Reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 3. Cards Reveal (Service, Proof, FAQ)
    const cards = gsap.utils.toArray('.service-card, .proof-item, .faq-item, .benefit-card');
    cards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: (i % 3) * 0.1 // Staggered entry for grid items
        });
    });

    // 4. Premium Card Interaction (Hover)
    const interactiveCards = document.querySelectorAll('.service-card, .proof-item');
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -12,
                scale: 1.03,
                duration: 0.5,
                ease: "power2.out",
                boxShadow: "0 25px 50px rgba(0,0,0,0.12)"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.8)", // Nice bouncy return
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)"
            });
        });
    });

    // 5. Back to Top Logic
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            gsap.to(backToTop, {
                opacity: 1,
                visibility: "visible",
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(backToTop, {
                opacity: 0,
                visibility: "hidden",
                y: 20,
                duration: 0.4,
                ease: "power2.in"
            });
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
