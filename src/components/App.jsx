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
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async inputValue => {
    try {
      setLoading(true);
      setError(false);
      setPhotos([]);
      setSearchQuery(inputValue);
      setCurrentPage(1);
      const data = await fetchApi(inputValue, 1);
      setPhotos(data.results);
      setTotalPages(data.total_pages);
      if (!data.results.length) {
        setLoading(false);
        toast.error(
          'Sorry, there are no images matching your search query. Please try another query!',
          {
            duration: 1500,
            position: 'top-center',
            removeDelay: 1000,
          }
        );
        return;
      }
      if (data.results.length < 20 || data.results.length > 1) {
        setLoading(false);
        toast.error(
          'There are not enough images to load more. Try a different query!',
          {
            duration: 2500,
            position: 'bottom-center',
            removeDelay: 500,
          }
        );
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
      setPhotos(prevPhotos => [...prevPhotos, ...data.results]);
      setCurrentPage(nextPage);
      console.log(data.total_pages);
      console.log(currentPage);
      
      
      if (totalPages < currentPage) {
        setLoading(false);
        toast.error(
          "We're sorry, but you've reached the end of search results.",
          {
            duration: 2500,
            position: 'bottom-center',
            removeDelay: 1000,
          }
        );
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
        {photos.length > 0 && !loading && currentPage < totalPages && (
          <LoadMoreBtn onLoadMore={handleLoadMore} />
        )}
        {loading && <Loader />}
      </div>
    </>
  );
}

export default App;
