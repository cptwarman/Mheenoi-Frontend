<template>
    <v-container fill-height fluid>
        <h1>Staff main</h1>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: "staff_main",

    data() {
      return {

      }
    },

    methods: {

    },

    computed: {

    },

    created() {
        let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            url: 'https://chai-test-backend.herokuapp.com/api/employees/dashboard',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            this.payload = res.data.payload[0]
            // console.log(this.payload)

            // Pass studentId to info page
            this.$store.dispatch("syncId",this.payload.employeeId)
            // Pass data to Navbar
            this.$store.dispatch("syncfirstName",this.payload.firstName)
        })
        .catch(err => {
            console.error(err.respones);
        });
    }
}
</script>

