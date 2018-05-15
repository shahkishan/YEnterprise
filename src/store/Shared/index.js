import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

export default{
    state:{
        error:false
    },
    getters:{
        error:state=>state.error
    },
    mutations:{
        setError(state,payload){
            state.error=payload
        }
    },
    actions:{
        setError({commit},payload){
            commit('setError',payload)
        }
    }
}