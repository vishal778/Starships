import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const BASE_URL = 'https://swapi.dev/api/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(endpoint, config);
    return response.data;
  } catch (error: any) {
    console.error('GET request error:', error);
    throw error;
  }
};
