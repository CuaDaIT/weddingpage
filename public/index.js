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
const slideInterval = 3000; // Time in milliseconds (10 seconds)

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
    './img/bride2.JPG',
    './img/groom2.jpg',
    './img/GR_06817.JPG',
    './img/GR_07476.JPG',
    './img/GR_07152.JPG',
    './img/30.jpg',
    './img/GR_07509.JPG',
    './img/GR_06.jpg'
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
    document.getElementById('noticeButton').style.display = "none";
    document.getElementById('buttonLabel').style.display = "none";
}

function closeInvitationModal() {
    document.getElementById('invitationModal').style.display = "none";
    document.getElementById('noticeButton').style.display = "flex";
    document.getElementById('buttonLabel').style.display = "block";
}

function openDonation(){
    document.getElementById('donationModal').style.display = "flex";
    document.getElementById('noticeButton').style.display = "none";
    document.getElementById('buttonLabel').style.display = "none";
}

function closeDonation(){
    document.getElementById('donationModal').style.display = "none";
}

function saveToJson(branch) {
    const guestName = document.getElementById('guestName').value;
    const messageContainer = document.getElementById('messageContainer');

    if (guestName.trim() === "") {
        showMessage("Please enter your name.", "danger");
        return;
    }

    const data = {
        branch: branch,
        name: guestName
    };

    fetch(`/save`, {
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
    </div>`;

    setTimeout(() => {
        messageContainer.innerHTML = ''; // Clears the message from the container
    }, 5000);
}

function createHeart() {
    const heartContainer = document.getElementById('heartContainer');
    const heart = document.createElement('img');
    heart.src = './img/heart.png'; // Replace with the path to your heart image
    heart.classList.add('hearts');

    // Random horizontal position
    heart.style.left = Math.random() * 100 + 'vw';

    // Random size for each heart
    const size = Math.random() * 20 + 10; // Size between 10px and 30px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    // Random duration for the fall animation
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // Duration between 2s and 5s

    // Add the heart to the container
    heartContainer.appendChild(heart);

    // Remove the heart after the animation ends
    setTimeout(() => {
        heart.remove();
    }, 5000); // Match this with the animation duration
}

// Create multiple hearts every 2 seconds
setInterval(() => {
    for (let i = 1; i < 3; i++) {
        createHeart();
    }
}, 3000);

function toggleMusic() {
    const music = document.getElementById('background-music');
    let btn_music1 = document.querySelector('#i1');
    let btn_music2 = document.querySelector('#i2');
    if (music.paused) {
        music.play();
        btn_music1.classList.remove('showi');
        btn_music2.classList.add('showi');
    } else {
        music.pause();
        btn_music1.classList.add('showi');
        btn_music2.classList.remove('showi');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    audio.play().catch(error => {
        console.log('Autoplay prevented:', error);
    });
});