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
								<v-text-field label="Id" v-model="editedItem.id"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Name" v-model="editedItem.name"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="State Code" v-model="editedItem.statecode"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="GST NO" v-model="editedItem.gst"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Contactno" v-model="editedItem.contactno"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Email-id" v-model="editedItem.email" :rules="emailRules"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="IsCustomer" v-model="editedItem.logo"></v-text-field>
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
				<td v-on:click="infoDisplay(props.item)">{{ props.item.statecode }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.gst }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.contactno }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.email }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.logo}}</td>

				<!-- <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="txt-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td> -->
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
				<v-btn color="primary" @click="initialize">Reset</v-btn>
			</template>
		</v-data-table>
	</div>
</template>



<script>
	export default {
		name:'company',
		data: () => ({
			dialog: false,
			deleteDialog:false,
			deleteIndex:null,
			emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
			headers:[
				{text: 'Id', value:'id', sortable: false},
				{text:'Name',value:'name', sortable: false},
				{text:'State Code',value:'statecode', sortable: false},
				{text:'GST NO',value:'gst', sortable: false},
				{text:'Contact no',value:'contatctno', sortable:false},
				{text:'Email-id',value:'email', sortable:false},
				{text:'Logo',value:'logo', sortable:false},


			],
			items: [],
			editedIndex: -1,
			editedItem: {
				id: 1,
				name: '',
				statecode:'',
				gst:'',
				contactno:'',
				email:'',
				logo:''

			},
			defaultItem: {
				id: 1,
				name: '',
				statecode:'',
				gst:'',
				contactno:'',
				email:'',
				logo:''
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
					{value: false,id: 1, name:'Stuti',statecode:'27',gst:'10212012012',contactno:'09825732944',email:'stutidyer22@gmail.com',logo:''},
					{value: false,id: 1, name:'Stuti',statecode:'27',gst:'10212012012',contactno:'09825732944',email:'stutidyer22@gmail.com',logo:''},
				]
			},

			editItem (item) {
				this.editedIndex = this.items.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			deleteItemDialog (item) {
				this.deleteIndex = this.items.indexOf(item)
				this.deleteDialog=true
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
				console.log(supplier.id + " " + supplier.name + " " + supplier.add1 + " " + supplier.add2 + " " + supplier.gst + " " + supplier.pin + " ");

			},
			deleteItem()
			{
				this.deleteDialog=false
				this.items.splice(this.deleteIndex,1)

			}
		}
	}
</script>
