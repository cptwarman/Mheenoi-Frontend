<template>
  <nav>
    <v-app-bar color="#005691" dark height="50">
      <v-app-bar-nav-icon @click="drawer = true" />
       <v-spacer class="d-sm-none"/>
        <img src="../assets/mheenoiLogo.png" alt="mheenoiLogo" width="35" height="35">
        <v-toolbar-title class="ml-2" style="font-size: 19px">  MHEENOI UNISERSITY  </v-toolbar-title>
        <v-spacer />
        <b class="mr-3 d-none d-sm-flex customtext"> {{first_Name}} </b> 
      <v-btn outlined color="white" @click = "logout()" class="d-none d-sm-flex"> SIGN OUT </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list nav flat>
      
          <v-list-item @click="main()">
            <v-list-item-icon>
              <v-icon color="primary">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="infoS()">
            <v-list-item-icon>
              <v-icon color="primary">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Information</v-list-item-title>
          </v-list-item>

          <v-list-item @click="enrollDetails()">
            <v-list-item-icon>
              <v-icon color="primary">description</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">My Enrollment</v-list-item-title>
          </v-list-item>

          <v-list-item @click="enrollform()">
            <v-list-item-icon>
              <v-icon color="primary">create</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Enrollment From</v-list-item-title>
          </v-list-item>

          <v-list-item @click="scholarship()">
            <v-list-item-icon>
              <v-icon color="primary">school</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Scholarship</v-list-item-title>
          </v-list-item>

          <v-container class="mt-3 d-sm-none">
            <v-divider/>
            <v-row justify="center" class="mt-4">
              <b class="title font-weight-bold blue--text" style="text-transform: uppercase;"> {{first_Name}} </b>
            </v-row>
            <v-row justify="center" class="mt-3">
              <v-btn outlined  @click = "logout()">SIGN OUT</v-btn>
            </v-row>
          </v-container>

        
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      first_Name: this.$store.getters.getFirtName,
      drawer: false,
      select: null,
    };
  },

  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.replace("/")
    },

    main() {
      this.$router.push("/student").catch(err => {})
    },

    infoS() {
      this.$router.push("/student_info").catch(err => {})
    },

    enrollform() {
      this.$router.push("/enrollment_from").catch(err => {})
    },

    enrollDetails() {
      this.$router.push("/enrollment_details").catch(err => {})
    },

    scholarship() {
      this.$router.push("/scholarship").catch(err => {})
    }
  }
};
</script>

<style scoped>
.customtext {
  text-transform: uppercase;
  font-size: 18px;
}
</style>

