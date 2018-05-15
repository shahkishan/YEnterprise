<template>
	<div>
		
		<v-container>
			<v-layout row wrap>
				<v-flex md8>
					<v-card>
						<v-card-title>
							Suppliers
							<v-spacer></v-spacer>
							<v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
						</v-card-title>
						<v-data-table :headers="headers" :items="loadSuppliers" hide-actions class="elevation-1">
							<template slot="items" slot-scope="props">
								<td v-on:click="displayDetails(props.item)">{{ props.item.name }}</td>
								<td v-on:click="displayDetails(props.item)">{{ props.item.email }}</td>
								<td v-on:click="displayDetails(props.item)">{{ props.item.contact }}</td>
								<td v-on:click="displayDetails(props.item)">{{ props.item.gstno }}</td>

								<td class="justify-center layout px-0">
									<v-btn icon class="mx-0" @click="editSupplier(props.item)">
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
										<v-text-field label="Name" v-model="supplier.name"></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-text-field label="Email" v-model="supplier.email"></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-text-field label="Contact Number" v-model="supplier.contact"></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-text-field label="GST NO" v-model="supplier.gstno"></v-text-field>
									</v-flex>
									<v-flex xs12>
										<v-text-field label="Address Line 1" v-model="supplier.address.addressline1"></v-text-field>
									</v-flex>
									<v-flex xs12>
										<v-text-field label="Address Line 2" v-model="supplier.address.addressline2"></v-text-field>
									</v-flex>
									<v-flex xs8>
										<v-text-field label="City" v-model="supplier.address.city"></v-text-field>
									</v-flex>
									<v-flex xs4>
										<v-text-field label="PIN Code" v-model="supplier.address.pincode"></v-text-field>
									</v-flex>
									<v-flex xs8>
										<v-text-field label="State" v-model="supplier.address.state"></v-text-field>
									</v-flex>
									<v-flex xs4>
										<v-text-field label="State Code" v-model="supplier.address.statecode"></v-text-field>
									</v-flex>
									
								</v-layout>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" flat @click.native="Clear">Clear</v-btn>
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
					<v-btn color="green darken-1" flat="flat" @click.native="deleteItem">Yes</v-btn>
					<v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false; deleteSupplier={}">No</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="detailDialog" fullscreen @keydown.esc="detailDialog=false" transition="dialog-bottom-transition" :overlay="false"
					scrollable>
						<v-card tile>
							<v-toolbar card color="primary" dark>
								
								<v-toolbar-title>Details</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-toolbar-items>
									<v-btn icon @click.native="detailDialog = false" dark>
									<v-icon>close</v-icon>
								</v-btn>
								</v-toolbar-items>
							</v-toolbar>
							<div>
								<v-subheader>
									<h3>Name:</h3>
								</v-subheader>
								<v-subheader>{{dialogSupplier.name}}</v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>Email:</h3>
								</v-subheader>
								<v-subheader>{{dialogSupplier.email}} </v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>Contact no:</h3>
								</v-subheader>
								<v-subheader>{{dialogSupplier.contact}}</v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>GST</h3>
								</v-subheader>
								<v-subheader>{{dialogSupplier.gstno}}</v-subheader>
								<v-divider></v-divider>
								<v-subheader>
									<h3>Address</h3>
								</v-subheader>
								<v-subheader>{{fullAddress}}</v-subheader>
							</div>
							<div style="flex: 1 1 auto;" />
						</v-card>
					</v-dialog>

	</div>

</template>

<script>
import Supplier from '../../models/Supplier'
export default {
  	data(){
		return{
			dialog:false,
			deleteDialog:false,
			deleteIndex:null,
			detailDialog:false,
			isEdit:false,
			supplier:Supplier.defaultObject,
			headers:Supplier.headers,
			search:'',
			dialogSupplier:Supplier.defaultObject,
			deleteSupplier:{}
	  	}
  },

	computed:{
		formTitle(){
			return this.isEdit? 'Edit Details' : 'New Supplier'
		},
		loadSuppliers(){
			return this.$store.getters.getSuppliers
		},
		fullAddress(){
			return this.dialogSupplier.address.addressline1+", "+this.dialogSupplier.address.addressline2+", "+this.dialogSupplier.address.city+", "+this.dialogSupplier.address.state+" - "+this.dialogSupplier.address.pincode
		}
	},
	created(){
		this.$store.dispatch('loadSuppliers')
	},
	beforeDestroy(){
		this.$store.dispatch('unloadSuppliers')
	},
	methods:{
		editSupplier(supplier){
			this.supplier=supplier
			this.isEdit=true
		},
		clear(){
			this.supplier=Supplier.defaultObject
		},
		deleteItemDialog(supplier){
			this.deleteDialog=true
			this.deleteSupplier=supplier
		},
		deleteItem(){
			this.$store.dispatch('deleteSupplier',this.deleteSupplier.supplier_id)
			this.deleteSupplier={}
			this.deleteDialog=false
		},
		save(){
			if(this.isEdit){
				this.$store.dispatch('updateSupplier',this.supplier)
				this.isEdit=false
			} else {
				this.$store.dispatch('addNewSupplier',this.supplier)
			}
			this.clear()
		},
		displayDetails(supplier){
			this.detailDialog=true
			this.dialogSupplier=supplier
		}
	}
}
</script>
