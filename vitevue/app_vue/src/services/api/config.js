export const API_CONFIG = {
    GO: {
      BASE_URL: import.meta.env.VITE_GO_API_URL || 'https://auth.example.com',
      TIMEOUT: 10000
    },
    NODE: {
      BASE_URL: import.meta.env.VITE_NODE_API_URL || 'https://analytics.example.com',
      TIMEOUT: 10000
    }
  };
  
  export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };