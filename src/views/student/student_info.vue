<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="9" sm="11">
        <v-col lg="12">
          <v-row justify="center" class="mb-3">
            <v-card class="py-3 px-5" shaped>
              <span
                class="blue--text 
                font-weight-bold
                title"
              > STUDENT INFORMATION</span>
            </v-card>
          </v-row>
        </v-col>
          
        <infoStudent :info = "payload" />
        
        <v-card class="pa-5 card1 mt-5">
          <v-row justify="center">
            <v-col lg="4" sm="4" cols="8">
              <v-row :justify="justifyClass" :class="marginClass">
                <div>
                  <h3 class="blue--text mb-4">Student</h3>
                  <p><b>ID Card Number</b>: {{payload.idCardNumber}}</p>
                  <p><b>Blood type</b>: {{payload.bloodType}}</p>
                  <p><b>Phone</b>: {{payload.phoneNo}}</p>
                  <p><b>Address</b>: {{payload.address}}</p>           
                </div>
              </v-row>
            </v-col>
            
            <v-col lg="4" sm="4" cols="8">
              <v-row :justify="justifyClass">
                <div>
                  <h3 class="blue--text mb-4">Guardian 1</h3>
                  <p><b>First Name</b>: {{payload.parent1FirstName}}</p>
                  <p><b>Last Name</b>: {{payload.parent1LastName}}</p>
                  <p><b>Career</b>: {{payload.parent1Career}}</p>
                  <p><b>Income</b>: {{payload.parent1Income}} Bath</p>
                  <p><b>Phone</b>: {{payload.parent1Tel}}</p>
                  <p><b>Relation with student</b>: {{payload.parent1Relation}}</p>
                </div>
              </v-row>
            </v-col>
          
            <v-col lg="4" sm="4" cols="8">
              <v-row :justify="justifyClass">
                <div>
                  <h3 class="blue--text mb-4">Guardian 2</h3>
                  <p><b>First Name</b>: {{payload.parent2FirstName}}</p>
                  <p><b>Last Name</b>: {{payload.parent2LastName}}</p>
                  <p><b>Career</b>: {{payload.parent2Career}}</p>
                  <p><b>Income</b>: {{payload.parent2Income}} Bath</p>
                  <p><b>Phone</b>: {{payload.parent2Tel}}</p>
                  <p><b>Relation with student</b>: {{payload.parent2Relation}}</p>
                </div>
              </v-row>
            </v-col>

          </v-row>
          <v-card-actions>
            
            <v-spacer/>
              <v-btn outlined class="mr-2" @click.stop="dialog = true" @click="editInfo()">
                <v-icon left>create</v-icon> edit
              </v-btn>

              <v-btn  color="blue" dark href = "/#/student">
                <v-icon left>mdi-home</v-icon> home
              </v-btn>
            <v-spacer/>

          </v-card-actions>

          <v-dialog v-model="dialog" persistent max-width="1200" scrollable>
            <v-card>
              <!-- Input fields -->
              <v-card-text class="pb-0">
                <v-form @submit.prevent="handleSubmit">
                  <v-container fluid>
                    <v-col>
                      <v-row no-gutters>
                        <span class="blue--text subtitle-1">
                          About Student
                        </span>
                      </v-row>
                    <!-- row about student -->
                      <v-row justify="center" :no-gutters="$vuetify.breakpoint.smAndDown">
                        <!-- Column 1 -->
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="passPayload.firstName"
                            :rules="Rules.nameRules"
                            :counter="32"
                            label="First name"
                            required
                          ></v-text-field>

                          <v-text-field
                            v-model="passPayload.lastName"
                            :rules="Rules.nameRules"
                            :counter="32"
                            label="Last name"
                            required
                            class="mt-5"
                          ></v-text-field>

                          <v-text-field
                            v-model="passPayload.email"
                            :rules="Rules.emailRules"
                            :counter="32"
                            label="Email"
                            required
                            class="mt-5"
                          ></v-text-field>                        
                        </v-col>

                        <!-- column 2 -->
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="passPayload.idCardNumber"
                            :rules="Rules.idCardRules"
                            :counter="13"
                            label="ID Card Number"
                            required
                            
                          ></v-text-field>

                          <v-text-field
                            v-model="passPayload.phoneNo"
                            :rules="Rules.phoneRules"
                            :counter="10"
                            label="Phone"
                            hint="You can use the home number instead phone number"
                            required
                            class="mt-5"
                          ></v-text-field>

                          <v-text-field
                            v-model="passPayload.address"
                            :rules="Rules.addressRules"
                            :counter="128"
                            label="Address"
                            required
                            class="mt-5"
                          ></v-text-field>

                        </v-col>

                        <!-- column 3 -->
                        <v-col cols="12" md="4">
                          <v-select
                            v-model="passPayload.fullGender"
                            :items = "genderSelect"
                            label="Gender"
                            required
                          ></v-select>

                          <v-select
                            v-model="passPayload.bloodType"
                            :items = "bloodTypeSelect"
                            label="blood Type"
                            required
                            class="mt-5"
                          ></v-select>

                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="passPayload.dob"
                            transition="scale-transition"
                            offset-y
                            offset-overflow
                            min-width="290px"
                          >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="passPayload.dob"
                                  label="Date of Birth"
                                  class="mt-5"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="passPayload.dob" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(passPayload.dob)">OK</v-btn>
                              </v-date-picker>
                          </v-menu>


                        </v-col>

                      </v-row>

                      <!-- Row About Family -->
                      <!-- Header -->
                      <v-row no-gutters class="mt-5">
                        <span class="blue--text subtitle-1">
                          About Family
                        </span>
                      </v-row>
                      <!-- Input -->
                      <v-row justify="center" :no-gutters="$vuetify.breakpoint.smAndDown">

                       <!-- 1st col -->
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="passPayload.parent1FirstName"
                            :rules="Rules.nameRules"
                            :counter="32"
                            label="Guardian1 First name"
                            required
                          ></v-text-field>

                          <v-text-field
                            v-model="passPayload.parent1LastName"
                            :rules="Rules.nameRules"
                            :counter="32"
                            label="Guardian1 Last name"
                            required
                            class="mt-5"
                          ></v-text-field>

                          <v-text-field
                            v-model="passPayload.parent1Career"
                            :rules="Rules.careerRules"
                            :counter="20"
                            label="Guardian1 Career"
                            required
                            hint="If your guardian doesn' have a career, you can enter - "
                            class="mt-5"
                          ></v-text-field>
                          
                          <v-text-field
                            v-model="passPayload.parent1Income"
                            :rules="Rules.incomeRules"
                            label="Guardian1 Income"
                            required
                            hint="if your guardian doesn't have income, you can enter 0"
                            class="mt-5"
                          ></v-text-field>
                                        
                        </v-col>

                        <!-- 2nd col -->

                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="passPayload.parent1Tel"
                            :rules="Rules.phoneRules"
                            :counter="10"
                            label="Guardian1 Phone"
                            hint="You can use the home number instead phone number"
                            required
                          ></v-text-field>

                          <v-select
                            v-model="passPayload.parent1Relation"
                            :items = "RelationSelect"
                            label="Guardian1 Relation with Student"
                            required
                            class="mt-5"
                          ></v-select>

                          <v-text-field
                            v-model="passPayload.parent2FirstName"
                            :rules="Rules.nameRules"
                            :counter="32"
                            label="Guardian2 First name"
                            required
                            class="mt-5"
                          ></v-text-field>
                          
                          <v-text-field
                            v-model="passPayload.parent2LastName"
                            :rules="Rules.nameRules"
                            :counter="32"
                            label="Guardian2 Last name"
                            required
                            class="mt-5"
                          ></v-text-field>         
                        </v-col>

                        <!-- 3rd col -->

                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="passPayload.parent2Career"
                            :rules="Rules.careerRules"
                            :counter="20"
                            label="Guardian2 Career"
                            hint="If your guardian doesn't have a career, you can enter - "
                            required
                          ></v-text-field>

                          <v-text-field
                            v-model="passPayload.parent2Income"
                            :rules="Rules.incomeRules"
                            label="Guardian2 Income"
                            required
                            hint="if your guardian doesn't have income, you can enter 0"
                            class="mt-5"
                          ></v-text-field>
                          
                          <v-text-field
                            v-model="passPayload.parent2Tel"
                            :rules="Rules.phoneRules"
                            :counter="10"
                            hint="You can use the home number instead phone number"
                            label="Guardian2 Phone"
                            required
                            class="mt-5"
                          ></v-text-field>  

                          <v-select
                            v-model="passPayload.parent2Relation"
                            :items = "RelationSelect"
                            label="Guardian2 Relation with Student"
                            class="mt-5"
                          ></v-select>
                        </v-col>
                      </v-row>

                    </v-col>
                  </v-container>

                </v-form>
              </v-card-text>

              <v-card-actions class="pb-5">
                <!-- Buttons -->
                <v-spacer/>
                  <v-btn outlined color="error" class="mr-2" @click="dialogCancel = true">
                    <v-icon left>close</v-icon> cancel
                  </v-btn>
                   <!-- pop up cancel -->
                    <v-dialog v-model="dialogCancel" max-width="450">
                      <v-card class="pa-5">   
                        <v-card-text class="text-center">
                          <img src="../../assets/alert.png" alt="alert" width="180">
                          <h2 class="mt-4">Are you sure you want to <span class="red--text">cancel</span> ?</h2>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer/>
                            <v-btn @click.stop="dialogCancel = false" color="error" outlined> no </v-btn>
                            <v-btn @click.stop="dialog = false" color="error" class="ml-6" outlined> yes </v-btn>
                          <v-spacer/>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  <!-- end of pop up cancel -->

                  <!-- submit button -->
                  <v-btn @click="dialogSubmit = true" :disabled="$v.passPayload.$invalid" color="success" class="ml-6">
                    <v-icon left>check</v-icon> submit
                  </v-btn>

                <!-- pop up submit -->
                  <v-dialog v-model="dialogSubmit" max-width="450">
                    <v-card class="pa-5">
                      <v-card-text class="text-center">
                        <img src="../../assets/alertSoft.png" alt="alertSoft" width="180">
                        <h2 class="mt-4">Are you sure you want to <span class="success--text">submit</span> ?</h2>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer/>
                          <v-btn @click.stop="dialogSubmit = false" color="success" outlined> no </v-btn>
                          <v-btn @click="infoSubmit()" color="success" class="ml-6" outlined> yes </v-btn>
                        <v-spacer/>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                <!-- end of pop up submit -->

                <v-spacer/>

              </v-card-actions>
            </v-card>

          </v-dialog>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import infoStudent from '../../components/infoStudent'
