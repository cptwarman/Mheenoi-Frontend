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
            <v-data-table
              :headers="headers"
              :items="scholar"
              :search="search"
            ></v-data-table>
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
      scholar: [],
      details: [],
      search: "",
      headers: [{
          text: "Scholarship ID",
          value: "scholarshipId"
          },
        {
          text: "Donator",
          value: "donator"
        },
        {
          text: "Name of Scholarship",
          value: "scholarshipName"
        }],
      data: "",
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
        res.data.payload.forEach(el => {
            this.details = el.details
            delete el.details
          })
        //console.log(this.details)
        this.scholar = res.data.payload
        
        console.log(res.data.payload)
      })
       .catch(err => {
         console.error(err);
       });
  }

}

</script>