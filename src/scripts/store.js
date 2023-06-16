


window.onload = function () {
    const carousel = document.querySelector('.recommend-carousel');
    const carouselInner = document.querySelector('.recommend-carousel-inner');
    const carouselItems = document.querySelectorAll('.recommend-carousel-item');
    const height = carousel.clientHeight;

    let index = 0;

    function updateCarousel() {
        carouselInner.style.transform = `translateY(-${height * index * 1.167}px)`;
    }

    function nextSlide() {
        index++;
        if (index >= carouselItems.length) {
            index = 0;
        }
        updateCarousel();
    }

    function previousSlide() {
        index--;
        if (index < 0) {
            index = carouselItems.length - 1;
        }
        updateCarousel();
    }

    function setupCarousel() {
        updateCarousel();
        setInterval(nextSlide, 3000);
    }

    setupCarousel();

    // Handle touch events
    let touchStartY = 0;
    let touchEndY = 0;

    carousel.addEventListener('touchstart', function (event) {
        touchStartY = event.touches[0].clientY;
    });

    carousel.addEventListener('touchend', function (event) {
        touchEndY = event.changedTouches[0].clientY;
        if (touchEndY < touchStartY){
            nextSlide();
        }
        else if (touchEndY > touchStartY){
            previousSlide();
        }
    });
}