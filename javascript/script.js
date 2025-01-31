const carousel = document.querySelector(".main-carousel-container");
const slider = document.querySelector(".carousel-container");
const sliderChildrens = [...slider.children];
const firstCardWidth = slider.querySelector(".carousel-slide").offsetWidth;

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(slider.offsetWidth/firstCardWidth);

sliderChildrens.slice(-cardPerView).reverse().forEach(card => {
    slider.insertAdjacentHTML("afterbegin", card.outerHTML);
});

sliderChildrens.slice(0, cardPerView).reverse().forEach(card => {
    slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

slider.scrollLeft = slider.offsetWidth;

slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    startScrollLeft = slider.scrollLeft;
   
})

slider.addEventListener("mouseleave", (e) => {
    isDragging = false;
    slider.classList.remove('active');
    
})

slider.addEventListener("mouseup", (e) => {
    isDragging = false;
    slider.classList.remove('active');
    
})
 
const autoPlay = () => {
    timeoutId = setTimeout(() => slider.scrollLeft += firstCardWidth, 1500);
}

carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
carousel.addEventListener("mouseleave", autoPlay);

let isThrottled = false;

slider.addEventListener("scroll", (e) => {
    if (isThrottled) return;

    if(slider.scrollLeft <= 0) {
        slider.classList.add("no-transition");
        slider.scrollLeft = ((slider.scrollWidth - slider.offsetWidth) -  slider.offsetWidth);
        slider.classList.remove("no-transition");
        console.log("looping");
        setTimeout(() => (isThrottled = false), 100);
    }
    else if (Math.ceil(slider.scrollLeft) >= slider.scrollWidth - slider.offsetWidth){
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.offsetWidth;
        slider.classList.remove("no-transition");
        console.log("looping");
        setTimeout(() => (isThrottled = false), 100);
    }

    clearTimeout(timeoutId);
    if(!carousel.matches(":hover")) autoPlay();
})

slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const move = (x - startX) * 2;
    slider.scrollLeft = startScrollLeft-move;
})