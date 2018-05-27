<template>
	<div>
		
		<v-container>
			<v-layout row wrap>
			<v-flex md8>
			<v-card>
				<v-card-title style="background-color:#1976d2; color:#fff" class="title">
						Companies
						<v-spacer></v-spacer>
						<v-text-field
							append-icon="search"
							label="Search"
							single-line
							hide-details
							v-model="companySearch"
							solo
						></v-text-field>
						</v-card-title>
			<v-data-table
				:headers="headers"
				:items="loadCompanies"
				hide-actions
				class="elevation-1"
			>
			<template slot="items" slot-scope="props">
				<td v-on:click="infoDisplay(props.item)">{{ props.item.name }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.email }}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.contact}}</td>
				<td v-on:click="infoDisplay(props.item)">{{ props.item.gstno }}</td>
				

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
		</v-card>
	
		<v-spacer></v-spacer>
			</v-flex>
			<v-flex md4>
				<v-card style="margin-left:5%">
					<v-card-title style="background-color:#1976d2; color:#fff" class="title">
					<span class="title" style="color:#FFFFFF;padding:10px">{{ formTitle }}</span>
					</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 md6>
								<v-text-field label="Name" v-model="company.name"></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md6>
								<v-text-field label="Email" v-model="company.email"></v-text-field>
							</v-flex>
							<v-flex xs12 md6>
								<v-text-field label="Contact Number" v-model="company.contact"></v-text-field>
							</v-flex>
														<v-flex xs12 sm6 md6>
								<v-text-field label="GST NO" v-model="company.gstno"></v-text-field>
							</v-flex>
							<v-flex xs12>
										<v-text-field label="Address Line 1" v-model="company.address.addressline1"></v-text-field>
									</v-flex>
									<v-flex xs12>
										<v-text-field label="Address Line 2" v-model="company.address.addressline2"></v-text-field>
									</v-flex>
									<v-flex xs8>
										<v-text-field label="City" v-model="company.address.city"></v-text-field>
									</v-flex>
									<v-flex xs4>
										<v-text-field label="PIN Code" v-model="company.address.pincode"></v-text-field>
									</v-flex>
									<v-flex xs8>
										<v-text-field label="State" v-model="company.address.state"></v-text-field>
									</v-flex>
									<v-flex xs4>
										<v-text-field label="State Code" v-model="company.address.statecode"></v-text-field>
									</v-flex>
							
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="clear">Clear</v-btn>
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
					<v-btn color="pink darken-1" flat="flat" @click.native="deleteItem">Yes</v-btn>
					<v-btn color="pink darken-1" flat="flat" @click.native="deleteDialog = false">No</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
				<v-dialog
        v-model="detailDialog"
		@keydown.esc="detailDialog=false"
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
	  <v-card tile style="height:100%;">
            <v-toolbar card dark color="primary">
              
              <v-toolbar-title>Details: {{dialogItem.name}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn icon @click.native="detailDialog = false" dark>
                <v-icon>close</v-icon>
              </v-btn>
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
		   <v-subheader>{{dialogItem.email}}</v-subheader>			
		   <v-divider></v-divider>
		   <v-subheader><h3>Contact:</h3></v-subheader>
		   <v-subheader>{{dialogItem.contact}}</v-subheader>		
			<v-divider></v-divider>
			<v-subheader><h3>GST No:</h3></v-subheader>
           <v-subheader>{{dialogItem.gstno}}</v-subheader>
		   <v-divider/>
		   <v-subheader><h3>Address:</h3></v-subheader>
           <v-subheader>{{fullAddress}}</v-subheader>
		  
  </div>
            <div style="flex: 1 1 auto;"/>
          </v-card>
	  </v-dialog>
		
	</div>
	
</template>

<script>
	import Company from '../../models/Company'
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
			dialogItem:Object.assign({},Company.defaultObject),
			isEdit:false,
			company: Object.assign({},Company.defaultObject),
			headers: Company.headers,
			companySearch:'',
			companyToBeDeleted:Object.assign({},Company.defaultObject)
		}),
		// created(){
		// 	this.$store.dispatch('loadCompanies')
		// },
		computed: {
			formTitle () {
				return this.isEdit ? 'Edit Company' : 'New Company'
			},
			loadCompanies(){
				return this.$store.getters.getCompanies
			},
			fullAddress(){
				return this.dialogItem.address.addressline1+", "+this.dialogItem.address.addressline2+", "+this.dialogItem.address.city+", "+this.dialogItem.address.state+" - "+this.dialogItem.address.pincode
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
				this.company = Object.assign({}, item)
				// this.dialog = true
			},

			deleteItem () {
				this.$store.dispatch('deleteCompany',this.companyToBeDeleted.company_id)
				this.deleteDialog=false
				this.companyToBeDeleted=Object.assign({},Company.defaultObject)
			},

			clear () {
				this.company=Object.assign({},Company.defaultObject)
				this.isEdit=false
			},

			save () {
				var temp = this
				if (this.isEdit) {
					var payload={
						company_id:this.company.company_id,
						details:{
							name:this.company.name,email:this.company.email,contact:this.company.contact,gstno:this.company.gstno,address:this.company.address
						}
					}
					console.log(JSON.stringify(this.company))
					this.$store.dispatch('updateCompany',payload)
				} else {
					this.$store.dispatch('addNewCompany',{name:this.company.name,email:this.company.email,contact:this.company.contact,gstno:this.company.gstno,address:this.company.address})
				}
				this.clear()
			},

			infoDisplay(supplier)
			{
				
				this.detailDialog = true;
				this.dialogItem=supplier;
			  console.log(JSON.stringify(supplier));

			},
			

			deleteItemDialog(company)
			{
				this.companyToBeDeleted=Object.assign({},company)
				this.deleteDialog=true
			}
		}
	}
</script>
