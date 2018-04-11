<template>
	<div>
		<v-dialog v-model="deleteDialog" max-width="290" @keydown.esc="dialog=false">
			<v-card>
				<v-card-title class="headline">Delete?</v-card-title>
				<v-card-text>Are you sure you want to delete?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" flat="flat" @click.native="deleteItem">Yes</v-btn>
					<v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false">No</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-container>
			<v-layout row wrap>
			<v-flex md8>
		<v-data-table
				:headers="headers"
				:items="loadCustomers"
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
					<v-btn icon class="mx-0" @click="deleteItemDialog(props.item)">
						<v-icon color="pink">delete</v-icon>
					</v-btn>
				</td>
			</template>
			<template slot="no-data">
			</template>
		</v-data-table>
			<v-dialog
        v-model="detailDialog"
        fullscreen
		@keydown.esc="detailDialog=false"
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
	  <v-card tile>
            <v-toolbar card dark>
              <v-btn icon @click.native="detailDialog = false" dark>
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Deatils</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click.native="detailDialog = false">Close</v-btn>
              </v-toolbar-items>
              <v-menu bottom right offset-y>
                <!-- <v-btn slot="activator" dark icon>
                </v-btn> -->
              </v-menu>
            </v-toolbar>
			<div>				
				<v-subheader><h3>Name:</h3></v-subheader>
           <v-subheader>{{dialogItem.name}}</v-subheader>
		   <v-divider></v-divider>
		   <v-subheader><h3>Email:</h3></v-subheader>
           <v-subheader>{{dialogItem.email}} </v-subheader>
           <v-divider></v-divider>
		   <v-subheader><h3>Contact no:</h3></v-subheader>
		   <v-subheader>{{dialogItem.contact}}</v-subheader>		
		   <v-divider></v-divider>
		   <v-subheader><h3>GST</h3></v-subheader>
		    <v-subheader>{{dialogItem.gst}}</v-subheader>
  </div>
            <div style="flex: 1 1 auto;"/>
          </v-card>
	  </v-dialog>
		
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
	import CustomerModel from '../models/BusinessAssociate'
	export default {
		data: () => ({
			dialog: false,
			deleteDialog:false,
			deleteIndex:null,
			detailDialog:false,
			emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
			headers:[
				{text:'Name',value:'name', sortable: false},
				{text:'Email',value:'email', sortable: false},
				{text:'Contact Number',value:'contact', sortable:false},
				{text:'GST NO',value:'gst', sortable: false}
			],
			isEdit:false,
			editedItem: CustomerModel
		}),

		computed: {
			formTitle () {
				return this.isEdit ? 'Edit Customers' : 'New Customers'
			},
			loadCustomers(){
				return this.$store.getters.getCustomers
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
				confirm('Are you sure you want to delete this item?') && this.$store.dispatch('deleteCustomer',item)
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
					this.$store.dispatch('updateCustomer',this.editedItem)
					this.isEdit=false
				} else {
					this.$store.dispatch('addNewCustomer',this.editedItem)
				}
				this.close()
			},

			infoDisplay(supplier)
			{
				
				this.detailDialog = true;
				this.dialogItem=supplier;
			  console.log(supplier.name + " " + supplier.gst + " " + supplier.email);

			},
				dialogItem:{},

			deleteItem()
			{
				this.deleteDialog=false
				this.items.splice(this.deleteIndex,1)

			}
		}
	}
</script>
