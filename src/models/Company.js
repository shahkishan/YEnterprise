import Address from './Address'
export default{
    defaultObject:{
        company_id:'',
        name:'',
        contact:'',
        email:'',
        gstno:'',
        address:Object.assign({},Address)
    },


    headers:[
        {text:'Name',value:'name', sortable: false},
        {text:'Email',value:'email', sortable: false},
        {text:'Contact Number',value:'contact', sortable:false},
        {text:'GST NO',value:'gst', sortable: false},

    ],

}