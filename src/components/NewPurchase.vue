<template>
	<v-container fluid grid-list-md mt5 ml5>

		<v-switch
      		:label="`GST: ${isGst}`"
      		v-model="isGst"
    	></v-switch>

		<v-layout row wrap mt5 ml5>
			<v-flex xs11 sm2 ml5>
				<v-text-field name="invoice" label="Invoice number" id="invoice" v-model.number="purchaseDetails.invoiceNo" :rules="[rules.required]" required/>
			</v-flex>
			<v-flex xs11 sm2>
				<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width
					:nudge-right="40" min-width="290px" :return-value.sync="purchaseDetails.date">
					<v-text-field slot="activator" label="Date" v-model="purchaseDetails.date" prepend-icon="event" readonly required :rules="[rules.required]"/>
					<v-date-picker v-model="purchaseDetails.date" no-title scrollable @change="$refs.menu.save(purchaseDetails.date)">
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
						<v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					</v-date-picker>
				</v-menu>
			</v-flex>
		</v-layout>
		<v-flex xs11 sm2 ml5>
			<v-select
				:items="loadSuppliers"
				v-model="supplier"
				item-text="name"
				label="Supplier"
				autocomplete
				required
				:rules="[rules.supplier]"
			></v-select>
		</v-flex>

		<v-layout row wrap>
			<v-flex xs11 sm2 ml4>
				<v-select :items="itemsList" v-model="editedItem" item-text="name" label="Item" autocomplete required :rules="[rules.item]"></v-select>
			</v-flex>
			<v-flex xs11 sm2>
				<v-text-field label="Quantity" name="qty" id="qty" mask="#########" v-model.number="editedItem.qty" required :rules="[rules.required]" />
			</v-flex>
			<v-flex xs11 sm2>
				<v-text-field label="Rate" name="rate" id="rate" mask="#########" v-model.number="editedItem.rate" required :rules="[rules.required]" />
			</v-flex>
				
			<v-flex xs11 sm2>
				<v-btn medium color="primary" v-on:click="save">Add</v-btn>
			</v-flex>
		</v-layout>

		<v-dialog v-model="dialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="headline">Edit Item</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm6 md4>
								<v-select :items="itemsList" v-model="editedItem" item-text="name" label="Item" required :rules="[rules.item]" autocomplete></v-select>
							</v-flex>						
							<v-flex xs12 sm6 md4>
								<v-text-field label="Quantity" mask="#########" v-model.number="editedItem.qty" required :rules="[rules.required]"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Rate" mask="#########" v-model.number="editedItem.rate" required :rules="[rules.required]"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
							</v-flex>
							<v-spacer></v-spacer>
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
					<v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-flex xs12>
		<v-data-table :headers="headers" :items="items" hide-actions class="elevation-1" mb2>
			<template slot="items" slot-scope="props">
				<td>{{ props.item.name }}</td>
				<td class="text-xs-left">{{ props.item.qty }}</td>
				<td class="text-xs-left">{{ props.item.rate }}</td>
				<td class="text-xs-left">{{ props.item.hsn }}</td>
				<td class="text-xs-left">{{ props.item.total }}</td>
				<td class="justify-center layout px-0">
					<v-btn icon class="mx-0" @click="editItem(props.item)">
						<v-icon color="teal">edit</v-icon>
					</v-btn>
					<v-btn icon class="mx-0" @click="deleteItem(props.item)">
						<v-icon color="pink">delete</v-icon>
					</v-btn>
				</td>
			</template>

		</v-data-table>
		</v-flex>

		<v-dialog v-model="extraDetailsDialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="headline">Extra Details</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>				
							<v-flex xs12 sm6 md4>
								<v-text-field label="Discount (%)" mask="#########" v-model.number="discount"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Transport Charges" mask="#########" v-model.number="transport"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
							</v-flex>
							<v-spacer></v-spacer>
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
					<v-btn color="blue darken-1" flat @click.native="saveExtraDetails">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-layout align-content-end="true">
			
			<v-flex xs5 sm6 md6 lg2 offset-lg10 offset-md6 offset-sm6  offset-xs7>
			<v-card md6>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>Total: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ purchaseDetails.totalAmt }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst">
					<v-flex xs6 md6><v-card-text>CGST: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ purchaseDetails.cGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst">
					<v-flex xs6 md6><v-card-text>IGST: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ purchaseDetails.iGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst">
					<v-flex xs6 md6><v-card-text>SGST: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ purchaseDetails.sGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="purchaseDetails.transport>0">
					<v-flex xs6 md6><v-card-text>Transport: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ purchaseDetails.transport }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="purchaseDetails.discount>0">
					<v-flex xs6 md6><v-card-text>Discount: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ purchaseDetails.discount }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>Net Total: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ purchaseDetails.net }}</v-card-text></v-flex>
				</v-layout>
				<v-flex xs12><v-btn color="blue darken-1" flat @click.native="extraDetails">Extra details</v-btn></v-flex>
			</v-card>
			</v-flex>
		</v-layout>

		<v-flex xs5 sm6 md6 lg2 offset-lg10 offset-md6 offset-sm6  offset-xs7>
				<v-btn medium color="primary" v-on:click="saveTransaction">Save</v-btn>
		</v-flex>

	</v-container>
