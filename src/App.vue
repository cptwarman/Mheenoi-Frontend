<template>
  <v-app>
    <Navbar v-if = "showNavbar" 
      @status = "showNav"  
      :first_Name = "firstName"/>
    
    <timer v-if = "showNavbar"/>

      <v-content class="img">
        <router-view @status = "showNav" @infoFirstName = "infoFirstName"/>
      </v-content>

  </v-app>
</template>

<script> 
import axios from 'axios'
import Navbar from './components/Navbar'
import timer from './components/timer'
import reset from './views/reset'
export default {
  
  name: 'App',
  components: {
    Navbar,
    timer,
  },

  data() {
    return {
      showNavbar: true,
      firstName: ""
    }
  },

  computed: {
    
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
    },
  },

  created() {
  // Send Request to server
  axios.interceptors.request.use((config) => {
      this.$store.commit("setLoader",true)
      return config;

  },  (error) => {
      this.$store.commit("setLoader",false)
      return Promise.reject(error);
  });
   // Response from server
  axios.interceptors.response.use((response) => {
      this.$store.commit("setLoader",false)
      return response;
      
  }, (error) => {
      return Promise.reject(error);
  });

  },
};
</script> 

<style scoped>
.img {
  background-image: url("./assets/bg.jpg");
  background-size: cover;
}
</style>
