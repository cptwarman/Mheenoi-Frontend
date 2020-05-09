<template>
    <v-container fill-height fluid v-if="!this.$store.getters.getLoader">
        <v-row justify="center">
            <v-col cols="12" sm="8">

                <v-row justify="center" class="mb-7">
                    <v-card class="py-3 px-5" shaped>
                        <span :class="calFont">  LECTURER  DASHBOARD</span>
                    </v-card>
                </v-row>
                
                <v-col>
                    <infoEmployee :info = "payload"/>
                </v-col>
              
                <v-col>
                    <v-row>

                        <v-col cols="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover height="100%" v-on="on" @click="goToInfo()">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/information.png" class="mt-3">
                                            <p class="mt-2">Information</p>
                                        </v-card-text>
                                    </v-card> 
                                </template>
                                
                                <span>Go to Information page</span>
                            </v-tooltip>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover height="100%" v-on="on" @click="goToSubject()">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/subject.png" class="mt-3">
                                            <p class="mt-2 text-no-wrap">Subject Management</p>
                                        </v-card-text>
                                    </v-card> 
                                </template>
                                
                                <span>Go to Subject Management page</span>
                            </v-tooltip>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover height="100%" v-on="on" @click="goToActivities()">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/activities.png" class="mt-3">
                                            <p class="mt-2">Activities Management</p>
                                        </v-card-text>
                                    </v-card> 
                                </template>
                                
                                <span>Go to Activities Management page</span>
                            </v-tooltip>
                        </v-col>

                    </v-row>

                    <v-row>

                        <v-col cols="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover height="100%" v-on="on" @click="goToScholarship()">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/scholarship.png" class="mt-3">
                                            <p class="mt-2"> Scholarship Management</p>
                                        </v-card-text>
                                    </v-card> 
                                </template>
                                
                                <span>Go to Scholarship Management page</span>
                            </v-tooltip>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover height="100%" v-on="on" @click="goToPersonal()">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/personal.png" class="mt-3">
                                            <p class="mt-2">Personnel Management</p>
                                        </v-card-text>
                                    </v-card> 
                                </template>
                                
                                <span>Go to Personnel Management page</span>
                            </v-tooltip>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover height="100%" v-on="on" @click="goToReport()">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/analytics.png" class="mt-3">
                                            <p class="mt-2">Analysis Report</p>
                                        </v-card-text>
                                    </v-card> 
                                </template>
                                
                                <span>Go to Analysis Report page</span>
                            </v-tooltip>
                        </v-col>

                    </v-row>
                </v-col>

            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import infoEmployee from '../../components/infoEmployee'
import axios from 'axios'
export default {
    name: "staff_main",

    components: {
        infoEmployee
    },

    data() {
      return {
          dialog: {
              annouce: false,
          },

          payload: {},
      }
    },

    methods: {
        goToInfo() {
            this.$router.push("/staff_info")
        },

        goToSubject() {
            this.$router.push("/staff_subject")
        },

        goToActivities() {
            this.$router.push("/activities_management")
        },

        goToScholarship() {
            this.$router.push("/scholarship_editor")
        },

        goToReport() {
            this.$router.push("/analysis")
        },

        goToPersonal() {
            this.$router.push("/personnel")
        }
    },

    computed: {
        calFont() {
            if(this.$vuetify.breakpoint.xs)
                return "blue--text font-weight-bold subtitle-1"
            else
                return "blue--text font-weight-bold title"
        },
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
            this.payload.dob = res.data.payload[0].dob.substr(0, 10);
            //Chage gender data
            if (res.data.payload[0].gender === "M")
                this.payload.gender = "Male";
            else if (res.data.payload[0].gender === "F")
                this.payload.gender = "Female";
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

