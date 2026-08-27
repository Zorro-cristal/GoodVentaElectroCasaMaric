const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      expand = document.querySelector(".btn-expand"),
      contract = document.querySelector(".btn-contract");

let sliderSection = document.querySelectorAll(".slider-section");

btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())
expand.addEventListener("click", e => expandirImagen())
contract.addEventListener("click", e => contraerImagen())

/* setInterval(() => {
    moveToRight()
}, 3000); */


let operacion = 0,
    counter = 0,
    widthImg = 0;

function expandirImagen(){
	/* let containerSlider = document.getElementById('container-carousel'); */
	$("#container-carousel").removeClass('container-carousel');
	$("#container-carousel").addClass('container-carousel-expand');
	/* $('.btn-expand').hide(); */
	document.getElementById('btn-expand').style.display='none'
	document.getElementById('btn-contract').style.display=''
}

function contraerImagen(){
	/* let containerSlider = document.getElementById('container-carousel'); */
	$("#container-carousel").removeClass('container-carousel-expand');
	$("#container-carousel").addClass('container-carousel');
	document.getElementById('btn-contract').style.display='none'
	document.getElementById('btn-expand').style.display=''
}

function moveToRight() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
}  

function moveToLeft() {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
    
}   



