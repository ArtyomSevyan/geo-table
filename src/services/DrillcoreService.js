import axiosInstance from '../config/axios';

export default {
    getDrillcoreData(page, size, filters = {}) {
        return axiosInstance.get('/drillcore', {
            params: {
                format: 'json',
                page: page ? page : null,
                paginate_by: size,
                ...filters
            }
        })
    },

    getDrillcoreById(id) {
        return axiosInstance.get('/drillcore', {
            params: {
                format: 'json',
                id: id
            }
        })
    }
}