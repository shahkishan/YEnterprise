<template>
	<div>
		
		<v-container>
			<v-layout row wrap>
				<v-flex md8>
					<v-card>
						<v-card-title>
							Customers
							<v-spacer></v-spacer>
							<v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
						</v-card-title>
						<v-data-table :headers="headers" :items="loadCustomers" hide-actions class="elevation-1">
							<template slot="items" slot-scope="props">
								<td v-on:click="displayDetails(props.item)">{{ props.item.name }}</td>
								<td v-on:click="displayDetails(props.item)">{{ props.item.email }}</td>
								<td v-on:click="displayDetails(props.item)">{{ props.item.contact }}</td>
								<td v-on:click="displayDetails(props.item)">{{ props.item.gstno }}</td>

								<td class="justify-center layout px-0">
									<v-btn icon class="mx-0" @click="editCustomer(props.item)">
										<v-icon color="teal">edit</v-icon>
									</v-btn>
									<v-btn icon class="mx-0" @click="deleteItemDialog(props.item)">
										<v-icon color="pink">delete</v-icon>
									</v-btn>
								</td>
							</template>
							<template slot="no-data">
							</template>
							<v-alert slot="no-results" :value="true" color="error" icon="warning">
								Your search for "{{ search }}" found no results.
							</v-alert>
						</v-data-table>
					</v-card>
					
					<v-spacer></v-spacer>
				</v-flex>
				<v-flex md4>
					<v-card style="margin-left:5%">
						<v-toolbar color="primary">
							<span class="title" style="color:#FFFFFF;padding:10px">{{ formTitle }}</span>
						</v-toolbar>
						<v-card-text>
							<v-container grid-list-md>
								<v-layout wrap>
									<v-flex xs12 sm6 md6>
										<v-text-field label="Name" v-model="customer.name"></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-text-field label="Email" v-model="customer.email"></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-text-field label="Contact Number" v-model="customer.contact"></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-text-field label="GST NO" v-model="customer.gstno"></v-text-field>
									</v-flex>
									<v-flex xs12>
										<v-text-field label="Address Line 1" v-model="customer.address.addressline1"></v-text-field>
									</v-flex>
									<v-flex xs12>
										<v-text-field label="Address Line 2" v-model="customer.address.addressline2"></v-text-field>
									</v-flex>
									<v-flex xs8>
										<v-text-field label="City" v-model="customer.address.city"></v-text-field>
									</v-flex>
									<v-flex xs4>
										<v-text-field label="PIN Code" v-model="customer.address.pincode"></v-text-field>
									</v-flex>
									<v-flex xs8>
										<v-text-field label="State" v-model="customer.address.state"></v-text-field>
									</v-flex>
									<v-flex xs4>
										<v-text-field label="State Code" v-model="customer.address.statecode"></v-text-field>
									</v-flex>
									
								</v-layout>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" flat @click.native="clear">Clear</v-btn>
							<v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-dialog v-model="deleteDialog" max-width="290" @keydown.esc="dialog=false">
			<v-card>
				<v-card-title class="headline">Delete?</v-card-title>
				<v-card-text>Are you sure you want to delete?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="pink darken-1" flat="flat" @click.native="deleteItem">Yes</v-btn>
					<v-btn color="pink darken-1" flat="flat" @click.native="deleteDialog = false; deleteCustomer={}">No</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
		<v-dialog v-model="detailDialog" fullscreen @keydown.esc="escPressed" transition="dialog-bottom-transition" :overlay="true" scrollable>
						<v-card tile>
							<v-toolbar card dark color="primary">
								
								<v-toolbar-title>{{detailsDialogTitle}}</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-toolbar-items>
									<v-btn icon @click.native="detailDialog = false" dark>
									<v-icon>close</v-icon>
								</v-btn>
								</v-toolbar-items>
							</v-toolbar>
							<v-card-text style="height:100%;">
								<v-subheader>
									<h3>Name</h3> 
								</v-subheader>
								<v-subheader>{{dialogCustomer.name}}</v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>Email</h3>
								</v-subheader>
								<v-subheader>{{dialogCustomer.email}} </v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>Contact Number</h3>
								</v-subheader>
								<v-subheader>{{dialogCustomer.contact}}</v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>GST No</h3>
								</v-subheader>
								<v-subheader>{{dialogCustomer.gstno}}</v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>Address</h3>
								</v-subheader>
								<v-subheader>{{fullAddress}}</v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>Sites</h3>
								</v-subheader>
								<v-subheader>
									
									<v-btn value="add" pr-5 color="primary" @click.native="siteDialog=true">
										<v-flex pr-2>
										<v-icon>add</v-icon>
										<span style="margin-left:7px">Add</span>
										</v-flex>
									</v-btn>
								</v-subheader>
								<v-subheader>
									<v-container ml-0>
										<v-layout row wrap>
											<v-flex sm12 md3 ml-2 mr-2 mt-2 mb-2 v-for="site in dialogCustomer.sites" :key="site.site_id">
												<v-card color="blue-grey lighten-5">
													<v-card-title class="headline">
														{{site.site_name}}
													</v-card-title>
													<v-card-text>
														{{site.address.addressline1}},<br/>
														{{site.address.addressline2}},<br/>
														{{site.address.city}},<br/>
														{{site.address.state}} - {{site.address.pincode}} 
													</v-card-text>	
													<v-card-actions style="background-color:#CFD8DC">
													<v-btn color="pink darken-1" flat="flat" @click.native="editSite(site)">Edit</v-btn>
													<v-btn color="pink darken-1" flat="flat" @click.native="deleteSite(site)">Delete</v-btn>
												</v-card-actions>									
												</v-card>	
												
											</v-flex>
											
										</v-layout>
									</v-container>
								</v-subheader>
							</v-card-text>
							<div style="flex: 1 1 auto;" />
						</v-card>
					</v-dialog>
					<v-dialog v-model="siteDialog" max-width="600px">
						<v-card tile>
							<v-card-title>
								<v-card-title class="headline">{{siteDialogTitle}}</v-card-title>
							</v-card-title>
							<v-container grid-list-md>
								<v-layout row wrap pb-4 pl-4 pr-4>
								<v-flex xs12>
									<v-text-field label="Name" v-model="site.site_name"></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field label="Address Line 1" v-model="site.address.addressline1"></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field label="Address Line 2" v-model="site.address.addressline2"></v-text-field>
								</v-flex>
								<v-flex xs8>
									<v-text-field label="City" v-model="site.address.city"></v-text-field>
								</v-flex>
								<v-flex xs4>
									<v-text-field label="PIN Code" v-model="site.address.pincode"></v-text-field>
								</v-flex>
								<v-flex xs8>
									<v-text-field label="State" v-model="site.address.state"></v-text-field>
								</v-flex>
								<v-flex xs4>
									<v-text-field label="State Code" v-model="site.address.statecode"></v-text-field>
								</v-flex>
								</v-layout>
							</v-container>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="pink darken-1" flat="flat" @click.native="addSite">Save</v-btn>
								<v-btn color="pink darken-1" flat="flat" @click.native="siteDialog=false;site=Customer.Site">Cancel</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

	</div>

