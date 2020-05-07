<template>
    <v-container fluid fill-height>
        <v-row justify="center">
            <v-col cols="12" sm="8">

                <v-row justify="center" class="mb-7">
                    <v-card class="py-3 px-5" shaped>
                        <span class="blue--text font-weight-bold title">  ANALYSIS REPORT </span>
                    </v-card>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="6">
                        
                        

                    </v-col>
                </v-row>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'analysis_report',

    data() {
        return {
            payload: {
                studentInDep: [],
                studentInSubject: [],
                scholarship: [],
                employeeInDep: [],
            }
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
            url: 'https://chai-test-backend.herokuapp.com/api/analysis',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            // console.log(res)
            this.payload.studentInDep = res.data.payload[0]
            this.payload.studentInSubject = res.data.payload[1]
            this.payload.scholarship = res.data.payload[2]
            this.payload.employeeInDep = res.data.payload[3]

            console.log(this.payload.employeeInDep)
        })
        .catch(err => {
            console.error(err.respones);
        }); 
    },
}
</script>

<style>

</style>