export default{
    itemCategory:[
        {text:'Name',sortable:false,value:'name'},
        {text:'HSN',sortable:false,value:'hsn'},
        {text:'GST Rate',sortable:false,value:'gst_rate'},
        {text:'Description',sortable:false,value:'description'},
    ],
    items:[
        {text:'Category',sortable:false,value:'item_master_name'},
        {text:'Name',sortable:false,value:'item_detail_name'},
        {text:'HSN',sortable:false,value:'HSNCode'},
        {text:'Description',sortable:false,value:'description'}
        
    ],
    transactionItems:[
        {
            text: 'Category',
            sortable: false,
            value: 'item_master_name'
        },
        {
            text: 'Item',
            sortable: false,
            value: 'item_detail_name'
        },
        {
            text: 'HSN Code',
            value: 'hsn',
            sortable: false
        },
        {
            text: 'Quantity',
            value: 'qty',
            sortable: false
        },
        {
            text: 'Rate',
            value: 'rate',
            sortable: false
        },
        {
            text: 'Total',
            value: 'total',
            sortable: false
        }
    ]
}