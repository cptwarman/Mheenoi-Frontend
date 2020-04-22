<template>
 <div>
   <!-- primary row -->
   <v-row justify="center" >
      <v-col cols="12">
        <!-- row infromation -->
   
        <v-row justify="center" dense>
          <v-col sm="10" lg="9">
            <!-- Header -->

            <v-row class="mb-3">
              <v-col>
                <v-row justify="center">
                  <v-card class="py-3 px-5" shaped>
                    <span
                      class="blue--text 
                      font-weight-bold
                      custom-text
                      "
                      :style="fontSize"
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
        <v-row justify="center" class=" mt-3">
          <v-col lg="9">
            <v-row  justify="space-around">
              
              <!-- MY enrollment  -->
              <v-col sm="10" lg="8" order-lg="2">      

                <v-card height="100%" class="px-6 py-5">
                  <v-row justify="space-between" align="center" class="px-5">
                    <!-- header in card enroll -->
                    <b class="blue--text title">My Enrollment</b>
                      <v-btn color="primary" depressed small  @click = "gotoEnroll()">
                        see more
                      </v-btn>
                  </v-row>
                 
                  <v-simple-table >  
                    <thead>
                      <tr>
                        <th class="text-center">Subject ID</th>
                        <th class="text-center">Subject Name</th>
                        <th class="text-center">Section</th>
                        <th class="text-center">Lecturer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>CPE231</td>
                        <td>Database System</td>
                        <td>A</td>
                        <td>Chayasit Ingkawaranon</td>
                      </tr>
                      <tr>
                        <td>CPE231</td>
                        <td>Database System</td>
                        <td>A</td>
                        <td>Chayasit Ingkawaranon</td>
                      </tr>
                      <tr>
                        <td>CPE231</td>
                        <td>Database System</td>
                        <td>A</td>
                        <td>Chayasit Ingkawaranon</td>
                      </tr>
                      <tr>
                        <td>CPE231</td>
                        <td>Database System</td>
                        <td>A</td>
                        <td>Chayasit Ingkawaranon</td>
                      </tr>
                      <tr>
                        <td>CPE231</td>
                        <td>Database System</td>
                        <td>A</td>
                        <td>Chayasit Ingkawaranon</td>
                      </tr>
                    </tbody>
                 
                  </v-simple-table>
                </v-card>
          
              </v-col>

              <!-- Buttons -->
              <v-col lg="4" sm="12" cols="12" order-lg="1">
                
               
                  <v-row justify="center" dense>

                    <v-col cols="12" sm="10" lg="12">
                      <v-card height="100%">
                        <div class="d-flex">
                          <v-card-text class="text-center mt-3">
                            <b class="font-weight-bold blue--text" style="font-size: 1.1rem;">GPA</b>
                            <p class="mt-1">3.62</p>
                          </v-card-text>    
                                            
                          <v-divider vertical inset /> 

                          <v-card-text class="text-center mt-3">
                              <b class="font-weight-bold blue--text" style="font-size: 1.1rem;">CGPA</b>
                              <p class="mt-1">3.62</p>
                          </v-card-text>
                        </div>   
                        <div style="background: #E8F1F5;">
                          <v-card-actions class="d-flex, justify-end">
                              <v-btn color="primary" depressed small right @click = "gotoEnroll()">
                                see more
                              </v-btn>
                          </v-card-actions>
                        </div> 
                      </v-card>    
                    </v-col>
                    
                  </v-row>

                  <v-row justify="center">
                    
                      <v-col cols="12" sm="5" lg="6">
                        <v-card height="100%" class="d-flex flex-column">
                            <div class="d-flex justify-center pa-2" style="background: #005691;">
                              <b class="white--text">My Scholarship</b>
                            </div>
                          <v-card-text class="text-center">
                           <v-flex class="mt-2">
                              <v-icon large>school</v-icon>
                              <p class="mt-1">ทุนป้าสี่หมี่เกี๊ยว</p>
                           </v-flex>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      
                      <v-col cols="12" sm="5" lg="6">                          
                        <v-card height="100%" hover class="pt-3"  href="/#/enrollment_details">
                          <v-card-text class="text-center">
                            <img src="../../assets/announcement.png" class="mt-3">
                            <p class="mt-2">Announcements</p>
                          </v-card-text>
                        </v-card>                                             
                      </v-col>

                  </v-row>
                
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
      },
    }
  },

  methods: {
   gotoEnroll() {
     this.$router.push("/enrollment_details");
   },
  },

  computed: {
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return {"font-size": "18px"};
        default: return {"font-size": "24px"};
      }
    }
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

.custom-text {
  font-size: 24px;
  margin-bottom: 25px;
}

.cursor {
  cursor: pointer;
}

td{ 
  text-align: center;
  font-size: 14px !important;
}
</style>