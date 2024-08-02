import "./ItemCard.css";
import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  const openPreview = () => {
    handleCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={openPreview}
        src={item.link}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
