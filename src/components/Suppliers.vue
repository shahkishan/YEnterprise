<template>
	<div>
		<v-container>
			<v-layout row wrap>
			<v-flex md8>
		<v-data-table
				:headers="headers"
				:items="loadSuppliers"
				hide-actions
				class="elevation-1"
		>
			<template slot="items" slot-scope="props">
				<td v-on:click="infoDisplay(props.item)">{{ props.item.name }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.email }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.contactno }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.GSTNo }}</td>

				<td class="justify-center layout px-0">
					<v-btn icon class="mx-0" @click="editItem(props.item)">
						<v-icon color="teal">edit</v-icon>
					</v-btn>
					<v-btn icon class="mx-0" @click="deleteItem(props.item)">
						<v-icon color="pink">delete</v-icon>
					</v-btn>
				</td>
			</template>
			<template slot="no-data">
			</template>
		</v-data-table>
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
								<v-text-field label="Name" v-model="editedItem.name"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md6>
								<v-text-field label="Email" v-model="editedItem.email"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md6>
								<v-text-field label="Contact Number" v-model="editedItem.contactno"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md6>
								<v-text-field label="GST NO" v-model="editedItem.GSTNo"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Address Line 1" v-model="editedItem.add1"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Address Line 2" v-model="editedItem.add2"></v-text-field>
							</v-flex>
							<v-flex xs8>
								<v-text-field label="State" v-model="editedItem.state"></v-text-field>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="State Code" v-model="editedItem.statecode"></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
					<v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
				</v-card-actions>
			</v-card>
			</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import SupplierModel from '../models/BusinessAssociate'
	export default {
		data: () => ({
			dialog: false,
			headers:[
				{text:'Name',value:'name', sortable: false},
				{text:'Email',value:'email', sortable: false},
				{text:'Contact Number',value:'contact', sortable:false},
				{text:'GST NO',value:'gst', sortable: false}
			],
			isEdit:false,
			editedItem: SupplierModel
		}),

		computed: {
			formTitle () {
				return this.isEdit ? 'Edit Supplier' : 'New Supplier'
			},
			loadSuppliers(){
				return this.$store.getters.getSuppliers
			}
		},

		watch: {
			dialog (val) {
				val || this.close()
			}
		},

		methods: {
			editItem (item) {
				this.isEdit=true
				this.editedItem = Object.assign({}, item)
				// this.dialog = true
			},

			deleteItem (item) {
				confirm('Are you sure you want to delete this item?') && this.$store.dispatch('deleteSupplier',item)
			},

			close () {
				this.dialog = false
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			save () {
				var temp = this
				if (this.isEdit) {
					this.$store.dispatch('updateSupplier',this.editedItem)
					this.isEdit=false
				} else {
					this.$store.dispatch('addNewSupplier',this.editedItem)
				}
				this.close()
			},

			infoDisplay(supplier)
			{
			  console.log(supplier.name + " " + supplier.GSTNo + " " + supplier.email);

			}
		}
	}
</script>
