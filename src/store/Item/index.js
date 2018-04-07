import Vue from 'vue'
import vuex from 'vuex'
import Item from '../../models/Item'
import ItemCategory from '../../models/ItemCategory'
import axios from 'axios'
import Constants from '../../Utility/constants'
const BASE_URL=Constants.BASE_URL
const Item_Master_URL=BASE_URL+'itemMaster/'
const Item_URL=BASE_URL+'itemDetail/'
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
        addNewItemCategory({commit,getters},payload){
            axios.post(Item_Master_URL,payload)
                .then(res=>{
                    console.log(res)
                    if(res.status==200)
                        commit('addNewItemCategory',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        loadItemCategories({commit,getters}){
            axios.get(Item_Master_URL)
                .then(res=>{
                    console.log(res.data)
                    commit('loadItemCategories',res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        updateItemCategory({commit,getters},payload){
            axios.put(Item_Master_URL+payload.item_master_id,payload)
                .then(res=>{
                    if(res.status==200)
                        commit('updateItemCategory',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        deleteItemCategory({commit,getters},payload){
            axios.delete(Item_Master_URL+payload.item_master_id)
                .then(res=>{
                    if(res.status==200)
                        commit('deleteItemCategory',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },


        addNewItem({commit,getters},payload){
            axios.post(Item_URL,payload)
                .then(res=>{
                    console.log(res)
                    if(res.status==200)
                        commit('addNewItem',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        loadItems({commit,getters}){
            axios.get(Item_URL)
                .then(res=>{
                    console.log(res.data)
                    commit('loadItems',res.data)
                })
                .catch(err=>{
                    console .log(err)
                })
        },
        updateItem({commit,getters},payload){
            axios.put(Item_URL+payload.item_detail_id,payload)
                .then(res=>{
                    console.log(res)
                    if(res.status==200)
                        commit('updateItem',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        deleteItem({commit,getters},payload){
            axios.delete(Item_URL+payload.item_detail_id)
                .then(res=>{
                    if(res.status==200)
                        commit('deleteItem',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
}