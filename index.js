// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("menu");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    header.classList.add("backgchange");
    header.style.height = '5%';
  } else {
    header.classList.remove("sticky");
    header.classList.remove("backgchange");
    header.style.height = '20%';
  }
}

let currentSlide = 0;
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const slideInterval = 10000; // Time in milliseconds (10 seconds)

// Create a clone of the first slide and append it to the end
const firstSlide = slides[0].cloneNode(true);
slidesContainer.appendChild(firstSlide);

function showSlide(index) {
    const slideWidth = slides[0].offsetWidth;
    slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;

    // When the last slide is reached, reset to the first slide without animation
    if (index === slides.length) {
        setTimeout(() => {
            slidesContainer.style.transition = 'none';
            slidesContainer.style.transform = `translateX(0)`;
            currentSlide = 0;
        }, slideInterval);
    }
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length + 1) {
        currentSlide = 0;
        slidesContainer.style.transition = 'none';
    } else {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
    }
    showSlide(currentSlide);
}

// Initialize the slider
showSlide(currentSlide);

// Change slide every 2 seconds
setInterval(nextSlide, slideInterval);