let slide_left=document.querySelector(".slide_left")
let slide_right=document.querySelector(".slide_right")
let slideshowMod=document.querySelector(".image_module");

let currentIndex=0

let img1="/images/landscape.jpg"
let img2="/images/dog.jpg"
let img3="/images/vaporwave.jpg"


    lista=[img1,img2,img3]


    function updateSlide() {
        slideshowMod.style.backgroundImage= `url(${lista[currentIndex]})`
    }


    window.onload=function slideshow() {
            setInterval(()=> {
                currentIndex++
                if (currentIndex >=lista.length) {
                    currentIndex =0
                }
            },6000);
            setInterval(updateSlide,100)
        }


    function slideshowLeft() {
        
        currentIndex++;

        if (currentIndex >=lista.length) {
            currentIndex =0
        }

        updateSlide()

    }

    function slideshowRight() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = lista.length - 1;
        }
        updateSlide();

    }

