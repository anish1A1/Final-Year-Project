import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Ensure this points to your backend server
});

// Used this because the access token gets expired, and to re-login we need a refresh token
// to refresh the access token and log in again.
instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await instance.post('/api/token/refresh/', {
                    refresh: refreshToken
                });

                const { access } = response.data;
                localStorage.setItem('token', access);    // the name of the access token is "token"
                instance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return instance(originalRequest);

            } catch (refreshError) {
                console.log(refreshError.message);
                // Optionally log out the user if refresh token fails
               
            }
            
        }
        return Promise.reject(error);
    }
);

export default instance;
