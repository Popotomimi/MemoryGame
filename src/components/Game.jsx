import React, { useState } from "react";
import Board from "./Board";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const generateCards = () => {
  const values = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const cards = values.map((value) => ({
    value,
    isFlipped: false,
  }));

  const duplicatedCards = cards
    .concat([...cards])
    .map((card, index) => ({ ...card, index }));

  return shuffleArray(duplicatedCards);
};

generateCards();

const Game = () => {
  const [cards, setCards] = useState(generateCards());

  const [flippedCards, setFlippedCards] = useState([]);

  const [chances, setChances] = useState(6);

  const result = cards.filter((card) => card.isFlipped).length;

  return (
    <div className="game">
      <Board cards={cards} />
      {chances === 0 ? (
        <p>Suas tentativas acabaram</p>
      ) : result === cards.length ? (
        <h2>Parabéns você ganhou!</h2>
      ) : (
        <p>Você possui {chances} tentativas(s)</p>
      )}
      <button className="btn">Reiniciar o jogo</button>
    </div>
  );
};

export default Game;