</template>
<!--To be edited-->
<script>
	import ItemModel from "../models/Item"
	import PurchaseDetailsModel from '../models/PurchaseDetails'
	export default {
		data: () => ({
			menu: false,
			modal: false,
			dialog: false,
			extraDetailsDialog:false,
			discount:'',
			transport:'',
			isGst:true,
			totalGST:0,
			headers: [
				{
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
					text: 'Total (Inclusive of Taxes)',
					value: 'total',
					sortable: false
				}
			],
			itemsList:[
				{
					id:1,
					name: 'item 1',
					hsn: 500
				},
				{
					id:2,
					name:'item 2',
					hsn: 100
				}, 
				{
					id: 3,
					name:'item 3',
					hsn: 300
				}
			],
			items: [],
			editedIndex: -1,
			editedItem: ItemModel,
			purchaseDetails:PurchaseDetailsModel,
			billTotal:{
				totalAmt:0,
				cGST:0,
				iGST:0,
				sGST:0,
				transport:0,
				discount:0,
				net:0,
			},
			supplier:{
				id:1,
				name:''
			},
			suppliers:[
				{
					id:1, name:'Supplier 1'
				}, 
				{
					id:2, name: 'Supplier 2'
				},
				{
					id:3, name: 'Supplier 3'
				}
				// 'Supplier 1','Supplier 2','Supplier 3'
			],
			rules: {
          		required: (value) => !!value || 'Required.',
        		// qty: (value) =>  !!value || 'Quantity cannot be zero.',
				// rate:(value)=>  !!value || 'Rate cannot be zero.',
				supplier: (value)=> !!value.name||"Required.",
				item: (value)=> !!value.name||"Required."
        	}
		}),



		watch: {
			dialog(val) {
				val || this.close()
			}
		},

		created() {
			this.initialize()
		},

		methods: {
			initialize() {
				this.items = []
			},

			editItem(item) {
				this.editedIndex = this.items.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			deleteItem(item) {
				const index = this.items.indexOf(item)
				confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
			},

			close() {
				this.extraDetailsDialog=false
				this.dialog = false
				setTimeout(() => {
					this.editedItem = Object.assign({}, ItemModel)
					this.editedIndex = -1
				}, 300)
			},

			save() {
				console.log(this.editItem.name.length)
				this.totalGST+=this.itemGST
				if(this.editedItem.name.length>0 && this.editedItem.rate>0 && this.editedItem.qty>0){
					this.editedItem.total=this.total
					
					var item={
						itemId:this.editedItem.itemId,
						name:this.editedItem.name,
						qty:this.editedItem.qty,
						rate:this.editedItem.rate,
						total:this.editedItem.total,
						hsn:this.editedItem.hsn
					}
					if (this.editedIndex > -1) {
						Object.assign(this.items[this.editedIndex], item)
					} else {
						console.log(this.editedItem.total+" "+this.total)
						this.items.push(item)
						// console.log(this.supplier.id)
					}
					this.purchaseDetails.totalAmt=this.billTotalAmt 
					this.editedItem.rate=0
					this.editedItem.qty=0
					this.close()
				}
      		},
			addItem(){
				this.editedItem.total=this.total
				this.billTotal.totalAmt=this.billTotalAmt 
				this.purchaseDetails.items.push(this.editedItem)
			},
			saveTransaction(){
				this.purchaseDetails=this.billTotal
				// console.log("{\"date\":\""+this.purchaseDetails.date+"\",\"invoice_no\"\":"+this.purchaseDetails.invoiceNo+"\",\"supplier_id\":"+this.purchaseDetails.supplier.id+",\"items\":"+JSON.stringify(this.purchaseDetails.items)+",\"isGst\":"+isGst.toString()+"}")
				//  console.log("purchase details: ")
				this.purchaseDetails.supplier=this.supplier
				this.purchaseDetails.items=this.items	
				console.log(JSON.stringify(this.purchaseDetails))		
			},
			extraDetails(){
				this.extraDetailsDialog=true
			},
			saveExtraDetails(){
				this.purchaseDetails.discount=this.discount
				this.purchaseDetails.transport=this.transport
				this.extraDetailsDialog=false
			}
		},
		computed:{
			total(){
				return this.editedItem.rate*this.editedItem.qty
			},
			billTotalAmt(){
				var billTotal=0
				this.purchaseDetails.items.forEach(function(item){
					billTotal+=item.total
				})
				console.log(billTotal)  
				return billTotal
			},
			itemGST(){
				if(this.isGst){
					return this.editedItem.rate*this.editedItem.qty*5/100
				}
				else
					return 0
			},
			netTotal(){
				this.purchaseDetails.netTotal=this.purchaseDetails.billTotal+this.purchaseDetails.cGST+this.purchaseDetails+iGST+this.purchaseDetails.sGST+this.purchaseDetails.transport-(this.purchaseDetails.totalAmt*this.purchaseDetails.discount/100)	
			},
			loadSuppliers(){
				return this.$store.getters.getSuppliers
			}


		}
	}


</script>
