<template>
	<v-container mt-5>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card class="elevation-15">
					<v-toolbar dark color="primary" elevation-0>
						<v-toolbar-title>Login</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-container>
							<form @submit.prevent="onLogin">
								<v-layout row>
									<v-flex xs12>
										<v-text-field label="Enter your e-mail" v-model="email" :rules="[rules.required]"></v-text-field>

										<v-text-field name="input-10-1" label="Enter your password" hint="At least 8 characters" v-model="password" min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'"
										:append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" counter></v-text-field>
										<!-- <v-select :items="items" v-model="year" label="Select Year" single-line bottom></v-select> -->
										<v-btn large color="primary" type="submit">Login</v-btn>
									</v-flex>
								</v-layout>
							</form>
						</v-container>
					</v-card-text>
				</v-card>
			</v-flex>
      
		</v-layout>
    <v-alert xs12 sm12 offset-sm3 type="error" dismissible v-model="alert" v-if="alert">
      Invalid email or password
    </v-alert>
    
	</v-container>
</template>



<script>
import Constants from '../Utility/constants'
const BASE_URL=Constants.BASE_URL
  export default {
    data () {
      return {
        e1: true,
        password: '',
        email:'',
         rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },
        year: null,
        items:[
          {text:'2017-18'},
          {text:'2016-17'},
          {text:'2015-16'}
        ],
        alert: false
      }
    },
    methods:{
      
      onLogin(){
        // if(this.email=='admin@admin.com' && this.password=='admin123'){
        //   console.log('here')
        //   this.$store.dispatch('loginSuccess',this.year)
        //   this.$router.push('dashboard');
        // } else {
        //  // alert("here")
        //   this.alert=true;
        // }
        //   console.log(this.$store.getters.isLoggedIn);
        //   console.log(this.year);
        // // if(this.$store.getters.isLoggedIn)
        //   this.$router.push('dashboard');
        // this.$user.login();
      var app=this
      var alert=this.alert
        this.$http.post(BASE_URL+'login',{
          username: this.email,
          password: this.password,
          year:this.year
        
        }).then(function(response){

          console.log(response.statusText)
          if(response.status==200){
            app.$store.dispatch('loginSuccess',true)
            console.log(app.$store.getters.isLoggedIn)
            app.$router.push('dashboard')
            // this.$store.loginS
            
          } else{
            alert=true
          }

          console.log("response")
          console.log(response)
        }).catch(function(error){
          console.log("error")
          console.log(error)
          app.alert=true
        })
      }
    },
    created(){
     // alert('created')
        this.$store.dispatch('loginPage',true)
        console.log("login page: "+this.$store.getters.isLoginPage)
    }
  }
</script>
