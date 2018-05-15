<template>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>

<script>
	import firebase from 'firebase'
	export default{

		created(){
			firebase.auth().onAuthStateChanged(user=>{
				if(user){
					this.$router.push('dashboard')
				} else {
					this.$router.push('login')	
				}
			})
		}
	}
</script>
