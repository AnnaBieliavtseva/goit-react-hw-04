import { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar/SearchBar'
import ImageGallery from './ImageGallery/ImageGallery';


function App() {
  
  const [photos, setPhotos] = useState([])
  const API_KEY = 'dAH2WY0gbSSsUbDWlp-lRWPW_KmRNxBDuNYdJet8f8k'
 

  const handleSearch = async inputValue => {
     try {
       setPhotos([]);
       const data = await fetchArticlesWithTopic(inputValue);
       setPhotos(data);
     } catch (error) {
      console.log(error);
      
     } 
      
    }
  
  const fetchArticlesWithTopic = async inputValue => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${inputValue}&per_page=20`
    );
    console.log(response.data.results);
    
    return response.data.results;
  }

  

    
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="container">
        {photos.length > 0 && <ImageGallery images={photos}/>}
      
      </div>
    </>
  );
}

export default App;
