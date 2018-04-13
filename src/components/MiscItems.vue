<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 md7 lg8>
					<v-card>
						<v-card-title>
						Miscellaneous Item Categories
						<v-spacer></v-spacer>
						<v-text-field
							append-icon="search"
							label="Search"
							single-line
							hide-details
							v-model="categorySearch"
						></v-text-field>
						</v-card-title>
						<v-data-table
						
						>
						<template slot="items" slot-scope="props">
							
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
					<span class="title" style="color:#FFFFFF;padding:10px">{{ MiscellaneousItemFormTitle }}</span>
					</v-toolbar>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Name" ></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Description" ></v-text-field>
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
		
	</v-container>
</template>

<script>
import Headers from '../models/headers';
import CategoryModel from '../models/ItemCategory'
import ItemModel from '../models/Item'
export default {
	
	data(){
		return{
			category:Object.assign({},CategoryModel),
			item:Object.assign({},ItemModel),
			itemCatg:Object.assign({},CategoryModel),
			Headers,
			itemSearch:'',
			categorySearch:'',
			isCatgEdit:false,
			isItemEdit:false

		}
	},
	computed:{
		loadAllItems(){
			return this.$store.getters.getItems;
		},
		loadAllCategories(){
			return this.$store.getters.getItemCategories;
		},
		MiscellaneousItemFormTitle(){
			return this.isCatgEdit? 'Edit Miscellaneous Item':'Add Miscellaneous Item'
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
				this.itemCatg=''
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
				this.item.item_master_id=this.itemCatg.item_master_id
				this.item.item_master_name=this.itemCatg.item_master_name
				this.item.HSNCode=this.itemCatg.HSNCode
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
				this.itemCatg=''
				this.itemCatg=Object.assign({}, CategoryModel)
				this.itemCatg.item_master_id=item.item_master_id
				console.log(JSON.stringify(this.itemCatg))
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

