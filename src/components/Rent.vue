<template>
	<v-container fluid grid-list-md mt5 ml5>
		<v-container>

		<v-switch
      		:label="`GST: ${isGst}`"
      		v-model="isGst"
    	></v-switch>

		<v-layout row wrap mt5 ml5>
			<v-flex xs11 sm2 ml5>
				<v-text-field name="invoice" label="Invoice number" id="invoice" v-model.number="RentDetails.invoice_no" :rules="[rules.required]" required/>
			</v-flex>
			<v-flex xs11 sm2>
				<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width
					:nudge-right="40" min-width="290px" :return-value.sync="purchaseDetails.date">
					<v-text-field slot="activator" label="Date" v-model="purchaseDetails.date" prepend-icon="event" readonly required :rules="[rules.required]"/>
					<v-date-picker v-model="RentDetails.date" no-title scrollable @change="$refs.menu.save(RentDetails.date)">
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
						<v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					</v-date-picker>
				</v-menu>
			</v-flex>
		</v-layout>
		<v-flex xs11 sm2 ml5>
			<v-select
				:items="loadCustomers"
				v-model="customer"
				item-text="name"
				label="Customer"
				autocomplete
				required
				:rules="[rules.supplier]"
			></v-select>
		</v-flex>

		<v-layout row wrap>
			<v-flex xs11 sm2 ml4>
				<v-select :items="LoadItemCategories" v-model="selectedItemCategoryId" item-value="item_master_id" item-text="item_master_name" label="Item Category" autocomplete required :rules="[rules.itemSelect]"></v-select>
			</v-flex>
			<v-flex xs11 sm2 ml4>
				<v-select :items="LoadItems" v-model="selectedItemId" item-value="item_detail_id" item-text="item_detail_name" label="Item" autocomplete required :rules="[rules.itemSelect]"></v-select>
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
							<v-flex xs12 sm6 ml4>
								<v-select :items="LoadItemCategories" v-model="selectedItemCategoryId" item-value="item_master_id" item-text="item_master_name" label="Item Category" autocomplete required :rules="[rules.itemSelect]"></v-select>
							</v-flex>
							<v-flex xs12 sm6 ml4>
								<v-select :items="LoadItems" v-model="selectedItemId" item-value="item_detail_id" item-text="item_detail_name" label="Item" autocomplete required :rules="[rules.itemSelect]"></v-select>
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
		<v-data-table :headers="transactionItemHeaders" :items="RentDetails.items" hide-actions class="elevation-1" mb2>
			<template slot="items" slot-scope="props">
				<td>{{ props.item.item_master_name }}</td>
				<td>{{ props.item.item_detail_name }}</td>
				<td class="text-xs-left">{{ props.item.hsn_code }}</td>
				<td class="text-xs-left">{{ props.item.qty }}</td>
				<td class="text-xs-left">{{ props.item.rate }}</td>
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
							<v-flex xs12 sm6>
								<v-checkbox
									label="Is Credit"
									v-model="RentDetails.is_credit"
    							></v-checkbox>
							</v-flex>	
							<v-flex xs12 sm6 md4>
							</v-flex>
							<v-flex xs12 sm6>
								<v-text-field label="Transport Charges" mask="#########" v-model.number="RentDetails.transport_charges"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
							</v-flex>
							<v-flex xs12 sm6>
								<v-text-field label="Loading Charges" mask="#########" v-model.number="RentDetails.loading_charges"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6>
								<v-text-field label="Unloading Charges" mask="#########" v-model.number="RentDetails.unloading_charges"></v-text-field>
							</v-flex>
							<!-- <v-flex xs12 sm6 md4>
							</v-flex>
							<v-spacer></v-spacer> -->
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

		<v-layout align-content-end="true" mt-3>
			
			<v-flex xs5 sm6 md6 lg2 offset-lg10 offset-md6 offset-sm6  offset-xs7>
			<v-card md6>
				<v-layout row wrap>
					<v-flex xs7><v-card-text>Total: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ billTotalAmt }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst">
					<v-flex xs7><v-card-text>CGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ GST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst">
					<v-flex xs7><v-card-text>IGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ IGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst">
					<v-flex xs7><v-card-text>SGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ GST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="RentDetails.transport>0">
					<v-flex xs7><v-card-text>Transport: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ RentDetails.transport }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="RentDetails.discount>0">
					<v-flex xs7><v-card-text>Discount: </v-card-text></v-flex> <v-flex xs2><v-card-text>₹{{ RentDetails.discount }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs7><v-card-text>Net Total: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ netTotal }}</v-card-text></v-flex>
				</v-layout>
				<v-flex xs12><v-btn color="blue darken-1" flat @click.native="extraDetails">Extra details</v-btn></v-flex>
			</v-card>
			</v-flex>
		</v-layout>

		<v-flex xs5 sm6 md6 lg2 offset-lg10 offset-md6 offset-sm6  offset-xs7>
				<v-btn medium color="primary" v-on:click="saveTransaction">Save</v-btn>
		</v-flex>
	</v-container>

	</v-container>
