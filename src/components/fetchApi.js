import axios from 'axios';

const UNSPLASH_KEY = import.meta.env.VITE_API_KEY
axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] = `Client-ID ${UNSPLASH_KEY}`;

const fetchApi = async inputValue => {
  const response = await axios.get(
    `/search/photos?&query=${inputValue}&per_page=20`
  );
  console.log(response.data.results);

  return response.data.results;
};

export default fetchApi;
