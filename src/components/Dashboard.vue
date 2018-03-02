<template>
  <v-container fluid grid-list-md text-xs-center mt-5>
    <v-layout v-bind="binding">
      <!-- <> -->
      <v-flex d-flex xs12 md6 sm8 offset-md0 offset-sm2>
        <v-card dark color="primary" height="200px" width="100%">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md6 sm8 offset-md0 offset-sm2>
        <v-card dark color="secondary" height="200px" width="100%">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      <!-- </> -->
      <!-- <> -->
      <v-flex d-flex xs12 md6 sm8 offset-md0 offset-sm2>
        <v-card dark color="primary" height="200px" width="100%">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md6 sm8 offset-md0 offset-sm2>
        <v-card dark color="secondary" height="200px">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      
      <!-- </> -->
      
    </v-layout>

    <v-layout v-bind="binding">
      <!-- <> -->
      <v-flex d-flex xs12 md6 sm8 offset-md0 offset-sm2>
        <v-card dark color="primary" height="200px" width="100%" raised  hover="">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex  d-flex xs12 md6 sm8 offset-md0 offset-sm2>
        <v-card dark color="secondary" height="200px" width="100%">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      <!-- </> -->
      <!-- <> -->
      <v-flex d-flex xs12 md6 sm8 offset-md0 offset-sm2>
        <v-card dark color="primary" height="200px" width="100%">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md6 sm8 offset-md0 offset-sm2>
        <v-card dark color="secondary" height="200px">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      
      <!-- </> -->
      
    </v-layout>
  </v-container>
</template>

<script>
  export default {
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