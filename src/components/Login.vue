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
                        label="Enter your e-mail"
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        ></v-text-field>
                      <v-text-field
                        name="input-10-1"
                        label="Enter your password"
                        hint="At least 8 characters"
                        v-model="password"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (e1 = !e1)"
                        :type="e1 ? 'password' : 'text'"
                        counter
                      ></v-text-field>
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
        email:'',
         rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    methods:{
      onLogin(){
        this.$store.commit('LOGIN_SUCCESS',true);  
        console.log(this.$store.getters.isLoggedIn);

        if(this.$store.getters.isLoggedIn)
          this.$router.push('dashboard');
      }
    }
  }
</script>
