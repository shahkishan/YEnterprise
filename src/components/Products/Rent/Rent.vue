<template>
	<v-container fluid grid-list-md>


<v-navigation-drawer right clipped floating app class="blue-grey darken-3 hidden-xs-only" dark>
				<v-list>
					<v-list-tile @click="displayRents(0)">
						<v-list-tile-content>
							All Companies
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile v-for="company in Companies" :key="company.company_id" @click="displayRents(company)">
						<v-list-tile-content>
							<v-list-tile-title>{{ company.name }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>

			<v-card dark color="blue-grey lighten-4">
			<v-toolbar dark color="blue-grey darken-1" style="overflow: hidden; font-size: 100%;">
				<span class="headline" style="margin-left:2%">{{selectedCompany.name}}</span>
				<span style="margin-left:auto;" class="headline">Number of Rents: {{Rents.length}}</span>
				<span style="margin-left:auto;" class="headline">Total Amount: {{TotalRentAmount}}</span>
				
				
			</v-toolbar>
			<v-layout justify-space-around style="display: flex; flex-direction: row; flex-wrap:wrap;">
				<v-btn color="primary" @click.native="index++" v-if="previous" style=" display: flex;flex-grow: 1;">Previous</v-btn>
				<v-btn color="primary" @click.native="index--" v-if="next" style=" display: flex;flex-grow: 1;">Next</v-btn>
				<v-btn color="primary" @click.native="$router.push('rent/add')" style=" display: flex;flex-grow: 1;">New</v-btn>
				<v-btn color="primary" @click="updateRent()" v-if="Rents.length>0" style=" display: flex;flex-grow: 1;">Update</v-btn>
				<v-btn color="primary" @click="deleteDialog=true" v-if="Rents.length>0" style=" display: flex;flex-grow: 1;">Delete</v-btn>
			</v-layout>

			<v-container v-if="!noRent">
			
			<v-card color="blue-grey lighten-5" style="border: 25px solid black">
				
				<v-card-title class=" text-xs-center">
					<span class="headline" style="width:100%;text-transform:uppercase; color:#3d3d3d">{{Company.name}}</span>
				</v-card-title>
				<v-divider></v-divider>
				<hr/>
				<v-card-text>
					<v-layout row wrap style="color:#3d3d3d" mt-1>
						<v-flex xs12 sm9 md10>
							<span class="title">Invoice no.: {{Rent.invoice_no}}</span>
						</v-flex>
						<v-flex xs12 sm3 md2>
							<span class="title">Date: {{date}}</span>
						</v-flex>
					</v-layout>
					<v-flex xs12 mt-2>
						<span class="title" style="color:#3d3d3d">Customer: {{Customer.name}}</span>
					</v-flex>
				</v-card-text>

				<v-flex xs12 mt-3>
					<v-data-table :headers="transactionItemHeaders" light :items="Rent.items" hide-actions class="elevation-1" mb2>
						<template slot="items" slot-scope="props">
							<td>{{ props.item.item_name }}</td>
							<td>{{ props.item.subitem_name }}</td>
							<td class="text-xs-left">{{ props.item.hsncode }}</td>
							<td class="text-xs-left">{{ props.item.quantity }}</td>
							<td class="text-xs-left">{{ props.item.rate }}</td>
							<td class="text-xs-left">{{ props.item.total }}</td>
						</template>
					</v-data-table>
				</v-flex>


				<v-layout align-content-end="true" mt-3>

					<v-flex xs5 sm6 md6 lg2 offset-lg10 offset-md6 offset-sm6 offset-xs7>
						<v-card md6 light>
							<v-layout row wrap>
								<v-flex xs7>
									<v-card-text>SubTotal: </v-card-text>
								</v-flex>
								<v-flex xs5>
									<v-card-text>₹{{ Rent.amount }}</v-card-text>
								</v-flex>
							</v-layout>
							<v-layout row wrap v-if="isGst && !isIGST">
								<v-flex xs7>
									<v-card-text>CGST: </v-card-text>
								</v-flex>
								<v-flex xs5>
									<v-card-text>₹{{ GST }}</v-card-text>
								</v-flex>
							</v-layout>
							<v-layout row wrap v-if="isGst&&isIGST">
								<v-flex xs7>
									<v-card-text>IGST: </v-card-text>
								</v-flex>
								<v-flex xs5>
									<v-card-text>₹{{ IGST }}</v-card-text>
								</v-flex>
							</v-layout>
							<v-layout row wrap v-if="isGst && !isIGST">
								<v-flex xs7>
									<v-card-text>SGST: </v-card-text>
								</v-flex>
								<v-flex xs5>
									<v-card-text>₹{{ GST }}</v-card-text>
								</v-flex>
							</v-layout>
							<v-layout row wrap v-if="Rent.transport_charges>0">
								<v-flex xs7>
									<v-card-text>Transport: </v-card-text>
								</v-flex>
								<v-flex xs5>
									<v-card-text>₹{{ Rent.transport_charges }}</v-card-text>
								</v-flex>
							</v-layout>
							<v-layout row wrap v-if="Rent.loading_charges>0">
								<v-flex xs7>
									<v-card-text>Loading Charges: </v-card-text>
								</v-flex>
								<v-flex xs2>
									<v-card-text>₹{{ Rent.loading_charges }}</v-card-text>
								</v-flex>
							</v-layout>
							<v-layout row wrap v-if="Rent.unloading_charges>0">
								<v-flex xs7>
									<v-card-text>Loading Charges: </v-card-text>
								</v-flex>
								<v-flex xs2>
									<v-card-text>₹{{ Rent.unloading_charges }}</v-card-text>
								</v-flex>
							</v-layout>
							<hr style="border: 1px solid #3d3d3d; margin-left: 5%; margin-right: 5%;"/>
							<v-layout row wrap>
								<v-flex xs7>
									<v-card-text>Total: </v-card-text>
								</v-flex>
								<v-flex xs5>
									<v-card-text>₹{{ Rent.amount + Rent.taxes + Rent.loading_charges + Rent.unloading_charges + Rent.transport_charges
										}}
									</v-card-text>
								</v-flex>
							</v-layout>
						</v-card>
					</v-flex>

				</v-layout>
			</v-card>

		</v-container>
			</v-card>
		
		

		<v-snackbar bottom right v-model="snackbar">
			Rent Deleted!
			<v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>

		<v-container v-if="noRent">
			<v-layout style="width:100%; text-align:center;">
				<v-flex>
					<span style="font-size:25px;color:#8A8A8A;">No Rents Yet!</span>
				</v-flex>
			</v-layout>
		</v-container>

		<v-dialog v-model="deleteDialog" max-width="290" @keydown.esc="dialog=false">
			<v-card>
				<v-card-title class="headline">Delete?</v-card-title>
				<v-card-text>Are you sure you want to delete?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="pink darken-1" flat="flat" @click.native="deleteRent">Yes</v-btn>
					<v-btn color="pink darken-1" flat="flat" @click.native="deleteDialog = false">No</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</v-container>
</template>


<script>
	import RentDetailsModel from '../../../models/RentDetails'
	import Headers from '../../../models/headers'
	import TransactionItemModel from '../../../models/TransactionItemDetails'
	import Item from '../../../models/Item'
	import EventBus from '../../../EventBus'
	export default {
		data: () => ({
			is_credit:false,
			transactionItemHeaders:Item.headers.transactionItems,
            rentDetails:RentDetailsModel,
			rents:[],
			index:1,
			rent:{},
			snackbar:false,
			deleteDialog:false,
			selectedCompany:{name:'All Rents'}
		}),



		watch: {
			dialog(val) {
				val || this.close()
			}
		},

		created() {
			
		},

		methods: {

			deleteRent(){
				var res=this.$store.dispatch('deleteRent',this.Rent)
				if(res)
					this.snackbar=true
				this.deleteDialog=false
			},
			updateRent(){
				// this.$store.dispatch('setUpdateItem',this.Rent)
				// EventBus.$emit('updateRentItemReceived',this.Rent)
				this.$router.push('rent/'+this.Rent.rent_id+'/update')
			},
			displayRents(company){
				if(company!=0){
					this.selectedCompany=company
					this.$store.dispatch('loadFilteredRents',company.company_id)
				} else {
					this.selectedCompany={
						name:'All Rents'
					}
					this.$store.dispatch('LoadAllRents')
				}
					
			}
		},
		computed:{
			Rent(){
				
				return this.Rents[this.Rents.length - this.index]
			},
			Rents(){
				return this.$store.getters.getRents
			},
			Company(){
				var company=this.$store.getters.getCompanies.find(company=>{
					return this.Rent.company_id === company.company_id
				})
				return company
			},
			Customer(){
				if(this.index>0){
				var customer=this.$store.getters.getCustomers.find(customer=>{
					return this.Rent.customer_id===customer.customer_id
				})
				return customer
				}
			},
			isIGST(){
				if(this.index>0){
					if(this.Customer.statecode!=this.Company.statecode)
					return true
				else 
					return false
				}	
			},
			GST(){
				return this.Rent.taxes/2
			},
			IGST(){
				return this.Rent.taxes
			},
			isGst(){
				if(this.Rent.taxes>0)
					return true
					else{
						return false
					}
			},
			previous(){
				var length=this.$store.getters.getRents.length
				if(length-this.index>0)
					return true
				else 
					return false	
			},
			next(){
				var length=this.$store.getters.getRents.length
				if(length-this.index>=0 && length-this.index < length-1)
					return true
				else 
					return false	
			},
			noRent(){
				if(this.$store.getters.getRents.length==0)
					return true
				else return false	
			},
			date(){
				var date=this.Rent.date.split('-');
				return date[2]+'-'+date[1]+'-'+date[0]
			},
			Companies(){
				return this.$store.getters.getCompanies
			},
			TotalRentAmount(){
				var total=0
				// var rents = this.$store.getters.getRents
				// for (var rent in rents){
				// 	total+=(rent.amount )
				// }
				for(var i=0;i<this.Rents.length;i++){
					total+=this.Rents[i].amount
				}
				
				return total
			}	
		}
	}
</script>
