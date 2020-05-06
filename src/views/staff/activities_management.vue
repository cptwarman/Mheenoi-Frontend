<template>
  <v-container fluid fill-height>
      <v-row justify="center">
            <v-col cols="10">

                <v-row justify="center" class="mb-7">
                    <v-card class="py-3 px-5" shaped>
                        <span :class="calFont">  ACTIVITIES MANAGEMENT </span>
                    </v-card>
                </v-row>

                <v-row justify="center">
                     <v-card width="1000" >

                        <v-card-title class="blue--text">
                                Activities List
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
                            :headers="table.headers"
                            :items="payload"
                            :search="search"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-btn x-small color="primary" fab @click="showDetails(item)">
                                    <v-icon> more_horiz </v-icon>     
                                </v-btn>
                            </template>
                        </v-data-table>

                        <!-- dialog details -->
                        <v-dialog v-model="dialog.details" max-width="950" scrollable>
                            <v-card>
                                <v-card-title class="blue--text ml-2 pt-4 pb-2 font-weight-bold">
                                    ACTIVITY DETAIL

                                    <v-spacer/>
                                    <v-btn dark class="mx-2" fab color="red" x-small @click="dialog.details = false" >
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-card-text v-if="dialog.details">
                                    <v-container fluid>
                                        <v-col>
                                            <v-row no-gutters class="subtitle-1">About activity</v-row>

                                            <!-- Detail -->
                                                <v-row class="ml-3">
                                                    <v-col cols="12">
                                                        <div>
                                                            <p class="subtitle-2"><b>Detail: </b> {{payload[indexOfActivity].detail}}</p>
                                                        </div>
                                                    </v-col>
                                                </v-row>

                                            <v-row justify="center" class="ml-3"> 
                                                <!-- row detail etc. -->
                                                <v-col cols="12" sm="4">
                                                    <v-row no-gutters>
                                                        <div>
                                                            <p class="subtitle-2"><b>Activity name: </b> {{payload[indexOfActivity].name}}</p>
                                                            <p class="subtitle-2"><b>Location: </b>  {{payload[indexOfActivity].location}}</p>
                                                        </div>
                                                    </v-row>
                                                </v-col>
                                                <v-col cols="12" sm="4">
                                                    <v-row no-gutters>
                                                        <div>
                                                            <p class="subtitle-2"><b>Start-date: </b> {{payload[indexOfActivity].startDate}}</p>
                                                            <p class="subtitle-2"><b>End-date: </b>  {{payload[indexOfActivity].endDate}}</p>
                                                        </div>
                                                    </v-row>
                                                </v-col>
                                                <v-col cols="12" sm="4">
                                                    <v-row no-gutters>
                                                        <div>
                                                            <p class="subtitle-2"><b>Start-time: </b> {{payload[indexOfActivity].startTime}}</p>
                                                            <p class="subtitle-2"><b>End-time: </b> {{payload[indexOfActivity].endTime}}</p>
                                                        </div>
                                                    </v-row>
                                                </v-col>
                                            </v-row>

                                            <v-row no-gutters class="subtitle-1 mt-5">List of participants</v-row>

                                            <v-row>
                                                <v-col>
                                                    <v-simple-table height="250">  
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center">No</th>
                                                                <th class="text-center">Student ID</th>
                                                                <th class="text-center">Student Name</th>
                                                                <th class="text-center">Duty</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                             <tr v-for="(value,index) in payloadStaff" v-bind:key="value.studentId">
                                                                <td> {{index + 1}} </td>
                                                                <td v-for="data in value" v-bind:key="data.studentId">
                                                                    {{data}}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>

                                        </v-col>
                                    </v-container>
                                </v-card-text>

                                <!-- delete button -->
                                <v-card-actions>
                                    <v-spacer/>
                                        <v-btn color="error" @click.stop="dialog.dialogCancel = true">
                                            <v-icon left>delete_outline</v-icon> delete
                                        </v-btn>
                                    <v-spacer/>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card>
                </v-row>
                
                <!-- dialog delete submit -->
                <v-dialog v-model="dialog.dialogCancel" max-width="450">
                    <v-card class="pa-5">   
                        <v-card-text class="text-center">
                            <img src="../../assets/alert.png" alt="alert" width="180">
                            <h2 class="mt-4">Are you sure you want to <span class="red--text">delete</span> ?</h2>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer/>
                                <v-btn @click.stop="dialog.dialogCancel = false" color="error" outlined> no </v-btn>
                                <v-btn @click.stop="deleteActivity()" color="error" class="ml-6" outlined> yes </v-btn>
                            <v-spacer/>
                            </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- delete Successful -->
                <v-snackbar v-model="snackbar.passDel" color="success">
                    Delete Successful
                    <v-btn color="white" text @click="snackbar.passDel = false"> Close </v-btn>
                </v-snackbar>
                
                <!-- delete fail -->
                <v-snackbar v-model="snackbar.failDel" color="error">
                    Delete Failed
                    <v-btn color="white" text @click="snackbar.failDel = false"> Close </v-btn>
                </v-snackbar>
                
            </v-col>
      </v-row>
  </v-container>
