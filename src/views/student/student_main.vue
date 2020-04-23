<template>
  <v-container fluid>
   <!-- primary row -->
   <v-row justify="center" >
      <v-col cols="12">
        <!-- row infromation -->
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
   
        <v-row justify="center" dense>
          <v-col sm="10" lg="9" cols="11">
            <!-- Details -->
            <infoStudent :info = "info" />
            
          </v-col>
        </v-row>


         <!-- row button and  announcements-->
        <v-row justify="center" class=" mt-3" dense>
          <v-col sm="12" lg="9" cols="11">
            <v-row  justify="space-around">
              
              <!-- MY enrollment  -->
              <v-col sm="10" lg="8" order-lg="2">      

                <v-card height="100%" class="px-6 py-5">
                  <v-row justify="space-between" align="center" class="px-5">
                    <!-- header in card enroll -->
                    <b class="blue--text title">My Enrollment</b>
                      <v-btn color="primary" depressed small  @click = "gotoEnroll()">
                        more
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
                        <v-card height="100%" hover class="pt-3" @click.stop="dialog = true">
                          <v-card-text class="text-center">
                            <img src="../../assets/announcement.png" class="mt-3">
                            <p class="mt-2">Announcements</p>
                          </v-card-text>
                        </v-card> 

                        <v-dialog v-model="dialog" max-width="800">
                          <v-card>
                            <v-card-title class="blue--text mb-2">
                              Announcements 
                              <v-spacer/>
                              <v-btn 
                                color="red darken-1" 
                                small
                                text 
                                @click="dialog = false"
                              > close </v-btn>
                            </v-card-title>
                            <v-card-text>
                              <p class="cursor">New Government guidelines announced to tackle COVID-19 <b class="new">NEW</b></p>
                              <p class="cursor">Industrial action update <b class="new">NEW</b></p>
                              <p class="cursor">Acts of kindness across campus</p>
                              <p class="cursor">Leading by innovation: Professor scoops award at LeicestershireLive 
                              <p class="cursor">Leading by innovation: Professor scoops award at LeicestershireLive 
                                Innovation Awards ceremony</p>
                              <p class="cursor" style="margin: 0;">Acts of kindness across campus</p>
                            </v-card-text>
                          </v-card>  
                        </v-dialog>                                     
                      </v-col>

                  </v-row>
                
              </v-col>

            </v-row>
          </v-col>
        </v-row>
      </v-col>
    
     <!-- End of primary row -->
   </v-row>
  </v-container>
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
        degree: "",
        dob: "",
        email: "",
        firstName: "",
        lastName: "",
        fullGender: "",
        picturePath: "",
        program: "",
        studentId: "",
        title: "",
        year: "",
        departmentName: "",
        faculty: "",
      },
      dialog: false,
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
          console.log(res)
          //store all data from api
          this.info = res.data.payload[0]
          //cut T from dob
          let s = res.data.payload[0].dob,
              rex = /\s*([^:]*?)\s*T/g,
              match = rex.exec(s);
          this.info.dob = match[1];
          //Chage gender data
          if (res.data.payload[0].gender === "M")
            this.info.fullGender = "Men";
          else if (res.data.payload[0].gender === "W")
            this.info.fullGender = "Women";
          // Pass data to Navbar
          this.$emit('infoFirstName',res.data.payload[0].firstName);
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

.new {
  color: red;
}

.cursor {
  cursor: pointer;
}

td{ 
  text-align: center;
  font-size: 14px !important;
}
</style>