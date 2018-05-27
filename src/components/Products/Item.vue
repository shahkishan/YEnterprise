<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 md7 lg8>
					<v-card>
						<v-card-title style="background-color:#1976d2; color:#fff" class="title">
						Item Categories
						<v-spacer></v-spacer>
						<v-text-field
							append-icon="search"
							label="Search"
							single-line
							hide-details
							v-model="itemSearch"
							solo
						></v-text-field>
						</v-card-title>
						<v-data-table
						:headers="itemHeader"
						:items="loadItems"
						:search="itemSearch"
						>
						<template slot="items" slot-scope="props">
							<td v-on:click="itemSelected(props.item)">{{ props.item.item_name }}</td>
							<td v-on:click="itemSelected(props.item)">{{ props.item.hsncode }}</td>
							<td v-on:click="itemSelected(props.item)">{{ props.item.gstrate }}</td>
							<td v-on:click="itemSelected(props.item)">{{ props.item.description }}</td>
							
							<td class="justify-center layout px-0">
								<v-btn icon class="mx-0" @click="editItem(props.item,true)">
									<v-icon color="teal">edit</v-icon>
								</v-btn>
								<v-btn icon class="mx-0" @click="deleteItem(props.item,true)">
									<v-icon color="pink">delete</v-icon>
								</v-btn>
							</td>
						</template>
						<v-alert slot="no-results" :value="true" color="error" icon="warning">
							Your search for "{{ itemSearch }}" found no results.
						</v-alert>
						</v-data-table>
				</v-card>
			</v-flex>
			<v-flex xs12 md5 lg4 pl-3>
				<v-card>
					<v-toolbar color="primary">
					<span class="title" style="color:#FFFFFF;padding:10px">{{ ItemFormTitle }}</span>
					</v-toolbar>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Name" v-model="item.item_name"></v-text-field>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="HSN Code" v-model="item.hsncode"></v-text-field>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="GST Rate" v-model="item.gstrate"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Description" v-model="item.description"></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="clear(true)">Clear</v-btn>
					<v-btn color="blue darken-1" flat @click.native="save(true)">Save</v-btn>
				</v-card-actions>
			</v-card>
			</v-flex>
		</v-layout>
		<v-layout row wrap mt-4 v-if="selectedItem!=null">
			<v-flex xs12 md7 lg8>
					<v-card>
						<v-card-title style="background-color:#1976d2; color:#fff" class="title">
						{{selectedItem.item_name}} <br/> HSN Code: {{selectedItem.hsncode}}
						<v-spacer></v-spacer>
						<v-text-field
							append-icon="search"
							label="Search"
							single-line
							hide-details
							v-model="subItemSearch"
							solo
						></v-text-field>
						</v-card-title>
						<v-data-table
						:headers="subItemHeader"
						:items="selectedItem.subitems"
						:search="itemSearch"
						>
						<template slot="items" slot-scope="props">
							<td>{{ props.item.subitem_name }}</td>
							<td>{{ props.item.description }}</td>

							<td class="justify-center layout px-0">
								<v-btn icon class="mx-0" @click="editItem(props.item,false)">
									<v-icon color="teal">edit</v-icon>
								</v-btn>
								<v-btn icon class="mx-0" @click="deleteItem(props.item,false)">
									<v-icon color="pink">delete</v-icon>
								</v-btn>
							</td>
						</template>
						<v-alert slot="no-results" :value="true" color="error" icon="warning">
							Your search for "{{ itemSearch }}" found no results.
						</v-alert>
						</v-data-table>
				</v-card>
			</v-flex>
			<v-flex xs12 md5 lg4 pl-3>
				<v-card>
					<v-toolbar color="primary">
					<span class="title" style="color:#FFFFFF;padding:10px">{{ SubItemFormTitle }}</span>
					</v-toolbar>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Name" v-model="subItem.subitem_name"></v-text-field>
							</v-flex>
							
							<v-flex xs12>
								<v-text-field label="Description" v-model="subItem.description"></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="clear(false)">Clear</v-btn>
					<v-btn color="blue darken-1" flat @click.native="save(false)">Save</v-btn>
				</v-card-actions>
			</v-card>
			</v-flex>
		</v-layout>	
	</v-container>
