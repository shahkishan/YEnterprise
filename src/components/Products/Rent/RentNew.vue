<template>
	<v-container fluid grid-list-md>


		<v-navigation-drawer right clipped floating app class="blue-grey darken-3 hidden-xs-only" dark>
			<v-list>
				<v-list-tile @click="displayRents(0)">
					<v-list-tile-content>
						All Companies
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile v-for="company in Companies" :key="company.id" @click="displayRents(company)">
					<v-list-tile-content>
						<v-list-tile-title>{{ company.name }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-card dark color="blue-grey lighten-4">
			<v-toolbar dark color="blue-grey darken-1" style="overflow: hidden; font-size: 100%; display:flex flex-wrap:true">
				<span class="headline" style="margin-left:2%; display:flex; flex-grow:1">{{selectedCompany.name}}</span>
				<span style="margin-left:auto;display:flex; flex-grow:1" class="headline">Number of Rents: {{Rents.length}}</span>
				<span style="margin-left:auto;display:flex; flex-grow:1" class="headline">Total Amount: {{TotalRentAmount}}</span>
			</v-toolbar>
			<!-- <v-toolbar dark color="blue-grey darken-1">
				Filters
			</v-toolbar> -->

			<v-container v-if="!noRent">

				<v-container>
					<v-flex xs12>
						<v-card>
							<v-card-title style="background-color:#1976d2; color:#fff" class="title">
								Rents : {{selectedCompany.name}}
								<v-spacer></v-spacer>
								<v-flex xs6 md4>
									<v-text-field append-icon="search" label="Search" single-line hide-details v-model="itemSearch" solo light></v-text-field>
								</v-flex>
									<v-btn @click.native="$router.push('rent/add')" fab color="pink"><v-icon>add</v-icon></v-btn>
							</v-card-title>
							<v-data-table :headers="headers" :items="Rents" :search="itemSearch" light :rows-per-page-items="[10,20,30,{'text':'All','value':-1}]">
								<template slot="items" slot-scope="props">
									<td v-on:click="itemSelected(props.item)">{{ props.index + 1 }}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.invoice_no }}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.customer_name }}</td>
									<td v-on:click="itemSelected(props.item)">{{ props.item.site_name }}</td>
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
			
		</v-card>



		<v-snackbar bottom right v-model="snackbar">
			Rent Deleted!
			<v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>

		<v-container v-if="noRent">
			<v-layout offset-xs1>
				<v-flex offset-xs5>
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

		<v-dialog v-model="rentDialog" fullscreen style="height:100%;" @keydown.esc="escPress" transition="dialog-bottom-transition"
		:overlay="true" scrollable v-if="rentDialogItem.invoice_no>0">
			<v-card tile>
				<v-toolbar card dark color="primary">

					<v-toolbar-title>Rent: {{Rent.invoice_no}}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn icon class="mx-0" @click="updateRent">
							<v-icon>edit</v-icon>
						</v-btn>
						<v-btn icon class="mx-0" @click="deleteDialog=true">
							<v-icon>delete</v-icon>
						</v-btn>
						<v-btn icon @click.native="rentDialog = false" dark>
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-card tile style="height:100%;">
					<v-card color="blue-grey lighten-5" style="border: 25px solid black; height:100%">

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

							<v-flex xs8 sm3 md2 offset-md10 offset-sm9 offset-xs4 >
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
									<hr style="border: 1px solid #3d3d3d; margin-left: 5%; margin-right: 5%;" />
									<v-layout row wrap>
										<v-flex xs7>
											<v-card-text>Total: </v-card-text>
										</v-flex>
										<v-flex xs5>
											<v-card-text>₹{{ Rent.total}}
											</v-card-text>
										</v-flex>
									</v-layout>
								</v-card>
							</v-flex>

						</v-layout>
						<v-layout row wrap class="text-xs-center" mt-5>
							<v-flex xs12 style="display: flex; flex-wrap: true">
								<v-btn style="display:flex; flex-grow:1">Print</v-btn>
								<v-btn style="display:flex; flex-grow:1" @click="showDispatchDialog">Dispatch</v-btn>
								<v-btn style="display:flex; flex-grow:1" >Generate Invoice</v-btn>
							</v-flex>

						</v-layout>
					</v-card>

				</v-card>
				<div style="flex 1 1 auto;" />
			</v-card>
		</v-dialog>

		<v-dialog @keydown.esc="escPress" v-model="dispatchDialog" max-width="50%">
			<v-card tile style="height:100%;">
				<v-toolbar dark color="primary">
					<v-card-title>
						<span class="headline"> Select items to be dispatched</span>

					</v-card-title>
					<v-spacer></v-spacer>
						<v-toolbar-items>
							<v-btn icon @click.native="dispatchDialog = false" dark>
								<v-icon>close</v-icon>
							</v-btn>
						</v-toolbar-items>
				</v-toolbar>
					<v-flex xs11 sm4 ml-5 mt-5>
					<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width
					:nudge-right="40" min-width="290px" :return-value.sync="dispatch.dispatchDate">
						<v-text-field slot="activator" label="Dispatch date" v-model="DispatchDate" prepend-icon="event" readonly required />
						<v-date-picker v-model="dispatch.dispatchDate" no-title scrollable @change="$refs.menu.save(dispatch.dispatchDate)" :min="Rent.date">
							<v-spacer></v-spacer>
							<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
							<v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
						</v-date-picker>
					</v-menu>
				</v-flex>
				<v-flex ml-5 mr-5 mb-5 mt-5>

					<v-data-table :headers="dispatchHeaders" light :items="dispatchDisplayItems" hide-actions class="elevation-1" mb2>
						<template slot="items" slot-scope="props">
							<td>{{ props.item.item_name }}</td>
							<td>{{ props.item.subitem_name }}</td>
							<td class="text-xs-left">{{ props.item.quantity }}</td>
							<td>
								<v-text-field hint="Enter Quantity" label="Enter Quantity" mask="#########" v-model="props.item.quantityDispatched" style="width:50%"></v-text-field>
							</td>
						</template>
					</v-data-table>
				</v-flex>
				<v-flex xs4 md2 pb-5 style="margin-left: auto" >
					<v-btn dark color="primary" @click="prepareDispatch()" v-if="dispatchDisplayItems.length>0">Dispatch</v-btn>
				</v-flex>
			</v-card>
		</v-dialog>

		<v-snackbar v-model="dispatchError" bottom right>
			{{dispatchErrorText}}
		</v-snackbar>


	</v-container>
