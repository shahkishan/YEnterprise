import Vue from 'vue'
import vuex from 'vuex'
import Item from '../../models/Item'
import ItemCategory from '../../models/ItemCategory'
import axios from 'axios'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(vuex)

export default{
    state:{
        itemCatg:[],
        items:[]
    }, 
    getters:{
        getItemCategories:state=>state.itemCatg,
        getItems:state=>state.items
    },
    mutations:{
        addNewItemCategory:(state,payload)=>{
            state.itemCatg.push(payload)
        },
        addNewItem:(state,payload)=>{
            state.items.push(payload)
        },
        loadItemCategories:(state,payload)=>{
            state.itemCatg=payload
        },
        loadItems:(state,payload)=>{
            state.items=payload
        },
        updateItemCategory:(state,payload)=>{
          var catg=state.itemCatg.find(catg=>{
              return catg.item_master_id===payload.item_master_id
          })
          const index=state.itemCatg.indexOf(catg)
          state.itemCatg.splice(index,1,payload)
        },
        updateItem:(state,payload)=>{
            var item=state.items.find(item=>{
                return item.item_detail_id===payload.item_detail_id
            })
            var catg=state.itemCatg.find(catg=>{
                return catg.item_master_id===payload.item_master_id
            })
            item.hsn_code=catg.hsn_code
            const index=state.itemCatg.indexOf(item)
            state.itemCatg.splice(index,1,payload)
          },
        deleteItemCategory:(state,payload)=>{   
            const index=state.itemCatg.indexOf(payload)
            state.itemCatg.splice(index,1)
        },
        deleteItem:(state,payload)=>{
            const index=state.items.indexOf(payload)
            state.items.splice(index,1)
        }
    },
    actions:{
        addNewItemCategory({},payload){
            firebase.firestore().collection('items').add({item_name:payload.item_name,hsncode:payload.hsncode,description:payload.description,gstrate:payload.gstrate})
                .then(docRef=>{
                    console.log(docRef.id)
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        loadItemCategories({commit}){
            firebase.firestore().collection('items').orderBy('item_name').onSnapshot(snapshot=>{
                var items=[]
                snapshot.forEach(doc=>{
                    var item=Item.defaultObject
                    item.item_id=doc.id
                    item.item_name=doc.data().item_name
                    item.description=doc.data().description
                    item.hsncode=doc.data().hsncode
                    item.gstrate=doc.data().gstrate
                    firebase.firestore().collection('items').doc(doc.id).collection('subitems').orderBy('subitem_name').onSnapshot(subItemSnapshot=>{
                        subitems=[]
                        subItemSnapshot.forEach(subItemDoc=>{
                            var subitem=Item.SubItem
                            subitem=subItemDoc.data()
                            subitem.subitem_id=subItemDoc.id
                            subitem.item_name=item.item_name
                            subitems.push(subitem)
                        })
                        item.subitems=subitems
                    })
                    items.push(item)

                })
            })
        },
        updateItemCategory({},payload){
            firebase.firestore().collection('items').doc(payload.item_id).update({item_name:payload.item_name,hsncode:payload.hsncode,description:payload.description,gstrate:payload.gstrate})
                .then(()=>{
                    console.log('Updated')
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        deleteItemCategory({},payload){
            firebase.firestore().collection('items').doc(payload).delete()
                .then(()=>{
                    console.log("deleted")
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        addNewItem({},payload){
            firebase.firestore().collection('items').doc(payload.item_id).firebase.firestore().collection('items')('subitems').add(payload.subitem)
                .then(docRef=>{
                    console.log(docRef.id)
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        updateItem({},payload){
            firebase.firestore().collection('items').doc(payload.item_id).collection('subitems').doc(payload.subitem.subitem_id).update({subitem_name:payload.subitem.subitem_name,subitem_description:payload.subitem_description})
                .then(()=>{
                    console.log("Updated")
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        deleteItem({},payload){
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