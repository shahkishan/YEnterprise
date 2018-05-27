import Vue from 'vue'
import vuex from 'vuex'
import Item from '../../models/Item'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(vuex)

export default{
    state:{
        items:[]
    }, 
    getters:{
        getItems:state=>state.items
    },
    mutations:{
        loadItems:(state,payload)=>{
            state.items=payload
        }
    },
    actions:{
        addNewItem({},payload){
            firebase.firestore().collection('items').add({item_name:payload.item_name,hsncode:payload.hsncode,description:payload.description,gstrate:payload.gstrate})
                .then(docRef=>{
                    console.log(docRef.id)
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        loadItems({commit}){
            firebase.firestore().collection('items').orderBy('item_name').onSnapshot(snapshot=>{
                var items=[]
                
                snapshot.forEach(doc=>{
                    var item={}
                    item.item_id=doc.id
                    item.item_name=doc.data().item_name
                    item.description=doc.data().description
                    item.hsncode=doc.data().hsncode
                    item.gstrate=doc.data().gstrate
                    firebase.firestore().collection('items').doc(doc.id).collection('subitems').orderBy('subitem_name').onSnapshot(subItemSnapshot=>{
                        var subitems=[]
                        subItemSnapshot.forEach(subItemDoc=>{
                            var subitem=Item.SubItem
                            subitem=subItemDoc.data()
                            subitem.subitem_id=subItemDoc.id
                            subitems.push(subitem)
                        })
                        item.subitems=subitems
                        
                        var index = items.findIndex((obj)=>{
                            return obj.item_id===item.item_id
                        })
                        if(index>=0){
                            items[index].subitems=subitems
                            commit('loadItems',items)
                        }
                    })
                    items.push(item)
                    commit('loadItems',items)
                })
            })
        },
        updateItem({},payload){
            firebase.firestore().collection('items').doc(payload.item_id).update({item_name:payload.item_name,hsncode:payload.hsncode,description:payload.description,gstrate:payload.gstrate})
                .then(()=>{
                    console.log('Updated')
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        deleteItem({},payload){
            firebase.firestore().collection('items').doc(payload).delete()
                .then(()=>{
                    console.log("deleted")
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        addNewSubItem({},payload){
            firebase.firestore().collection('items').doc(payload.item_id).collection('subitems').add(payload.subitem)
                .then(docRef=>{
                    console.log(docRef.id)
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        updateSubItem({dispatch},payload){
            firebase.firestore().collection('items').doc(payload.item_id).collection('subitems').doc(payload.subitem.subitem_id).update({subitem_name:payload.subitem.subitem_name,subitem_description:payload.subitem.description})
                .then(()=>{
                    console.log("Updated")
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        deleteSubItem({},payload){
          firebase.firestore().collection('items').doc(payload.item_id).collection('subitems').doc(payload.subitem_id).delete()
            .then(()=>{
                console.log("deleted")
            })
            .catch(err=>{
                console.error(err)
            })
        }
    }
}