</template>

<script>
import {required, email, minLength, maxLength , between, decimal, numeric} from "vuelidate/lib/validators";
import axios from 'axios'

export default {
name: "activities",
data() {
    return {
        search: "",
        indexOfActivity: "",

        snackbar: {
            pass: false,
            fail: false,
            passDel: false,
            failDel: false,
        },

        dialog: {
            details: false,
            dialogCancel: false,
            dialogSubmit: false
        },

        table: {
            headers: [{
                text: "Activities Name", 
                value: "name"
            },
            {
                text: "Start Date", 
                value: "startDate"
            },
            {
                text: "End Date", 
                value: "endDate"
            },
            {
                text: "Location",
                value: "location"
            },
            {
                value: 'actions',
                align: "center",
                sortable: false 
            }],
        },

        payload: [],        //all activity from server
        payloadStaff: [],   //all staff in each activity from server

        passPayload: {
            name: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            detail: "",
            location: "",
            staffs: [],
        },

        staffBuff: {
            studentId: "",
            duty: "",
        },

        rules: {
            name: [
                v => !!v || "This field is required",
                v => v.length > 2 || "Activity name must be more than 2 characters",
                v => v.length <= 64 || "Activity name must be less than 32 characters",
            ],
            detail: [
                v => !!v || "This field is required",
                v => v.length > 9  || "Detail must be more than 9 characters",
                v => v.length <= 256 || "Detail must be less than 256 characters",
            ],
            location: [
                v => !!v || "This field is required",
                v => v.length > 2  || "location must be more than 2 characters",
                v => v.length <= 64 || "location must be less than 64 characters",
            ],
            picker: [
                v => !!v || "This field is required",
            ],
            studentId: [
                v => !!v || "Student ID is required",
                v => v.length == 11 || "Student ID must be 11 digits"
            ],
            duty: [
                v => !!v || "Duty is required",
                v => v.length <= 45 || "Duty must be less than 45 characters",
            ],
        },
    }
},

methods: {
    showDetails(item) {

        //? get all details from staff

        let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            url: `https://chai-test-backend.herokuapp.com/api/activities/${item.activityId}/staffs`,
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            this.payloadStaff = res.data.payload
            this.payloadStaff.forEach(el => {
                el.firstName = el.firstName + " " + el.lastName
                delete el.lastName
            })
            //console.log(this.payloadStaff)
            this.indexOfActivity = this.payload.indexOf(item)
            this.dialog.details  = true
        })
        .catch(err => {
            console.error(err);
            snackbar.fail = true
        });
    },


    deleteActivity() {
        // console.log(this.payload[this.indexOfActivity].activityId)
        let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            url: `https://chai-test-backend.herokuapp.com/api/activities/${this.payload[this.indexOfActivity].activityId}/delete`,
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            console.log(res)
            this.snackbar.passDel = true
            this.dialog.details = false
            this.dialog.dialogCancel = false
            setTimeout(() => location.reload(), 2000)
        })
        .catch(err => {
            console.error(err.respons);
            this.dialog.dialogCancel = false
            this.snackbar.failDel = true
        });  
    },

},

computed: {
    calFont() {
        if(this.$vuetify.breakpoint.xs)
            return "blue--text font-weight-bold subtitle-1"
        else
            return "blue--text font-weight-bold title"
    }
},

created() {
    let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            url: 'https://chai-test-backend.herokuapp.com/api/activities',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            //console.log(res)
            this.payload = res.data.payload
            this.payload.forEach(el => {
                el.startDate = el.startTime.substr(0, 10)
                el.startTime = el.startTime.substr(11, 12)
                el.endDate = el.endTime.substr(0, 10)
                el.endTime = el.endTime.substr(11, 12)
            });
            console.log(this.payload)
        })
        .catch(err => {
            console.error(err);
        });
},

}
</script>
