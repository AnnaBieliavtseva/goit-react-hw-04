import { useState } from 'react';
import fetchApi from './fetchApi';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMesage from './ErrorMessage/ErrorMesage';
import ImageModal from './ImageModal/ImageModal';

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async inputValue => {
    try {
      setLoading(true);
      setError(false)
      setPhotos([]);
      const data = await fetchApi(inputValue);
      setPhotos(data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

    const handleImageClick = imageSrc => {
      setSelectedImage(imageSrc); 
      setIsOpen(true); 
    };
  
    const closeModal = () => {
      setIsOpen(false); 
      setSelectedImage(null); 
    };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="container">
        {loading && <Loader />}
        {error && <ErrorMesage />}
        {photos.length > 0 && (
          <ImageGallery images={photos} onImageClick={handleImageClick} />
        )}
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          imageSrc={selectedImage}
        />
      </div>
    </>
  );
}

export default App;
