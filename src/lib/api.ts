import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({ baseURL: API });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export interface LinkResponse {
  id: string;
  originalUrl: string;
  generatedUrl: string;
}
export async function submitLink(url: string): Promise<LinkResponse> {
    const { data } = await api.post<LinkResponse>('/links', { url });
    return data;
  }
  export async function getLink(id: string): Promise<LinkResponse> {
    const { data } = await api.get<LinkResponse>(`/links/${id}`);
    return data;
  }