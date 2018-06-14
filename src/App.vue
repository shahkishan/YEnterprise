<template>
	<v-app>
		<v-navigation-drawer persistent :clipped="clipped" v-model="drawer" disable-resize-watcher fixed app class="hidden-sm-and-up ">
			<v-list>
				<v-list-tile value="true" v-for="(item, i) in items" :key="i" :to="item.link">
					<v-list-tile-content>
						<v-list-tile-title v-text="item.title"></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
    
		<v-toolbar app :clipped-left="clipped" v-if="!myToolbar">
			<v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up "></v-toolbar-side-icon>
			
			<v-toolbar-title>
					<span style="color:#1976D2">{{title}}</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-toolbar-items class="hidden-xs-only">
				<v-btn flat :to="{name:'Dashboard'}">
					<span style="color:#1976D2">Home</span>
				</v-btn>
				<v-btn flat v-for="(item) in items" :key="item.title" :to="item.link">
					<span style="color:#1976D2">{{item.title}}</span>
				</v-btn>
				<v-btn flat v-on:click="logout()">
					<span style="color:#1976D2">Logout</span>
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<router-view/>
		</v-content>
		<v-footer :fixed="fixed" app>
			<span>&copy; 2018</span>
		</v-footer>
	</v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  	created(){
		this.$store.dispatch('loadSuppliers')
		this.$store.dispatch('loadCustomers')
		this.$store.dispatch('loadItems')
		this.$store.dispatch('loadCompanies')
		this.$store.dispatch('loadAllPurchases')
		this.$store.dispatch('LoadAllRents')


  	},
  	data () {
    	return {
			clipped: false,
			drawer: false,
			fixed: false,
			items: [
				{
					title: 'Users',
					link:'/users'
				},
				{
					title: 'Customers',
					link:'/customers'
				},
				{
					title:'Suppliers',
					link:'',
				},
				{
					title:'Transactions',
					link:'',
				}
			],

			title: 'YEnterprise'
		}
 	},
  	name: 'App',
	computed:{
		myToolbar:function(){
				if(this.$store.getters.user){
					return false
			}
			else {
				return true	
			}
		},
		isUserLoggedIn(){
				firebase.auth().onAuthStateChanged(user=>{
					if(!user){
						this.$router.push('login')	
					}
				})
			}
	},
	methods:{
		logout(){
			this.$store.dispatch('logout')
		}
	},
	watch:{
			isUserLoggedIn(){
				if(!this.isUserLoggedIn)
					this.$router.push('login')	
			}	
		}

	}
</script>