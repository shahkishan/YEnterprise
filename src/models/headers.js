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
    ],
    purchase:[
        {
            text:'No.',
            sortable:false,
            value:null,
        },
        {
            text:'Invoice number',
            sortable:true,
            value:'invoice_no'
        },
        {
            text:'Supplier',
            sortable:true,
            value:'supplier_name'
        },
        {
            text: 'Date',
            sortable:true,
            value:'date'
        },
        {
            text:'Amount',
            sortable:true,
            value:'amount'
        }
    ],
    rent:[
        {
            text:'No.',
            sortable:false,
            value:null,
        },
        {
            text:'Invoice number',
            sortable:true,
            value:'invoice_no'
        },
        {
            text:'Customer',
            sortable:true,
            value:'customer_name'
        },
        {
            text:'Site',
            sortable:true,
            value:'site_name'
        },
        {
            text: 'Date',
            sortable:true,
            value:'date'
        },
        {
            text:'Amount',
            sortable:true,
            value:'amount'
        }
    ],
    dispatchItemHeaders:[
        {
            text: 'Item',
            sortable: false,
        },
        {
            text: 'Sub Item',
            sortable: false,
        },
        {
            text: 'Quantity left to dispatch',
            sortable: false
        },
        {
            text: 'Quantity to dispatch',
            sortable: false
        }
    ]
}