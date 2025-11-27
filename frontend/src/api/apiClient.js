    import axios from 'axios';

    // We no longer need the full base URL. We just need the path to the proxy.
    const API_BASE_URL = '/api/v1';

    const apiClient = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true, 
    });

    export default apiClient;
    