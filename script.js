document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome');
    const celebrationScreen = document.getElementById('celebration');
    const passInput = document.getElementById('passInput');
    const btnEnter = document.getElementById('btnEnter');
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.getElementById('musicControl');
    const musicIcon = document.getElementById('musicIcon');

    let isPlaying = false;

    // Music Control
    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.textContent = '🔇';
        } else {
            bgMusic.play().then(() => {
                musicIcon.textContent = '🔊';
            }).catch(e => console.log("Audio play failed", e));
        }
        isPlaying = !isPlaying;
    });

    // Password Logic
    function checkPassword() {
        const input = passInput.value;
        const correctPass = "18122025";

        if (input === correctPass) {
            transitionToCelebration();
        } else {
            passInput.classList.add('shake');
            setTimeout(() => passInput.classList.remove('shake'), 500);
            passInput.value = '';
            passInput.placeholder = 'Coba lagi sayang...';
        }
    }

    btnEnter.addEventListener('click', checkPassword);
    passInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    // Transition
    function transitionToCelebration() {
        welcomeScreen.classList.remove('active');
        welcomeScreen.classList.add('hidden');
        
        // Wait for transition
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            celebrationScreen.classList.remove('hidden');
            celebrationScreen.classList.add('active');
            
            // Auto play music if possible
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    musicIcon.textContent = '🔊';
                }).catch(() => {
                    // Autoplay likely blocked, user has to click icon
                    console.log("Autoplay blocked");
                });
            }

            fireConfetti();
        }, 500);
    }

    // Carousel Logic
    let currentSlide = 0;
    const slides = document.querySelectorAll('.message-slide');
    const totalSlides = slides.length;

    window.nextSlide = function() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    };

    window.prevSlide = function() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    };

    // Confetti Effect
    function fireConfetti() {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff8fa3', '#c9184a', '#ffd700']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff8fa3', '#c9184a', '#ffd700']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});

// Add shake animation style dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
        100% { transform: translateX(0); }
    }
    .shake {
        animation: shake 0.3s ease-in-out;
        border: 1px solid #ff4d4d !important;
    }
`;
document.head.appendChild(style);
