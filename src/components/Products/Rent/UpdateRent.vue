<template>
	<v-container fluid grid-list-md>
		<v-container>
		<v-layout>
			<v-flex xs2>
				<v-switch
					:label="`GST: ${isGst}`"
					v-model="isGst"
				></v-switch>
			</v-flex>
			<v-flex xs2>
				<v-select :items="LoadCompanies" label="Company" v-model="selectedCompany" item-text="name" required/>
			</v-flex>
		</v-layout>
		
		<v-layout row wrap>
			<v-flex xs11 sm2>
				<v-text-field name="invoice" label="Invoice number" id="invoice" v-model.number="rentDetails.invoice_no" required/>
			</v-flex>
			<v-flex xs11 sm2>
				<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width
					:nudge-right="40" min-width="290px" :return-value.sync="rentDetails.date">
					<v-text-field slot="activator" label="Date" v-model="rentDetails.date" prepend-icon="event" readonly required/>
					<v-date-picker v-model="rentDetails.date" no-title scrollable @change="$refs.menu.save(rentDetails.date)">
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
						<v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					</v-date-picker>
				</v-menu>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
		<v-flex xs12 sm2>
			<v-select
				:items="loadCustomers"
				v-model="selectedCustomer"
				item-text="name"
				label="Customer"
				autocomplete
			></v-select>
		</v-flex>

		<v-flex xs12 sm2>
			<v-select
				:items="selectedCustomer.sites"
				v-model="selectedSite"
				item-text="site_name"
				label="Site"
				autocomplete
				required
			></v-select>
		</v-flex>
		</v-layout>

		<v-layout row wrap>
			<v-flex xs11 sm2 ml4>
				<v-select :items="LoadItems" v-model="selectedItem" item-text="item_name" label="Item" autocomplete required ></v-select>
			</v-flex>
			<v-flex xs11 sm2 ml4>
				<v-select :items="LoadSubItems" v-model="selectedSubItem" item-text="subitem_name" label="SubItem" autocomplete required ></v-select>
			</v-flex>
			<v-flex xs11 sm2>
				<v-text-field label="Quantity" name="quantity" id="quantity" mask="#########" v-model.number="editedItem.quantity" required />
			</v-flex>
			<v-flex xs11 sm2>
				<v-text-field label="Rate" name="rate" id="rate" mask="#########" v-model.number="editedItem.rate" required />
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
								<v-select :items="LoadItems" v-model="selectedItem" item-text="item_name" label="Item" autocomplete required ></v-select>
							</v-flex>
							<v-flex xs12 sm6 ml4>
								<v-select :items="LoadSubItems" v-model="selectedSubItem" item-text="subitem_name" label="Item" autocomplete required ></v-select>
							</v-flex>					
							<v-flex xs12 sm6 md4>
								<v-text-field label="Quantity" mask="#########" v-model.number="editedItem.quantity" required ></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Rate" mask="#########" v-model.number="editedItem.rate" required ></v-text-field>
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
		<v-data-table :headers="transactionItemHeaders" :items="rentDetails.items" hide-actions class="elevation-1" mb2>
			<template slot="items" slot-scope="props">
				<td>{{ props.item.item_name }}</td>
				<td>{{ props.item.subitem_name }}</td>
				<td class="text-xs-left">{{ props.item.hsncode }}</td>
				<td class="text-xs-left">{{ props.item.quantity }}</td>
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
									v-model="is_credit"
    							></v-checkbox>
							</v-flex>	
							<v-flex xs12 sm6 md4>
							</v-flex>
							<v-flex xs12 sm6>
								<v-text-field label="Transport Charges" mask="#########" v-model.number="rentDetails.transport_charges"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
							</v-flex>
							<v-flex xs12 sm6>
								<v-text-field label="Loading Charges" mask="#########" v-model.number="rentDetails.loading_charges"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6>
								<v-text-field label="Unloading Charges" mask="#########" v-model.number="rentDetails.unloading_charges"></v-text-field>
							</v-flex>
						
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
					<v-flex xs7><v-card-text>SubTotal: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ billTotalAmt }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst && !isIGST">
					<v-flex xs7><v-card-text>CGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ GST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst&&isIGST">
					<v-flex xs7><v-card-text>IGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ IGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst&&!isIGST">
					<v-flex xs7><v-card-text>SGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ GST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="rentDetails.transport_charges>0">
					<v-flex xs7><v-card-text>Transport: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ rentDetails.transport_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="rentDetails.loading_charges>0">
					<v-flex xs7><v-card-text>Loading Charges: </v-card-text></v-flex> <v-flex xs2><v-card-text>₹{{ rentDetails.loading_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="rentDetails.unloading_charges>0">
					<v-flex xs7><v-card-text>Loading Charges: </v-card-text></v-flex> <v-flex xs2><v-card-text>₹{{ rentDetails.unloading_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs7><v-card-text>Total: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ netTotal }}</v-card-text></v-flex>
				</v-layout>
				<v-flex xs12><v-btn color="blue darken-1" flat @click.native="extraDetails">Extra details</v-btn></v-flex>
			</v-card>
			</v-flex>
		</v-layout>

		<v-flex xs5 sm6 md6 lg2 offset-lg10 offset-md6 offset-sm6  offset-xs7>
				<v-btn medium color="primary" v-on:click="saveTransaction">Save</v-btn>
		</v-flex>
	</v-container>
	<v-snackbar bottom right v-model="errorSnackbar">
			Please fill all the details!
			<v-btn flat color="pink" @click.native="errorSnackbar = false">Close</v-btn>
		</v-snackbar>
		<v-snackbar bottom right v-model="stockSnackbar">
			Not Enough Stock!
			<v-btn flat color="pink" @click.native="stockSnackbar = false">Close</v-btn>
		</v-snackbar>
	</v-container>
</template>
<!--To be edited-->
<script>
	// import ItemModel from "../models/Item"
	import RentDetails from '../../../models/RentDetails'
	import Item from '../../../models/Item'
	import TransactionItemModel from '../../../models/TransactionItemDetails'
	import Company from '../../../models/Company'
	import Customer from '../../../models/Customer'
	import { setTimeout } from 'timers';
	import EventBus from '../../../EventBus'
	export default {
		data: () => ({
			menu: false,
			modal: false,
			dialog: false,
			extraDetailsDialog:false,
			discount:'',
			transport:'',
			isGst:true,
			is_credit:false,
			isEdit:false,
			transactionItemHeaders:Item.headers.transactionItems,
			items: [],
			selectedItem:{},
			selectedSubItem:{},
            selectedCompany:{},
            selectedCustomer:{},
            selectedSite:{},
			editedIndex: -1,
			editedItem: Object.assign({},Item.transactionItem),
			rentDetails:Object.assign({},RentDetails),
			billTotal:{
				totalAmt:0,
				cGST:0,
				iGST:0,
				sGST:0,
				transport:0,
				discount:0,
				net:0,
			},
			rules: {
          		required: (value) => !!value || 'Required.',
        		// quantity: (value) =>  !!value || 'Quantity cannot be zero.',
				// rate:(value)=>  !!value || 'Rate cannot be zero.',
				select: (value)=> value>0||"Required.",
				item: (value)=> !!value.name||"Required.",
				itemSelect: (value)=> {
					console.log(JSON.stringify(value))
					return value!={}|| 'Required'
					}
			},
			oldPurchase:{},
			errorSnackbar:false,
			stockSnackbar:false
		}),



		watch: {
			dialog(val) {
				val || this.close()
			}
		},

		created() {

			this.initialize()
		},
		mounted(){
			EventBus.$on('updateRentItemReceived',payload=>{
					this.rentDetails=payload
					if(this.rentDetails.taxes==0)
						this.isGst=false
					this.selectedCompany=this.LoadCompanies.find(company=>{
						return company.company_id===this.rentDetails.company_id
					})	

					this.selectedCustomer=this.loadCustomers.find(customer=>{
						return customer.customer_id===this.rentDetails.customer_id
					})

					this.selectedSite=this.selectedCustomer.sites.find(site=>{
						return site.site_id===this.rentDetails.site_id
					})

					this.oldPurchase=JSON.parse(JSON.stringify(this.rentDetails))
				})
		},
		methods: {
			initialize() {
                this.$store.dispatch('loadUpdateRent',this.$route.params.id)

				
			
				
                // setTimeout(()=>{
                //        this.rentDetails=this.getCurrentRent
                
				// 	if(this.rentDetails.taxes==0)
				// 		this.isGst=false
				// 	this.selectedCompany=this.LoadCompanies.find(company=>{
				// 		return company.company_id===this.rentDetails.company_id
				// 	})	

				// 	this.selectedCustomer=this.loadCustomers.find(customer=>{
				// 		return customer.customer_id===this.rentDetails.customer_id
				// 	})

				// },5000)
			},

			editItem(item) {
				this.isEdit=true
				this.editedIndex = this.rentDetails.items.indexOf(item)
				this.editedItem = Object.assign({}, item)

				this.selectedItem=this.LoadItems.find(obj=>{
					return item.item_id===obj.item_id
				})

				this.selectedSubItem=this.LoadSubItems.find(obj=>{
					return obj.subitem_id===item.subitem_id;
				})

				this.dialog = true
			},

			deleteItem(item) {
				const index = this.rentDetails.items.indexOf(item)
				this.rentDetails.items.splice(index, 1)
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
				this.editedItem.total=this.total
				var item={
					item_id:this.selectedItem.item_id,
					subitem_id:this.selectedSubItem.subitem_id,
					item_name:this.selectedItem.item_name,
					subitem_name:this.selectedSubItem.subitem_name,
					quantity:this.editedItem.quantity,
					rate:this.editedItem.rate,
					total:this.total,
					hsncode:this.selectedItem.hsncode,
					gstrate:this.selectedItem.gstrate
				}
				if(this.selectedSubItem.quantity<item.quantity){
					this.stockSnackbar=true
				} else {
				if(item.subitem_name && item.subitem_name.length>0 && item.rate>0 && item.quantity>0){
					
					if (this.editedIndex > -1) {
						Object.assign(this.rentDetails.items[this.editedIndex], item)
					} else {
						console.log(this.editedItem.total+" "+this.total)
						this.rentDetails.items.push(item)
					}
					this.rentDetails.taxes=this.Taxes
					console.log(this.billTotalAmt)
					this.clear()
					this.close()
				} else {
					console.log("err")
					this.errorSnackbar=true
				}
				}
      		},
			addItem(){
				this.editedItem.total=this.total
				this.billTotal.totalAmt=this.billTotalAmt 
				this.rentDetails.items.push(this.editedItem)
			},
			saveTransaction(){
				
				this.rentDetails.amount=this.billTotalAmt
				this.rentDetails.is_credit=this.IsCredit
				this.rentDetails.customer_id=this.selectedCustomer.customer_id
				this.rentDetails.company_id=this.selectedCompany.company_id
				this.rentDetails.total=this.netTotal
				console.log(JSON.stringify(this.rentDetails))	
				if(!this.rentDetails.invoice_no||!this.rentDetails.site_name||!this.rentDetails.company_id||!this.rentDetails.date||!this.rentDetails.items||this.rentDetails.items.length<1||this.rentDetails.invoice_no<1||this.rentDetails.site_name.length===0||this.rentDetails.company_id.length===0||this.rentDetails.date.length===0){
					this.errorSnackbar=true
				}else {
				
				var payload={
					oldPurchase:this.oldPurchase,
					newPurchase:this.rentDetails
				}

				var result=this.$store.dispatch('updateRent',payload)
				if(result)
					this.$router.push('/rentnew')
				}
			},
			extraDetails(){
				this.extraDetailsDialog=true
			},
			saveExtraDetails(){
				this.extraDetailsDialog=false
			},
			clear(){
				this.editedItem=Object.assign({},TransactionItemModel)
				this.selectedItem=Object.assign({},Item.defaultObject)
				this.selectedSubItem=Object.assign({},Item.SubItem)
				this.editedItem.price=''
				this.editedItem.quantity=''
				this.isEdit=false
			}

		},
		computed:{
			total(){
				return this.editedItem.rate*this.editedItem.quantity
			},
			billTotalAmt(){
				var billTotal=0
				this.rentDetails.items.forEach(function(item){
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
					return this.editedItem.rate*this.editedItem.quantity*5/100
				}
				else
					return 0
			},
			netTotal(){
				console.log("Taxes: "+this.rentDetails.taxes)
				var total=this.billTotalAmt+this.Taxes+this.rentDetails.transport_charges+this.rentDetails.loading_charges+this.rentDetails.unloading_charges	
				if(total>0)
					return total
				else return 0	
			},
			loadCustomers(){
				return this.$store.getters.getCustomers
			},
			LoadItems(){
				console.log(JSON.stringify(this.$store.getters.getItems))
				return this.$store.getters.getItems
			},
			ItemName(){
				
				return this.selectedItem.item_name
			},
			LoadSubItems(){
				if(this.LoadItems){
					return this.selectedItem.subitems;
				}
			},
			Taxes(){
				var taxes=0
				if(this.isGst){
					this.rentDetails.items.forEach(item=>{
						taxes+=(item.gstrate*item.total/100)
					})
					console.log("taxes::"+ taxes)
				}
				return taxes
			},
			GST(){
				console.log(this.Taxes/2)
				return this.Taxes/2
			},
			IGST(){
				return this.Taxes
			},
			IsCredit(){
				if(this.is_credit)
					return 1
				else 
					return 0
			},
			LoadCompanies(){
				return this.$store.getters.getCompanies
			},
			Company(){
				var company=this.LoadCompanies.find(company=>{
					return company.company_id==this.rentDetails.company_id
				})
				return company
			},
			Customer(){
				var customer=this.loadCustomers.find(customer=>{
					return customer.customer_id==this.rentDetails.customer_id
				})

				return customer
			},
			isIGST(){
				
				if(this.rentDetails.company_id>0&&this.rentDetails.customer_id>0){
					return this.Company.statecode != this.Customer.statecode
				}
				else 
					return 0	
            },
            getCurrentRent(){
				return this.$store.getters.getCurrentRent
            }
		}
	}


</script>
