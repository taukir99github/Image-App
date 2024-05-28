
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com'; 

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: {
        _page: page,
        _limit: 6,
        q: query
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

export const fetchImageDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image details:', error);
    return null;
  }
};


export const fetchSimilarImages = async (category) => {
    try {
      const response = await axios.get(API_URL + '/products');
      const filteredProducts = category
        ? response.data.filter(product => product.category === category)
        : response.data;
      console.log(filteredProducts)

      return filteredProducts;
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };
  
