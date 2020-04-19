<template>
  <div>
    <v-row justify="center">
      <v-col lg="10">
         <v-row class="mb-3">
              <v-col lg="12">
                <v-row justify="center">
                  <v-card class="py-3 px-5" shaped>
                    <span
                      class="blue--text 
                      font-weight-bold
                      text"
                    > STUDENT INFORMATION</span>
                  </v-card>
                </v-row>
              </v-col>
            </v-row>
        <infoStudent :info = "info" />

        <v-card class="pa-7 card1">
          <v-row justify="center">

            <v-col lg="3">
              <v-row justify="center">
                <div>
                  <p><b>ID Card Number</b>: 1102002998725</p>
                  <p><b>Blood type</b>: O</p>
                  <p><b>Phone</b>: 086-564-9757</p>
                  <p><b>Address</b>: No.9 Road Ban Huameuang N, 
                                    Kaysone Phomvihane City, 
                                    Savannakhet Province, Lao PD</p>
                </div>
              </v-row>
            </v-col>
            
            <v-col lg="4">
              <v-row justify="center">
                <div>
                  <p><b>Parent1 Full Name</b>: 1102002998725</p>
                  <p><b>Parent1 Career</b>: Programmer</p>
                  <p><b>Parent1 Income</b>: 20000$</p>
                  <p><b>Parent1 Phone</b>: 086xxxxxxx</p>
                  <p><b>Parent1 Relation<br> 
                  with student</b>: Father</p>
                </div>
              </v-row>
            </v-col>
          
            <v-col lg="4" >
              <v-row justify="center">
                <div>
                  <p><b>Parent2 Full Name</b>: 1102002998725</p>
                  <p><b>Parent2 Career</b>: Programmer</p>
                  <p><b>Parent2 Income</b>: 20000$</p>
                  <p><b>Parent2 Phone</b>: 086xxxxxxx</p>
                  <p><b>Parent2 Relation<br> 
                  with student</b>: Father</p>
                </div>
              </v-row>
            </v-col>

     

          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
     info: {
        studentID: "",
        firstName: "",
        lastName: "",
        email: "",
      }
   }
 },

 methods: {

 }
}
</script>

<style scope>
.card1 p:not(:last-child) {
  margin-bottom: 35px;
}
</style>