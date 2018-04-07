<template>
	<div>
		<v-dialog v-model="dialog" max-width="500px" @keydown.esc="dialog=false">
			<v-btn color="primary" dark slot="activator" class="mb-2">New Supplier</v-btn>
			<v-card>
				<v-card-title>
					<span class="headline">{{ formTitle }}</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Name" v-model="editedItem.name"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Email" v-model="editedItem.email" :rules="emailRules"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Contact Number" v-model="editedItem.contact"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="GST NO" v-model="editedItem.gst"></v-text-field>
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
		</v-dialog>
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
		<v-data-table
				:headers="headers"
				:items="items"
				hide-actions
				class="elevation-1"
		>
			<template slot="items" slot-scope="props">
				<td v-on:click="infoDisplay(props.item)">{{ props.item.id }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.name }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.email }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.contact }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.gst }}</td>

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
				<v-btn color="primary" @click="initialize">Reset</v-btn>
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
		
	</div>
	
</template>

<script>
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
				{text: 'Id', value:'id', sortable: false},
				{text:'Name',value:'name', sortable: false},
				{text:'Email',value:'email', sortable: false},
				{text:'Contact Number',value:'contact', sortable:false},
				{text:'GST NO',value:'gst', sortable: false}
			],
			items: [],
			editedIndex: -1,
			editedItem: {
				id: 1,
				name: '',
				email: '',
				contact: '',
				gst:''

			},
			defaultItem: {
				id: 1,
				name: '',
				email: '',
				contact: '',
				gst:''

			}
		}),

		computed: {
			formTitle () {
				return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
			}
		},

		watch: {
			dialog (val) {
				val || this.close()
			}
		},

		created () {
			this.initialize()
		},

		methods: {
			initialize () {
				this.items = [
					{value: false,id: 1, name:'Kishan Shah', email:'kshah1125@gmail.com', contact:'8511528252', gst:10212012012},
					{value: false,id: 1, name:'Stuti Dyer', email:'stutidyer22@gmail.com',contact: '8200694242', gst:103103103103},
					
				]
			},

			editItem (item) {
				this.editedIndex = this.items.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

		
		

			close () {
				this.dialog = false
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			save () {
				if (this.editedIndex > -1) {
					Object.assign(this.items[this.editedIndex], this.editedItem)
				} else {
					this.items.push(this.editedItem)
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
