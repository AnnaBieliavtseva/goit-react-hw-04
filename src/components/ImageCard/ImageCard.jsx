// import css from './ImageCard.module.css';

const ImageCard = ({ description, alt_description, small, regular, likes }) => {
  return (
    <div>
      <a href={regular}>
        <img src={small} alt={alt_description}/>
      </a>

      <p>
        Likes: <b>{likes}</b>
      </p>
      <p>
        Descr: <b>{description  || "Photo"}</b>
      </p>
    </div>
  );
};
export default ImageCard;