</template>





<script>
	import RentDetailsModel from '../../../models/RentDetails'
	import Headers from '../../../models/headers'
	import TransactionItemModel from '../../../models/TransactionItemDetails'
    import Item from '../../../models/Item'
	import EventBus from '../../../EventBus'
	import Dispatch from '../../../models/dispatch'
	import dispatch from '../../../models/dispatch';
	export default {
		data: () => ({
			is_credit:false,
			transactionItemHeaders:Item.headers.transactionItems,
			dispatchHeaders:Headers.dispatchItemHeaders,			
			rentDetails:RentDetailsModel,
			rents:[],
			index:1,
			rent:{},
			snackbar:false,
			deleteDialog:false,
            selectedCompany:{name:'All Rents'},
            itemSearch:'',
            headers:Headers.rent,
            rentDialog:false,
            rentDialogItem:{},
			dispatchDialog:false,
			dispatch:Object.assign({},Dispatch.defaultObject),
			dispatchDisplayItems:[],
			menu:false,
			dispatchError:false,
			dispatchErrorText:'Please enter a valid quantity'

		}),



		watch: {
			dialog(val) {
				val || this.close()
			}
		},

		created() {
            EventBus.$on("rentsLoaded",rents=>{
                this.rentDialogItem=rents[rents.length]
            })
		},

		methods: {

            deleteRent(){
				var res=this.$store.dispatch('deleteRent',this.Rent)
				if(res)
					this.snackbar=true
                this.deleteDialog=false
                this.rentDialog=false
                
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
					
			},
            itemSelected(rent){
				console.log(JSON.stringify(rent))
                this.rentDialogItem=JSON.parse(JSON.stringify(rent))
                this.rentDialog=true
            },
            formatDate(date){
                var arr=date.split('-')
                return arr[2]+"-"+arr[1]+"-"+arr[0]
            },
			escPress(){
				if(this.dispatchDialog){
					this.dispatchDialog=false
				} else {
					this.rentDialog=false
				}
			},
			showDispatchDialog(){
				this.dispatchDisplayItems=[]
				this.Rent.items.forEach(item=>{
					var i={
						item_id:item.item_id,
						item_name:item.item_name,
						subitem_id:item.subitem_id,
						subitem_name:item.subitem_name,
						quantity:item.quantity,
						quantityDispatched:''
					}
					if(this.Rent.dispatchedItems){
						// var itemObj=this.Rent.dispatchedItems.find(itm=>{
						// 	return itm.items.find(itm1=>{
						// 		console.log(itm1.subitem_id+" "+i.subitem_id)
						// 		itm1.subitem_id==i.subitem_id
						// 	})
						// })
						// console.log(itemObj)

						this.Rent.dispatchedItems.forEach(dispatchedItem=>{
							var item1=dispatchedItem.items.find(item1=>{
								return item1.subitem_id===i.subitem_id;
							})							
							if(item1){
								i.quantity-=item1.quantityDispatched
							}
						})

						// if(itemObj)
						// 	i.quantity-=itemObj.quantityDispatched
					}
					console.log(i.quantity)
					if(i.quantity>0)
						this.dispatchDisplayItems.push(i)
				})
				this.dispatchDialog=true
			},
			prepareDispatch(){
				// console.log(JSON.stringify(this.dispatchDisplayItems))
				if(this.dispatchDisplayItems){
				var items=[]
				this.dispatchDisplayItems.forEach(item=>{
					if(item.quantity<item.quantityDispatched){
						this.dispatchError=true
						return
					}

					if(item.quantityDispatched>0){
						items.push(item)
					}
				})

				if(items.length>0){
				this.dispatch.items=items

				var payload={
					rent_id:this.Rent.rent_id,
					dispatch:this.dispatch
				}

				this.$store.dispatch('dispatchItems',payload)


				console.log(JSON.stringify(this.dispatch))
				this.dispatchDialog=false
}
				}
				else {

				}
			}
		},
		computed:{      
			Rent(){
				return this.rentDialogItem
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
			},
			DispatchDate(){
				if(this.dispatch.dispatchDate){
				var arr=this.dispatch.dispatchDate.split('-')
				return arr[2]+"-"+arr[1]+"-"+arr[0]
				}
				else {
					return ''
				}
			}

		}
	}

</script>
