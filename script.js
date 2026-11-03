/* --- 1. Dark / Light Mode Toggle --- */
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});


/* --- 2. Carousel Logic --- */
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".project-card");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;

cards.forEach((card, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= cards.length) currentIndex = 0;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = cards.length - 1;
    updateCarousel();
});


/* --- 3. Animations Logic --- */
function playHomeAnimation() {
    const greetingText = document.querySelector('.home-text h2');
    const mainTitle = document.querySelector('.home-text .mega');

    if (!greetingText || !mainTitle) return;

    greetingText.classList.remove('reveal');
    mainTitle.classList.remove('reveal');

    void greetingText.offsetWidth; 
    
    setTimeout(() => {
        greetingText.classList.add('reveal');
        setTimeout(() => {
            mainTitle.classList.add('reveal');
        }, 200);
    }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
    playHomeAnimation();
});

const elementsToReveal = document.querySelectorAll(
    '.about-text h1, .about-text h2, .about-text p, .about-image, .project-heading h1, .carousel, .contact-heading, .contact-icons, .contact-email'
);

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

elementsToReveal.forEach(element => {
    observer.observe(element);
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('href');
        
        if (targetId === '#home') {
            playHomeAnimation();
        } 
        else if (targetId === '#about' || targetId === '#projects' || targetId === '#contact') {
            const section = document.querySelector(targetId);
            const sectionElements = section.querySelectorAll('.reveal');
            
            sectionElements.forEach(el => {
                el.classList.remove('reveal');
            });
            
            void section.offsetWidth;
            
            setTimeout(() => {
                sectionElements.forEach(el => {
                    observer.observe(el);
                });
            }, 600); 
        }
    });
});