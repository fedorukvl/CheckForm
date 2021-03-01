const state =()=>({
    isLoading: false,
    isDataSended:false,
    isSuccess: false, // isSuccess и error были созданы для более понятной отладки во Vuex 
    error: '',
    isOnline: false,
    isOtherReason: false,
    anotherReason:'',
    cityList: null,
    appeal: null,
});

const getters={
    IS_LOADING(state){
        return state.isLoading;
    },
    IS_DATA_SENDED(state){
        return state.isDataSended;
    },
    IS_ONLINE(state){
        return state.isOnline;
    },
    IS_OTHER_REASON(state){
        return state.isOtherReason;
    },
    GET_ANOTHER_REASON(state){
        return state.anotherReason;
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
    SET_ANOTHER_REASON(state,reason){
        state.isOtherReason=true;
        state.anotherReason=reason;
        state.topic='';
    },
    UNSET_ANOTHER_REASON(state){
        state.isOtherReason=false;
        state.anotherReason='';
        state.topic='';
    },
    TOGGLE_USER_STATUS(state){
        state.isOnline=!state.isOnline;
        if(state.isOnline){
            state.appeal.branch='';
        }
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
    DATA_SENDED(state){
        state.isDataSended=true;
    },
    SET_INITIAL_STATE(state){
        state.appeal={
            branch: '',
            isOnline: false,
            topic: '',
            problemDescription: '',
            loadedFile: null,
        };
        state.anotherReason='';
        state.isOnline=false;
        state.isOtherReason=true;
    }
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
            alert(error);
        }
    },
    async SEND_DATA({state,commit}){
        try{
            const response = await fetch('https://60254fac36244d001797bfe8.mockapi.io/api/v1/send-form',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(state.appeal)
            });
            const result = await response.json();
            commit('SET_INITIAL_STATE');
            if(!result.success)throw new Error('Ошибка отправки заявки');
            commit('DATA_SENDED');
        }
        catch(error){
            commit('ERROR',error);
            alert(error);
        }
    }
};
export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
