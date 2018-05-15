<template>
	<v-container fluid grid-list-md>
	
		<v-container v-if="!noPurchase">
		<v-layout>

			<v-flex xs2>
				<span>Company: {{Purchase.company_name}}</span>
			</v-flex>
		</v-layout>
		
		<v-layout row wrap>
			<v-flex xs11 sm2>
				<span>Invoice Number: {{Purchase.invoice_no}}</span>
			</v-flex>
			<v-flex xs11 sm4>
				<span>Date: {{Purchase.date}}</span>
			</v-flex>
		</v-layout>
		<v-flex xs11 sm2 ml5>
			<span>Supplier: {{Purchase.ba_name}}</span>
		</v-flex>
		<v-flex xs12 mt-5>
		<v-data-table :headers="transactionItemHeaders" :items="Purchase.items" hide-actions class="elevation-1" mb2>
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
					<v-flex xs7><v-card-text>SubTotal: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ Purchase.amount }}</v-card-text></v-flex>
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
				<v-layout row wrap v-if="Purchase.transport_charges>0">
					<v-flex xs7><v-card-text>Transport: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ Purchase.transport_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="Purchase.loading_charges>0">
					<v-flex xs7><v-card-text>Loading Charges: </v-card-text></v-flex> <v-flex xs2><v-card-text>₹{{ Purchase.loading_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap v-if="Purchase.unloading_charges>0">
					<v-flex xs7><v-card-text>Loading Charges: </v-card-text></v-flex> <v-flex xs2><v-card-text>₹{{ Purchase.unloading_charges }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs7><v-card-text>TOTAL: </v-card-text></v-flex> <v-flex xs5><v-card-text>₹{{ Purchase.amount + Purchase.taxes + Purchase.loading_charges + Purchase.unloading_charges + Purchase.transport_charges }}</v-card-text></v-flex>
				</v-layout>
			</v-card>
			</v-flex>
		</v-layout>

		
	</v-container>

	<v-layout>
			<v-flex xs6 md4><v-btn color="primary" @click.native="index++" v-if="previous">Previous</v-btn></v-flex>
			<v-flex xs6 md4><v-btn color="primary" @click.native="index--" v-if="next">Next</v-btn></v-flex>
			<v-flex xs6 md4><v-btn color="primary" @click.native="$router.push('purchase/add')">New</v-btn></v-flex>
			<v-flex xs6 md4><v-btn color="primary" @click="updatePurchase()">Update</v-btn></v-flex>
			<v-flex xs6 md4><v-btn color="primary" @click="deletePurchase()">Delete</v-btn></v-flex>
	</v-layout>

	
	 <v-snackbar
      bottom right
      v-model="snackbar"
    >
      Purchase Deleted!
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

	<v-container v-if="noPurchase">
		<v-layout>
			<v-flex offset-xs5>
				<span style="font-size:25px;color:#8A8A8A">No Purchases Yet!</span>
			</v-flex>
		</v-layout>
	</v-container>

	</v-container>
</template>
<script>
	import PurchaseDetailsModel from '../../../models/PurchaseDetails'
	import Headers from '../../../models/headers'
	import TransactionItemModel from '../../../models/TransactionItemDetails'
	export default {
		data: () => ({
			is_credit:false,
			transactionItemHeaders:Headers.transactionItems,
            purchaseDetails:PurchaseDetailsModel,
			purchases:[],
			index:1,
			purchase:{},
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
			
			deletePurchase(){
				this.$store.dispatch('deletePurchase',this.Purchase.purchase_master_id)
				this.snackbar=true
			},
			updatePurchase(){
				this.$store.dispatch('setUpdateItem',this.Purchase)
				console.log(JSON.stringify(this.$store.getters.getCurrentPurchase))
				this.$router.push('update')
			}
		},
		computed:{
			Purchase(){
				var purchases=this.$store.getters.getPurchases
				return purchases[purchases.length - this.index]
			},
			Company(){
				var company=this.$store.getters.getCompanies.find(company=>{
					return this.Purchase.company_id === company.company_id
				})
				return company
			},
			Supplier(){
				if(this.index>0){
				console.log(JSON.stringify(this.Purchase))
				var supplier=this.$store.getters.getSuppliers.find(supplier=>{
					return this.Purchase.ba_id===supplier.ba_id
				})
				return supplier
				}
			},
			isIGST(){
				if(this.index>0){
					if(this.Supplier.statecode!=this.Company.statecode)
					return true
				else 
					return false
				}	
			},
			GST(){
				return this.Purchase.taxes/2
			},
			IGST(){
				return this.taxes
			},
			isGst(){
				if(this.Purchase.taxes>0)
					return true
					else{
						return false
					}
			},
			previous(){
				var length=this.$store.getters.getPurchases.length
				if(length-this.index>0)
					return true
				else 
					return false	
			},
			next(){
				var length=this.$store.getters.getPurchases.length
				console.log(this.index+" "+length)
				if(length-this.index>=0 && length-this.index < length-1)
					return true
				else 
					return false	
			},
			noPurchase(){
				if(this.$store.getters.getPurchases.length==0)
					return true
				else return false	
			}	
		}
	}
</script>
