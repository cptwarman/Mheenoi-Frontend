<template>
  <v-container fluid v-if="!this.$store.getters.getLoader">
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
                    <v-spacer/>
                    <v-btn color="primary" small @click.stop ="dialog2 = true">more</v-btn>
                  </v-row>
                  <p class="caption mt-1 ml-2">Academic year: {{maxYear}}, semester: {{maxSemester}}</p>
                  <!-- more enrollment -->
                  <v-dialog persistent v-model="dialog2" width="950">
                    <v-card>
                      <v-card-title>
                        <v-row dense>
                            <v-col>
                              <b class="blue--text">My Enrollment</b>
                            </v-col>

                            <v-col cols="2" sm="1" order-sm="3">
                              <v-btn dark class="ml-2" color="red" rounded small @click="cloesDialog2()" >
                                <v-icon>close</v-icon>
                              </v-btn>
                            </v-col>
                            
                            <v-col cols="12" sm="3">
                                <v-select 
                                v-model="selecter.year"
                                label="Academic year" 
                                :items="academicYear"
                                dense
                                />
                            </v-col>

                            <v-col cols="12" sm="2">
                                <v-select 
                                  v-model="selecter.semester"
                                  label="Semester" 
                                  :items="semester"
                                  dense
                                />
                            </v-col>

                        </v-row>
                      </v-card-title>

                      <v-card-text>
                        <v-data-table
                          :headers="headers"
                          :items="enrollment"
                          :hide-default-footer="isSelect"
                        >   

                          <template v-if="isSelect" v-slot:body>
                            <tbody>
                              <tr v-for="(value,index) in enrollmentSelect" :key="index">
                                <td class="text-left">{{value.subjectId}}</td> 
                                <td class="text-left">{{value.subjectName}}</td>
                                <td class="text-left">{{value.sectionId}}</td>
                                <td class="text-left">{{value.fullname}}</td>
                                <td class="text-left">{{value.grade}}</td>
                              </tr>
                            </tbody>
                          </template> 

                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                 
                  <v-simple-table height="250">  
                    <thead>
                      <tr>
                        <th class="text-center">Subject ID</th>
                        <th class="text-center">Subject Name</th>
                        <th class="text-center">Section</th>
                        <th class="text-center">Lecturer</th>
                        <th class="text-center">Grade</th>
                      </tr>
                    </thead>
                     
                      <tbody>
                        <tr v-for="(value,index) in lastYearEnroll" :key="index">
                            <td> {{value.subjectId}} </td>
                            <td> {{value.subjectName}} </td>
                            <td> {{value.sectionId}} </td>
                            <td> {{value.fullname}} </td>
                            <td> {{value.grade}} </td>
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
                         <div class="d-flex justify-center pa-2" style="background: #1565C0;">
                            <b class="white--text">Grade Point Average</b>
                          </div>
                          <v-card-text class="text-center mt-3">
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
        picturePath: "",
        program: "",
        studentId: "",
        title: "",
        year: "",
        depName: "",
        faculty: "",
      },
      enrollment: [],
      enrollmentSelect: [],
      lastYearEnroll: [],
      lastYearEnrolltemp: [],
      gpa: "",
      scholarship: "",
      dialog: false,
      dialog2: false,
      headers: [
        {
          text: "Subject ID",
          value: "subjectId",
        },
        {
          text: "Subject Name",
          value: "subjectName",
        },
        {
          text: "Section",
          value: "sectionId",
        },
        {
          text: "Lecturer",
          value: "fullname",
        },
        {
          text: "Grade",
          value: "grade",
        },
      ],
      maxYear: "",
      maxSemester: "",
      academicYear: [],
      semester: [1,2],
      selecter: {
        year: "",
        semester: "",
      },
      enabled: "",
      
      enroll: {
          year: null,
          semester: null,
          status: null, 
      }
    }
  },

  methods: {

   cloesDialog2() {
     this.dialog2 = false
     this.selecter.year= ""
     this.selecter.semester= ""
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

    isSelect() {
      if(this.selecter.year != "" && this.selecter.semester != "") {
           this.enrollmentSelect = []
          _.filter(this.enrollment, (el) => {
            if(el.year == this.selecter.year && el.semester == this.selecter.semester) {
                this.enrollmentSelect.push(el);
              }
          })
        return true
      }
      else
        return false
    },
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
          console.log(res)
          //store all data from api
          this.info = res.data.payload.info[0]
          this.enrollment = res.data.payload.enrollment
          
          if(res.data.payload.gpa[0].gpa === null)
            this.gpa = "-"
          else
            this.gpa = res.data.payload.gpa[0].gpa
          
          // remove status pending and set status

          for(var i = this.enrollment.length -1; i >= 0 ; i--){
              if(this.enrollment[i].status == "pending" || this.enrollment[i].status == "enrolled") {
                this.enroll.status = this.enrollment[i].status
                this.enrollment.splice(i, 1)
              }
              else
                this.enroll.status = this.enrollment[i].status
          }

          this.enroll.year = res.data.payload.globalConst.enrollYear
          this.enroll.semester = res.data.payload.globalConst.enrollSemester

          this.$store.commit("setEnroll",this.enroll)

          if(res.data.payload.enrollment.length != 0) {
            this.maxYear = _.maxBy(this.enrollment, 'year').year
             _.filter(this.enrollment, (el) => { 

              if(el.grade == null)
                el.grade = "-"
              else if(el.grade == 4)
                el.grade = "A"
              else if(el.grade == 3.5)
                el.grade = "B+"
              else if(el.grade == 3)
                el.grade = "B"
              else if(el.grade == 2.5)
                el.grade = "C+"
              else if(el.grade == 2)
                el.grade = "C"
              else if(el.grade == 1.5)
                el.grade = "D+"
              else if(el.grade == 1)
                el.grade = "D"
              else if(el.grade == 0)
                el.grade = "F"
  
              // filter academic year
               if(!this.academicYear.includes(el.year)) 
                  this.academicYear.push(el.year);
  
               el.fullname = el.firstName + " " + el.lastName
                delete el.firstName
                delete el.lastName
                if(el.year == this.maxYear)
                  this.lastYearEnrolltemp.push(el)
            });

            this.maxSemester = _.maxBy( this.lastYearEnrolltemp, 'semester').semester
            _.filter(this.lastYearEnrolltemp, (el) => { 
              if(el.semester ==  this.maxSemester)
                  this.lastYearEnroll.push(el)
            });

          }
          //console.log( this.academicYear)
          //get only date
          this.info.dob = res.data.payload.info[0].dob.substr(0, 10);
          //Chage gender data
          if (res.data.payload.info[0].gender === "M")
            this.info.gender = "Male";
          else if (res.data.payload.info[0].gender === "F")
            this.info.gender = "Female";
          // Pass studentId to info page
          this.$store.dispatch("syncId",res.data.payload.info[0].studentId)
          // Pass data to Navbar
          this.$store.dispatch("syncfirstName",res.data.payload.info[0].firstName)
          //Check scholarship
          if(res.data.payload.scholarship.length != 0) {
            this.scholarship = res.data.payload.scholarship[0].scholarshipName
            this.$store.commit("setScholarship",true)
          }

       })
       .catch(err => {
          console.error(err.respones);
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