</template>

<script>
import Item from '../../models/Item'
export default {
	
	data(){
		return{
			itemCatgId:0,
			Headers,
			itemSearch:'',
			subItemSearch:'',
			isItemEdit:false,
			isSubItemEdit:false,
			item:{},
			subItem:{},
			itemHeader:Item.headers.Item,
			subItemHeader:Item.headers.SubItem,
			selectedItem:null
		}
	},
	computed:{
		loadItems(){
			console.log(4)
			if(this.selectedItem){
				this.selectedItem=this.$store.getters.getItems.find(item=>{
					return this.selectedItem.item_id===item.item_id
				})
			}
			return this.$store.getters.getItems;
		},
		loadAllCategories(){
			return this.$store.getters.getItemCategories;
		},
		ItemFormTitle(){
			return this.isItemEdit? 'Edit Item':'Add Item'
		},
		SubItemFormTitle(){
			return this.isSubItemEdit? 'Edit Sub Item':'Add Sub Item '
		},
		loadSubItems(){
			console.log(6)
			return this.selectedItem.subitems
		}
		// ItemCategory(){
		// 	var itemCategories=this.loadAllCategories
		// 	var itemCatg=itemCategories.find(itemCatg=>{
		// 		return itemCatg.item_master_id === this.itemCatgId
		// 	})
		// 	return itemCatg
		// }

	},
	methods:{
		clear(flag){
			if(flag){
				this.item=Object.assign({},Item.defaultObject)
				this.isItemEdit=false
				console.log(JSON.stringify(this.item))
			} else {
				console.log(JSON.stringify(Item.SubItem))
				this.subItem=Item.SubItem
				this.isSubItemEdit=false
			}
		},
		save(flag){
			if(flag){
				if(this.isItemEdit){
					this.$store.dispatch('updateItem',this.item)
				} else {
					this.$store.dispatch('addNewItem',this.item)
				}
				
				this.clear(true)
			} else {
				
				if(this.isSubItemEdit){
					var payload={
						item_id:this.selectedItem.item_id,
						subitem:this.subItem
					}
					this.$store.dispatch('updateSubItem',payload)
				} else{
					var payload ={
						item_id:this.selectedItem.item_id,
						subitem:{subitem_name:this.subItem.subitem_name,description:this.subItem.description}
					}
					console.log(JSON.stringify(payload))
					this.$store.dispatch('addNewSubItem',payload)
					this.clear(false)
				}
			}

			this.clear(false)
		},
		editItem(item,flag){
			if(flag){
				this.isItemEdit=true
				// this.item.item_id=item.item_id
				// this.item.item_name=item.item_name
				// this.item.description=item.description
				// this.item.gstrate=item.gstrate
				// this.item.hsncode=item.hsncode
				this.item=Object.assign({},item)
			} else {
				this.clear(false)
				this.isSubItemEdit=true
				this.subItem=Object.assign({},item)
			}
		},
		deleteItem(item,flag){
			if(flag){
				confirm("Are you sure you want to delete?") && this.$store.dispatch('deleteItem',item.item_id)
			} else {
				var payload={item_id:this.selectedItem.item_id,subitem_id:item.subitem_id}
				console.log(payload)
				confirm("Are you sure you want to delete?") && this.$store.dispatch('deleteSubItem',payload)
			}
		},
		itemSelected(item){
			this.selectedItem=item
			console.log(JSON.stringify(this.selectedItem))
		}
	}
	// created(){
	// 	this.$store.dispatch('loadItems')
	// }
}
</script>
