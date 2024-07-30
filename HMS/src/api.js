import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // or your backend server URL
});

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/chat', { message });
    return response.data.message;
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    throw error;
  }
};
