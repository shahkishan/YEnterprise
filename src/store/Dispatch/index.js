import firebase from 'firebase'
import 'firebase/firestore'
import EventBus from '../../EventBus'

export default{
    store:{
        dispatches: []
    },
    getters:{
        getDispatches:state=>state.dispatches
    },
    mutations:{
        saveLoadedDispatches(state,payload){
            state.dispatches=payload
        }
    },
    actions:{
        dispatchItems({},payload){


            firebase.firestore().collection('rents').doc(payload.rent_id).collection('dispatches').add(payload.dispatch)
                .then(docRef=>{
                    console.log(docRef.id)
                })
                .catch(err=>{
                    console.error(err)
                })
        },
        loadDispatches({commit,getters},payload){
            var rents=getters.getRents
            var dispatches=[]
            rents.forEach(rent=>{
                rent.dispatchedItems.forEach(dispatch=>{
                    var dispatchObj=JSON.parse(JSON.stringify(dispatch))
                    dispatchObj.rent_id=rent.rent_id
                    dispatchObj.customer_name=rent.customer_name
                    dispatchObj.customer_id=rent.customer_id
                    dispatchObj.site_id=rent.site_id,
                    dispatchObj.site_name=rent.site_name,
                    dispatchObj.site_address=rent.site_address,
                    dispatchObj.company_id=rent.company_id,
                    dispatchObj.company_name=rent.company_name
                    dispatches.push(dispatchObj)
                })
            })

            dispatches.sort((ob1,ob2)=>{
                var date1=new Date(ob1.dispatchDate)
                var date2=new Date(ob2.dispatchDate)

                return date2-date1
            })
            console.log(JSON.stringify(dispatches))
            commit('saveLoadedDispatches',dispatches)
        }
    }

}