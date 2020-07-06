import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.geocollections.info',
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: (params) => {
        let result = '';

        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== '') {
                result += `${key}=${encodeURIComponent(params[key])}&`;
            }
        });
        return result.substr(0, result.length - 1);
    }
});

export default axiosInstance;