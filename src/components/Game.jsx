import React, { useState, useEffect } from "react";

import Board from "./Board";

import { IoCloseCircle } from "react-icons/io5";
import { FaCat, FaDog } from "react-icons/fa";
import {
  GiSeatedMouse,
  GiElephant,
  GiAnglerFish,
  GiMonkey,
  GiHummingbird,
  GiScorpion,
  GiPartyPopper,
} from "react-icons/gi";

import confetti from "canvas-confetti";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const generateCards = () => {
  const values = [
    <FaCat />,
    <FaDog />,
    <GiSeatedMouse />,
    <GiElephant />,
    <GiAnglerFish />,
    <GiMonkey />,
    <GiHummingbird />,
    <GiScorpion />,
  ];

  const cards = values.map((value) => ({
    value,
    isFlipped: false,
  }));

  const duplicatedCards = cards
    .concat([...cards])
    .map((card, index) => ({ ...card, id: index }));

  return shuffleArray(duplicatedCards);
};

generateCards();

const Game = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);

  const playerChances = 10;

  const [chances, setChances] = useState(playerChances);

  const result = cards.filter((card) => card.isFlipped).length;

  useEffect(() => {
    if (result === cards.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [result, cards]);

  const handleCardClick = (clickedCard) => {
    if (chances === 0) return;

    if (flippedCards.length === 2) return;

    const newCards = cards.map((card) => {
      return card.id === clickedCard.id ? { ...card, isFlipped: true } : card;
    });

    setCards(newCards);
    setFlippedCards([...flippedCards, clickedCard]);

    if (flippedCards.length === 1) {
      setTimeout(() => {
        const [firstCard] = flippedCards;

        if (firstCard.value !== clickedCard.value) {
          const resetCards = cards.map((card) => {
            if (card.id === firstCard.id || card.id === clickedCard.id) {
              return { ...card, isFlipped: false };
            }
            return card;
          });

          setCards(resetCards);
          setChances((prev) => prev - 1);
        }

        setFlippedCards([]);
      }, 600);
    }
  };

  const resetGame = () => {
    setChances(playerChances);
    setFlippedCards([]);
    setCards(generateCards());
  };

  return (
    <div className="game">
      <Board cards={cards} onCardClick={handleCardClick} />
      {chances === 0 ? (
        <p className="game_over">
          <IoCloseCircle />
          Suas tentativas acabaram
          <IoCloseCircle />
        </p>
      ) : result === cards.length ? (
        <h2 className="animate__animated animate__tada win">
          <GiPartyPopper />
          Parabéns você ganhou!
          <GiPartyPopper />
        </h2>
      ) : (
        <p>Você possui {chances} tentativas(s)</p>
      )}
      <button className="btn" onClick={resetGame}>
        Reiniciar o jogo
      </button>
    </div>
  );
};

export default Game;
