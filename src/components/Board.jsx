import Card from "./Card";

const Board = ({ cards }) => {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Board;
