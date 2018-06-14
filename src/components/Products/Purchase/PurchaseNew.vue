<template>
	<v-container fluid grid-list-md>


		<v-navigation-drawer right clipped floating app class="blue-grey darken-3 hidden-xs-only" dark>
			<v-list>
				<v-list-tile @click="displayPurchases(0)">
					<v-list-tile-content>
						All Companies
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile v-for="company in Companies" :key="company.id" @click="displayPurchases(company)">
					<v-list-tile-content>
						<v-list-tile-title>{{ company.name }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-card dark color="blue-grey lighten-4">
			<v-toolbar dark color="blue-grey darken-1" style="overflow: hidden; font-size: 100%;">
				<span class="headline" style="margin-left:2%">{{selectedCompany.name}}</span>
				<span style="margin-left:auto;" class="headline">Number of Purchases: {{Purchases.length}}</span>
				<span style="margin-left:auto;" class="headline">Total Amount: {{TotalPurchaseAmount}}</span>
			</v-toolbar>
			<!-- <v-toolbar dark color="blue-grey darken-1">
				Filters
			</v-toolbar> -->

			<v-container v-if="!noPurchase">

				<v-container>
					<v-flex xs12>
						<v-card>
							<v-card-title style="background-color:#1976d2; color:#fff" class="title">
								Purchases : {{selectedCompany.name}}
								<v-spacer></v-spacer>
								<v-flex xs6 md4>
									<v-text-field append-icon="search" label="Search" single-line hide-details v-model="itemSearch" solo light></v-text-field>
								</v-flex>
							</v-card-title>
							<v-data-table :headers="headers" :items="Purchases" :search="itemSearch" light :rows-per-page-items="[10,20,30,{'text':'All','value':-1}]">
								<template slot="items" slot-scope="props">
									<td v-on:click="itemSelected(props.item)">{{ props.index + 1 }}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.invoice_no }}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.supplier_name }}</td>
									<td v-on:click="itemSelected(props.item)">{{ formatDate(props.item.date)}}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.total }}</td>

								</template>

								<v-alert slot="no-results" :value="true" color="error" icon="warning">
									Your search for "{{ itemSearch }}" found no results.
								</v-alert>
							</v-data-table>

						</v-card>
					</v-flex>
				</v-container>

			</v-container>
			<v-flex xs12 class="text-xs-center" style="background-color:#CFD8DC;">
				<v-btn color="primary" @click.native="$router.push('purchase/add')" style="width:99%; text-align:center">New</v-btn>
			</v-flex>
		</v-card>



		<v-snackbar bottom right v-model="snackbar">
			Purchase Deleted!
			<v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>

		<v-container v-if="noPurchase">
			<v-layout offset-xs1>
				<v-flex offset-xs5>
					<span style="font-size:25px;color:#8A8A8A;">No Purchases Yet!</span>
				</v-flex>
			</v-layout>
		</v-container>

		<v-dialog v-model="deleteDialog" max-width="290" @keydown.esc="dialog=false">
			<v-card>
				<v-card-title class="headline">Delete?</v-card-title>
				<v-card-text>Are you sure you want to delete?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="pink darken-1" flat="flat" @click.native="deletePurchase">Yes</v-btn>
					<v-btn color="pink darken-1" flat="flat" @click.native="deleteDialog = false">No</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="purchaseDialog" fullscreen @keydown.esc="purchaseDialog=false" transition="dialog-bottom-transition" :overlay="true"
		scrollable v-if="purchaseDialogItem.invoice_no>0">
			<v-card tile>
				<v-toolbar card dark color="primary">

					<v-toolbar-title>Purchase: {{Purchase.invoice_no}}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn icon class="mx-0" @click="updatePurchase">
							<v-icon>edit</v-icon>
						</v-btn>
						<v-btn icon class="mx-0" @click="deleteDialog=true">
							<v-icon>delete</v-icon>
						</v-btn>
						<v-btn icon @click.native="purchaseDialog = false" dark>
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-card tile style="height:100%;">

					<v-card color="blue-grey lighten-5" style="border: 25px solid black; height:100%;">

						<v-card-title class=" text-xs-center">
							<span class="headline" style="width:100%;text-transform:uppercase; color:#3d3d3d; height:100%; ">{{Company.name}}</span>
						</v-card-title>
						<v-divider></v-divider>
						<hr/>
						<v-card-text>
							<v-layout row wrap style="color:#3d3d3d" mt-1>
								<v-flex xs12 sm9 md10>
									<span class="title">Invoice no.: {{Purchase.invoice_no}}</span>
								</v-flex>
								<v-flex xs12 sm3 md2>
									<span class="title">Date: {{date}}</span>
								</v-flex>
							</v-layout>
							<v-flex xs12 mt-2>
								<span class="title" style="color:#3d3d3d">Supplier: {{Supplier.name}}</span>
							</v-flex>
						</v-card-text>

						<v-flex xs12 mt-3>
							<v-data-table :headers="transactionItemHeaders" light :items="Purchase.items" hide-actions class="elevation-1" mb2>
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
											<v-card-text>₹{{ Purchase.amount }}</v-card-text>
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
									<v-layout row wrap v-if="Purchase.transport_charges>0">
										<v-flex xs7>
											<v-card-text>Transport: </v-card-text>
										</v-flex>
										<v-flex xs5>
											<v-card-text>₹{{ Purchase.transport_charges }}</v-card-text>
										</v-flex>
									</v-layout>
									<v-layout row wrap v-if="Purchase.loading_charges>0">
										<v-flex xs7>
											<v-card-text>Loading Charges: </v-card-text>
										</v-flex>
										<v-flex xs2>
											<v-card-text>₹{{ Purchase.loading_charges }}</v-card-text>
										</v-flex>
									</v-layout>
									<v-layout row wrap v-if="Purchase.unloading_charges>0">
										<v-flex xs7>
											<v-card-text>Loading Charges: </v-card-text>
										</v-flex>
										<v-flex xs2>
											<v-card-text>₹{{ Purchase.unloading_charges }}</v-card-text>
										</v-flex>
									</v-layout>
									<hr style="border: 1px solid #3d3d3d; margin-left: 5%; margin-right: 5%;" />
									<v-layout row wrap>
										<v-flex xs7>
											<v-card-text>Total: </v-card-text>
										</v-flex>
										<v-flex xs5>
											<v-card-text>₹{{ Purchase.amount + Purchase.taxes + Purchase.loading_charges + Purchase.unloading_charges + Purchase.transport_charges
												}}
											</v-card-text>
										</v-flex>
									</v-layout>
								</v-card>
							</v-flex>

						</v-layout>

					</v-card>
				</v-card>
				<div style="flex 1 1 auto;" />
			</v-card>
		</v-dialog>


	</v-container>
