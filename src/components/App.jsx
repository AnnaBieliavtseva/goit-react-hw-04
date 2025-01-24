import { useState } from 'react';
import { animateScroll } from 'react-scroll';
import toast from 'react-hot-toast';
import fetchApi from './fetchApi';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMesage from './ErrorMessage/ErrorMesage';
import ImageModal from './ImageModal/ImageModal';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async inputValue => {
    try {
      setLoading(true);
      setError(false);
      setPhotos([]);
      setSearchQuery(inputValue);
      setCurrentPage(1);
      const data = await fetchApi(inputValue, 1);
      setPhotos(data);
      if (!data.length) {
        setLoading(false);
         toast.error('Sorry, there are no images matching your search query. Please try another query!', {
           duration: 1500,
           position: 'top-center',
           removeDelay: 1000,
         });
      }
      if (!modalIsOpen) {
        animateScroll.scrollToBottom({
          duration: 600,
          smooth: true,
        });
      }
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

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      setError(false);
      const nextPage = currentPage + 1;
      const data = await fetchApi(searchQuery, nextPage);
      setPhotos(prevPhotos => [...prevPhotos, ...data]);
      setCurrentPage(nextPage);
      if (!modalIsOpen) {
        animateScroll.scrollToBottom({
          duration: 600,
          smooth: true,
        });
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="container">
        {error && <ErrorMesage />}
        {photos.length > 0 && (
          <ImageGallery images={photos} onImageClick={handleImageClick} />
        )}
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          imageSrc={selectedImage}
        />
        {photos.length > 0 && !loading && (
          <LoadMoreBtn onLoadMore={handleLoadMore} />
        )}
        {loading && <Loader />}
        {/* <Toaster></Toaster> */}
      </div>
    </>
  );
}

export default App;
