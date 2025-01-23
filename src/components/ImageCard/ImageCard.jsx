import css from './ImageCard.module.css';

const ImageCard = ({
  userName,
  alt_description,
  small,
  regular,
  likes,
  onImageClick,
}) => {
  const handleClick = e => {
    e.preventDefault();
    onImageClick(regular);
  };
  return (
    <div>
      <a href={regular} onClick={handleClick}>
        <img src={small} alt={alt_description} className={css.img} />
      </a>
      <div className={css.thumb}>
        <p className={css.text}>
          Author:
          <b>{userName}</b>
        </p>
        <p className={css.text}>
          Likes:
          <b>{likes}</b>
        </p>
      </div>
    </div>
  );
};
export default ImageCard;
