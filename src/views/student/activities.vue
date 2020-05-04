<template>
  <v-container fluid fill-height>
      <v-row justify="center">
            <v-col cols="10">
                <v-row justify="center">
                     <v-card width="1000" >
                        <v-card-title class="blue--text">
                                Activities
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
                                        <v-btn color="error" @click="deleteActivity()">
                                            <v-icon left>delete_outline</v-icon> delete
                                        </v-btn>
                                    <v-spacer/>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card>
                </v-row>

                <!-- new buttton -->
                <v-row justify="center" class="mt-5">
                    <v-btn color="primary" @click.stop="dialog.new = true">new activity</v-btn>
                </v-row>

                <!-- add activities -->
                <!-- add activities -->
                <!-- add activities -->
                <v-dialog v-model="dialog.new" persistent max-width="950" scrollable>
                   <v-card>
                       <v-card-title class="blue--text ml-5 py-4 font-weight-bold">
                           NEW ACTIVITY
                       </v-card-title>
                       <v-card-text>
                           <v-form>
                               <v-container fluid>
                                   <v-col>
                                       <!-- header of activity -->
                                       <v-row no-gutters>
                                           <span class="black--text subtitle-1">Activity Information</span>
                                       </v-row>
                                        <!-- activity detail -->
                                        <v-row justify="center">
                                            <!-- 1st col -->
                                            <v-col cols="12" md="6">

                                                <v-text-field
                                                v-model="passPayload.name"
                                                :rules="rules.name"
                                                :counter="64"
                                                label="Activity name"
                                                append-icon="view_headline"
                                                required        
                                                />

                                                <v-text-field
                                                v-model="passPayload.location"
                                                :rules="rules.location"
                                                :counter="64"
                                                append-icon="location_on"
                                                label="Location"
                                                required
                                                class="mt-5"
                                                />

                                                <v-textarea
                                                v-model="passPayload.detail"
                                                :rules="rules.detail"
                                                :counter="256"
                                                label="Detail"
                                                append-icon="sms"
                                                required
                                                class="mt-5"
                                                />

                                            </v-col>
                                            <!-- 2nd col -->
                                            <v-col cols="12" md="6">
                                                <!-- start date -->
                                                <v-menu
                                                ref="menu"
                                                v-model="dialog.menu"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.startDate"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                min-width="290px"
                                                 >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="passPayload.startDate"
                                                        label="Activity start date"
                                                        readonly
                                                        required
                                                        :rules="rules.picker"
                                                        append-icon="date_range"
                                                        v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="passPayload.startDate" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="dialog.menu = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(passPayload.startDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>

                                                <!-- start time -->

                                                <v-menu
                                                ref="menu3"
                                                v-model="dialog.menu3"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.startTime"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                max-width="290px"
                                                min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="passPayload.startTime"
                                                            label="Activity start time"
                                                            append-icon="access_time"
                                                            readonly
                                                            required
                                                            :rules="rules.picker"
                                                            v-on="on"
                                                            class="mt-6"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="dialog.menu3"
                                                        v-model="passPayload.startTime"
                                                        full-width
                                                        format="24hr"
                                                        scrollable
                                                        @click:minute="$refs.menu3.save(passPayload.startTime)"
                                                    ></v-time-picker>
                                                </v-menu>
                                                
                                                <!-- end date -->

                                                <v-menu
                                                ref="menu2"
                                                v-model="dialog.menu2"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.endDate"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                min-width="290px"
                                                 >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="passPayload.endDate"
                                                        label="Activity end date"
                                                        readonly
                                                        required
                                                        :rules="rules.picker"
                                                        append-icon="date_range"
                                                        v-on="on"
                                                        class="mt-6"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="passPayload.endDate" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="dialog.menu2 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu2.save(passPayload.endDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>

                                                <!-- end time -->

                                                <v-menu
                                                ref="menu4"
                                                v-model="dialog.menu4"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.endTime"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                max-width="290px"
                                                min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="passPayload.endTime"
                                                            label="Activity end time"
                                                            append-icon="access_time"
                                                            readonly
                                                            :rules="rules.picker"
                                                            required
                                                            v-on="on"
                                                            class="mt-6"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="dialog.menu4"
                                                        v-model="passPayload.endTime"
                                                        full-width
                                                        format="24hr"
                                                        scrollable
                                                        @click:minute="$refs.menu4.save(passPayload.endTime)"
                                                    ></v-time-picker>
                                                </v-menu>

                                            </v-col>
                                        </v-row>

                                        <!-- header of student -->
                                       <v-row no-gutters class="mt-5">
                                           <span class="black--text subtitle-1">Add Students</span>
                                       </v-row>

                                        <!-- Add student -->
                                       <v-row dense justify="center" class="mt-2">
                                            <v-col :cols="changeCol">
                                                <v-text-field
                                                    label="Student ID"
                                                    outlined
                                                    dense
                                                    counter="11"
                                                    :rules="rules.studentId"
                                                    v-model="staffBuff.studentId"
                                                />
                                            </v-col>
                                            
                                            <!-- Add student - duty -->
                                            
                                            <v-col cols="5" v-if="this.$vuetify.breakpoint.smAndUp">
                                                <v-text-field
                                                    label="Duty"
                                                    outlined
                                                    dense
                                                    counter="45"
                                                    :rules="rules.duty"
                                                    v-model="staffBuff.duty"
                                                />
                                            </v-col>
                                            <!-- button add student -->
                                            <v-col cols="1" v-if="this.$vuetify.breakpoint.smAndUp">
                                                <v-btn class="mx-2" fab  small color="primary"  @click="addStaff()" :disabled="$v.staffBuff.$invalid">
                                                    <v-icon dark>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        
                                        <!-- xs view -->
                                        <v-row v-if="this.$vuetify.breakpoint.xsOnly" no-gutters>
                                            <v-text-field
                                                label="Duty"
                                                outlined
                                                dense
                                                counter="45"
                                                v-on:keyup.enter="addStaff()"
                                                :rules="rules.duty"
                                                v-model="staffBuff.duty"
                                            />
                                        </v-row>

                                        <!-- xs view - button add student -->
                                        <v-row justify="center" v-if="this.$vuetify.breakpoint.xsOnly" no-gutters class="mb-3">
                                            <v-btn class="mx-2" color="primary"  @click="addStaff()" :disabled="$v.staffBuff.$invalid">
                                                <v-icon left>mdi-plus</v-icon> add
                                            </v-btn>
                                        </v-row>

                                        <v-row>
                                            <v-list-item
                                                v-for="(item,index) in passPayload.staffs"
                                                :key="index"> 

                                                {{index+1}}: {{item.studentId}} - {{item.duty}} 

                                                <v-spacer/> 
                                                <v-icon @click="deleteStaff(index)">delete</v-icon>
                                            </v-list-item>
                                        </v-row>

                                   </v-col>
                               </v-container>
                           </v-form>
                       </v-card-text>

                       <v-card-actions class="py-3">
                           <v-spacer/>
                                <v-btn outlined color="error" @click.stop="dialog.dialogCancel = true">
                                    <v-icon left>close</v-icon> cancel</v-btn>      
                                <v-btn class="ml-5" color="success" :disabled="$v.passPayload.$invalid" @click.stop="dialog.dialogSubmit = true">
                                    <v-icon left>check</v-icon> submit</v-btn>
                           <v-spacer/>
                       </v-card-actions>
                   </v-card>

                    <!-- pop up submit -->
                    <v-dialog v-model="dialog.dialogSubmit" max-width="450">
                        <v-card class="pa-5">
                            <v-card-text class="text-center">
                                <img src="../../assets/alertSoft.png" alt="alertSoft" width="180">
                                <h2 class="mt-4">Are you sure you want to <span class="success--text">submit</span> ?</h2>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer/>
                                <v-btn @click.stop="dialog.dialogSubmit = false" color="success" outlined> 
                                    no </v-btn>
                                <v-btn @click="submit()" color="success" class="ml-6" outlined> 
                                    yes </v-btn>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- end of pop up submit -->

                    <!-- pop up cancel -->
                    <v-dialog v-model="dialog.dialogCancel" max-width="450">
                        <v-card class="pa-5">   
                            <v-card-text class="text-center">
                                <img src="../../assets/alert.png" alt="alert" width="180">
                                <h2 class="mt-4">Are you sure you want to 
                                    <span class="red--text">cancel</span> ?
                                </h2>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer/>
                                    <v-btn @click.stop="dialog.dialogCancel = false" color="error" outlined> 
                                        no </v-btn>
                                    <v-btn  @click="cancel()" color="error" class="ml-6" outlined> 
                                        yes </v-btn>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                  <!-- end of pop up cancel -->
                </v-dialog>

                <!-- add Successful -->
                <v-snackbar v-model="snackbar.pass" color="success">
                    Add activity Successful
                    <v-btn color="white" text @click="snackbar.pass = false"> Close </v-btn>
                </v-snackbar>
                
                <!-- delete Successful -->
                <v-snackbar v-model="snackbar.passDel" color="success">
                    Delete Successful
                    <v-btn color="white" text @click="snackbar.passDel = false"> Close </v-btn>
                </v-snackbar>

                <!-- add fail -->
                <v-snackbar v-model="snackbar.fail" color="error">
                    Something went wrong
                    <v-btn color="white" text @click="snackbar.fail = false"> Close </v-btn>
                </v-snackbar>'
                
                <!-- delete fail -->
                <v-snackbar v-model="snackbar.failDel" color="error">
                    Delete Failed
                    <v-btn color="white" text @click="snackbar.failDel = false"> Close </v-btn>
                </v-snackbar>'
                
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
            new: false,
            meun: false,
            menu2: false,
            menu3: false,
            menu4: false,
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

    addStaff(){
        this.passPayload.staffs.push({
            studentId: this.staffBuff.studentId,
            duty: this.staffBuff.duty
        })
        this.staffBuff.studentId = this.staffBuff.duty = ""
    },

    deleteStaff(index) {
        this.passPayload.staffs.splice(index,1)
    },

    deleteActivity() {
        console.log(this.payload[this.indexOfActivity].activityId)
        let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'del',
            url: `https://chai-test-backend.herokuapp.com/api/activities/${this.payload[this.indexOfActivity].activityId}`,
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            console.log(res)
            this.snackbar.passDel = true
        })
        .catch(err => {
            console.error(err.respons);
            this.snackbar.failDel = true
        });
    },

    submit() {
        //! POST TO SERVER
        this.passPayload.startTime = this.passPayload.startDate + " " + this.passPayload.startTime + ":00"
        this.passPayload.endTime = this.passPayload.endDate + " " + this.passPayload.endTime + ":00"
        delete this.passPayload.startDate
        delete this.passPayload.endDate
        console.log(this.passPayload)

        let jwtToken = sessionStorage.getItem('jwt');
        axios({
            method: 'post',
            url: `https://chai-test-backend.herokuapp.com/api/activities`,
            data: { 
                payload: this.passPayload },
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            console.log(res)
            this.dialog.new = false
            this.snackbar.pass = true
            setTimeout(() => location.reload() , 2000)
        })
        .catch(err => {
            console.error(err);
            this.dialog.dialogSubmit = false
            this.snackbar.fail = true
        });
    },

    cancel() {
        this.dialog.new  = false
        this.passPayload = _.mapValues(this.passPayload, el => {
            if(Array.isArray(el))
                return []  
            else
                return ""
        });
        this.staffBuff = _.mapValues(this.staffBuff, () => "")
    },
},

validations: {
    passPayload: {
        name: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(64)
        },
        startDate: {
            required
        },
        startTime: {
            required
        },
        endDate: {
            required
        },
        endTime: {
            required
        },
        detail: {
            required,
            minLength: minLength(10),
            maxLength: maxLength(256)
        },
        location: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(64)
        },
        staffs: {
            required,
        }
    },

    staffBuff: {
        studentId: {
            required,
            decimal,
            minLength: minLength(11),
            maxLength: maxLength(11)
        },
        duty: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(45)
        },
    },
},

computed: {
    changeCol() {
        if(this.$vuetify.breakpoint.xsOnly)
            return "12"
        else
            return "5"
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
                el.startDate = el.startTime.split("T")[0]
                el.startTime = el.startTime.split("T")[1].split("Z")[0]
                el.endDate = el.endTime.split("T")[0]
                el.endTime = el.endTime.split("T")[1].split("Z")[0]
            });
            console.log(this.payload)
        })
        .catch(err => {
            console.error(err);
        });
},

}
</script>

<style>

</style>