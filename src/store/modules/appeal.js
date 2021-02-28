const state =()=>({
    isLoading: false,
    isSuccess: false,
    error: '',
    isOnline: false,
    isOtherReason: false,
    cityList: null,
    appeal: null,
});

const getters={
    IS_LOADING(state){
        return state.isLoading;
    },
    IS_ONLINE(state){
        return state.isOnline;
    },
    IS_OTHER_REASON(state){
        return state.isOtherReason;
    },
    GET_ERROR(state){
        return state.error;
    },
    GET_CITY_LIST(state){
        if(state.cityList){
            return state.cityList;
        }else{
            return null;
        }
    },
}

const mutations={
    SET_CITY_LIST(state,cityList){
        state.cityList=cityList;
    },
    SET_INITIAL_APPEAL(state){
        state.appeal={
            branch: '',
            isOnline: false,
            topic: '',
            problemDescription: '',
            loadedFile: null,
        };
    },
    SET_APPEAL_FIELD(state,{field,value}){
        state.appeal[field] = value;
    },
    TOGGLE_USER_STATUS(state){
        state.isOnline=!state.isOnline;
    },
    TOGGLE_USER_APPEAL_REASON(state){
        state.isOtherReason=!state.isOtherReason;
    },
    LOADING(state){
        state.isLoading=true;
    },
    SUCCESS(state){
        state.isLoading=false;
        state.isSuccess=true;
    },
    ERROR(state,error){
        state.isLoading=false;
        state.error=error;
    },
};

const actions={
    async FETCH_CITIES({commit}){
        commit('LOADING');
        try{
            const response = await fetch('https://60254fac36244d001797bfe8.mockapi.io/api/v1/city');
            const cities = await response.json();
            commit('SUCCESS');
            commit('SET_INITIAL_APPEAL');
            commit('SET_CITY_LIST',cities);
        }
        catch(error){
            commit('ERROR',error);
        }
    },
};
export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
