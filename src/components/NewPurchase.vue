<template>
	<v-container fluid grid-list-md mt5 ml5>
		<v-layout row wrap mt5 ml5>
			<v-flex xs11 sm2 ml5>
				<v-text-field name="invoice" label="Invoice number" id="invoice" v-model.number="invoiceNo" />
			</v-flex>
			<v-flex xs11 sm2>
				<v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width
				:nudge-right="40" min-width="290px" :return-value.sync="date">
					<v-text-field slot="activator" label="Date" v-model="date" prepend-icon="event" readonly />
					<v-date-picker v-model="date" no-title scrollable>
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
						<v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					</v-date-picker>
				</v-menu>

			</v-flex>
		</v-layout>
		<!-- <v-layout> -->
		<v-flex xs11 sm2 ml5>
			<v-select
				:items="suppliers"
				:filter="customFilter"
				v-model="supplier.name"
				item-text="name"
				label="Supplier"
				autocomplete
			></v-select>
		</v-flex>

		
		<!-- </v-layout> -->
		<v-layout row wrap>
			<v-flex xs11 sm2 ml4>
				<v-select :items="itemsList" :filter="customFilter" v-model="editedItem" item-text="name" label="Item" autocomplete></v-select>
			</v-flex>
			<v-flex xs11 sm2>
				<v-text-field label="Quantity" name="qty" id="qty" v-model.number="editedItem.qty" />
			</v-flex>
			<v-flex xs11 sm2>
				<v-text-field label="Rate" name="rate" id="rate" v-model.number="editedItem.rate" />
			</v-flex>
			<v-flex xs11 sm2>
				<v-btn medium color="primary" v-on:click="save">Add</v-btn>
			</v-flex>
		</v-layout>
		<v-dialog v-model="dialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="headline">Edit Item</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Item" v-model="editedItem.name"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Rate" v-model="editedItem.rate"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								<v-text-field label="Quantity" v-model="editedItem.qty"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
							</v-flex>
							<v-spacer></v-spacer>
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
		<v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
			<template slot="items" slot-scope="props">
				<td>{{ props.item.name }}</td>
				<td class="text-xs-left">{{ props.item.qty }}</td>
				<td class="text-xs-left">{{ props.item.rate }}</td>
				<td class="text-xs-left">{{ props.item.hsn }}</td>
				<td class="text-xs-left">{{ props.item.total }}</td>
				<td class="justify-center layout px-0">
					<v-btn icon class="mx-0" @click="editItem(props.item)">
						<v-icon color="teal">edit</v-icon>
					</v-btn>
					<v-btn icon class="mx-0" @click="deleteItem(props.item)">
						<v-icon color="pink">delete</v-icon>
					</v-btn>
				</td>
			</template>

		</v-data-table>
		
		<v-layout align-content-end="true"  >
			<v-flex xs12 sm6 md3 lg2 offset-lg10>
			<v-card md6>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>Total: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ billTotal.totalAmt }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>CGST: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ billTotal.cGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>IGST: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ billTotal.iGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>SGST: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ billTotal.sGST }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>Transport: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ billTotal.transport }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>Discount: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ billTotal.discount }}</v-card-text></v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs6 md6><v-card-text>Net Total: </v-card-text></v-flex> <v-flex xs6 md6><v-card-text>₹{{ billTotal.net }}</v-card-text></v-flex>
				</v-layout>


			</v-card>
			</v-flex>
		</v-layout>

		<v-flex xs11 sm2 offset-lg10>
				<v-btn medium color="primary" v-on:click="saveTransaction">Save</v-btn>
		</v-flex>

	</v-container>
</template>
<!--To be edited-->
<script>
	export default {
		data: () => ({
			date: null,
			menu: false,
			modal: false,
			dialog: false,
			invoiceNo:0,
			headers: [{
					text: 'Item',
					sortable: false,
					value: 'name'
				},
				{
					text: 'Quantity',
					value: 'qty',
					sortable: false
				},
				{
					text: 'Rate',
					value: 'rate',
					sortable: false
				},
				{
					text: 'HSN Code',
					value: 'hsn',
					sortable: false
				},
				{
					text: 'Total',
					value: 'total',
					sortable: false
				},
				// { text: 'Actions', value: 'name', sortable: false }
			],
			itemsList:[
				{
					id:1,
					name: 'item 1'
				},
				{
					id:2,
					name:'item 2'
				}, 
				{
					id: 3,
					name:'item 3'
				}
			],
			items: [],
			editedIndex: -1,
			editedItem: {
				itemId:0,
				name: '',
				qty: 0,
				rate: 0,
				hsn:500
			},
			defaultItem: {
				itemId:0,
				name: '',
				rate: 0,
				qty: 0,
				hsn: 500
			},
			billTotal:{
				totalAmt:0,
				cGST:0,
				iGST:0,
				sGST:0,
				transport:0,
				discount:0,
				net:0,
			},
			supplier:{
				id:1,
				name:''
			},
			suppliers:[
				{
					id:1, name:'Supplier 1'
				}, 
				{
					id:2, name: 'Supplier 2'
				},
				{
					id:3, name: 'Supplier 3'
				}
				// 'Supplier 1','Supplier 2','Supplier 3'
			],
			customFilter (item, queryText, itemText) {
				const hasValue = val => val != null ? val : ''
				const text = hasValue(item.name)
				const query = hasValue(queryText)
				return text.toString()
				.toLowerCase()
				.indexOf(query.toString().toLowerCase()) > -1  
	        }
		}),



		watch: {
			dialog(val) {
				val || this.close()
			}
		},

		created() {
			this.initialize()
		},

		methods: {
			initialize() {
				this.items = []
			},

			editItem(item) {
				this.editedIndex = this.items.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			deleteItem(item) {
				const index = this.items.indexOf(item)
				confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
			},

			close() {
				this.dialog = false
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			save() {
				this.editedItem.total=this.total
				if (this.editedIndex > -1) {
					Object.assign(this.items[this.editedIndex], this.editedItem)
				} else {
					console.log(this.editItem.total+" "+this.total)
					this.items.push(this.editedItem)
					console.log(JSON.stringify(this.editedItem))
				}
				this.close()
      },
      addItem(){
        //this.editedItem.total=this.editedItem.rate*this.editedItem.qty
        this.editedItem.total=this.total
        this.items.push(this.editedItem)
	  },
	  saveTransaction(){
		  console.log(this.editedItem.name)
		  console.log("{\"date\":\""+this.date+"\",\"invoice_no\"\":"+this.invoiceNo+"\",\"supplier_id\":"+123+",\"items\":"+JSON.stringify(this.items)+",\"isGst\":"+true+"}")
		//   console.log(json)
	  }
    },
    computed:{
      total(){
        return this.editedItem.rate*this.editedItem.qty
      }
    }
	}


</script>
