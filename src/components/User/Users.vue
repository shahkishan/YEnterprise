<template>
	<v-container>
		<v-container>
			<v-layout row wrap>
			<v-flex sm12 md8>
				<v-card>
					<v-card-title>
					Users
					<v-spacer></v-spacer>
					<v-text-field
						append-icon="search"
						label="Search"
						single-line
						hide-details
						v-model="userSearch"
					></v-text-field>
					</v-card-title>
					
					<v-data-table :headers="headers" :items="users" hide-actions class="elevation-1" :search="userSearch">
						<template slot="items" slot-scope="props">
							<!-- <div > -->
							<td v-on:click="userSelected(props.item)">{{ props.item.firstName }}</td>
							<td v-on:click="userSelected(props.item)">{{ props.item.lastName }}</td>
							<td v-on:click="userSelected(props.item)">{{ props.item.contact }}</td>
							<td v-on:click="userSelected(props.item)">{{ props.item.email }}</td>
							<td v-on:click="userSelected(props.item)">{{ props.item.role }}</td>

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
				</v-card>
			</v-flex>

			<v-flex sm12 md3 ml-4>
				<v-card>
					<v-toolbar color="primary">
						<span class="title" style="color:#FFFFFF;padding:10px">{{ formTitle }}</span>
					</v-toolbar>
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12 sm6 md6>
									<v-text-field label="First Name" v-model="user.firstName"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md6>
									<v-text-field label="Last Name" v-model="user.lastName"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md6>
									<v-text-field label="Contact" v-model="user.contact"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md6>
									<v-text-field label="Email" v-model="user.email"></v-text-field>
								</v-flex>
								<!-- <v-flex xs6></v-flex> -->
								<v-flex xs12 sm6 md6 v-if="!isEdit">
									<v-text-field label="Password" hint="At least 8 characters" v-model="password" min="8" :append-icon="p1 ? 'visibility' : 'visibility_off'"
									:append-icon-cb="() => (p1 = !p1)" :type="p1 ? 'password' : 'text'"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md6 v-if="!isEdit">
									<v-text-field label="Confirm Password" hint="At least 8 characters" v-model="cnfPassword" min="8" :append-icon="p2 ? 'visibility' : 'visibility_off'"
									:append-icon-cb="() => (p2 = !p2)" :type="p2 ? 'password' : 'text'"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
									<v-switch :label="userType" v-model="type"></v-switch>
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
	</v-container>
</template>


<script>
import User from '../../models/User'
  export default {
    data: () => ({
      dialog: false,
      idCnt:4,
      headers:User.headers,
      items: [],
      editedIndex: -1,
      user: User.defaultModel, 
			type:false,
			password:'',
			cnfPassword:'',
      isEdit:false,
      p1:true,
			p2:true,
			userSearch:''
    }),

    computed: {
      formTitle () {
        return !this.isEdit ? 'New User' : 'Edit User'
      },
      userType(){
          if(this.type)
            return 'Admin'
          else 
            return 'Staff'  
      },
      users(){
        return this.$store.getters.users  
      }

    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
	  	this.$store.dispatch('loadUsers')
			// this.clear()
			setTimeout(()=>{
				this.password=''
				this.user.email=''
			},400)
			
    },

    methods: {
      editItem (item) {
        this.isEdit=true
		this.user=item
		if(this.user.role==="Admin")
			this.type=true
		else 
			this.type=false	
      },

      deleteItem (item) {
        var flag=confirm('Are you sure you want to delete this item?')
        if(flag){
          this.$store.dispatch('deleteUser',item.uid)
        }
      },

      clear () {
				this.user=User
				this.password='',
				this.cnfPassword=''
				this.type=false
				this.isEdit=false
      },

      save () {
        this.editItem.id=this.idCnt
        // this.close()
        if (this.isEdit) {
          this.user.role=this.userType
          console.log(JSON.stringify(this.user))
          this.$store.dispatch('updateUser',this.user)
          this.isEdit=false
          this.close()
        } else {
			this.user.role=this.userType
			console.log(this.password+", "+this.cnfPassword)
		  if(this.password===this.cnfPassword)
			  this.$store.dispatch('createUser',Object.assign(this.user,{password:this.password}))
			else 
				alert("Passwords do not match")	  
          // this.items.push(this.user)
        }
        // this.close()
        this.idCnt++
      },

      userSelected(user){
          console.log(user.uid+" "+user.firstName+" "+user.email+" "+user.contact);
      }
    }
  }
</script>
