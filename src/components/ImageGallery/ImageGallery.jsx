import ImageCard from '../ImageCard/ImageCard';
// import css from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <ul>
      {images.map(({id, description, urls, likes, alt_description }) => {
        return (
          <li key={id}>
            <ImageCard description={description} regular={urls.regular} small={urls.small} likes={likes} alt_description={alt_description} />
          </li>
        );
      })}
    </ul>
  );
}
