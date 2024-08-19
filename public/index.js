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

function changeImage(thumbnail) {
  var mainImage = document.getElementById('mainImage');
  mainImage.src = thumbnail.src;
}

// modal
let currentSlide2 = 0;
let autoSlideInterval;
const images = [
    './img/bride.JPG',
    './img/groom.JPG',
    './img/GR_06817.JPG',
    './img/GR_07152.JPG',
    './img/GR_07435.JPG',
    './img/GR_07476.JPG',
    './img/GR_07509.JPG'
    // Add more image paths as needed
];

function openModal(slideIndex) {
    currentSlide2 = slideIndex;
    document.getElementById('imageModal').style.display = "flex";
    showImage(currentSlide2);
    autoSlideInterval = setInterval(() => changeImage(1), 7000);
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
    clearInterval(autoSlideInterval);
}

function showImage(index) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = images[index];
}

function changeImage(n) {
    currentSlide2 = (currentSlide2 + n + images.length) % images.length;
    showImage(currentSlide2);
}

function currentImage(index) {
    clearInterval(autoSlideInterval);
    currentSlide2 = index;
    showImage(currentSlide2);
    autoSlideInterval = setInterval(() => changeImage(1), 7000);
}

function openInvitationModal(slideIndex) {
    document.getElementById('invitationModal').style.display = "flex";
}

function closeInvitationModal() {
    document.getElementById('invitationModal').style.display = "none";
}

function saveToJson(branch) {
    const guestName = document.getElementById('guestName').value;
    const messageContainer = document.getElementById('messageContainer');

    if (guestName.trim() === "") {
        showMessage("Please enter your name.", "danger");
        return;
    }

    const data = {
        name: guestName
    };

    fetch(`/${branch}/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        showMessage(data.message, "success");
        document.getElementById('guestName').value = '';
    })
    .catch((error) => {
        console.error('Error:', error);
        showMessage("Error saving data. Please try again.", "danger");
    });
}

function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    const alertClass = type === "success" ? "alert-success" : "alert-danger";
    messageContainer.innerHTML = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}