</template>

<script>
import Customer from '../../models/Customer'
export default {
  	data(){
		return{
			dialog:false,
			deleteDialog:false,
			deleteIndex:null,
			detailDialog:false,
			isEdit:false,
			customer:Customer.defaultObject,
			headers:Customer.headers,
			search:'',
			dialogCustomer:Customer.defaultObject,
			deleteCustomer:{},
			siteDialog:false,
			site:Customer.Site,
			isEditSite:false,
			deleteSiteDetails:Customer.Site,
			isSiteDelete:false
	  	}
  },

	computed:{
		formTitle(){
			return this.isEdit? 'Edit Details' : 'New Customer'
		},
		loadCustomers(){
			return this.$store.getters.getCustomers
		},
		fullAddress(){
			return this.dialogCustomer.address.addressline1+", "+this.dialogCustomer.address.addressline2+", "+this.dialogCustomer.address.city+", "+this.dialogCustomer.address.state+" - "+this.dialogCustomer.address.pincode
		}, 
		detailsDialogTitle(){
			return this.dialogCustomer.name+" : Details"
		},
		siteDialogTitle(){
			return this.isEditSite?'Edit Site':'Add Site'
		}

	},
	created(){
		this.$store.dispatch('loadCustomers')
	},
	beforeDestroy(){
		this.$store.dispatch('unloadCustomers')
	},
	methods:{
		editCustomer(customer){
			this.customer=customer
			this.isEdit=true
		},
		clear(){
			this.customer=Customer.defaultObject
		},
		deleteItemDialog(customer){
			this.deleteDialog=true
			this.deleteCustomer=customer
		},
		deleteItem(){
			if(this.isSiteDelete){
				this.$store.dispatch('deleteSite',{customer_id:this.dialogCustomer.customer_id,site_id:this.deleteSiteDetails.site_id})
			}else{
				this.$store.dispatch('deleteCustomer',this.deleteCustomer.customer_id)
			}
			this.deleteCustomer={}
			this.deleteSiteDetails={}
			this.deleteDialog=false
		},
		save(){
			if(this.isEdit){
				this.$store.dispatch('updateCustomer',this.customer)
				this.isEdit=false
			} else {
				this.$store.dispatch('addNewCustomer',this.customer)
			}
			this.clear()
		},
		displayDetails(customer){
			this.detailDialog=true
			this.dialogCustomer=customer
		},
		escPressed(){
			if(this.siteDialog)
				this.siteDialog=false
			else
				this.detailDialog=false
		},
		addSite(){
			
			this.dialogCustomer.sites.push(this.site)
			console.log(JSON.stringify(this.dialogCustomer))
			var object={
				customer_id:this.dialogCustomer.customer_id,
				site:this.site
			}
			if(this.isEditSite)
				this.$store.dispatch('editSite',object)
			else
				this.$store.dispatch('addSite',object)
			this.site=Customer.Site
			this.siteDialog=false
		},
		editSite(site){
			this.site.site_id=site.site_id,
			this.site.site_name=site.site_name
			this.site.address.addressline1=site.address.addressline1
			this.site.address.addressline2=site.address.addressline2
			this.site.address.city=site.address.city
			this.site.address.state=site.address.state
			this,site.address.pincode=site.address.pincode
			this.site.address.statecode=site.address.statecode
			this.isEditSite=true
			this.siteDialog=true
		},
		deleteSite(site){
			this.deleteSiteDetails=site
			this.isSiteDelete=true
			this.deleteDialog=true
		}
	}
}
</script>
