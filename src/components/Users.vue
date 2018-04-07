<template>
	<div>
		<v-dialog v-model="dialog" max-width="500px" @keydown.esc="dialog=false">
			<v-btn color="primary" dark slot="activator" class="mb-2">New User</v-btn>
			<v-card>
				<v-card-title>
					<span class="headline">{{ formTitle }}</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field label="FirstName" v-model="editedItem.fname"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="LastName" v-model="editedItem.lname"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="UserName" v-model="editedItem.uname"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Usertype" v-model="editedItem.utype"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-select :items="items" v-model="year" label="Select Year" single-line bottom></v-select>
							</v-flex>
							<!-- <v-flex xs12 sm6 md4>
                              <v-text-field label="Protein (g)" v-model="editedItem.protein"></v-text-field>
                            </v-flex> -->
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
				<!-- <div > -->
				<td v-on:click="userSelected(props.item)">{{ props.item.id }}</td>
				<td v-on:click="userSelected(props.item)">{{ props.item.fname }}</td>
				<td v-on:click="userSelected(props.item)">{{ props.item.lname }}</td>
				<td v-on:click="userSelected(props.item)">{{ props.item.uname }}</td>
				<td v-on:click="userSelected(props.item)">{{ props.item.utype }}</td>
				<td v-on:click="userSelected(props.item)">{{ props.item.fyear}}</td>

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
	</div>
</template>

<script>
	export default {
		data: () => ({
			dialog: false,
			deleteDialog: false,
			deleteIndex: null,
			headers:[
				{text: 'Id', value:'id', sortable: false},
				{text:'Firstname',value:'fname', sortable: false},
				{text:'Lastname',value:'lname', sortable: false},
				{text:'Username',value:'uname', sortable: false},
				{text:'Usertype',value:'utype', sortable: false},
				{text:'Finacial Year',value:'fyear', sortable:false},
			],
			items: [],
			editedIndex: -1,
			editedItem: {
				id: 1,
				fname: '',
				lname: '',
				uname: '',
				utype: '',
				fyear: '',
			},
			defaultItem: {
				id: 1,
				fname: '',
				lname: '',
				uname: '',
				utype: '',
				fyear: '',
			},
			year: null,
			items:[
				{text:'2017-18'},
				{text:'2016-17'},
				{text:'2015-16'}
			]
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
					{value: false,id: 1, fname:'Kishan', lname:'Shah', uname:'kishanshah',utype:'Admin' ,fyear:'2016-2017'},
					{value: false,id: 2, fname:'Stuti', lname:'Dyer', uname:'stutidyer',utype:'User' ,fyear:'2014-2015'},
				]
			},
			editItem (item) {
				this.editedIndex = this.items.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},
			deleteItem (item) {
				const index = this.items.indexOf(item)
				confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
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
			userSelected(user){
				console.log(user.id+" "+user.fname+" "+user.lname+" "+user.utype+" "+user.fyear);
			}
		}
	}
</script>
