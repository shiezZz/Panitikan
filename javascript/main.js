// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const pages = document.querySelectorAll(".paper");
const search = document.querySelectorAll(".find-myth");
const ul = document.querySelector(".contents");
const lis = document.querySelectorAll(".toc");
const find = document.querySelector ('input');

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let numOfPapers = pages.length;
let currentLocation = 1;
let maxLocation = numOfPapers + 1;

find.addEventListener('keyup', function () {
    const searchTerm = find.value.toLowerCase();
    console.log(searchTerm);

    lis.forEach(function (li) {
        const itemText = li.textContent.toLowerCase();
        if(itemText.includes(searchTerm)) {
            li.style.display = "block";
        }
        else {
            li.style.display = "none";
        }
    })
})

search.forEach((section, index) => {
    section.addEventListener("click", (event) => {
        event.preventDefault();

        let targetPage = index + 4;

        if (currentLocation < targetPage) {
            while (currentLocation < targetPage) {
                goNextPage();
            }
        } else if (currentLocation > targetPage) {
            while (currentLocation > targetPage) {
                goPrevPage();
            }
        }
    });
});


function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }

}


function goNextPage() {
    if (currentLocation < maxLocation) {
        console.log(currentLocation);
        if (currentLocation === 1) openBook();

        const page = pages[currentLocation - 1];
        if (page) {
            page.classList.add("flipped");

            setTimeout(() => {
                page.style.zIndex = currentLocation;
            }, 200);
            
        }

        if (currentLocation === numOfPapers) closeBook(false);

        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        console.log(currentLocation);
        currentLocation--;

        if (currentLocation === numOfPapers) openBook();

        const page = pages[currentLocation - 1];
        if (page) {
            page.classList.remove("flipped");
            setTimeout(() => {
                page.style.zIndex = numOfPapers - currentLocation + 1;
            }, 200);
        }

        if (currentLocation === 1) closeBook(true);
        
    }
}
    

//FLASH CARD

const items = document.querySelectorAll(".wrapper .single-card");
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0;
let isFlipped = false;

function loadShow(){
    let stt = 0;
    console.log("Hello");
    items.forEach((item, index) => {
        items[active].style.transform = ``;
        items[active].style.zIndex = '';
        items[active].style.filter = '';
        items[active].style.opacity = '';
        item.removeEventListener("mousedown", rotateCard);

    });

    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    items[active].addEventListener("mousedown", rotateCard);



    for(var i = active + 1; i<items.length; i ++){
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)` ;
        items[i].style.zIndex =-stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;

    }

    stt = 0;
    for(var i = active -1; i >= 0; i--){
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)` ;
        items[i].style.zIndex =-stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

loadShow();

next.onclick = function(){
    if (isFlipped) {
        items[active].style.transform = 'rotateY(0deg)';
        isFlipped = false;
        setTimeout(() => {
            active = active + 1 < items.length ? active + 1 : active;
            loadShow();
        }, 500); // Wait for the rotation animation to complete
    } else {
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
}

prev.onclick = function(){
    if (isFlipped) {
        items[active].style.transform = 'rotateY(0deg)';
        isFlipped = false;
        setTimeout(() => {
            active = active - 1 >= 0 ? active - 1 : active;
            loadShow();
        }, 500); // Wait for the rotation animation to complete
    } else {
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }
}

function rotateCard() {
    if (isFlipped) {
        items[active].style.transform = 'rotateY(0deg)';
        isFlipped = false;
    } else {
        items[active].style.transform = 'rotateY(180deg)'; 
        isFlipped = true;
    }
}

