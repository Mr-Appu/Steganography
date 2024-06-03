// api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Replace with your FastAPI server URL

export const encodeText = async (text, image) => {
  try {
    const response = await axios.post(`${BASE_URL}/text/encode`, { text, image });
    return response.data.image;
  } catch (error) {
    console.error('Error encoding text:', error);
    return null;
  }
};
