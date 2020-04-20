<template>
  <v-card class="pt-3 px-5">
  <v-row justify="center">
    <!-- Picture -->
    
    <v-col lg="3">
        <div class="profile">
          <img src="../assets/nick.jpg" alt="Yodsanick" />
        </div>
    </v-col>

    <!-- info 1st col -->

    <v-col lg="4">
      <div>
        <p><b>Student ID: </b>{{info.studentID}}</p>
        <p><b>Full Name: </b> {{info.firstName}} {{info.lastName}}</p>
        <p><b>Gender: </b> Men</p>
        <p><b>Degree: </b> Barchelor's</p>
        <p><b>Year: </b> 2</p>
      </div>          
    </v-col>

    <!-- info 2nd col -->

    <v-col lg="4"> 
      <div>
          <p><b>Department: </b> Computer Engineering</p>
          <p><b>Faculty: </b> Enginering</p>
          <p><b>Program: </b> ปกติจ้า</p>
          <p><b>E-mail: </b> {{info.email}}</p>
          <p><b>Date of birth: </b> 01/09/1999</p>
      </div>    
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
     Moreinfo() {
      this.$router.replace("/student_info")
    }
  }
}

  
</script>

<style scope>

</style>
