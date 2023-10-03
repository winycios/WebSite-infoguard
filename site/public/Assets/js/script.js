//navbar
let togglebtn = document.querySelector('.toggle-btn')
let navbar = document.querySelector('.navbar')

togglebtn.addEventListener('click', () => {
    navbar.classList.toggle('mobile-nav')
})

//Efeito de maquina de escrever

var content = ["SOLUTION", "CODERS", "TECH"];
var text = document.getElementById('text');

var speed = 900;
var cont = 0;
var charIndex = 0; // Adicione esta variável para controlar os caracteres de cada palavra

function typeWriter() {
    if (cont < content.length) {
        if (charIndex < content[cont].length) { // Verifica se há mais caracteres na palavra atual
            text.textContent += content[cont].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed);
        } else {
            text.textContent = ''; // Limpa o texto para a próxima palavra
            charIndex = 0; // Reinicia o índice de caracteres
            cont++;
            setTimeout(typeWriter, speed);
        }
    } else {
        cont = 0;
        charIndex = 0;
        typeWriter();
    }
}

typeWriter();

let swiperCards = new Swiper(".card__content", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        600: {
            slidesPerView: 2,
        },
        968: {
            slidesPerView: 2,
        },
    },
});
