<template>
  <v-container fluid fill-height v-if="!this.$store.getters.getLoader">
    <v-row justify="center">
      <v-col lg="9">

        <v-card>
          <v-card-title class="blue--text">
            Scholarship Requestment
            <v-spacer/>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-dialog max-width="1000" persistent v-model="dialog.dialogDetails" scrollable>
              <v-card>
                <v-card-title class="py-4 pl-10 blue--text font-weight-bold"> 
                  {{nameOfScholarship}} 
                </v-card-title>
                <v-card-text>
                <v-container>
                  <v-row  class="ml-8">
                    <v-col cols="12">
                      <v-row>
                        {{detailOfScholarship[indexOfScholarship]}}
                      </v-row>
                    </v-col>

                    <v-col cols="12" sm="4" lg="4">
                      <v-row>
                        <div>
                          <h3 class="title mb-4" style="color: #005691;">Personal Information</h3>
                          <p><b>Student ID: </b>{{payload.studentId}}</p>
                          <p><b>Title: </b>{{payload.title}}</p>
                          <p><b>First Name: </b>{{payload.firstName}}</p>
                          <p><b>Last Name: </b>{{payload.lastName}}</p>
                          <p><b>Gender: </b>{{payload.fullGender}}</p>
                          <p><b>Degree: </b>{{payload.degree}}</p>
                        </div>
                      </v-row>
                    </v-col>
                    
                    <v-col cols="12" sm="4" lg="4">
                      <v-row>
                        <div>
                          <h3 class="title mb-4" style="color: #005691;">Guardian1 Information</h3>
                          <p><b>First Name: </b>{{payload.parent1FirstName}}</p>
                          <p><b>Last Name: </b>{{payload.parent1LastName}}</p>
                          <p><b>Career:: </b>{{payload.parent1Career}}</p>
                          <p><b>Income: </b>{{payload.parent1Income}}</p>
                          <p><b>Phone: </b>{{payload.parent1Tel}}</p>
                          <p><b>Relation
                                with student: </b>{{payload.parent1Relation}}</p>
                        </div>
                      </v-row>
                    </v-col>

                    <v-col cols="12" sm="4" lg="4">
                      <v-row>
                        <div>
                          <h3 class="title mb-4" style="color: #005691;">Guardian2 Information</h3>
                          <p><b>First Name: </b>{{payload.parent2FirstName}}</p>
                          <p><b>Last Name: </b>{{payload.parent2LastName}}</p>
                          <p><b>Career:: </b>{{payload.parent2Career}}</p>
                          <p><b>Income: </b>{{payload.parent2Income}}</p>
                          <p><b>Phone: </b>{{payload.parent2Tel}}</p>
                          <p><b>Relation
                                with student: </b>{{payload.parent2Relation}}</p>
                        </div>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- row input -->
                  <!-- Reason -->
                  <v-row justify="center">
                    <v-col cols="11">
                      <v-row justify="center">
                        <v-textarea 
                          outlined 
                          counter
                          label="Reason for scholarship requesting"
                          :rules="rules.reason"
                          v-model="reason"
                        />
                      </v-row>
                      <!-- activities -->
                      <v-row dense class="mt-2">
                        <v-col cols="5">
                          <v-text-field
                            label="Activities and Awards "
                            outlined
                            dense
                            counter="128"
                            :rules="rules.activity"
                            v-model="act.name"
                          ></v-text-field>
                        </v-col>
                        
                        <!-- field activity type -->
                        
                        <v-col cols="5">
                          <v-text-field
                            label="Type"
                            outlined
                            dense
                            counter="32"
                            :rules="rules.type"
                            v-model="act.type"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="2">
                          <v-btn class="mx-2" fab  small color="primary"  @click="addActivities()" :disabled="$v.act.$invalid">
                              <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-list-item
                          v-for="(item,index) in activitieShow"
                          :key="index"
                        > 

                          {{index+1}}: {{item.detail}} - {{item.type}} 

                          <v-spacer/> 
                          <v-icon @click="deleteItem(index)">delete</v-icon>
                        </v-list-item>
                      </v-row>

                    </v-col>
                    <v-card-actions>
                      <v-btn outlined @click.stop="dialog.dialogCancel = true" color="primary">cancel</v-btn>
                      <v-btn @click.stop="dialog.dialogSubmit = true" :disabled="$v.reason.$invalid" color="primary" class="ml-5">submit</v-btn>
                    </v-card-actions>
 
                    <!-- pop up submit -->
                      <v-dialog v-model="dialog.dialogSubmit" max-width="450">
                        <v-card class="pa-5">
                          <v-card-text class="text-center">
                            <img src="../../assets/alertSoft.png" alt="alertSoft" width="180">
                            <h2 class="mt-4">Are you sure you want to <span class="success--text">submit</span> ?</h2>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer/>
                              <v-btn @click="dialog.dialogSubmit = false" color="success" outlined> no </v-btn>
                              <v-btn @click="submit()" color="success" class="ml-6" outlined> yes </v-btn>
                            <v-spacer/>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                <!-- end of pop up submit -->

                <!-- pop up cancel -->
                    <v-dialog v-model="dialog.dialogCancel" max-width="450">
                      <v-card class="pa-5">   
                        <v-card-text class="text-center">
                          <img src="../../assets/alert.png" alt="alert" width="180">
                          <h2 class="mt-4">Are you sure you want to <span class="red--text">cancel</span> ?</h2>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer/>
                            <v-btn @click.stop="dialog.dialogCancel = false" color="error" outlined> no </v-btn>
                            <v-btn  @click="cancel()" color="error" class="ml-6" outlined> yes </v-btn>
                          <v-spacer/>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  <!-- end of pop up cancel -->
                  </v-row>
                  
                </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>

            <v-data-table
              :headers="headers"
              :items="scholar"
              :search="search"
             
            >
              <template v-slot:item.actions="{ item }">
                <v-btn small color="primary" rounded @click="showDetails(item)"> apply</v-btn>
              </template>
            </v-data-table>

            <v-snackbar v-model="snackbar.snackbarPass" color="success">
                Request Successful
               <v-btn color="white" text @click="snackbar.snackbarPass = false"> Close </v-btn>
            </v-snackbar>

            <v-snackbar v-model="snackbar.snackbarFail" color="error">
                Request Fail
               <v-btn color="white" text @click="snackbar.snackbarFail = false"> Close </v-btn>
            </v-snackbar>

        </v-card>
        
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { required, email, minLength, maxLength , between, decimal, numeric} from "vuelidate/lib/validators";
import axios from 'axios'
export default {
  name: 'App',

  data() {
    return{
      dialog: {
        dialogDetails: false,
        dialogCancel: false,
        dialogSubmit: false,
      },
      detailOfScholarship: [],
      search: "",
      payload: {},
      scholar: [],
      headers: [{
          text: "Scholarship ID",
          value: "scholarshipId",
          align: "center"
          },
        {
          text: "Donator",
          value: "donator",
         
        },
        {
          text: "Scholarship Name",
          value: "scholarshipName",
       
        },
        {
          value: 'actions',
          align: "center",
          sortable: false 
        }],
        
        rules: {
          reason: [
            v => v.length <= 256 || 'Max 256 characters',
            v => !!v || "Reason is required for scholarship requesting"
          ],

          activity: [
            v =>  v.length <= 128 || 'Max 128 characters',
            v => !!v || "This field is required"
          ],

          type: [
            v =>  v.length <= 32 || 'Max 32 characters',
            v => !!v || "This field is required"
          ],
        },
        reason: "",
        indexOfScholarship: "",
        nameOfScholarship: "",
        act: {
          name: "",
          type: "",
        },
        activitieShow: [],
        passPayload: {},
        snackbar: {
          snackbarFail: false,
          snackbarPass: false,
        },
    }
  },

  validations: {
    act: {
      name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(128)
      },

      type: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(32)
      }
    },
    reason: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(256)
    }
  },

  methods: {
    showDetails(item) {
      let jwtToken = sessionStorage.getItem('jwt');
       axios({
         method: 'get',
         url: `https://chai-test-backend.herokuapp.com/api/students/${this.$store.getters.getStudentId}/info`,
         headers: {
          Authorization: `bearer ${jwtToken}`
         }
      })
       .then(res => {
        //console.log(res)
        this.payload = res.data.payload[0]
        this.payload.dob = res.data.payload[0].dob.substr(0, 10);
        //Chage gender data
        if (res.data.payload[0].gender === "M")
          this.payload.fullGender = "Men";
        else if (res.data.payload[0].gender === "W")
          this.payload.fullGender = "Women";

        this.nameOfScholarship = item.scholarshipName
        this.indexOfScholarship = this.scholar.indexOf(item)
        this.dialog.dialogDetails = true
       }).catch(err => {
         console.error(err);
       });
      
    },

    submit() {
        this.passPayload.studentId = this.$store.getters.getStudentId
        this.passPayload.scholarshipId = this.scholar[this.indexOfScholarship].scholarshipId
        this.passPayload.reasonOfRequest = this.reason
        this.passPayload.activities = this.activitieShow
        let count = 1
        this.passPayload.activities.forEach(el => {
          el.index = count
          count++
        })
        console.log(this.passPayload)

        let jwtToken = sessionStorage.getItem('jwt');
        axios({
          method: 'post',
          url: `https://chai-test-backend.herokuapp.com/api/scholarships/requests`,
          data: { 
            payload: this.passPayload },
          headers: {
            Authorization: `bearer ${jwtToken}`
          }
      })
       .then(res => {
          console.log(res)
          this.dialog.dialogSubmit = false
          this.cancel()
          this.snackbar.snackbarPass = true
       }).catch(err => {
          console.error(err);
          this.dialog.dialogSubmit = false
          this.snackbar.snackbarFail = true
       });
    },
    cancel(){
      this.activitieShow = []
      this.act.name = ""
      this.act.type = ""
      this.reason = ""
      this.dialog.dialogDetails = false
    },

    addActivities(){
      this.activitieShow.push({
        detail: this.act.name,
        type: this.act.type})
      this.act.name = ""
      this.act.type = ""
    },

    deleteItem(index) {
      this.activitieShow.splice(index,1)
    }
  },

  created() {
    let jwtToken = sessionStorage.getItem('jwt')
       axios({
         method: 'get',
         url: 'https://chai-test-backend.herokuapp.com/api/scholarships',
         headers: {
          Authorization: `bearer ${jwtToken}`
         }
      })
       .then(res => {
        //console.log(res)
        res.data.payload.forEach(el => {
          this.detailOfScholarship.push(el.details)
            delete el.details
          })
          this.scholar = res.data.payload
          //console.log(this.detailOfScholarship)
      })
       .catch(err => {
         console.error(err);
       });
  }

}

</script>

<style scoped>

</style>