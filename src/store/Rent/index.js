import Vue from 'vue'
import Vuex from 'vuex'
import RentDetails from '../../models/RentDetails'
import axios from 'axios'
import Constants from '../../Utility/constants'
import firebase from 'firebase'
import 'firebase/firestore'
import EventBus from '../../EventBus'

Vue.use(Vuex)

export default{
    state:{
        rents:[],
        rent:{}
    },
    getters:{
        getRents:state=>state.rents,
        getCurrentRent:state=>state.rent
    },
    mutations:{
        LoadAllRents(state,payload){
           state.rents=payload
        },
        SetUpdateRent(state,payload){
            state.rent=payload
            EventBus.$emit('updateRentItemReceived',payload)
        }
    },
    actions:{
        LoadAllRents({commit,getters,dispatch}){
            firebase.firestore().collection('rents').orderBy('date').onSnapshot(snapshot=>{
                var rents=[]
                snapshot.forEach(doc=>{
                    var rent=Object.assign({},RentDetails)
                    rent=doc.data()
                    rent.rent_id=doc.id
                    firebase.firestore().collection('rents').doc(doc.id).collection('dispatches').onSnapshot(dispatchSnapshot=>{
                        var dispatches=[]
                        dispatchSnapshot.forEach(dispatchDoc=>{
                            var dispatch=dispatchDoc.data()
                            dispatch.dispatchId=dispatchDoc.id
                            dispatches.push(dispatch)
                        })
                        rent.dispatchedItems=dispatches
                    })
                    rents.push(rent)
                    
                })
                commit('LoadAllRents',rents)
                
                setTimeout(()=>{
                    dispatch('loadDispatches')
                },5000)
            })
        },
        AddNewRent({commit},payload){
            delete payload.rent_id
            var flag=false

            firebase.firestore().collection('rents').add(payload)
                .then(docRef=>{
                    console.log(docRef.id)
                    flag=true
                    payload.items.forEach(item=>{
                        firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).get()
                            .then(docRef=>{
                                var subitem=docRef.data()
                                subitem.quantity-=item.quantity
                                firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).update(subitem)
                                    .then(()=>{
                                        
                                    })
                                    .catch(err=>{
                                        console.error(err)
                                    })
                            })
                    })
                    EventBus.$emit("onRentAddedSuccess")
                })
                .catch(err=>{
                    console.error(err)
                    EventBus.$emit("onRentAddedFailure")
                })
            return flag    
        },
        loadUpdateRent({commit},payload){
            firebase.firestore().collection('rents').doc(payload).get()
                .then(docRef=>{
                    var rent=docRef.data()
                    rent.rent_id=docRef.id
                    commit('SetUpdateRent',rent)
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        deleteRent({commit},payload){
            console.log(payload)
            firebase.firestore().collection('rents').doc(payload.rent_id).delete()
                .then(()=>{
                    payload.items.forEach(item=>{
                        firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).get()
                            .then(docRef=>{
                                var updatedItem=docRef.data()
                                updatedItem.quantity+=item.quantity
                                firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).update(updatedItem)
                                    .then(()=>{
                                        console.log("updatedold"+updatedItem.quantity)
                                    })
                            })
                            .catch(err=>{
                                console.error(err)
                            })
                    })
                    console.log("deleted")
                    return true
                })
                .catch(err=>{
                    console.error(err)
                    return false
                })
        },
        updateRent({},payload){
            var oldPurchaseItems=payload.oldPurchase.items
            var newPurchaseItems=payload.newPurchase.items
            var rent_id=payload.newPurchase.rent_id
            delete payload.newPurchase.rent_id
            firebase.firestore().collection('rents').doc(rent_id).update(payload.newPurchase)
                .then(()=>{

                    oldPurchaseItems.forEach(item=>{
                        firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).get()
                            .then(docRef=>{
                                var updatedItem=docRef.data()
                                updatedItem.quantity+=item.quantity
                                firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).update(updatedItem)
                                    .then(()=>{
                                        console.log("updatedold"+updatedItem.quantity)
                                    })
                            })
                            .catch(err=>{
                                console.error(err)
                            })
                    })
                    setTimeout(()=>{
                    newPurchaseItems.forEach(item=>{
                        firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).get()
                            .then(docRef=>{
                                var updatedItem=docRef.data()
                                updatedItem.quantity-=item.quantity
                                firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).update(updatedItem)
                                    .then(()=>{
                                        console.log("updatednew"+updatedItem.quantity)
                                    })
                            })
                            .catch(err=>{
                                console.error(err)
                            })
                    })},5000)

                    console.log("updated")
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        loadFilteredRents({commit},payload){
            firebase.firestore().collection('rents').where('company_id','==',payload).orderBy('date').onSnapshot(snapshot=>{
                // console.log("jere")
                var rents=[]
                snapshot.forEach(doc=>{
                    var rent=Object.assign({},RentDetails)
                    rent=doc.data()
                    rent.rent_id=doc.id
                    rents.push(rent)
                })
                commit('LoadAllRents',rents)
            })
        },
        setUpdateItem({commit},payload){
            commit('setUpdateItem',payload)
        },
        
        
    }
}