import { required, email, minLength, maxLength , between, decimal, numeric} from "vuelidate/lib/validators";
import axios from 'axios'

export default {
 name: 'student_info',
 components: {
   infoStudent
 },

 data() {
   return {
     menu: false,
     dialog: false,
     dialogSubmit: false,
     dialogCancel: false,
     bloodTypeSelect: ["A","B","O","AB"],
     genderSelect: ["Men", "Women"],
     RelationSelect: ["Brother", "Father", "Uncle", "Grandfather", "Sister", "Mother", "Aunt", "Grandmother"],
     Rules: {
        nameRules: [
            v => !!v || 'Name is required',
            v => (v.length > 2) || 'Name must be more than 2 characters',
            v => (v.length <= 32) || 'Name must be less than 32 characters',
          ],
        idCardRules: [
            v => !!v || 'ID card number is required',
            v => !isNaN(v) || 'ID card number must be a number',
            v => v.length == 13 || 'ID card number must be 13 digits',
          ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v) || 'E-mail must be valid',
            v => v.length <= 32 || 'E-mail must be less than 32 characters',
          ],
        phoneRules: [
            v => !!v || 'Phone number is required',
            v => (v.length == 10 || v.length == 9) || 'Phone must be 10 digits or 9 digits (home number)',
            v => !isNaN(v) || 'Phone must be a number',
          ],
        addressRules: [
            v => !!v || 'Address is required',
            v => (v.length > 4) || 'Address must be more than 4 characters',
            v => (v.length <= 128) || 'Address must be less than 128 characters',
          ],
        careerRules: [
            v => !!v || 'Career is required',
            v => (v.length <= 20) || 'Career be less than 20 characters',
          ],
        incomeRules: [
            v => !!v || 'Income is required',
            v => !isNaN(v) || 'income must be a number',
          ],
     },

     payload: {
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
        phoneNo: "",
        bloodType: "",
        address: "",
        idCardNumber: "",
        depName: "",
        faculty: "",
        parent1Career: "",
        parent1FirstName: "",
        parent1Income: "",
        parent1LastName: "",
        parent1Relation: "",
        parent1Tel: "",
        parent2Career: "",
        parent2FirstName: "",
        parent2Income: "",
        parent2LastName: "",
        parent2Relation: "",
        parent2Tel: "",
      },
     passPayload: {},
   }
 },

  validations: {
    passPayload: {
        email: {
          required,
          email
        },

        firstName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(32)
        },

        lastName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(32)
        },

        phoneNo: {
          numeric,
          required,
          minLength: minLength(9),
          maxLength: maxLength(10)
        },

        address: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(128)
        },

        idCardNumber: {
          required,
          numeric,
          minLength: minLength(13),
          maxLength: maxLength(13)
        },

        parent1Career: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(20)
        },

        parent1FirstName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(32)
        },

        parent1Income: {
          required,
          decimal
        },
        parent1LastName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(32)
        },

        parent1Tel: {
          numeric,
          required,
          minLength: minLength(9),
          maxLength: maxLength(10)
        },

        parent2Career: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(20)
        },

        parent2FirstName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(32)
        },

        parent2Income: {
          required,
          decimal
        },
        parent2LastName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(32)
        },

        parent2Tel: {
          numeric,
          required,
          minLength: minLength(9),
          maxLength: maxLength(10)
        },
    },
  },

 methods: {
   editInfo() {
     this.passPayload = {...this.payload}
   },

   infoSubmit() {
     this.$store.dispatch("syncfirstName",this.passPayload.firstName)
     if(this.passPayload.fullGender === "Men") {
       this.passPayload.title = "Mr."
       this.passPayload.gender = "M"
     }
     else {
       this.passPayload.title = "Ms."
       this.passPayload.gender = "W"
     }   
     this.dialog = false;
     
    delete this.passPayload.fullGender

     let jwtToken = sessionStorage.getItem('jwt')
     axios({
          method: 'put',
          url: `https://chai-test-backend.herokuapp.com/api/students/${this.$store.getters.getStudentId}/info`,
          data: { 
           payload: this.passPayload },
         headers: {
           Authorization: `bearer ${jwtToken}`
          }
       })
       .then(res => {
          location.reload();
       }).catch(err => {
          console.error(err);
       });
   },
 },

 computed: {
   marginClass() {
     if(this.$vuetify.breakpoint.smAndUp)
        return "ml-4"
  },

  justifyClass() {
    if(this.$vuetify.breakpoint.smAndUp)
        return "center"
    else 
        return "start"
  }
 },

 created() {
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
       }).catch(err => {
         console.error(err);
       });

 }
}
</script>

<style scope>
.card1 p:not(:last-child) {
  margin-bottom: 35px;
}
</style>