import Vue from 'vue'
import Vuex from 'vuex'
import Rent from '../../models/RentDetails'
import axios from 'axios'
import Constants from '../../Utility/constants'
const BASE_URL=Constants.BASE_URL
const MODEL_URL='rentDetails/'
const URL=BASE_URL+MODEL_URL
Vue.use(Vuex)

export default{
    state:{
        rents:[]
    },
    getters:{
        getRentDetails:state=>state.rents
    },
    mutations:{
        
    },
    actions:{
        
    }
}