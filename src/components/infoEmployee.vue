<template>
  <v-card class="pt-3 px-5">
    <v-card-text style="line-height: 1.6" class="pa-0">
      <v-row justify="center">
        
        <!-- Picture -->
      
          <v-col md="3" sm="10" cols="10"> 
            <v-row justify="center">     
              <div>
                <img v-if="checkLecturer" src="../assets/profile/lecturer.png" alt="student" width="180" height="180"/>
                <img v-if="checkStaff" src="../assets/profile/staff.png" alt="student" width="180" height="180"/>
              </div>
            </v-row>
          </v-col>
          
        <!-- info 1st col -->
          
          <v-col lg="4" md="4" sm="8" cols="8" >
          
              <div>
                <p><b>Employee ID: </b>{{info.employeeId}}</p>
                <p><b>First Name: </b>{{info.firstName}}</p>
                <p><b>Last Name: </b>{{info.lastName}}</p>
                <p><b>Gender: </b>{{info.gender}}</p>
                <p><b>Blood Type: </b>{{info.bloodType}}</p>
              </div>
        
          </v-col>
          
        <!-- info 2nd col -->
            
          <v-col lg="4" md="4" sm="8" cols="8"> 
              <div>
                <p><b>Department: </b>{{info.depName}}</p>
                <p><b>Faculty: </b>{{info.faculty}}</p>
                <p><b>E-mail: </b>{{info.email}}</p>
                <p><b>Birthday: </b>{{info.dob}}</p>
                <p><b>Position: </b>{{info.position}}</p>
              </div>
          </v-col>

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: 'infoEmployee',
    data() {
        return {
        
        }
    },
    props: {
        info: Object
    },

    methods: {

    },

    computed: {
        checkLecturer() {
            if(this.info.position == "Lecturer")
                return true
            else
              
              return false
        },
        checkStaff() {
            if(this.info.position == "Staff")
                return true
            else
                return false
        },
    }

}


  
</script>

<style scope>

</style>
