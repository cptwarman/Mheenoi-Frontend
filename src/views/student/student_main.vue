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
            <v-row  justify="space-around" >
              
              <!-- MY enrollment  -->
              <v-col sm="10" lg="8" order-lg="2">      

                <v-card height="100%" class="px-6 py-5">
                  <v-row justify="space-between" align="center" class="px-5" >
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
                      <tr v-for="value in enrollment" v-bind:key="value.subjectId">
                        <td v-for="data in value" v-bind:key="data.subjectId">
                          {{data}}
                        </td>
                      </tr>
                    </tbody>
                 
                  </v-simple-table>
                </v-card>
          
              </v-col>

              <!-- Buttons -->
              <v-col lg="4" sm="12" cols="12" order-lg="1">
                
               
                  <v-row justify="center" dense>

                    <v-col cols="12" sm="5" lg="6" v-if="checkScholarship">
                        <v-card height="100%" class="d-flex flex-column">
                          <div class="d-flex justify-center pa-2" style="background: #1565C0;">
                              <b class="white--text">My Scholarship</b>
                          </div>
                          <v-card-text class="text-center">
                            <v-flex class="mt-2">
                              <v-icon large>school</v-icon>
                              <p class="mt-1">{{scholarship}}</p>
                            </v-flex>
                          </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="5" :lg="changeColGpa" >
                      <v-card height="100%">
                          <v-card-actions>
                            <v-spacer/>
                            <v-btn color="primary" depressed small right @click = "gotoEnroll()">
                                more
                            </v-btn>
                          </v-card-actions>
                          <v-card-text class="text-center mb-5">
                            <b class="font-weight-bold blue--text" style="font-size: 1.2rem;">GPA</b>
                            <p class="mt-1" style="font-size: 1.2rem;">{{gpa}}</p>
                          </v-card-text>      
                      </v-card>    
                    </v-col>
                    <!-- Annouce when not have scholar -->
                    <v-col cols="12" sm="5" v-if="checkAnnouce">                          
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

                  <v-row justify="center" dense>
                      
                      <v-col cols="12" sm="10" lg="12" v-if="!checkAnnouce">                          
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
        gender: "",
        fullGender: "",
        picturePath: "",
        program: "",
        studentId: "",
        title: "",
        year: "",
        depName: "",
        faculty: "",
      },
      enrollment: [],
      gpa: "",
      scholarship: "",
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
    },

    checkScholarship() {
      if(this.scholarship == "")
        return false
      else
        return true
    },
    
    changeColGpa() {
      if(!this.checkScholarship) {
          switch (this.$vuetify.breakpoint.name) {
            case 'lg': return "12"
        }
      }
      else
          return "6"
    },

    checkAnnouce() {
      if((this.$vuetify.breakpoint.mdAndDown && this.$vuetify.breakpoint.smAndUp) && !this.checkScholarship)
        return true
      else
        return false
    },

    test(){
      return true
    }

  },
  
  created () {
     let jwtToken = sessionStorage.getItem('jwt')
       axios({
         method: 'get',
         url: 'https://chai-test-backend.herokuapp.com/api/students/dashboard',
         headers: {
         Authorization: `bearer ${jwtToken}`
         }
      })
       .then(res => {
          // console.log(res)
          //store all data from api
          this.info = res.data.payload.info[0]
          this.gpa = res.data.payload.gpa[0].gpa
          this.enrollment = res.data.payload.enrollment

          console.log(this.enrollment)
          //get only date
          this.info.dob = res.data.payload.info[0].dob.substr(0, 10);
          //Chage gender data
          if (res.data.payload.info[0].gender === "M")
            this.info.fullGender = "Men";
          else if (res.data.payload.info[0].gender === "W")
            this.info.fullGender = "Women";
          // Pass data to Navbar
          this.$emit('infoFirstName',res.data.payload.info[0].firstName);
          // Pass studentId to info page
          this.$store.dispatch("syncStudentId",res.data.payload.info[0].studentId)
          //Check scholarship
          if(res.data.payload.scholarship.length == 1)
            this.scholarship = res.data.payload.scholarship[0].scholarshipName

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