import Address from './Address'
export default{
    defaultObject:{
        supplier_id:0,
        name:'',
        address:Address,
        contact:'',
        gstno:''
    },
    headers:[
        {text:'Name',value:'name', sortable: false},
        {text:'Email',value:'email', sortable: false},
        {text:'Contact Number',value:'contact', sortable:false},
        {text:'GST NO',value:'gst', sortable: false}
    ]
}