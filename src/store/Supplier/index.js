import Vue from 'vue'
import vuex from 'vuex'
import Supplier from '../../models/Supplier'
import axios from 'axios'
import Constants from '../../Utility/constants'
import firebase from 'firebase'
const BASE_URL=Constants.BASE_URL
const MODEL_URL='suppliers/'
const URL=BASE_URL+MODEL_URL
import 'firebase/firestore'
Vue.use(vuex)

export default{
    state:{
        suppliers:[]
    }, 
    getters:{
        getSuppliers:state=>state.suppliers
    },
    mutations:{
        loadSuppliers:(state,payload)=>{
            state.suppliers=payload
        }
    },
    actions:{
        addNewSupplier({commit,getters},payload){
            firebase.firestore().collection('suppliers').add({name:payload.name,contact:payload.contact,email:payload.email,gstno:payload.gstno,address:payload.address})
                .then(docRef=>{
                    console.log("Document created: "+docRef)
                })
                .catch(err=>{
                    console.error("Error creating document: "+err)
                })
        },
        loadSuppliers({commit,getters}){
            
            firebase.firestore().collection('suppliers').orderBy('name').onSnapshot(datasnapshot=>{
                var suppliers=[]
                datasnapshot.forEach(doc=>{
                    var supplier=Supplier
                    supplier=doc.data()
                    supplier.supplier_id=doc.id
                    // console.log(supplier)
                    suppliers.push(supplier)
                })
                commit('loadSuppliers',suppliers)
            })
        },
        unloadSuppliers(){
            firebase.database().ref('suppliers').off('value')
        },
        updateSupplier({commit,getters},payload){
                firebase.firestore().collection('suppliers').doc(payload.supplier_id).update({name:payload.name,email:payload.email,contact:payload.contact,gstno:payload.gstno,address:payload.address})
                .then(function(){
                    console.log("Document updated!")
                })
                .catch(err=>{
                    console.error("Error updating document: "+err)
                })
        },
        deleteSupplier({commit,getters},payload){
            firebase.firestore().collection('suppliers').doc(payload).delete()
                .then(()=>{
                    console.log("Document deleted: "+payload)
                })
                .catch(()=>{
                    console.error("Error deleting document: "+err)
                })
        }
    }
}