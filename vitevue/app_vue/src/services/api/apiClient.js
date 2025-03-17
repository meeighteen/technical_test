import axios from 'axios';
import { API_CONFIG, DEFAULT_HEADERS } from './config';

const createApiClient = (apiType) => {
  const config = API_CONFIG[apiType];

  if (!config) {
    throw new Error(`API client for ${apiType} not found in configuration.`);
  }

  return axios.create({
    baseURL: config.BASE_URL,
    timeout: config.TIMEOUT,
    headers: DEFAULT_HEADERS
  });
};

// Crear los clientes para las API GO y NODE
export const goApiClient = createApiClient('GO');
export const nodeApiClient = createApiClient('NODE');
