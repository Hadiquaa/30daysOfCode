// show menu

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
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

// SHADOW HEADER

window.addEventListener('scroll', ()=>{
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header');
});

// swiper 
const swiperFavorites = new Swiper('.favorites-swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto', 
  })

//   SHow scroll up button

const scrollUp = document.getElementById("scroll-up");

window.addEventListener('scroll', ()=>{
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
});

// active section in the navbar

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', ()=>{
    const scrollY = window.scrollY;

    sections.forEach(section=>{
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute('id');
        // console.log(sectionHeight, sectionTop);

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
})

// Sroll reveal
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
})

sr.reveal('.home-data, .favorites-container, .footer-container');
sr.reveal('.home-circle , .home-img', {delay:600, scale:.5});
sr.reveal('.home-chips-1 , .home-chips-2, .home-chips-3', {delay:1000, interval:100});
sr.reveal('.home-leaf ', {delay:1200});
sr.reveal('.home-tomato-1 , .home-tomato-2', {delay:1400, interval:100});
sr.reveal('.care-img,.contact-img ', {origin: "left"});
sr.reveal('.care-list, .contact-data ', {origin: "right"});
sr.reveal('.banner-item, .products-card ', {interval:100});
