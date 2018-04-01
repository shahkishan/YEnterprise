import Supplier from './Supplier'
export default{
    date:null,
    invoiceNo:'',
    supplier:Object.assign({},Supplier),
    items: [],  
    totalAmt:0,
    cGST:0,
    iGST:0,
    sGST:0,
    transport:0,
	discount:0,
    net:0 
}