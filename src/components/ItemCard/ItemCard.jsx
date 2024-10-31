import "./ItemCard.css";
import dislikeButton from "../../assets/like-button-default.png";
import likeButton from "../../assets/like-button-active.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item?.likes?.includes(currentUser?._id) || false;

  const handleLike = () => {
    if (isLoggedIn) {
      onCardLike(item, isLiked);
    } else {
      console.log("User not logged in");
    }
  };

  const handleCardClick = () => {
    onCardClick(item);
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
        {isLoggedIn ? (
          <button className="like_button-container">
            <img
              src={isLiked ? likeButton : dislikeButton}
              alt="like button"
              onClick={handleLike}
              className="card__like-btn"
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ItemCard;
