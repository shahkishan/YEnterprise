import Vue from 'vue'
import vuex from 'vuex'
import PurchaseDetails from '../../models/PurchaseDetails'
import firebase from 'firebase'
import 'firebase/firestore'
import EventBus from '../../EventBus'
export default{
    state:{
        purchases:[],
        purchase:PurchaseDetails
    },
    mutations:{
        loadPurchases(state,payload){
            state.purchases=payload
        },
        setUpdateItem(state,payload){
            state.purchase=payload
        }
    },
    actions:{

        loadAllPurchases({commit,getters,dispatch}){
                firebase.firestore().collection('purchases').orderBy('date').onSnapshot(snapshot=>{
                    var purchases=[]
                    snapshot.forEach(doc=>{
                        var purchase=Object.assign({},PurchaseDetails)
                        purchase=doc.data()
                        purchase.purchase_id=doc.id
                        purchases.push(purchase)
                    })
                    commit('loadPurchases',purchases)
                })
        },
        loadFilteredPurchases({commit},payload){
            firebase.firestore().collection('purchases').where('company_id',"==",payload).orderBy('date').onSnapshot(snapshot=>{
                var purchases=[]
                snapshot.forEach(doc=>{
                    var purchase=Object.assign({},PurchaseDetails)
                    purchase=doc.data()
                    purchase.purchase_id=doc.id
                    purchases.push(purchase)
                })
                commit('loadPurchases',purchases)
            })
        },

        addPurchase({commit,getters,dispatch},payload){
            delete payload.purchase_id
            
            payload.items.forEach(item=>{
                console.log(item.item_id+" "+item.subitem_id)
                firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).get().then(docRef=>{
                        var subitem=docRef.data()
                        subitem.quantity+=item.quantity
                        firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).update(subitem)
                            .then(()=>{
                                console.log('qty')
                            })
                            .catch(err=>{
                                console.error(err)
                            })
                })
                .catch(err=>{
                    console.error(err)
                })
            })

            firebase.firestore().collection('purchases').add(payload)
                .then(docRef=>{
                    console.log(docRef.id)
                    return true
                })
                .catch(err=>{
                    console.error(err)
                    return false
                })
        },

        deletePurchase({commit,getters,dispatch},payload){
            firebase.firestore().collection('purchases').doc(payload.purchase_id).delete()
                .then(()=>{
                    
                    payload.items.forEach(item=>{
                        firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).get()
                        .then(docRef=>{
                            var updatedItem=docRef.data()
                            updatedItem.quantity-=item.quantity
                            firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).update(updatedItem)
                                .then(()=>{
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
        setUpdateItem({commit,getters},payload){
            commit('setUpdateItem',payload)
        },
        updatePurchase({commit,getters},payload){
            var id=payload.newPurchase.purchase_id
            delete payload.newPurchase.purchase_id
            
            var oldPurchaseItems=payload.oldPurchase.items
            var newPurchaseItems=payload.newPurchase.items
            console.log(JSON.stringify(payload))
            
            firebase.firestore().collection('purchases').doc(id).update(payload.newPurchase)
                .then(()=>{
                    console.log(oldPurchaseItems.length+" "+newPurchaseItems.length)
                    oldPurchaseItems.forEach(item=>{
                        firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).get()
                            .then(docRef=>{
                                var updatedItem=docRef.data()
                                updatedItem.quantity-=item.quantity
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
                                updatedItem.quantity+=item.quantity
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
                    return true
                })
                .catch(err=>{
                    console.error(err)
                    return false
                })
        }
    },
    getters:{
        getPurchases:state=>state.purchases,
        getCurrentPurchase: state=>state.purchase
    },
    methods:{
        updateQuantity(oldPurchaseItems,newPurchaseItems){
            
        }
    }
}