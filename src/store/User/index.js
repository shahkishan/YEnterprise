import Vue from 'vue'
import Vuex from 'vuex'
import User from '../../models/User'
import axios from 'axios'
import Constants from '../../Utility/constants'
import firebase from 'firebase'
import 'firebase/firestore'
Vue.use(Vuex)

export default{
    state:{
        user:null,
        users:[],
    },
    getters: {
        user:state=>state.user,
        users:state=>state.users
    },
    mutations:{
        userSignIn:(state,payload)=>{
            var ref=firebase.database().ref('users/'+payload.uid)
            state.user=Object.assign(this,User)
            state.user.uid=payload.uid
            state.user.firstName=ref.firstName
            state.user.lastName=ref.lastName
            state.user.role=ref.role
            state.user.email=payload.email
        },
        userSignout:(state,payload)=>{
            state.user=null
        },
        loadUsers:(state,payload)=>{
            state.users=payload
        }
    },
    actions:{
        userSignIn({commit,dispatch},payload){
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
                .then(res=>{
                    dispatch('setError',false)
                    commit('userSignIn',res);
                })
                .catch(err=>{
                    console.log(err.message)
                    dispatch('setError',true)
                })
        },
        autoSignIn({commit},payload){
            commit('userSignIn',payload)
        },
        logout({commit}){
            firebase.auth().signOut();
            commit('userSignout',null)
        },
        loadUsers({commit}){
           

            firebase.firestore().collection('users').orderBy('firstName').onSnapshot(querySnapshot=>{
                var users=[]
                querySnapshot.forEach(doc=>{
                    users.push({uid:doc.id,firstName:doc.data().firstName,lastName:doc.data().lastName,contact:doc.data().contact,email:doc.data().email,role:doc.data().role})
                })

                commit('loadUsers',users)
            })
        },  
        createUser({commit,getters},user){
            firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
                .then(res=>{
                    firebase.database().ref('users/'+res.uid).set({firstName:user.firstName,lastName:user.lastName,contact:user.contact,email:user.email,role:user.role})
                    firebase.firestore().collection('users').doc(res.uid).set({firstName:user.firstName,lastName:user.lastName,contact:user.contact,email:user.email,role:user.role,timeStamp:firebase.firestore.FieldValue.serverTimestamp()})
                        .then(doc=>{
                            console.log("Document written with reference: "+doc.id)
                        })
                        .catch(err=>{
                            console.error("Error creating document: "+err)
                        })
                        
                })
                .catch(err=>{
                    console.log(err.message)
                })
        },
        updateUser({commit,getters},user){
            // firebase.database().ref('users/'+user.uid).update({firstName:user.firstName,lastName:user.lastName,contact:user.contact,email:user.email,role:user.role})
            firebase.firestore().collection('users').doc(user.uid).update({firstName:user.firstName,lastName:user.lastName,contact:user.contact,email:user.email,role:user.role,timeStamp:firebase.firestore.FieldValue.serverTimestamp()})
                .then(docRef=>{
                    console.log("Document updated with ID: "+docref.id)
                })
                .catch(err=>{
                    console.error("Error updating document: "+err)
                })
        },
        deleteUser({commit,getters},uid){
            // firebase.database().ref('users/'+uid).remove()
            firebase.firestore().collection('users').doc(uid).delete()
                .then(result=>{
                    console.log("User deleted: "+uid)
                })
                .catch(err=>{
                    console.error("Error deleting User"+ err)
                })
        }
    }
}