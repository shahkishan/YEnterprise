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
										<v-text-field
												label="Username"
												v-model="name"
												:rules="nameRules"
												:counter="10"
												required
										></v-text-field>
										<v-text-field name="input-10-1" :rules="[rules.passRules]" label="Enter your password" hint="At least 8 characters" v-model="password" min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'"
													  :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" counter></v-text-field>
										<v-select :items="items" v-model="year" label="Select Year" single-line bottom></v-select>
										<v-btn large color="primary" type="submit">Login</v-btn>
									</v-flex>
								</v-layout>
							</form>
						</v-container>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>



<script>
	export default {
		data () {
			return {
				e1: true,
				password: '',
				rules: {
					required: (value) => !!value || 'Required.',
					nameRules: [
						v => !!v || 'Name is required',
						v => (v && v.length <= 10) || 'Name must be less than 10 characters'
					],
					passRules:[
							v => v || 'Password is requires',
							v=>(v.length>=4 && v.length<=10 ) || 'Password must be of minimum 4 character'
					]
				},
				year: null,
				items:[
					{text:'2017-18'},
					{text:'2016-17'},
					{text:'2015-16'}
				]
			}
		},
		methods:{
			onLogin(){
				this.$store.commit('LOGIN_SUCCESS',true);
				console.log(this.$store.getters.isLoggedIn);
				console.log(this.year);
				// if(this.$store.getters.isLoggedIn)
				//   this.$router.push('dashboard');
				this.$http.post('https://yenterprise-backend.herokuapp.com/login',{
					username: this.email,
					password: this.password,
					year:this.year
				}).then(function(response){
					console.log(response)
				}).catch(function(error){
					console.log(error)
				})
			}
		}
	}
</script>
