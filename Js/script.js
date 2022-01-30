const typing_text = document.querySelector(".paragraphs-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".wrapper .content-box .nav .time span b"),
wpmTag = document.querySelector(".wrapper .content-box .nav .wpm span"),
cpmTag = document.querySelector(".wrapper .content-box .nav .cpm span"),
mistakeTag = document.querySelector(".wrapper .content-box .nav .mistakes span"),
tryAgainBtn = document.querySelector(".wrapper .content-box .nav button");

let timer,
maxTime = 60,
timeleft = maxTime,
charIndex = mistakes = isTyping = 0;

function random_paragraph(){
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typing_text.innerHTML = "";
    console.log(paragraphs[randIndex].split(""));
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typing_text.innerHTML += spanTag;
    });
    typing_text.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typing_text.addEventListener("click", ()=> inpField.focus());
}

function initTyping(){
    const characters = typing_text.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeleft > 0){
        if(!isTyping){
            timer = setInterval(ininTimer,1000);
            isTyping = true;
        }
        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        }else{
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round(((charIndex - mistakes )/5)/(maxTime - timeleft)*60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    }else{
        inpField.value = "";
        clearInterval(timer);
    }
}

function ininTimer(){
    if(timeleft > 0){
        timeleft--;
        timeTag.innerHTML = timeleft;
    }else{
        clearInterval(timer)
    }
}

function resetGame(){
    random_paragraph();
    inpField.value = "";
    clearInterval(timer);
    timeleft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeleft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

random_paragraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);