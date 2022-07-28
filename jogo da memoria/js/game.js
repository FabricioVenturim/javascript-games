const grid = document.querySelector(".grid");

const numbersCard = ["1", "2", "3", "4", "5","6", "7", "8", "9", "10",]

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
    const disabledCard = document.querySelectorAll(".disabled-card");

    if(disabledCard.length == 20) {
        alert("Parabéns! Você venceu!");
    }
}

const checkCards = () => {
    const firstNumber = firstCard.getAttribute("data-number");
    const secondNumber = secondCard.getAttribute("data-number");

    if(firstNumber == secondNumber){
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";

        }, 500)
    }
}

const revealCard = ({target}) => {
    if(target.parentNode.className.includes("reveal-card")) {
        return;
    }
    
    if(firstCard == ""){
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
    } else if(secondCard == ""){
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
    }

    checkCards();
}

//Função para criar as cartas do jogo
const createCard = (number) => {

    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");

    card.className = "card";
    front.className = "face front";
    back.className = "face back";

    front.style.backgroundImage = `url('../images/rick/${number}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-number", number)
    return card;
}

const loadGame = () => {
    // Espalhar as cartas
    const duplicatenumbersCard = [ ...numbersCard, ...numbersCard] 
    const shuffledArray = duplicatenumbersCard.sort(() => Math.random() - 0.5); 
    
    shuffledArray.forEach((number) => {
        const card = createCard(number);
        grid.appendChild(card);
    });
}

loadGame();