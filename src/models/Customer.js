import Address from './Address'
export default{
    defaultObject:{
        customer_id:'',
        name:'',
        address:Address,
        contact:'',
        gstno:'',
        sites:[]
    },
    Site:{
        site_id:'',
        site_name:'',
        address:Address
    },
    headers:[
        {text:'Name',value:'name', sortable: false},
        {text:'Email',value:'email', sortable: false},
        {text:'Contact Number',value:'contact', sortable:false},
        {text:'GST NO',value:'gst', sortable: false}
    ]
}