<template>
    <v-container fill-height fluid>
        <v-col>
            <v-row justify="center" class="mb-7">
                <v-card class="py-3 px-5" shaped>
                    <span
                        class="blue--text 
                        font-weight-bold
                        title"
                    > PERSONNEL MANAGEMENT</span>
                </v-card>
            </v-row>

            <v-row justify="center">
                <v-card>
                    <v-card-title>
                        <v-btn color="primary" small rounded @click="getStudents" :disabled="btn.students">
                            <v-icon left>school</v-icon> students</v-btn>
                        <v-btn color="primary" small rounded @click="getLecturers" :disabled="btn.lecturers" class="ml-2">
                            <v-icon left>record_voice_over</v-icon> lecturers</v-btn>
                        <v-btn color="primary" small rounded @click="getStaffs" :disabled="btn.staffs" class="ml-2">
                            <v-icon left>person</v-icon> staffs</v-btn>
                        <v-spacer/>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details           
                                dense       
                            />
                    </v-card-title>

                    <v-card-text class="pb-0">
                        <v-data-table
                            :headers="swapHeader"
                            :items="swapData"
                            :search="search"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-btn x-small color="primary" fab @click="showDetails(item)">
                                    <v-icon> more_horiz </v-icon>     
                                </v-btn>
                            </template>

                        </v-data-table>
                    </v-card-text>

                    <v-card-actions class="pb-3 pt-0 pl-3">                       
                        <v-btn color="success">
                            <v-icon left>person_add</v-icon> add person</v-btn>                   
                    </v-card-actions>

                </v-card>
            </v-row>
        </v-col>

        <!-- Student Detail -->
        <!-- Student Detail -->
        <!-- Student Detail -->

        <v-dialog v-model="dialog.detailS" fullscreen>
            <v-card>
                
            </v-card>
        </v-dialog>

        <!--End Of Student Detail -->
        <!--End Of Student Detail -->
        <!--End Of Student Detail -->

        <!-- lecturer Detail -->
        <!-- lecturer Detail -->
        <!-- lecturer Detail -->

        <v-dialog v-model="dialog.detailL" width="1000">
            <v-card>
                
            </v-card>
        </v-dialog>
  
        <!--End Of lecturer Detail -->
        <!--End Of lecturer Detail -->
        <!--End Of lecturer Detail -->

        <!-- staffs Detail -->
        <!-- staffs Detail -->
        <!-- staffs Detail -->

        <v-dialog v-model="dialog.detailStaff" width="1000">
            <v-card>
                
            </v-card>
        </v-dialog>

        <!--End Of staff Detail -->
        <!--End Of staff Detail -->
        <!--End Of staff Detail -->

        <v-snackbar v-model="snackbar.pass" color="success">
            Add activity Successful
            <v-btn color="white" text @click="snackbar.pass = false"> Close </v-btn>
        </v-snackbar>

        <v-snackbar top v-model="snackbar.fail" color="error">
            Something went wrong
            <v-btn color="white" text @click="snackbar.fail = false"> Close </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: "personnel_management",

    data() {
        return {
             //! own
             //! own

            search: "",
            indexOfInfo: "",

            btn: {
                students: true,
                lecturers: false,
                staffs: false,
            },

            payload: {
                students: [],
                lecturers: [],
                staffs: [],
            },

            headerStudent: [{
                    text: "Student ID",
                    value: "studentId",
                },
                {
                    text: "Student Name",
                    value: "fullname",
                },
                {
                    text: "Faculty",
                    value: "faculty",
                },
                {
                    text: "Department",
                    value: "depName",
                },
                {
                    text: "Degree",
                    value: "degree"
                },
                {
                    value: 'actions',
                    align: "center",
                    sortable: false 
                },
            ],

            headerEmployees: [{
                    text: "Employee ID",
                    value: "employeeId",
                },
                {
                    text: "Student Name",
                    value: "fullname",
                },
                {
                    text: "Faculty",
                    value: "faculty",
                },
                {
                    text: "Department",
                    value: "depName",
                },
                {
                    value: 'actions',
                    align: "center",
                    sortable: false 
                },
            ],

            passPayload: {
                students: [],
                lecturers: [],
                staffs: [],
            },

            dialog: {
                detailS: false,
                detailL: false,
                detailStaff: false,
                add: false,
                submit: false,
                cancel: false,
            },

            snackbar: {
                pass: false,
                fail: false,
            },

            //? from info student
            //? from info student



            //* from info lecturer
            //* from info lecturer
        }
    },

    methods: {
        //! own
        //! own

        getLecturers() {
            this.btn.lecturers = true
            this.btn.students = false
            this.btn.staffs = false

            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'get',
                url: 'https://chai-test-backend.herokuapp.com/api/lecturers',
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                //console.log(res)
                this.payload.lecturers = res.data.payload
                this.passPayload.lecturers = res.data.payload

                _.filter(this.payload.lecturers, el => {
                    // concatnate  name
                    el.fullname = el.firstName + " " + el.lastName
                    delete el.firstName
                    delete el.lastName
                    //change dob foramt
                    el.dob = el.dob.substr(0, 10);
                    //change gebder format
                    if(el.gender === "M")
                        el.gender = "Male"
                    else if(el.gender === "F")
                        el.gender = "Female"
                })
                console.log(this.payload.lecturers)
            })
            .catch(err => {
                console.error(err.respones);
            });
        },

        getStaffs() {
            this.btn.lecturers = false
            this.btn.students = false
            this.btn.staffs = true

            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'get',
                url: 'https://chai-test-backend.herokuapp.com/api/staffs',
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                //console.log(res)
                this.payload.staffs = res.data.payload
                this.passPayload.staffs = res.data.payload

                _.filter(this.payload.staffs, el => {
                    // concatnate  name
                    el.fullname = el.firstName + " " + el.lastName
                    delete el.firstName
                    delete el.lastName
                    //change dob foramt
                    el.dob = el.dob.substr(0, 10);
                    //change gebder format
                    if(el.gender === "M")
                        el.gender = "Male"
                    else if(el.gender === "F")
                        el.gender = "Female"
                })
                console.log(this.payload.staffs)
            })
            .catch(err => {
                console.error(err.respones);
            });
        },

        getStudents() {
            this.btn.lecturers = false
            this.btn.students = true
            this.btn.staffs = false
        },  

        showDetails(item) {
            // get student info by index and open dialog
            if(this.btn.students) {
                this.indexOfInfo = this.payload.students.indexOf(item)
                this.dialog.detailS = true
            }
            // get lecturer info by index and open dialog
            else if(this.btn.lecturers) {
                this.indexOfInfo = this.payload.lecturers.indexOf(item)
                this.dialog.detailL = true
            }
            // get staff info by index and open dialog
            else if(this.btn.staffs) {
                this.indexOfInfo = this.payload.staffs.indexOf(item)
                this.dialog.detailStaff = true
            }
        },

        //? from info student
        //? from info student



        //* from info lecturer
        //* from info lecturer
    },

    computed: {
        //! own
        //! own
        
        swapData() {
            if(this.btn.students)
                return this.payload.students
            else if(this.btn.lecturers)
                return this.payload.lecturers
            else if(this.btn.staffs)   
                return this.payload.staffs
        },
        
        swapHeader() {
            if(this.btn.students)
                return this.headerStudent
            else if(this.btn.lecturers || this.btn.staffs)
                return this.headerEmployees
        },

        //? from info student
        //? from info student

        marginClass() {
            if(this.$vuetify.breakpoint.smAndUp)
                return "ml-4 d-flex justify-center flex-column"
            else
                return "d-flex justify-center flex-column"
        },

        justifyClass() {
            if(this.$vuetify.breakpoint.smAndUp)
                return "center"
            else 
                return "start"
        }

        //* from info lecturer
        //* from info lecturer

    },

    created() {
        let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            url: 'https://chai-test-backend.herokuapp.com/api/students',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            console.log(res)
            this.payload.students = res.data.payload
            this.passPayload.students = res.data.payload

            _.filter(this.payload.students, el => {
                // concatnate name
                el.fullname =  el.firstName + " " + el.lastName
                delete el.firstName
                delete el.lastName
                //change dob foramt
                el.dob = el.dob.substr(0, 10);
                //change gebder format
                if(el.gender === "M")
                    el.gender = "Male"
                else if(el.gender === "F")
                    el.gender = "Female"
            })
            console.log(this.payload.students)
        })
        .catch(err => {
            console.error(err.respones);
        });
    }
}
</script>

<style scope>
    .card1 p:not(:last-child) {
        margin-bottom: 35px;
    }

    p {
        word-wrap: break-word;
    }
</style>
