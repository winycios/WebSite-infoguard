const toast = document.querySelector("#toast")
progress = document.querySelector("#progress");

let timer1, timer2;


function abrirToast() {
    toast.style.display = "block";

    setTimeout(() => {
        toast.classList.add("active");
        //progress.classList.add("active");
    }, 50);
    // timer1 = setTimeout(() => {
    //     toast.classList.remove("active");
    // }, 5000);
    // timer2 = setTimeout(() => {
    //     progress.classList.remove("active");
    //     toast.style.display = "none";
    // }, 5300);
};

function closed() {
    toast.classList.remove("active");

    setTimeout(() => {
    //progress.classList.remove("active");
        toast.style.display = "none";
    }, 300);
    clearTimeout(timer1);
    clearTimeout(timer2);
};



// equipe 2

const toast2 = document.querySelector("#toast2")
progress2 = document.querySelector("#progress2");

let timer3, timer4;


function abrirToastEq2() {
    toast2.style.display = "block";

    setTimeout(() => {
        toast2.classList.add("active");
    //    progress2.classList.add("active");
    }, 50);

    // timer3 = setTimeout(() => {
    //     toast2.classList.remove("active");
    // }, 5000); //1s = 1000 milliseconds
    // timer4 = setTimeout(() => {
    //     progress2.classList.remove("active");
    //     toast2.style.display = "none";
    // }, 5300);
};

function closed2() {
    toast2.classList.remove("active");

    setTimeout(() => {
    //    progress2.classList.remove("active");
        toast2.style.display = "none";
    }, 300);
    clearTimeout(timer3);
    clearTimeout(timer4);
};