let slide_left=document.querySelector(".slide_left")
let slide_right=document.querySelector(".slide_right")
let slideshowMod=document.querySelector(".image_module");

let currentIndex=0

let img1="assets/images/background.jpg"
let img2="assets/images/dog.jpg"
let img3="assets/images/vaporwave.jpg"


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
            },5000);
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

    function menu() {
        let mainMenu = document.querySelector('.main_menu');
        let slideshow=document.querySelector('.content_show');

        mainMenu.classList.toggle('disabled_menu')
        mainMenu.classList.toggle('block_menu')

        if(mainMenu.classList.contains('block_menu')) {
            slideshow.style.opacity = '0.2';
        }
        else if(mainMenu.classList.contains('disabled_menu')) {
            slideshow.style.opacity = '1.0';
        }
    }

    function expand() {
        let image_module=document.querySelector('.image_module');

        if (image_module.style.transform==='scale(1.0)')
            image_module.style.transform ='scale(1.1)';
        else if (image_module.style.transform==='scale(1.1)') {
            image_module.style.transform ='scale(1.0)';
        }
    }
