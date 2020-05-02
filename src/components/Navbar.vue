<template>
  <nav>
    <v-app-bar color="#005691" dark height="50">
      <v-app-bar-nav-icon @click="drawer = true" />
       <v-spacer class="d-sm-none"/>
        <img src="../assets/mheenoiLogo.png" alt="mheenoiLogo" width="35" height="35">
        <v-toolbar-title class="ml-2" style="font-size: 19px">  MHEENOI UNISERSITY  </v-toolbar-title>
        <v-spacer />
        <div style="line-height: 90%;" class="mt-2">
          <b class="mr-3 d-none d-sm-flex customtext"> {{this.$store.getters.getFirtName}} </b> 
          <span class="caption d-none d-sm-flex justify-end mr-3" v-if="isStudent">Student</span>
          <span class="caption d-none d-sm-flex justify-end mr-3" v-if="isLecturer">Lecturer</span>
          <span class="caption d-none d-sm-flex justify-end mr-3" v-if="isStaff">Staff</span>
        </div>
      <v-btn outlined color="white" @click = "logout()" class="d-none d-sm-flex"> SIGN OUT </v-btn>
    </v-app-bar>
    <!-- drawer student -->
    <v-navigation-drawer v-if="isStudent" v-model="drawer" temporary app>
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

          <v-list-item @click="enrollform()">
            <v-list-item-icon>
              <v-icon color="primary">description</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Enrollment From</v-list-item-title>
          </v-list-item>

          <v-list-item @click="activities()">
            <v-list-item-icon>
              <v-icon color="primary">people_alt</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Activities</v-list-item-title>
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
              <div class="text-center">

                <b class="title font-weight-bold blue--text" style="text-transform: uppercase;"> {{this.$store.getters.getFirtName}} </b> <br/>
                <span class="body-1" v-if="isStudent">Student</span>

              </div>
            </v-row>
            <v-row justify="center" class="mt-3">
              <v-btn outlined  @click = "logout()">SIGN OUT</v-btn>
            </v-row>
          </v-container>

        
      </v-list>
    </v-navigation-drawer>

    <!-- drawer lecturer -->
    <v-navigation-drawer v-if="isLecturer" v-model="drawer" temporary app>
      <v-list nav flat>
      
          <v-list-item @click="mainL()">
            <v-list-item-icon>
              <v-icon color="primary">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="infoL()">
            <v-list-item-icon>
              <v-icon color="primary">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Information</v-list-item-title>
          </v-list-item>

          <v-list-item @click="gradeL()">
            <v-list-item-icon>
              <v-icon color="primary">edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Grade Assignment</v-list-item-title>
          </v-list-item>

          <v-list-item @click="subjectL()">
            <v-list-item-icon>
              <v-icon color="primary">description</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Subject Management</v-list-item-title>
          </v-list-item>

          <v-container class="mt-3 d-sm-none">
            <v-divider/>
            <v-row justify="center" class="mt-4">
              <div class="text-center">

                <b class="title font-weight-bold blue--text" style="text-transform: uppercase;"> {{this.$store.getters.getFirtName}} </b> <br/>
                <span class="body-1" v-if="isLecturer">Lecturer</span>

              </div>
            </v-row>
            <v-row justify="center" class="mt-3">
              <v-btn outlined  @click = "logout()">SIGN OUT</v-btn>
            </v-row>
          </v-container>

        
      </v-list>
    </v-navigation-drawer>

    <!-- drawer Staff -->
    <v-navigation-drawer v-if="isStaff" v-model="drawer" temporary app>
      <v-list nav flat>
      
          <v-list-item @click="mainS()">
            <v-list-item-icon>
              <v-icon color="primary">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="infoStaff()">
            <v-list-item-icon>
              <v-icon color="primary">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Information</v-list-item-title>
          </v-list-item>

          <v-list-item @click="subjectS()">
            <v-list-item-icon>
              <v-icon color="primary">description</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Subject Management</v-list-item-title>
          </v-list-item>

          <v-list-item @click="scholarS()">
            <v-list-item-icon>
              <v-icon color="primary">school</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Scholarship Management</v-list-item-title>
          </v-list-item>

          <v-list-item @click="personnelS()">
            <v-list-item-icon>
              <v-icon color="primary">people_alt</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="subtitle-2 font-weight-medium">Personnel Management</v-list-item-title>
          </v-list-item>

          <v-container class="mt-3 d-sm-none">
            <v-divider/>
            <v-row justify="center" class="mt-4">
              <div class="text-center">

                <b class="title font-weight-bold blue--text" style="text-transform: uppercase;"> {{this.$store.getters.getFirtName}} </b> <br/>
                <span class="body-1" v-if="isLecturer">Lecturer</span>

              </div>
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
      drawer: false,
      select: null,
    };
  },

  computed: {
    isStudent() {
      if(sessionStorage.getItem('type') == 1)
        return true
      else
        return false
    },

    isLecturer() {
      if(sessionStorage.getItem('type') == 2)
        return true
      else
        return false
    },

    isStaff() {
      if(sessionStorage.getItem('type') == 3)
        return true
      else
        return false
    }
  },

  methods: {
    logout() {
      sessionStorage.clear()
      this.$store.state.first_name = ""
      this.$router.replace("/")
    },

    // student
    main() {
      this.$router.push("/student").catch(err => {})
    },
    infoS() {
      this.$router.push("/student_info").catch(err => {})
    },
    enrollform() {
      this.$router.push("/enrollment_from").catch(err => {})
    },
    activities() {
      this.$router.push("/activities").catch(err => {})
    },
    scholarship() {
      this.$router.push("/scholarship").catch(err => {})
    },

    // lecturer
    mainL() {
      this.$router.push("/lecturer").catch(err => {})
    },
    infoL() {
      this.$router.push("/lecturer_info").catch(err => {})
    },
    gradeL() {
      this.$router.push("/grade").catch(err => {})
    },
    subjectL() {
      this.$router.push("/subject").catch(err => {})
    },

    // staff
    mainS() {
      this.$router.push("/staff").catch(err => {})
    },
    infoStaff() {
      this.$router.push("/staff_info").catch(err => {})
    },
    subjectS() {
      this.$router.push("/staff_subject").catch(err => {})
    },
    scholarS() {
      this.$router.push("/scholarship_editor").catch(err => {})
    },
    personnelS() {
      this.$router.push("/personnel").catch(err => {})
    },
  },
};
</script>

<style scoped>
.customtext {
  text-transform: uppercase;
  font-size: 18px;
}
</style>

