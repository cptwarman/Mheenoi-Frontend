<template>
 <div>
   <!-- primary row -->
   <v-row justify="center" >
      <v-col cols="12">
        <!-- row infromation -->
   
        <v-row justify="center" dense>
          <v-col lg="9">
            <!-- Header -->

            <v-row class="mb-3">
              <v-col lg="12">
                <v-row justify="center">
                  <v-card class="py-3 px-5" shaped>
                    <span
                      class="blue--text 
                      font-weight-bold
                      text
                      "
                    > STUDENT INFORMATION SYSTEM </span>
                  </v-card>
                </v-row>
              </v-col>
            </v-row>
            
            <!-- Details -->
            <infoStudent :info = "info" />
            
          </v-col>
        </v-row>


         <!-- row button and  announcements-->
        <v-row justify="center" class="mr-1 mt-3">
          <v-col lg="9">
            <v-row  justify="space-around">
              <!-- Buttons -->

              <v-col lg="4">

                <v-row dense justify="center">

                  <v-col lg="6">
                    <v-card height="100%" hover class="pt-4" href="/#/student_info">
                      <v-card-text class="text-center">
                        <img src="../../assets/information.png">
                        <p class="mt-2">Student Information</p>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col lg="6">
                    <v-card height="100%" hover class="pt-4" href="/#/scholarship">
                      <v-card-text class="text-center">
                        <img src="../../assets/scholarship.png">
                        <p class="mt-1">Scholarship</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row dense justify="center">
                  
                  <v-col lg="6">
                    <v-card height="100%" hover class="pt-4" href="/#/enrollment_form">
                      <v-card-text class="text-center">
                        <img src="../../assets/form.png" class="mt-2">
                        <p class="mt-1">Enrollment Form</p>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col lg="6">
                    <v-card height="100%" hover class="pt-4"  href="/#/enrollment_details">
                      <v-card-text class="text-center">
                        <img src="../../assets/detail.png" class="mt-3">
                        <p class="mt-2">Enrollment Detail</p>
                      </v-card-text>
                    </v-card>
                  </v-col>

                </v-row>

              </v-col>
              
              <!-- Announcements  -->
              <v-col lg="8">
            
                  <v-card height="100%" class="px-6 pt-5">
                    <b class="blue--text mb-5" style="font-size: 21px">My Enrollment</b>
                    <v-row>
                      <v-col lg="2">
                        <v-row justify="center">
                          <b>Subject ID</b>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <b>Subject Name</b>
                        </v-row>
                      </v-col>
                      <v-col lg="2">
                        <v-row justify="center">
                          <b>Section</b>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <b>Lecturer</b>
                        </v-row>
                      </v-col>
                    </v-row>

                    <v-divider />

                    <v-row>
                      <v-col lg="2">
                        <v-row justify="center">
                          <span>CPE231</span>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <span>Database System</span>
                        </v-row>
                      </v-col>
                      <v-col lg="2">
                        <v-row justify="center">
                          <span>A</span>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <span>Teacher พร</span>
                        </v-row>
                      </v-col>
                    </v-row>

                    <v-divider />

                    <v-row>
                      <v-col lg="2">
                        <v-row justify="center">
                          <span>CPE231</span>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <span>Database System</span>
                        </v-row>
                      </v-col>
                      <v-col lg="2">
                        <v-row justify="center">
                          <span>A</span>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <span>Teacher พร</span>
                        </v-row>
                      </v-col>
                    </v-row>

                    <v-divider />

                    <v-row>
                      <v-col lg="2">
                        <v-row justify="center">
                          <span>CPE231</span>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <span>Database System</span>
                        </v-row>
                      </v-col>
                      <v-col lg="2">
                        <v-row justify="center">
                          <span>A</span>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <span>Teacher พร</span>
                        </v-row>
                      </v-col>
                    </v-row>
                    
                    <v-divider />

                    <v-row>
                      <v-col lg="2">
                        <v-row justify="center">
                          <span>CPE231</span>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <span>Database System</span>
                        </v-row>
                      </v-col>
                      <v-col lg="2">
                        <v-row justify="center">
                          <span>A</span>
                        </v-row>
                      </v-col>
                      <v-col lg="4">
                        <v-row justify="center">
                          <span>Teacher พร</span>
                        </v-row>
                      </v-col>
                    </v-row>
              
                      
                  </v-card>
          
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    
     <!-- End of primary row -->
   </v-row>
 </div>
</template>

<script>
import infoStudent from '../../components/infoStudent'
import axios from 'axios'
export default {
  name: 'student_main',
  components: {
    infoStudent
  },

  data() {
    return {
      info: {
        studentID: "",
        firstName: "",
        lastName: "",
        email: "",
      }
    }
  },

  methods: {
   
  },

  created () {
    let jwtToken = sessionStorage.getItem('jwt')
      axios({
        method: 'get',
        url: 'https://chai-test-backend.herokuapp.com/api/user',
        headers: {
        Authorization: `bearer ${jwtToken}`
        }
     })
      .then(res => {
        this.info.studentID = res.data.userId
        this.info.firstName = res.data.firstName
        this.info.lastName = res.data.lastName
        this.info.email = res.data.email
        // Pass data to Navbar
        this.$emit('infoFirstName',res.data.firstName)
      })
      .catch(err => {
        console.error(err);
      });
  }
}
</script>

<style scope>
.profile {
  width: 170px;
  height: 170px;
  overflow: hidden;
  border-radius: 50%;
}

p {
  font-size: 17px;
}

.text {
  font-size: 25px;
  margin-bottom: 25px;
}

.cursor {
  cursor: pointer;
}

.new {
  color:red;
}

</style>