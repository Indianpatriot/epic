// DOM Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav ul li a');
const testimonialCarousel = document.getElementById('testimonialCarousel');
const testimonials = document.querySelectorAll('.testimonial');
const prevTestimonialBtn = document.getElementById('prevTestimonial');
const nextTestimonialBtn = document.getElementById('nextTestimonial');
const dots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contactForm');
const bookingForm = document.getElementById('bookingForm');
const feedbackForm = document.getElementById('feedbackForm');
const newsletterForm = document.getElementById('newsletterForm');

// Current index for testimonial carousel
let currentTestimonialIndex = 0;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', toggleMenu);
    
    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Testimonial Carousel
    if (prevTestimonialBtn && nextTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', showPrevTestimonial);
        nextTestimonialBtn.addEventListener('click', showNextTestimonial);
    }
    
    // Dots for Testimonial Carousel
    if (dots) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.getAttribute('data-index'));
                showTestimonial(slideIndex);
            });
        });
    }
    
    // Form Submissions
    if (contactForm) contactForm.addEventListener('submit', handleContactFormSubmit);
    if (bookingForm) bookingForm.addEventListener('submit', handleBookingFormSubmit);
    if (feedbackForm) feedbackForm.addEventListener('submit', handleFeedbackFormSubmit);
    if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);
    
    // Automatic Testimonial Rotation
    startTestimonialRotation();
    
    // Animation on scroll
    animateOnScroll();
});
// Ceremony Slider Functions
const ceremonySlides = document.querySelectorAll('.ceremony-slide');
const prevCeremonyBtn = document.getElementById('prevCeremony');
const nextCeremonyBtn = document.getElementById('nextCeremony');
let currentCeremonyIndex = 0;

function showCeremony(index) {
    ceremonySlides.forEach(slide => slide.classList.remove('active'));
    
    currentCeremonyIndex = index;
    
    if (currentCeremonyIndex < 0) {
        currentCeremonyIndex = ceremonySlides.length - 1;
    } else if (currentCeremonyIndex >= ceremonySlides.length) {
        currentCeremonyIndex = 0;
    }
    
    ceremonySlides[currentCeremonyIndex].classList.add('active');
}

function showPrevCeremony() {
    showCeremony(currentCeremonyIndex - 1);
}

function showNextCeremony() {
    showCeremony(currentCeremonyIndex + 1);
}

// Add these to your DOMContentLoaded event listener
if (prevCeremonyBtn && nextCeremonyBtn) {
    prevCeremonyBtn.addEventListener('click', showPrevCeremony);
    nextCeremonyBtn.addEventListener('click', showNextCeremony);
}

// Auto-rotate ceremonies
let ceremonyInterval;
function startCeremonyRotation() {
    if (ceremonySlides.length > 0) {
        ceremonyInterval = setInterval(showNextCeremony, 6000);
    }
}

document.addEventListener('DOMContentLoaded', startCeremonyRotation);

// Pause rotation when hovering over ceremonies
const ceremonyContainer = document.querySelector('.ceremony-container');
if (ceremonyContainer) {
    ceremonyContainer.addEventListener('mouseenter', () => {
        clearInterval(ceremonyInterval);
    });
    
    ceremonyContainer.addEventListener('mouseleave', () => {
        startCeremonyRotation();
    });
}

// Mobile Menu Functions
function toggleMenu() {
    navbar.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
}

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (navbar.classList.contains('active') && 
        !navbar.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        toggleMenu();
    }
});

// Smooth Scrolling Function
function smoothScroll(e) {
    e.preventDefault();
    
    // Close mobile menu if it's open
    if (navbar.classList.contains('active')) {
        toggleMenu();
    }
    
    // Get the target section
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - header.offsetHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    }
}

// Handle Scroll Effect for Header
function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Header background and size change on scroll
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 20;
        const sectionBottom = sectionTop + section.offsetHeight;
        const currentPosition = scrollPosition;
        const sectionId = '#' + section.getAttribute('id');
        
        if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Testimonial Carousel Functions
function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentTestimonialIndex = index;
    
    if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    } else if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    }
    
    testimonials[currentTestimonialIndex].classList.add('active');
    dots[currentTestimonialIndex].classList.add('active');
}

function showPrevTestimonial() {
    showTestimonial(currentTestimonialIndex - 1);
}

function showNextTestimonial() {
    showTestimonial(currentTestimonialIndex + 1);
}

// Auto-rotate testimonials
let testimonialInterval;

function startTestimonialRotation() {
    if (testimonials.length > 0) {
        testimonialInterval = setInterval(showNextTestimonial, 5000);
    }
}

// Pause rotation when hovering over testimonials
if (testimonialCarousel) {
    testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialCarousel.addEventListener('mouseleave', () => {
        startTestimonialRotation();
    });
}

// Form Submission Handlers
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    console.log('Contact Form Submission:', { name, email, phone, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
}

function handleBookingFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const guestCount = document.getElementById('guestCount').value;
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const eventDetails = document.getElementById('eventDetails').value;
    
    // Validate date (should be in the future)
    const selectedDate = new Date(eventDate);
    const today = new Date();
    
    if (selectedDate <= today) {
        alert('Please select a future date for your event.');
        return;
    }
    
    // Here you would typically send the data to a server
    console.log('Booking Form Submission:', { 
        eventType, eventDate, guestCount, customerName, 
        customerEmail, customerPhone, eventDetails 
    });
    
    // Show success message
    alert('Thank you for your booking request! Our team will contact you within 24 hours to discuss the details.');
    
    // Reset form
    this.reset();
}

function handleFeedbackFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('feedbackName').value;
    const email = document.getElementById('feedbackEmail').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const message = document.getElementById('feedbackMessage').value;
    
    // Validate rating
    if (!rating) {
        alert('Please select a rating before submitting.');
        return;
    }
    
    // Here you would typically send the data to a server
    console.log('Feedback Form Submission:', { name, email, rating, message });
    
    // Show success message
    alert('Thank you for your feedback! We appreciate your input.');
    
    // Reset form
    this.reset();
}

function handleNewsletterFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const email = this.querySelector('input[type="email"]').value;
    
    // Here you would typically send the data to a server
    console.log('Newsletter Subscription:', { email });
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    
    // Reset form
    this.reset();
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.program-category, .performer, .event-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Create the floating diyas effect
function createDiyaEffect() {
    const background = document.querySelector('.background-elements');
    
    if (background) {
        for (let i = 0; i < 5; i++) {
            const diya = document.createElement('div');
            diya.classList.add('diya');
            diya.style.left = `${Math.random() * 100}%`;
            diya.style.top = `${Math.random() * 100}%`;
            diya.style.animationDelay = `${Math.random() * 3}s`;
            background.appendChild(diya);
        }
    }
}

// Call diya effect on window load
window.addEventListener('load', createDiyaEffect);