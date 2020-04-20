<template>
  <v-card class="pt-3 px-5">
    <v-row justify="center">
    
      <!-- Picture -->
      
        <v-col lg="3" md="3" sm="4" cols="12">      
          <div class="profile">
            <v-img src="../assets/nick.jpg" alt="Yodsanick" max-width="250" />
          </div>
        </v-col>
      
      <!-- info 1st col -->
        
        <v-col lg="4" md="4" sm="4" cols="12">
            <div>
              <p><b>Student ID: </b>ssssssssssssssssssssssssssssssssssssssssssssssssssss{{info.studentID}}</p>
              <p><b>Full Name: </b> {{info.firstName}} {{info.lastName}}</p>
              <p><b>Gender: </b> Men</p>
              <p><b>Degree: </b> Barchelor's</p>
              <p><b>Year: </b> 2</p>
            </div>
        </v-col>
        
      <!-- info 2nd col -->

            
        <v-col lg="4" md="4" sm="4" cols="12"> 
          <div>
            <p><b>Department: </b> Computer Engineering</p>
            <p><b>Faculty: </b> Enginering</p>
            <p><b>Program: </b> ปกติจ้า</p>
            <p><b>E-mail: </b> {{info.email}}</p>
            <p><b>Date of birth: </b> 01/09/1999</p>
          </div>
        </v-col>
        
      </v-col>
    </v-row>
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

  }
}

  
</script>

<style scope>

</style>
