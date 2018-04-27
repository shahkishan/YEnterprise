<template>
	<v-container fluid grid-list-md>
		<v-container v-if="!noRent">
		<v-layout>

			<v-flex xs2>
				<span>Company: {{Rent.company_name}}</span>
			</v-flex>
		</v-layout>
		
		<v-layout row wrap>
			<v-flex xs11 sm2>
				<span>Invoice Number: {{Rent.invoice_no}}</span>
			</v-flex>
			<v-flex xs11 sm4>
				<span>Date: {{Rent.date}}</span>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs11 sm2 ml5>
				<span>Customer: {{Rent.ba_name}}</span>
			</v-flex>
			<v-flex xs11 sm2 ml5>
				<span>Site: {{Rent.site_name}}</span>
			</v-flex>
		</v-layout>
		
		<v-flex xs12 mt-5>
		<v-data-table :headers="transactionItemHeaders" :items="Rent.items" hide-actions class="elevation-1" mb2>
			<template slot="items" slot-scope="props">
				<td>{{ props.item.item_master_name }}</td>
				<td>{{ props.item.item_detail_name }}</td>
				<td class="text-xs-left">{{ props.item.hsn_code }}</td>
				<td class="text-xs-left">{{ props.item.quantity }}</td>
				<td class="text-xs-left">{{ props.item.rate }}</td>
				<td class="text-xs-left">{{ props.item.total }}</td>
			</template>
		</v-data-table>
		</v-flex>
		<v-layout align-content-end="true" mt-3>
			
			<v-flex xs5 sm6 md6 lg2 offset-lg10 offset-md6 offset-sm6  offset-xs7>
			<v-card md6>
				<v-layout row wrap>
					<v-flex xs7><v-card-text>SubTotal: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ Rent.amount }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst && !isIGST">
					<v-flex xs7><v-card-text>CGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ GST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst&&isIGST">
					<v-flex xs7><v-card-text>IGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ IGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="isGst && !isIGST">
					<v-flex xs7><v-card-text>SGST: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ GST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="Rent.transport_charges>0">
					<v-flex xs7><v-card-text>Transport: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ Rent.transport_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="Rent.loading_charges>0">
					<v-flex xs7><v-card-text>Loading Charges: </v-card-text></v-flex> <v-flex xs2><v-card-text>₹{{ Rent.loading_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="Rent.unloading_charges>0">
					<v-flex xs7><v-card-text>Loading Charges: </v-card-text></v-flex> <v-flex xs2><v-card-text>₹{{ Rent.unloading_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs7><v-card-text>TOTAL: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ Rent.amount + Rent.taxes + Rent.loading_charges + Rent.unloading_charges + Rent.transport_charges }}</v-card-text></v-flex>
				</v-layout>
			</v-card>
			</v-flex>
		</v-layout>

		<v-layout>
			<v-flex xs6 md4><v-btn color="primary" @click.native="index++" v-if="previous">Previous</v-btn></v-flex>
			<v-flex xs6 md4><v-btn color="primary" @click.native="index--" v-if="next">Next</v-btn></v-flex>
			<v-flex xs6 md4><v-btn color="primary" @click.native="$router.push('rent/add')">New</v-btn></v-flex>
			<v-flex xs6 md4><v-btn color="primary" @click="updateRent()">Update</v-btn></v-flex>
			<v-flex xs6 md4><v-btn color="primary" @click="deleteRent()">Delete</v-btn></v-flex>
		</v-layout>
	</v-container>
	 <v-snackbar
      bottom right
      v-model="snackbar"
    >
      Rent Deleted!
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

	<v-container v-if="noRent">
		<v-layout>
			<v-flex offset-xs5>
				<span style="font-size:25px;color:#8A8A8A">No Rents Yet!</span>
			</v-flex>
		</v-layout>
	</v-container>

	</v-container>
</template>
<script>
	import RentDetailsModel from '../models/RentDetails'
	import Headers from '../models/headers'
	import TransactionItemModel from '../models/TransactionItemDetails'
	export default {
		data: () => ({
			is_credit:false,
			transactionItemHeaders:Headers.transactionItems,
            rentDetails:RentDetailsModel,
			rents:[],
			index:1,
			rent:{},
			snackbar:false
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
				this.$store.dispatch('deleteRent',this.Rent.rent_master_id)
				this.snackbar=true
			},
			updateRent(){
				this.$store.dispatch('setUpdateItem',this.Rent)
				console.log(JSON.stringify(this.$store.getters.getCurrentRent))
				this.$router.push('rent/update')
			}
		},
		computed:{
			Rent(){
				var rents=this.$store.getters.getRents
				return rents[rents.length - this.index]
			},
			Company(){
				var company=this.$store.getters.getCompanies.find(company=>{
					return this.Rent.company_id === company.company_id
				})
				return company
			},
			Customer(){
				if(this.index>0){
				console.log(JSON.stringify(this.Rent))
				var customer=this.$store.getters.getCustomers.find(customer=>{
					return this.Rent.ba_id===customer.ba_id
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
				return this.taxes
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
				console.log(this.index+" "+length)
				if(length-this.index>=0 && length-this.index < length-1)
					return true
				else 
					return false	
			},
			noRent(){
				if(this.$store.getters.getRents.length==0)
					return true
				else return false	
			}	
		}
	}
</script>
