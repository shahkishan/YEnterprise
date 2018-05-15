export default{
	defaultObject:{
		item_id:0,
		item_name:'',
		hsncode:'',
		description:'',
		gstrate:0
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
	headers:{
		Item:[
			{text:'Name',sortable:false,value:'name'},
			{text:'HSN',sortable:false,value:'hsn'},
			{text:'GST Rate',sortable:false,value:'gst_rate'},
			{text:'Description',sortable:false,value:'description'},
		],
		SubItem:[
			{text:'Category',sortable:false,value:'item_master_name'},
			{text:'Name',sortable:false,value:'item_detail_name'},
			{text:'HSN',sortable:false,value:'HSNCode'},
			{text:'Description',sortable:false,value:'description'}
		]
	}
}