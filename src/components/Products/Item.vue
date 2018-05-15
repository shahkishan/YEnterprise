<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 md7 lg8>
					<v-card>
						<v-card-title>
						Item Categories
						<v-spacer></v-spacer>
						<v-text-field
							append-icon="search"
							label="Search"
							single-line
							hide-details
							v-model="itemSearch"
						></v-text-field>
						</v-card-title>
						<v-data-table
						:headers="itemHeader"
						:items="loadAllCategories"
						:search="categorySearch"
						>
						<template slot="items" slot-scope="props">
							<td>{{ props.item.item_master_name }}</td>
							<td>{{ props.item.hsn_code }}</td>
							<td>{{ props.item.gst_rate }}</td>
							<td>{{ props.item.description }}</td>
							
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
							Your search for "{{ categorySearch }}" found no results.
						</v-alert>
						</v-data-table>
				</v-card>
			</v-flex>
			<v-flex xs12 md5 lg4 pl-3>
				<v-card>
					<v-toolbar color="primary">
					<span class="title" style="color:#FFFFFF;padding:10px">{{ CategoryFormTitle }}</span>
					</v-toolbar>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Name" v-model="category.item_master_name"></v-text-field>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="HSN Code" v-model="category.hsn_code"></v-text-field>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="GST Rate" v-model="category.gst_rate"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Description" v-model="category.description"></v-text-field>
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
		<v-layout row wrap mt-4>
			<v-flex xs12 md7 lg8>
					<v-card>
						<v-card-title>
						Items
						<v-spacer></v-spacer>
						<v-text-field
							append-icon="search"
							label="Search"
							single-line
							hide-details
							v-model="subItemSearch"
						></v-text-field>
						</v-card-title>
						<v-data-table
						:headers="subItemHeader"
						:items="loadAllItems"
						:search="itemSearch"
						>
						<template slot="items" slot-scope="props">
							<td>{{ props.item.item_master_name }}</td>
							<td>{{ props.item.item_detail_name }}</td>
							<td>{{ props.item.hsn_code }}</td>
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
					<span class="title" style="color:#FFFFFF;padding:10px">{{ ItemFormTitle }}</span>
					</v-toolbar>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>

							<v-flex xs12>
								<v-select label="Item Category" v-model="itemCatgId" :items="loadAllCategories" item-value="item_master_id" item-text="item_master_name"></v-select>
							</v-flex>

							<v-flex xs12>
								<v-text-field label="Name" v-model="item.item_detail_name"></v-text-field>
							</v-flex>
							
							<v-flex xs12>
								<v-text-field label="Description" v-model="item.description"></v-text-field>
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
			item:Item.defaultObject,
			subItem:Item.SubItem,
			itemHeader:Item.headers.Item,
			subItemHeader:Item.headers.SubItem

		}
	},
	computed:{
		loadAllItems(){
			return this.$store.getters.getItems;
		},
		loadAllCategories(){
			return this.$store.getters.getItemCategories;
		},
		CategoryFormTitle(){
			return this.isCatgEdit? 'Edit Item Category':'Add Item Category'
		},
		ItemFormTitle(){
			return this.isItemEdit? 'Edit Item':'Add Item'
		},
		ItemCategory(){
			var itemCategories=this.loadAllCategories
			var itemCatg=itemCategories.find(itemCatg=>{
				return itemCatg.item_master_id === this.itemCatgId
			})
			return itemCatg
		}

	},
	methods:{
		clear(flag){
			if(flag){
				this.category=Object.assign(CategoryModel)
				this.isCatgEdit=false
			} else {
				this.item=Object.assign(ItemModel)
				this.isItemEdit=false
				this.itemCatgId=0
			}
		},
		save(flag){
			if(flag){
				if(this.isCatgEdit){
					this.$store.dispatch('updateItemCategory',this.category)
				} else {
					this.$store.dispatch('addNewItemCategory',this.category)
				}
			} else {
				this.item.item_master_id=this.ItemCategory.item_master_id
				this.item.item_master_name=this.ItemCategory.item_master_name
				this.item.hsn_code=this.ItemCategory.hsn_code
				if(this.isItemEdit){
					this.$store.dispatch('updateItem',this.item)
				} else {
					this.$store.dispatch('addNewItem',this.item)
				}
			}

			this.clear(false)
		},
		editItem(item,flag){
			if(flag){
				this.isCatgEdit=true
				this.category=item
			} else {
				this.clear(false)
				this.isItemEdit=true
				this.item=item
				this.itemCatgId=item.item_master_id
			}
		},
		deleteItem(item,flag){
			if(flag){
				confirm("Are you sure you want to delete?") && this.$store.dispatch('deleteItemCategory',item)
			} else {
				confirm("Are you sure you want to delete?") && this.$store.dispatch('deleteItem',item)
			}
		}
	}
}
</script>
