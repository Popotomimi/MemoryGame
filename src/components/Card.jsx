import React from "react";

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`card ${
        card.isFlipped
          ? "flipped animate__animated animate__flipInY"
          : "animate__animated animate__flipInX"
      }`}
      onClick={() => onClick(card)}>
      {card.isFlipped ? card.value : "?"}
    </div>
  );
};

export default Card;
