const cards = document.querySelectorAll(".memory-card");

var hasFlipperCard = false;
var lockBoard = false;
var firstCard, secondCard;
var number = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlipperCard) {
    hasFlipperCard = true;
    firstCard = this;
  } else {
    hasFlipperCard = false;
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    disableCards();
  } else {
    unfilpCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unfilpCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 800);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));

document.onclick = function() {
  number++;
  document.getElementById("clicks").innerHTML = number;
};