</template>



<script>
	import PurchaseDetailsModel from '../../../models/PurchaseDetails'
	import Headers from '../../../models/headers'
	import TransactionItemModel from '../../../models/TransactionItemDetails'
    import Item from '../../../models/Item'
    import EventBus from '../../../EventBus'
	export default {
		data: () => ({
			is_credit:false,
			transactionItemHeaders:Item.headers.transactionItems,
            purchaseDetails:PurchaseDetailsModel,
			purchases:[],
			index:1,
			purchase:{},
			snackbar:false,
			deleteDialog:false,
            selectedCompany:{name:'All Purchases'},
            itemSearch:'',
            headers:Headers.purchase,
            purchaseDialog:false,
            purchaseDialogItem:{}
		}),



		watch: {
			dialog(val) {
				val || this.close()
			}
		},

		created() {
            EventBus.$on("purchasesLoaded",purchases=>{
                this.purchaseDialogItem=purchases[purchases.length]
            })
		},

		methods: {

			deletePurchase(){
				var res=this.$store.dispatch('deletePurchase',this.Purchase)
				if(res)
					this.snackbar=true
                this.deleteDialog=false
                this.purchaseDialog=false
			},
			updatePurchase(){
				this.$store.dispatch('setUpdateItem',this.Purchase)
				this.$router.push('purchase/update')
			},
			displayPurchases(company){
				if(company!=0){
					this.selectedCompany=company
					this.$store.dispatch('loadFilteredPurchases',company.company_id)
				} else {
					this.selectedCompany={
						name:'All Purchases'
					}
					this.$store.dispatch('loadAllPurchases')
				}
					
            },
            itemSelected(purchase){
                this.purchaseDialogItem=JSON.parse(JSON.stringify(purchase))
                this.purchaseDialog=true
            },
            formatDate(date){
                var arr=date.split('-')
                return arr[2]+"-"+arr[1]+"-"+arr[0]
            }
		},
		computed:{      
			Purchase(){
				return this.purchaseDialogItem
			},
			Purchases(){
				return this.$store.getters.getPurchases
			},
			Company(){

                if(this.Purchase){
                    var company=this.$store.getters.getCompanies.find(company=>{
                        return this.Purchase.company_id === company.company_id
                    })
                    return company
                } else {
                    return this.selectedCompany
                }
			},
			Supplier(){
				if(this.index>0){
				var supplier=this.$store.getters.getSuppliers.find(supplier=>{
					return this.Purchase.supplier_id===supplier.supplier_id
				})
				return supplier
				}
			},
			isIGST(){
				if(this.index>0){
					if(this.Supplier.address.statecode!=this.Company.address.statecode)
					return true
				else 
					return false
				}	
			},
			GST(){
				return this.Purchase.taxes/2
			},
			IGST(){
				return this.Purchase.taxes
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
				if(length-this.index>=0 && length-this.index < length-1)
					return true
				else 
					return false	
			},
			noPurchase(){
				if(this.$store.getters.getPurchases.length==0)
					return true
				else return false	
			},
			date(){
				var date=this.Purchase.date.split('-');
				return date[2]+'-'+date[1]+'-'+date[0]
			},
			Companies(){
				return this.$store.getters.getCompanies
			},
			TotalPurchaseAmount(){
				var total=0
				// var purchases = this.$store.getters.getPurchases
				// for (var purchase in purchases){
				// 	total+=(purchase.amount )
				// }
				for(var i=0;i<this.Purchases.length;i++){
					total+=this.Purchases[i].amount
				}
				
				return total
				
			}	
		}
	}
</script>
