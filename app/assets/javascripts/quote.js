window.onload = function(){

  let qButton = document.querySelector("#qButton");

  qButton.addEventListener("click", function(){

    let copyText = document.createElement("textarea");
    copyText.textContent = quote.text;

    var text = document.querySelector(".quote__content__text");
    text.appendChild(copyText);

    text.classList.toggle("active");
    text.addEventListener('animationend', function(){
    })

    copyText.select();
    document.execCommand("copy");

    text.removeChild(copyText);

    let popupC = document.querySelector("#copied");
    popupC.classList.toggle("active");
    popupC.addEventListener('animationend', function(){
      popupC.classList.remove("active");
    })

  });

}
