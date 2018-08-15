export default{
    defaultObject:{
        rent_return_id:'',
        date:'',
        items:[],
    },
    rentReturnItem:{
        item_id:'',
        item_name:'',
        subitem_id:'',
        subitem_name:'',
        quantity:0,
        damaged:0
    },
    headers:{
        ReturnTableHeaders:[
            {
                text:'Item',
                sortable:false
            },
            {
                text:'Subitem',
                sortable:false
            },
            {
                text:'Quantity Dispatched',
                sortable:false
            },
            {
                text:'Quantity Returned',
                sortable:false
            },
            {
                text:'Damaged Items',
                sortable:false
            }

        ]

    }

    
}