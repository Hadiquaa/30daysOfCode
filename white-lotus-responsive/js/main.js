
// <---------------Navbar------------------------------------------->
// Active section in navbar
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', ()=>{
    const scrollY = window.scrollY;

    sections.forEach(section=>{
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute('id');
        // console.log(sectionHeight, sectionTop);

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
})

// SHADOW HEADER

window.addEventListener('scroll', ()=>{
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header');
});

// Mobile navbar

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav");
const navClose = document.getElementById("nav-close");

// Adding show menu

    navToggle.addEventListener('click', ()=>{
        navMenu.classList.add('show-menu');
        
    })

// removing show menu

navClose.addEventListener('click', ()=>{
    navMenu.classList.remove('show-menu');
})

// closing the menu tab whenever something is clicked

const navLinks = document.querySelectorAll(".nav-link");

const linkAction = ()=>{
    navMenu.classList.remove("show-menu");
}

navLinks.forEach( (link)=>{link.addEventListener('click',linkAction)});

// <---------------Gallery Swiper------------------------------------------->
// swiper 
const swiperFavorites = new Swiper('.gallery-swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto', 
  });

// SCROLL REVEAL
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
})

sr.reveal('.home-container, .services-heading, .star-icon');
sr.reveal('.about-us-desc',{origin:"left"});
sr.reveal('.about-us-image',{origin:"right"});
sr.reveal('.service-img',{origin:"left"});
