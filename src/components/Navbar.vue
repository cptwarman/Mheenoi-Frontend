<template>
  <nav>
    <v-app-bar color="#005691" dark>
      <v-app-bar-nav-icon @click="drawer = true" />
      <img src="../assets/mheenoiLogo.png" alt="mheenoiLogo" width="40" height="40" class="ml-1">
      <v-toolbar-title class="ml-2" style="font-size: 19px">  MHEENOI UNISERSITY  </v-toolbar-title>
      <v-spacer />
        <b class="mr-3" style="font-size: 18px"> {{first_Name}} </b> 
      <v-btn outlined  color="white" @click = "logout()"> SIGN OUT </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav flat>
        <v-list-item-group
          color="blue darken-1" mandatory
        >
          <v-list-item @click="main()">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="infoS()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Information</v-list-item-title>
          </v-list-item>

          <v-list-item @click="enrollDetails()">
            <v-list-item-icon>
              <v-icon>description</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Enrollment Details</v-list-item-title>
          </v-list-item>

          <v-list-item @click="enrollform()">
            <v-list-item-icon>
              <v-icon>create</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Enrollment From</v-list-item-title>
          </v-list-item>

          <v-list-item @click="scholarship()">
            <v-list-item-icon>
              <v-icon>school</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Scholarship</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
    };
  },

  props: {
    first_Name: String
  },

  methods: {
    logout() {
      this.$router.replace("/")
    },

    main() {
      this.$router.replace("/student")
    },

    infoS() {
      this.$router.replace("/student_info")
    },

    enrollform() {
      this.$router.replace("/enrollment_from")
    },

    enrollDetails() {
      this.$router.replace("/enrollment_details")
    },

    scholarship() {
      this.$router.replace("/scholarship")
    }
  }
};
</script>
