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

                        <v-col sm="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover v-on="on" @click.stop="dialog.annouce = true">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/annouceEmployee.png" class="mt-3">
                                            <p class="mt-2">Announcements</p>
                                        </v-card-text>
                                    </v-card>
                                </template>
                                
                                <span>Show Announcements</span>
                            </v-tooltip>

                            <v-dialog v-model="dialog.annouce" max-width="800">
                                <v-card>

                                    <v-card-title class="blue--text mb-2">
                                        Announcements 
                                        <v-spacer/>
                                        <v-btn 
                                            color="red darken-1" 
                                            small
                                            text 
                                            @click="dialog.annouce = false"
                                        > close 
                                        </v-btn>
                                    </v-card-title>

                                    <v-card-text>

                                        <p class="cursor">New Government guidelines announced to tackle COVID-19 <b class="new">NEW</b></p>
                                        <p class="cursor">Industrial action update <b class="new">NEW</b></p>
                                        <p class="cursor">Acts of kindness across campus</p>
                                        <p class="cursor">Leading by innovation: Professor scoops award at LeicestershireLive 
                                        <p class="cursor">Leading by innovation: Professor scoops award at LeicestershireLive 
                                            Innovation Awards ceremony</p>
                                        <p class="cursor" style="margin: 0;">Acts of kindness across campus</p>

                                    </v-card-text>
                                </v-card>  
                            </v-dialog>  

                        </v-col> 

                        <v-col sm="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover v-on="on" @click="goToInfo()">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/information.png" class="mt-3">
                                            <p class="mt-2">Information</p>
                                        </v-card-text>
                                    </v-card> 
                                </template>
                                
                                <span>Go to Information page</span>
                            </v-tooltip>
                        </v-col>

                        <v-col sm="12" md="4">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-card hover  v-on="on" @click="goToSubject()">
                                        <v-card-text class="text-center">
                                            <img src="../../assets/subject.png" class="mt-3">
                                            <p class="mt-2 text-no-wrap">Subject Management</p>
                                        </v-card-text>
                                    </v-card> 
                                </template>
                                
                                <span>Go to Subject Management page</span>
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
    name: "lecturer_main",

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
            this.$router.push("/lecturer_info")
        },

        goToSubject() {
            this.$router.push("/subject")
        },
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

