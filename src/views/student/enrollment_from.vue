<template>

    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col>

                <v-row justify="center" class="mb-7">
                    <v-card class="py-3 px-5">
                        <div class="text-center">
                            <span :class="calFont"> ENROLLMENT SYSTEM </span> <br>
                            <span :class="calFont2"> {{enroll.year}} Semester {{enroll.semester}} </span>
                        </div>
                    </v-card>
                </v-row>

                <!-- button start -->
                <v-row justify="center" class="mt-10" v-if="!btn.start && !btn.confirm">
                    <v-btn :disabled="isEnroll" color="primary" x-large rounded @click="clickStart()">
                        <span class="headline">start</span> 
                    </v-btn>
                </v-row>

                <!-- list subject -->
                <!-- list subject -->
                <!-- list subject -->

                <div v-if="btn.start && !btn.confirm">

                    <v-row justify="center">
                        <v-col cols="12" sm="8">
                            <v-card>
                                <v-card-title class="blue--text">
                                    Subjects List
                                    <v-spacer/>
                                    <v-btn color="info" @click.stop="dialog.add = true">
                                        <v-icon left>queue</v-icon> subject
                                    </v-btn>
                                </v-card-title>

                                <v-card-text>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Subject ID</th>
                                                    <th class="text-center">Subject Name</th>
                                                    <th class="text-center">Section</th>
                                                    <th class="text-center">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in payload.subjectList" :key="index">
                                                    <td class="text-center">{{ item.subjectId }}</td>
                                                    <td class="text-center">{{ item.subjectName }}</td>
                                                    <td class="text-center">{{ item.sectionId }}</td>
                                                    <td class="text-center">
                                                        <v-icon  @click="removeSubject(item)">delete</v-icon>    
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer/>
                                        <v-btn color="success" rounded @click="confirm()" :disabled="checkConfirm">
                                            <v-icon left>check</v-icon> confirm</v-btn>
                                    <v-spacer/>
                                </v-card-actions>

                            </v-card>
                        </v-col>
                    </v-row>

                    <v-dialog v-if="dialog.add" v-model="dialog.add" persistent scrollable width="1000">
                        <v-card>
                            <v-card-title>
                                <p class="blue--text title">Section List</p>
                                <v-spacer/>

                                <div class="d-flex mt-2">
                                
                                    <v-text-field
                                        label="Subject ID"
                                        outlined
                                        dense
                                        :rules="rules.subjectId"
                                        v-model="subjectId"
                                        style="width: 250px"
                                    />

                                    <v-btn fab small color="info" class="ml-4" :disabled="$v.subjectId.$invalid" @click="searchSubject()">
                                        <v-icon>search</v-icon>
                                    </v-btn>
                                </div>

                            </v-card-title>
                            <!-- table -->
                            <v-card-text>
                                <v-data-table
                                    :headers="header"
                                    :items="payload.getSubject"
                                    >

                                    <template v-slot:item.actions="{ item }">
                                        <v-btn x-small color="success" fab @click="selectSection(item)">
                                            <v-icon>check</v-icon>     
                                        </v-btn>
                                    </template>

                                </v-data-table>
                            </v-card-text>

                            <v-card-actions class="pt-0 pb-3">
                                <v-spacer/>
                                    <v-btn color="error" rounded @click="close()">
                                        <v-icon left>clear</v-icon> close</v-btn>
                                <v-spacer/>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </div>

                <v-row justify="center" v-if="btn.confirm">
                    <v-col cols="12" sm="9">
                        <v-card>

                            <v-card-title class="blue--text">
                                My Enrollment
                            </v-card-title>

                            <v-card-text>
                                <v-data-table
                                    :headers="header2"
                                    :items="payload.myEnroll"
                                />
                            </v-card-text>

                            <v-card-actions class="pt-0 pb-4">
                                <v-spacer/>
                                    <v-btn rounded color="success" @click="payment()">Payment</v-btn>
                                <v-spacer/>
                            </v-card-actions>

                        </v-card>
                    </v-col>
                </v-row>

            </v-col>
        </v-row>

         <!-- subject -->
        <v-snackbar v-model="snackbar.subject" color="success">
            Add subject Successful
            <v-btn color="white" text @click="snackbar.subject = false"> Close </v-btn>
        </v-snackbar>
         <!-- remove -->
        <v-snackbar v-model="snackbar.remove" color="success">
            Remove subject Successful
            <v-btn color="white" text @click="snackbar.remove = false"> Close </v-btn>
        </v-snackbar>
        
        <!-- fail -->
        <v-snackbar v-model="snackbar.fail" color="error">
            Something went wrong
            <v-btn color="white" text @click="snackbar.fail = false"> Close </v-btn>
        </v-snackbar>

        <!-- fail Seacrhing -->
        <v-snackbar v-model="snackbar.seacrh" color="warning">
            Wrong subject ID
            <v-btn color="white" text @click="snackbar.seacrh = false"> Close </v-btn>
        </v-snackbar>

        <!-- fail select section -->
        <v-snackbar v-model="snackbar.select" color="warning">
            You are already selected this section
            <v-btn color="white" text @click="snackbar.select = false"> Close </v-btn>
        </v-snackbar>

    </v-container>