</template>
<!--To be edited-->
<script>
	// import ItemModel from "../models/Item"
	import RentDetailsModel from '../models/RentDetails'
	import Headers from '../models/headers'
	import TransactionItemModel from '../models/TransactionItemDetails'
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
			transactionItemHeaders:Headers.transactionItems,
			items: [],
			selectedItemId:0,
			selectedItemCategoryId:0,
			editedIndex: -1,
			editedItem: TransactionItemModel,
			RentDetails:RentDetailsModel,
			billTotal:{
				totalAmt:0,
				cGST:0,
				iGST:0,
				sGST:0,
				transport:0,
				discount:0,
				net:0,
			},
			customer:{
				id:1,
				name:''
			},
			rules: {
          		required: (value) => !!value || 'Required.',
        		// qty: (value) =>  !!value || 'Quantity cannot be zero.',
				// rate:(value)=>  !!value || 'Rate cannot be zero.',
				supplier: (value)=> !!value.name||"Required.",
				item: (value)=> !!value.name||"Required.",
				itemSelect: (value)=> value>0 || 'Required'
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
				this.editedIndex = this.RentDetails.items.indexOf(item)
				this.editedItem = Object.assign({}, TransactionItemModel)
				this.editedItem.item_name=item.item_master_name
				this.editedItem.item_detail_id=item.item_detail_id
				this.editedItem.rate=item.rate
				this.editedItem.qty=item.qty
				this.selectedItemId=item.item_detail_id
				this.selectedItemCategoryId=item.item_master_id
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
					this.editedItem = Object.assign({}, TransactionItemModel)
					this.editedIndex = -1
				}, 300)
			},

			save() {
				this.totalGST+=this.itemGST
				var itemName=this.ItemName
				console.log(this.ItemCategory)
				this.editedItem.total=this.total
				var item={
					item_detail_id:this.selectedItemId,
					item_detail_name:itemName,
					item_master_name:this.ItemCategory.item_master_name,
					qty:this.editedItem.qty,
					rate:this.editedItem.rate,
					total:this.total,
					hsn_code:this.ItemCategory.hsn_code
				}
				console.log(JSON.stringify(item))
				if(item.item_detail_name.length>0 && item.rate>0 && item.qty>0){
					
					
					
					if (this.editedIndex > -1) {
						Object.assign(this.RentDetails.items[this.editedIndex], item)
					} else {
						console.log(this.editedItem.total+" "+this.total)
						this.RentDetails.items.push(item)
						// console.log(this.supplier.id)
					}
					console.log(this.billTotalAmt)
					this.RentDetails.totalAmt=this.billTotalAmt 
					this.clear()
					this.close()
				}
      		},
			addItem(){
				this.editedItem.total=this.total
				this.billTotal.totalAmt=this.billTotalAmt 
				this.RentDetails.items.push(this.editedItem)
			},
			saveTransaction(){
				this.RentDetails.amount=this.billTotalAmt
				// this.purchaseDetails.net=this.netTotal
				// console.log("{\"date\":\""+this.purchaseDetails.date+"\",\"invoice_no\"\":"+this.purchaseDetails.invoiceNo+"\",\"supplier_id\":"+this.purchaseDetails.supplier.id+",\"items\":"+JSON.stringify(this.purchaseDetails.items)+",\"isGst\":"+isGst.toString()+"}")
				//  console.log("purchase details: ")
				this.RentDetails.ba_id=this.supplier.id
				// this.purchaseDetails.items=this.items	
				console.log(JSON.stringify(this.RentDetails))	
				
				this.$store.dispatch('addRentDetail',JSON.stringify(this.RentDetails))
			},
			extraDetails(){
				this.extraDetailsDialog=true
			},
			saveExtraDetails(){
				this.RentDetails.discount=this.discount
				this.RentDetails.transport=this.transport
				this.extraDetailsDialog=false
			},
			clear(){
				this.editedItem=Object.assign({},TransactionItemModel)
				this.selectedItemId=0
				this.editedItem.price=''
				this.editedItem.qty='0'
				this.selectedItemCategoryId=0
			}

		},
		computed:{
			total(){
				return this.editedItem.rate*this.editedItem.qty
			},
			billTotalAmt(){
				var billTotal=0
				this.RentDetails.items.forEach(function(item){
					billTotal+=item.total
					console.log("total: "+item.total)
				})
				console.log(billTotal)
				if(billTotal>0)  
					return billTotal
				else 
					return 0	
			},
			itemGST(){
				if(this.isGst){
					return this.editedItem.rate*this.editedItem.qty*5/100
				}
				else
					return 0
			},
			netTotal(){
				var total=this.billTotalAmt+this.RentDetails.taxes+this.RentDetails.transport_charges+this.RentDetails.loading_charges+this.purchaseDetails.unloading_charges	
				if(total>0)
					return total
				else return 0	
			},
			loadCustomers(){
				return this.$store.getters.getCustomers
			},
			LoadItemCategories(){
				return this.$store.getters.getItemCategories
			},
			LoadItems(){

				var items=[]
				this.$store.getters.getItems.forEach(element => {
					if(element.item_master_id===this.selectedItemCategoryId)
						items.push(element)
				});
				return items
			},
			ItemName(){
				var item=this.LoadItems.find(item=>{
              		return item.item_detail_id===this.selectedItemId
				})
				return item.item_detail_name
			},
			ItemCategory(){
				var item=this.LoadItems.find(item=>{
              		return item.item_master_id===this.selectedItemCategoryId
				})
				return item
			},
			GST(){
				return this.RentDetails.taxes/2
			},
			IGST(){
				return this.RentDetails.taxes
			}
		}
	}


</script>
