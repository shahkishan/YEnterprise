export default{
	defaultObject:{
		item_id:'',
		item_name:'',
		hsncode:'',
		description:'',
		gstrate:'',
		subItems:[]

	},
    SubItem:{
		subitem_id:0,
		subitem_name: '',
		item_name:'',
		qty: '',
		rate: '',
		total_items:0,
		damaged_items:0,
		description:''
	},
	transactionItem:{
		subitem_id:0,
		subitem_name:'',
		item_name:'',
		quantity: '',
		rate: '',
		hsncode:''
	},
	headers:{
		Item:[
			{text:'Name',sortable:false,value:'name'},
			{text:'HSN',sortable:false,value:'hsn'},
			{text:'GST Rate',sortable:false,value:'gst_rate'},
			{text:'Description',sortable:false,value:'description'},
		],
		SubItem:[
			{text:'Name',sortable:false,value:'subitem_name'},
			{text:'Description',sortable:false,value:'description'}
		],
		transactionItems:[
			{
				text: 'Item',
				sortable: false,
			},
			{
				text: 'Sub Item',
				sortable: false,
			},
			{
				text: 'HSN Code',
				sortable: false
			},
			{
				text: 'Quantity',
				sortable: false
			},
			{
				text: 'Rate',
				sortable: false
			},
			{
				text: 'Total',
				sortable: false
			}
		]
	}
}