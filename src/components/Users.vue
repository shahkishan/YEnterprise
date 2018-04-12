<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px" @keydown.esc="dialog=false" >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="First Name" v-model="editedItem.fName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Last Name" v-model="editedItem.lName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Username" v-model="editedItem.username"></v-text-field>
              </v-flex>
              <v-flex xs6></v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Password" v-model="editedItem.password"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Confirm Password" v-model="cnfPassword"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-switch
      	        	:label="userType"
              		v-model="type"
              	></v-switch>
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
    <v-container>
            <v-btn color="primary" dark slot="activator" @click.native="dialog=true" class="mb-2">New User</v-btn>
    <v-data-table
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <!-- <div > -->
        <td v-on:click="userSelected(props.item)">{{ props.item.fName }}</td>
        <td v-on:click="userSelected(props.item)">{{ props.item.lName }}</td>
        <td v-on:click="userSelected(props.item)">{{ props.item.username }}</td>
        <td v-on:click="userSelected(props.item)">{{ props.item.user_type }}</td>
      
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
    </v-container>
  </div>
</template>


<script>
import User from '../models/User'
  export default {
    data: () => ({
      dialog: false,
      idCnt:4,
              headers:[
            {text:'First Name',value:'fName', sortable: false},
            {text:'Last Name',value:'lName', sortable: false},
            {text: 'Username', value:'username', sortable: false},
            {text:'Type',value:'dob', sortable: false},
        ],
      items: [],
      editedIndex: -1,
      editedItem: User, 
      type:false,
      cnfPassword:'',
      isEdit:false
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
      userType(){
          if(this.type)
            return 'Admin'
          else 
            return 'Staff'  
      },
      users(){
        console.log('here')
        return this.$store.getters.users  
      }

    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {

      this.$store.dispatch('loginPage',false)
  
      console.log("login page: "+this.$store.getters.isLoginPage)
    },

    methods: {
      editItem (item) {
        this.isEdit=true
        this.editedItem=item
        this.dialog = true
      },

      deleteItem (item) {
        var flag=confirm('Are you sure you want to delete this item?')
        if(flag){
          this.$store.dispatch('deleteUser',item)
        }
        // this.idCnt--;
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, User)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.editItem.id=this.idCnt
        this.close()
        if (this.isEdit) {
          this.$store.dispatch('editUser',this.editedItem)
          this.isEdit=false
          this.close()
        } else {
          this.editedItem.user_type=this.userType
          this.$store.dispatch('addUser',this.editedItem)
          // this.items.push(this.editedItem)
        }
        this.close()
        this.idCnt++
      },

      userSelected(user){
          console.log(user.id+" "+user.name+" "+user.email+" "+user.contact);
      }
    }
  }
</script>
