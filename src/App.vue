<template>
  <v-app>
    <Navbar v-if = "showNavbar" 
      @status = "showNav"  
      :first_Name = "firstName"/>

      <v-content style="background: #fafafa">
         <v-container fluid>
            <router-view @status = "showNav" @infoFirstName = "infoFirstName"/>
         </v-container>
      </v-content>
  </v-app>
</template>

<script> 
import Navbar from './components/Navbar'
export default {
  
  name: 'App',
  components: {
    Navbar
  },

  data() {
    return {
      showNavbar: true,
      firstName: ""
    }
  },

  methods: {
    showNav(condition) {
      if(condition)
        this.showNavbar = true
      else
        this.showNavbar = false
    },

    infoFirstName(pass) {
      this.firstName = pass
    }

  }
};
</script> 

