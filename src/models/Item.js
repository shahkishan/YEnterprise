export default{
    itemId:null,
	name: '',
	qty: null,
	rate: null,
    hsn:null,
    headers: [{
        text: 'Item',
        sortable: false,
        value: 'name'
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
        text: 'HSN Code',
        value: 'hsn',
        sortable: false
    },
    {
        text: 'Total',
        value: 'total',
        sortable: false
    },
    // { text: 'Actions', value: 'name', sortable: false }
]
}