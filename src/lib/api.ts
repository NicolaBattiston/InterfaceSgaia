import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface LinkResponse {
  id: string;
  originalUrl: string;
  generatedUrl: string;
}

export async function submitLink(url: string): Promise<LinkResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/links`, { url });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to process link');
    }
    throw new Error('Failed to connect to server');
  }
}

export async function getLink(id: string): Promise<LinkResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/links/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to retrieve link');
    }
    throw new Error('Failed to connect to server');
  }
}