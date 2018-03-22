<template>

  <v-container fluid grid-list-md text-xs-center mt-3 pl-3 pr-3>
    <v-layout row wrap pl-5 pr-5>
      <v-flex d-flex xs12 md3 sm6 pr-3 mt-5 mb-3>
        <v-card dark color="amber darken-1" height="200px" width="90%" raised  hover="" class="item">
          <!-- <v-icon class="icon">person</v-icon> -->
          <!-- <v-icon class="icon">mdi-human-icon</v-icon> -->
   <svg class="icon" style="width:75px;height:75px" viewBox="0 0 24 24">
    <path fill="#ffffff" d="M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5L22,9V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z" />
</svg>
          <v-card-text><h2>Users</h2></v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md3 sm6 pr-3 mt-5 mb-3>
        <v-card dark color="lime darken-3" height="200px" width="90%" raised  hover="" class="item">
          <svg class="icon" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M12,6A3,3 0 0,0 9,9A3,3 0 0,0 12,12A3,3 0 0,0 15,9A3,3 0 0,0 12,6M6,8.17A2.5,2.5 0 0,0 3.5,10.67A2.5,2.5 0 0,0 6,13.17C6.88,13.17 7.65,12.71 8.09,12.03C7.42,11.18 7,10.15 7,9C7,8.8 7,8.6 7.04,8.4C6.72,8.25 6.37,8.17 6,8.17M18,8.17C17.63,8.17 17.28,8.25 16.96,8.4C17,8.6 17,8.8 17,9C17,10.15 16.58,11.18 15.91,12.03C16.35,12.71 17.12,13.17 18,13.17A2.5,2.5 0 0,0 20.5,10.67A2.5,2.5 0 0,0 18,8.17M12,14C10,14 6,15 6,17V19H18V17C18,15 14,14 12,14M4.67,14.97C3,15.26 1,16.04 1,17.33V19H4V17C4,16.22 4.29,15.53 4.67,14.97M19.33,14.97C19.71,15.53 20,16.22 20,17V19H23V17.33C23,16.04 21,15.26 19.33,14.97Z" />
          </svg>
          <v-card-text><h2>Customers</h2></v-card-text>
		</v-card>
	  </v-flex>
      <v-flex d-flex xs12 md3 sm6 pr-3 mt-5 mb-3>
        <v-card dark color="purple darken-2" height="200px" width="90%" raised  hover="" class="item">
        <svg class="icon" viewBox="0 0 24 24">
            <path fill="#ffffff" d="M20,14H4V8H7V10H9V8H15V10H17V8H20M20,19H4V17H20M9,4H15V6H9M20,6H17V4C17,2.89 16.11,2 15,2H9C7.89,2 7,2.89 7,4V6H4C2.89,6 2,6.89 2,8V19C2,20.11 2.89,21 4,21H20C21.11,21 22,20.11 22,19V8C22,6.89 21.11,6 20,6Z" />
        </svg>
          <v-card-text><h2>Suppliers</h2></v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md3 sm6 pr-3 mt-5 mb-3>
        <v-card dark color="teal darken-2" height="200px" width="90%" raised  hover="" class="item">
          <svg class="icon" viewBox="0 0 24 24">
    <path fill="#ffffff" d="M8,3H18L17,5H13.74C14.22,5.58 14.58,6.26 14.79,7H18L17,9H15C14.75,11.57 12.74,13.63 10.2,13.96V14H9.5L15.5,21H13L7,14V12H9.5V12C11.26,12 12.72,10.7 12.96,9H7L8,7H12.66C12.1,5.82 10.9,5 9.5,5H7L8,3Z" />
</svg>
          <v-card-text><h2>Income</h2></v-card-text>
        </v-card>
      </v-flex>

    </v-layout>

    <v-layout raw wrap pl-5 pr-5>
      <v-flex d-flex xs12 md3 sm6 pr-3 mb-3>
        <v-card dark color="blue-grey darken-2" height="200px" width="100%" raised  hover="" class="item">
			<svg class="icon" viewBox="0 0 24 24" >
				<path fill="#ffffff" d="M9,2V8H11V11H5C3.89,11 3,11.89 3,13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21V13C21,11.89 20.11,11 19,11H13V8H15V2H9Z" />
			</svg>
			<v-card-text><h2>Product</h2></v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md3 sm6 pr-3 mb-3>
        <v-card dark color="blue-grey lighten-1" height="200px" width="100%" raised  hover="" class="item">
			<svg class="icon" viewBox="0 0 24 24">
				<path fill="#ffffff" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
			</svg>
          <v-card-text><h2>Invoice</h2></v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md3 sm6 pr-3 mb-3>
        <v-card dark color="deep-orange accent-2" height="200px" width="100%" raised  hover="" class="item">
			<svg class="icon" viewBox="0 0 24 24">
				<path fill="#ffffff" d="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z" />
			</svg>
			<v-card-text><h3>Rent</h3></v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md3 sm6 pr-3 mb-3>
        <v-card dark color="secondary" height="200px" raised  hover="" class="item">
			<svg class="icon" viewBox="0 0 24 24">
				<svg style="width:24px;height:24px" viewBox="0 0 24 24">
					<path fill="#ffffff" d="M12.5,6.9C14.28,6.9 14.94,7.75 15,9H17.21C17.14,7.28 16.09,5.7 14,5.19V3H11V5.16C10.47,5.28 9.97,5.46 9.5,5.7L11,7.17C11.4,7 11.9,6.9 12.5,6.9M5.33,4.06L4.06,5.33L7.5,8.77C7.5,10.85 9.06,12 11.41,12.68L14.92,16.19C14.58,16.67 13.87,17.1 12.5,17.1C10.44,17.1 9.63,16.18 9.5,15H7.32C7.44,17.19 9.08,18.42 11,18.83V21H14V18.85C14.96,18.67 15.82,18.3 16.45,17.73L18.67,19.95L19.94,18.68L5.33,4.06Z" />
				</svg>
			</svg>
          <v-card-text><h3>Expenses</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import HumanIcon from 'mdi-vue/account-box';
  // import CustomIconName from 'mdi-vue/'

  export default {

    component:{
      // HumanIcon
    },
    computed: {
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.row = true
        else
          binding.column=true

        return binding
      }
    }
  }
</script>
<style>
  .icon{
    height: 75px;
    width: 75px;
    margin-top: 35px;
  }
	.item{
		border-radius: 25px;
		border: 2px solid;
	}
</style>

