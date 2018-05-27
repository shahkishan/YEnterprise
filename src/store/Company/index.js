import Vue from 'vue'
import Vuex from 'vuex'
import Compnay from '../../models/Company'
import firebase from 'firebase' 
import 'firebase/firestore'
Vue.use(Vuex)

export default{
    state:{
        companies:[]
    },
    getters:{
        getCompanies:state=>state.companies
    },
    mutations:{
        loadCompanies:(state,payload)=>{
            state.companies=payload
        },
    },
    actions:{
        addNewCompany({commit,getters},payload){
            firebase.firestore().collection('companies').add(payload)
                .then(docRef=>{
                    console.log(docRef.id)
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        loadCompanies({commit,getters})
        {
            firebase.firestore().collection('companies').orderBy('name').onSnapshot(snapshot=>{
                var companies=[]
                snapshot.forEach(doc=>{
                    var company={}
                    company=doc.data()
                    company.company_id=doc.id
                    companies.push(company)
                })
                commit('loadCompanies',companies)
            })
        },
        updateCompany({commit,getters},payload){
            firebase.firestore().collection('companies').doc(payload.company_id).update(payload.details)
                .then(()=>{
                    console.log("updated")
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        deleteCompany({commit,getters},payload){
            firebase.firestore().collection('companies').doc(payload).delete()
                .then(()=>{
                    console.log("deleted")
                })
                .catch(err=>{
                    console.error(err)
                })
        }
    }

    
}

