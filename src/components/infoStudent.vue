<template>
  <v-card class="pt-3 px-5">
    <v-card-text style="line-height: 1.6" class="pa-0">
      <v-row justify="center">
        
        <!-- Picture -->
      
          <v-col md="3" sm="4" cols="10"> 
            <v-row justify="center">     
              <div>
                <img src="../assets/profile/student.png" alt="student" width="180" height="180"/>
              </div>
            </v-row>
          </v-col>
          
        <!-- info 1st col -->
          
          <v-col lg="4" md="4" sm="4" cols="8" >
          
              <div>
                <p><b>Student ID: </b>{{info.studentId}}</p>
                <p><b>First Name: </b>{{info.firstName}}</p>
                <p><b>Last Name: </b>{{info.lastName}}</p>
                <p><b>Gender: </b>{{info.fullGender}}</p>
                <p><b>Degree: </b>{{info.degree}}</p>
              </div>
        
          </v-col>
          
        <!-- info 2nd col -->
            
          <v-col lg="4" md="4" sm="4" cols="8"> 
              <div>
                <p><b>Department: </b>{{info.depName}}</p>
                <p><b>Faculty: </b>{{info.faculty}}</p>
                <p><b>Program: </b>{{info.program}}</p>
                <p><b>E-mail: </b>{{info.email}}</p>
                <p><b>Birthday: </b> {{info.dob}}</p>
              </div>
          </v-col>

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'infoStudent',
  data() {
    return {
      
    }
  },
  props: {
    info: Object
  },

  methods: {

  },

}

  
</script>

<style scope>

</style>
