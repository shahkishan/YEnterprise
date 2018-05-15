import Vue from 'vue'
import vuex from 'vuex'
import Customer from '../../models/Customer'
import axios from 'axios'
import Constants from '../../Utility/constants'
import firebase from 'firebase'
import 'firebase/firestore'
const BASE_URL=Constants.BASE_URL
const MODEL_URL='customers/'
const URL=BASE_URL+MODEL_URL
Vue.use(vuex)

export default{
    state:{
        customers:[]
    }, 
    getters:{
        getCustomers:state=>state.customers
    },
    mutations:{
        loadCustomers:(state,payload)=>{
            state.customers=payload
        }
    },
    actions:{
        addNewCustomer({commit,getters},payload){
            firebase.firestore().collection('customers').add({name:payload.name,contact:payload.contact,email:payload.email,gstno:payload.gstno, address:payload.address, sites:[]})
                .then(docRef=>{
                    console.log("Document Created: "+docRef.id)
                })
                .catch(err=>{
                    console.error("Error creating document: "+err)
                })
        },
        loadCustomers({commit,getters}){
            firebase.firestore().collection('customers').orderBy('name').onSnapshot(snapshot=>{
                var customers=[]
                snapshot.forEach(doc=>{
                    var customer=Customer.defaultObject
                    customer=doc.data()     
                    customer.customer_id=doc.id
                    
                    firebase.firestore().collection('customers').doc(doc.id).collection('sites').orderBy('site_name').onSnapshot(sitesSnapshot=>{
                        var sites=[]
                            sitesSnapshot.forEach(siteData=>{
                                var site=Customer.Site
                                site=siteData.data()
                                site.site_id=siteData.id
                                sites.push(site)
                            })
                            customer.sites=sites
                    })
                        // .then(sitesSnapshot=>{
                            
                            
                        // })
                        customers.push(customer)
                })
                commit('loadCustomers',customers)
            })
        },
        unloadCustomers(){
            firebase.database().ref('customers').off('value')
        },
        updateCustomer({commit,getters},payload){
            firebase.firestore().collection('customers').doc(payload.customer_id).update({name:payload.name,email:payload.email,contact:payload.contact,gstno:payload.gstno,address:payload.address})
                .then(()=>{
                    console.log("Document Updated"+payload.customer_id)
                })
                .catch(err=>{
                    console.error("Error updating document"+err)
                })
        },
        deleteCustomer({commit,getters},payload){
            console.log(payload)
            firebase.firestore().collection('customers').doc(payload).delete()
        },
        addSite({commit},payload){
            console.log(payload.site)
            firebase.firestore().collection('customers').doc(payload.customer_id).collection('sites').add({site_name:payload.site.site_name,address:payload.site.address})
                .then(docRef=>{
                    console.log("Created: "+docRef.id)
                })
                .catch(err=>{
                    console.error("Error"+err)
                })
        },
        editSite({},payload){
            console.log(payload)
            firebase.firestore().collection('customers').doc(payload.customer_id).collection('sites').doc(payload.site.site_id).update({site_name:payload.site.site_name,address:payload.site.address})
                .then(()=>{
                    console.log("Site updated")
                })
                .catch(err=>{
                    console.error("Error updating site")
                })
        },
        deleteSite({},payload){
            firebase.firestore().collection('customers').doc(payload.customer_id).collection('sites').doc(payload.site_id).delete()
                .then(()=>{
                    console.log("Site Deleted")
                })
                .catch(err=>{
                    console.error("Error deleting site")
                })
        }
    }
}