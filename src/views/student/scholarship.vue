<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col lg="9">

        <v-card>
          <v-card-title>
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

            <v-dialog max-width="800" v-model="dialogDetails" >
              <v-card>
                dsadsa
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
        </v-card>
        
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',

  data() {
    return{
      dialogDetails: false,
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
          text: "Name of Scholarship",
          value: "scholarshipName",
       
        },
        {
          text: "Details",
          value: "details",
          
        },
        {
          value: 'actions',
          align: "center",
          sortable: false 
        }],
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
        console.log(res)
        this.payload = res.data.payload[0]
        this.payload.dob = res.data.payload[0].dob.substr(0, 10);
        //Chage gender data
        if (res.data.payload[0].gender === "M")
          this.payload.fullGender = "Men";
        else if (res.data.payload[0].gender === "W")
          this.payload.fullGender = "Women";
        this.dialogDetails = true
       }).catch(err => {
         console.error(err);
       });
      
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
        // console.log(res)
        console.log(res.data.payload)
        this.scholar = res.data.payload
        
        console.log(res.data.payload)
      })
       .catch(err => {
         console.error(err);
       });
  }

}

</script>