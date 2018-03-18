<template>
  <v-app>
     <v-navigation-drawer
        persistent
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        enable-resize-watcher
        fixed
        app
        class="hidden-sm-and-up "
      >
        <v-list>
          <v-list-tile
            value="true"
            v-for="(item, i) in items"
            :key="i"
             :to="item.link"
          >
              <!-- <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
              </v-list-tile-action> -->
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
     
      v-if="!myToolbar"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up "></v-toolbar-side-icon>     
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
      
      <v-toolbar-title v-text="title" :to="{name:'Dashboard'}" style="color:#1976D2"></v-toolbar-title>
      <v-spacer></v-spacer>
      


      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="(item) in items"
          :key="item.title"
          :to="item.link">
          <!-- <v-icon left dark>{{ item.icon }}</v-icon> -->
          <span style="color:#1976D2">{{item.title}}</span>
        </v-btn>
</v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [{
        title: 'Users',
        link:'/users'
      },{
        title: 'Customers',
        link:'/customers'
      },{
        title:'Suppliers',
        link:'',
      },{
        title:
          'Transactions',
          link:'',
      }],

      title: 'YEnterprise'
    }
  },
  name: 'App',
  computed:{
    myToolbar:function(){
      console.log("login"+this.$store.getters.isLoginPage)
      return this.$store.getters.isLoginPage;
    }

  }
}
</script>