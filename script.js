// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        
        // Close other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Smooth Scroll for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        header.style.padding = '0.8rem 0';
        document.querySelector('.logo').style.color = '#2D5A27';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
        header.style.padding = '1.5rem 0';
        // Only change logo color if it's over the hero (white text)
        // For this design, hero is dark, so logo should be white initially if needed
        // But the current logo is green in CSS. Let's adjust for hero visibility.
    }
});

// Optimized Scroll Reveal using IntersectionObserver
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealOnScroll.unobserve(entry.target); // Stop observing once revealed
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.diff-card, .service-card, .proof-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    revealOnScroll.observe(el);
});
