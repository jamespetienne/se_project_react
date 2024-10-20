import "./ItemCard.css";
import dislikeButton from "../../assets/like-button-default.png";
import likeButton from "../../assets/like-button-active.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes && item.likes.includes(currentUser._id);

  const handleLike = () => {
    onCardLike(item, isLiked);
  };
  return (
    <div className="card">
      <img
        className="card__image"
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__wrapper">
        <h2 className="item__name">{item.name}</h2>
        <img
          src={isLiked ? likeButton : dislikeButton}
          alt="like button"
          onClick={handleLike}
          className="card__like-btn"
        />
      </div>
    </div>
  );
}

export default ItemCard;
