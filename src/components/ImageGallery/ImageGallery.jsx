import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, user, urls, likes, alt_description }) => {
        return (
          <li key={id + Math.random(0.2)} className={css.card}>
            <ImageCard
              userName={user.name}
              regular={urls.regular}
              small={urls.small}
              likes={likes}
              alt_description={alt_description}
              onImageClick={onImageClick}
            />
          </li>
        );
      })}
    </ul>
  );
}