</template>

<script>
import {required, email, minLength, maxLength , between, decimal, numeric} from "vuelidate/lib/validators";
import axios from 'axios'

export default {
    name: 'enrollment',

    data() {
      return {
            subjectId: null,

            btn: {
                start: false,
                confirm: false,
            },

            dialog: {
                add: false,
            },

            snackbar: {
                pass: false,
                fail: false,
                seacrh: false,
                select: false,
                subject: false,
                remove: false,
            },

            payload: {
                enrollmentId: null,
                subjectList: [],
                getSubject: [],
                myEnroll: [],
            },

            rules: {
                subjectId: [
                    v => !!v || "This field is required for searching",
                    v => (v && v.length <= 6) || "subject ID must be less than 6 characters",
                ],
            },

            header: [
                {
                    text:  "Subject ID", 
                    value: "subjectId",
                    sortable: false 
                },
                {
                    text: "Subject name", 
                    value: "subjectName",
                    sortable: false 
                },
                {
                    text: "Section",
                    value: "sectionId",
                    align: "center",
                    sortable: false 
                },
                {
                    text: "Seats",
                    value: "seat",
                    align: "center",
                    sortable: false 
                },
                {
                    text: "Remain seats",
                    value: "remainSeat",
                    align: "center",
                    sortable: false 
                },
                {
                    value: "actions",
                    align: "center",
                    sortable: false 
                }
            ],

            header2: [
                {
                    text:  "Subject ID", 
                    value: "subjectId",
                    sortable: false 
                },
                {
                    text: "Subject name", 
                    value: "subjectName",
                    sortable: false 
                },
                {
                    text: "Section",
                    value: "sectionId",
                    align: "center",
                    sortable: false 
                },

            ],

            enroll: {
                status: null,
                year: null,
                semester: null,
            },

            
        }
    },

    validations: {
        subjectId: {
            required,
            maxLength: maxLength(6)
        }
    },

    methods: {
        async clickStart() {
            this.btn.start  = true

            let jwtToken = sessionStorage.getItem('jwt')
            try {
                let create  =  await axios({
                                            method: 'post',
                                            url: `https://chai-test-backend.herokuapp.com/api/enrollments/create`,
                                            headers: { Authorization: `bearer ${jwtToken}`}
                                        })
                this.payload.enrollmentId = create.data.payload.enrollmentId
                //console.log(this.payload.enrollmentId)
            } catch(err) {
                console.error(err);
                this.snackbar.fail = true
                this.btn.start  = false
            }

            try {
                let subject  =  await axios({
                                            method: 'get',
                                            url: `https://chai-test-backend.herokuapp.com/api/enrollments/${this.payload.enrollmentId}`,
                                            headers: { Authorization: `bearer ${jwtToken}`}
                                        })
                console.log(subject)
                if(subject.data.payload.result.length == 0) {
                    this.payload.subjectList.push()
                }
                else 
                    this.payload.subjectList = subject.data.payload.result

                    
            } catch(err) {
                console.error(err);
                this.snackbar.fail = true
                this.btn.start  = false
            }
        },

        close() {

            this.dialog.add = false
            this.subjectId = null
            this.payload.getSubject = []

            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'get',
                url: `https://chai-test-backend.herokuapp.com/api/enrollments/${this.payload.enrollmentId}`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                console.log(res)
                this.payload.subjectList = res.data.payload.result
            })
            .catch(err => {
                console.error(err.respones);
                this.snackbar.fail = true
            });

        },

        searchSubject() {
            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'get',
                url: `https://chai-test-backend.herokuapp.com/api/enrollments/subjects/${this.subjectId}`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                console.log(res)
                if(res.data.payload.result.length == 0)
                    this.snackbar.seacrh = true
                else
                    this.payload.getSubject = res.data.payload.result

                console.log(this.payload.getSubject)
                this.subjectId = null
            })
            .catch(err => {
                console.error(err.respones);
                this.snackbar.fail = true
            });
        },

        selectSection(item) {
            console.log(`https://chai-test-backend.herokuapp.com/api/enrollments/${this.payload.enrollmentId}/${item.subjectId}/${item.sectionId}`)
            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'post',
                url: `https://chai-test-backend.herokuapp.com/api/enrollments/${this.payload.enrollmentId}/${item.subjectId}/${item.sectionId}`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                //console.log(res)
                if(res.data == "")
                    this.snackbar.select = true
                else
                    this.snackbar.subject = true
        
            })
            .catch(err => {
                console.error(err.respones);
                this.snackbar.fail = true
            });
        },

        removeSubject(item) {
            console.log(this.payload.enrollmentId)
        
            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'get',
                url: `https://chai-test-backend.herokuapp.com/api/enrollments/${this.payload.enrollmentId}/${item.subjectId}/delete`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                console.log(res)
                this.snackbar.remove = true

                axios({
                method: 'get',
                url: `https://chai-test-backend.herokuapp.com/api/enrollments/${this.payload.enrollmentId}`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
                })
                .then(res => {
                    console.log(res)
                    this.payload.subjectList = res.data.payload.result

                })
                .catch(err => {
                    console.error(err.respones);
                    this.snackbar.fail = true
                });

            })
            .catch(err => {
                console.error(err.respones);
                this.snackbar.fail = true
            });
        },

        confirm() {
            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'post',
                url: `https://chai-test-backend.herokuapp.com/api/enrollments/confirm`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
                })
                .then(res => {
                    console.log(res)
                    this.btn.confirm = true

                        axios({
                            method: 'get',
                            url: `https://chai-test-backend.herokuapp.com/api/enrollments/${this.payload.enrollmentId}`,
                            headers: {
                                Authorization: `bearer ${jwtToken}`
                            }
                            })
                            .then(res => {
                                console.log(res)
                                this.payload.myEnroll = res.data.payload.result
                            })
                            .catch(err => {
                                console.error(err.respones);
                                this.snackbar.fail = true
                        });


                })
                .catch(err => {
                    console.error(err.respones);
                    this.snackbar.fail = true
            });
        },

        payment() {
            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'post',
                url: `https://chai-test-backend.herokuapp.com/api/enrollments/paying`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
                })
                .then(res => {
                    console.log(res)
                    setTimeout(() => this.$router.replace("/student"), 2000)
                })
                .catch(err => {
                    console.error(err.respones);
                    this.snackbar.fail = true
            });

            
        }
    },

    computed: {
        calFont() {
            if(this.$vuetify.breakpoint.xs)
                return "blue--text font-weight-bold title"
            else
                return "blue--text font-weight-medium display-1"
        },

        calFont2() {
            if(this.$vuetify.breakpoint.xs)
                return "blue--text font-weight-bold subtitle-1"
            else
                return "blue--text font-weight-medium headline"
        },

        isEnroll() {
            console.log(this.enroll.status)
            if(this.enroll.status == "completed") {
                return true
            }
            else
                return false
        },

        checkConfirm() {
            if(this.payload.subjectList.length == 0)
                return true
            else
                return false
        }
    },

    created() {
        let temp = this.$store.getters.getIsEnroll

        this.enroll.status = temp.status
        this.enroll.year = temp.year
        this.enroll.semester = temp.semester
        //console.log(this.enroll.status)
        if(temp.status == "enrolled") {
            this.btn.confirm = true

            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'post',
                url: `https://chai-test-backend.herokuapp.com/api/enrollments/create`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
                })
                .then(res => {
                    this.payload.enrollmentId = res.data.payload.enrollmentId
                    //console.log(res)

                    axios({
                        method: 'get',
                        url: `https://chai-test-backend.herokuapp.com/api/enrollments/${this.payload.enrollmentId}`,
                        headers: {
                            Authorization: `bearer ${jwtToken}`
                        }
                        })
                        .then(res => {
                            //console.log(res)
                            this.payload.myEnroll = res.data.payload.result
                        })
                        .catch(err => {
                            console.error(err.respones);
                            this.snackbar.fail = true
                    });

                })
                .catch(err => {
                    console.error(err.respones);
                    this.snackbar.fail = true
            });

            
            
        }
        //console.log(this.btn.confirm)
    }   
}
</script>

<style scoped>

</style>