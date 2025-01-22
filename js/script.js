const cardsArray = [
    'image/student1.jpg',
    'image/student2.jpg',
    'image/student3.jpg',
    'image/student4.jpg',
    'image/student5.jpg',
    'image/student6.jpg',
    'image/student7.jpg',
];

let gameBoard = document.getElementById('game-board');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const doubledArray = shuffle([...cardsArray, ...cardsArray]);
    gameBoard.innerHTML = '';
    matchedPairs = 0;

    doubledArray.forEach((item, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.value = item;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${index + 1}</div>
                <div class="card-back">
                    <img src="${item}" alt="Card Image">
                </div>
            </div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard(event) {
    let card = event.target.closest('.card');
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    let [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === cardsArray.length) {
            setTimeout(() => alert('축하합니다! 중학교 1학년 친구의 모든 짝을 맞추었습니다!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

function restartGame() {
    flippedCards = [];
    cards = [];
    createBoard();
}

createBoard();
