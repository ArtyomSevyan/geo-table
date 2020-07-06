import DrillcoreService from '../../services/DrillcoreService';

export default {
    state: {
        drillcoreData: [],
        drillcore: {},
        drillcoreTotal: null
    },

    mutations: {
        SET_DRILLCORE_DATA(state, payload) {
            state.drillcoreData = payload;
        },

        SET_DRILLCORE(state, payload) {
            state.drillcore = payload;
        },

        SET_DRILLCORE_TOTAL(state, payload) {
            state.drillcoreTotal = payload;
        }
    },

    actions: {
        fetchDrillcoreData({ commit }, { page, size, filters } = {}) {
            if (!size || size > 0) {
                DrillcoreService.getDrillcoreData(page, size, filters)
                    .then(response => {
                        if (response.status === 200) {
                            commit('SET_DRILLCORE_DATA', response.data.results)
                            commit('SET_DRILLCORE_TOTAL', response.data.count);
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            }
        },

        fetchDrillcore({ commit, getters }, id) {
            let drillcore = getters.getDrillcoreById(id);

            if (drillcore) {
                commit('SET_DRILLCORE', drillcore);
            } else {
                DrillcoreService.getDrillcoreById(id)
                    .then(response => {
                        if (response.status === 200) {
                            commit('SET_DRILLCORE', response.data.results[0])
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            }
        }
    },

    getters: {
        getDrillcoreById: state => {
            return (id) => state.drillcoreData.find(drillcore => drillcore.id === id);
        }
    }
}