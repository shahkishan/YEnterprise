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

    },
    getters:{

    },
    mutations:{

    },
    actions:{
        AddRentReturn({},payload){
            console.log(JSON.stringify(payload))
            delete payload.rentReturn.rent_return_id
            firebase.firestore().collection('rents').doc(payload.rent_id).collection('returns').add(payload.rentReturn)
            .then(docRef=>{
                console.log(docRef.id)
                payload.rentReturn.items.forEach(item=>{{

                    firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).get()
                        .then(doc=>{
                            var subitem=doc.data()
                            subitem.quantity+=item.quantity
                            firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).update(subitem)
                                .then(()=>{
                                    console.log('return')
                                })
                                .catch(err=>{
                                    console.error(err)
                                })
                        })
                }})
            })
            .catch(err=>{
                console.error(err)
            })
        }
    }
}