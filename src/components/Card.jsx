import React from "react";

const Card = ({ card }) => {
  return (
    <div className={`card ${card.isFlipped ? "flipped" : ""}`}>
      {card.value}
    </div>
  );
};

export default Card;
