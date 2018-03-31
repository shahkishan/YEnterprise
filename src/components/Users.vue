<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New User</v-btn>
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
                <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Contact Number" v-model="editedItem.contact"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
      <v-menu
        ref="menu"
        lazy
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Date of Birth"
          v-model="editedItem.dob"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="editedItem.dob" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
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
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <!-- <div > -->
        <td v-on:click="userSelected(props.item)">{{ props.item.id }}</td>
        <td v-on:click="userSelected(props.item)">{{ props.item.name }}</td>
        <td v-on:click="userSelected(props.item)">{{ props.item.email }}</td>
        <td v-on:click="userSelected(props.item)">{{ props.item.contact }}</td>
        <td v-on:click="userSelected(props.item)">{{ props.item.dob }}</td>
        <td v-on:click="userSelected(props.item)">{{ props.item.date_created }}</td>
        <!-- </div> -->
        <!-- <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
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







<!--
<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.contact }}</td>
      <td>{{ props.item.dob }}</td>
      <td>{{ props.item.date_created }}</td>
    </template>
  </v-data-table>
</template>
-->


<script>
  export default {
    data: () => ({
      dialog: false,
      idCnt:4,
              headers:[
            {text: 'Id', value:'id', sortable: false},
            {text:'Name',value:'name', sortable: false},
            {text:'Email',value:'email', sortable: false},
            {text:'Contact Number',value:'contact', sortable:false},
            {text:'Date Of Birth',value:'dob', sortable: false},
            {text:'Date Created',value:'date_created',align:'left', sortable:false}

        ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: 4,
        name: '',
        email: '',
        contact: '',
        dob:'',
        date_created: '2017-01-01'
      },
      defaultItem: {
        id: 4,
        name: '',
        email: '',
        contact: '',
        dob:'',
        date_created: '2017-01-01'
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
        
          this.$store.dispatch('loginPage',false)
      
          console.log("login page: "+this.$store.getters.isLoginPage)
    },

    methods: {
      initialize () {
        this.items = [
           {value: false,id: 1, name:'Kishan', email:'kshah1125@gmail.com', contact:'8511528252', dob:'1997-20-01',date_created:'2017-01-01'},
            {value: false,id: 2, name:'Shah', email:'ks25@gmail.com',contact: '8200694242', dob:'1997-02-02',date_created:'2017-02-05'},
            {value: false,id: 3, name:'abc', email:'ksha35@gmail.com',contact:'1234567890', dob:'1995-03-05',date_created:'2018-01-02'}
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
        this.idCnt--;
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.editItem.id=this.idCnt
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
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