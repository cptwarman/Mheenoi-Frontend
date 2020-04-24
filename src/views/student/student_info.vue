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
          
        <infoStudent :info = "info" />
        
        <v-card class="pa-5 card1 mt-5">
          <v-row justify="center">
            <v-col lg="3" sm="4" cols="7">
              <v-row justify="center">
                <div>
                  <p><b>ID Card Number</b>: {{info.idCardNumber}}</p>
                  <p><b>Blood type</b>: {{info.bloodType}}</p>
                  <p><b>Phone</b>: {{info.phoneNo}}</p>
                  <p><b>Address</b>: {{info.address}}</p>           
                </div>
              </v-row>
            </v-col>
            
            <v-col lg="4" sm="4" cols="8">
              <v-row justify="center">
                <div>
                  <p><b>Parent1 Full Name</b>: {{info.parent1FirstName}}  {{info.parent1LastName}}</p>
                  <p><b>Parent1 Career</b>: {{info.parent1Career}}</p>
                  <p><b>Parent1 Income</b>: {{info.parent1Income}} Bath</p>
                  <p><b>Parent1 Phone</b>: {{info.parent1Tel}}</p>
                  <p><b>Parent1 Relation<br> 
                  with student</b>: {{info.parent1Relation}}</p>
                </div>
              </v-row>
            </v-col>
          
            <v-col lg="4" sm="4" cols="8">
              <v-row justify="center">
                <div>
                  <p><b>Parent2 Full Name</b>: {{info.parent2FirstName}}  {{info.parent2LastName}}</p>
                  <p><b>Parent2 Career</b>: {{info.parent2Career}}</p>
                  <p><b>Parent2 Income</b>: {{info.parent2Income}} Bath</p>
                  <p><b>Parent2 Phone</b>: {{info.parent2Tel}}</p>
                  <p><b>Parent2 Relation<br> 
                  with student</b>: {{info.parent2Relation}}</p>
                </div>
              </v-row>
            </v-col>

          </v-row>
          <v-card-actions>
            <v-spacer/>
              <v-btn outlined class="mr-2" @click.stop="dialog = true">
                <v-icon left>create</v-icon>
                edit
              </v-btn>
              <v-btn  color="blue" dark href = "/#/student">
                <v-icon left>mdi-home</v-icon>
                home
                </v-btn>
            <v-spacer/>
          </v-card-actions>

          <v-dialog v-model="dialog" persistent max-width="1200">
            <v-card>

              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model.trim="info.firstName"
                    :rules="nameRules"
                    :counter="20"
                    label="First name"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <!-- Buttons -->
                <v-spacer/>
                  <v-btn outlined color="red" class="mr-2" @click.stop="dialog = false">
                    <v-icon left>close</v-icon> cancel
                  </v-btn>
                  
                  <v-btn  color="green" dark>
                    <v-icon left>check</v-icon> confirm
                  </v-btn>
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
import axios from 'axios'
export default {
 name: 'student_info',
 components: {
   infoStudent
 },

 data() {
   return {
     dialog: false,
     nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 10 characters',
      ],
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
        phoneNo: "",
        bloodType: "",
        address: "",
        idCardNumber: "",
        departmentName: "",
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

     infoBuff: {
        dob: "",
        email: "",
        firstName: "",
        lastName: "",
        fullGender: "",
        picturePath: "",
        studentId: "",
        title: "",
        year: "",
        phoneNo: "",
        bloodType: "",
        address: "",
        idCardNumber: "",
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
   }
 },

 methods: {

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
        console.log(res)
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