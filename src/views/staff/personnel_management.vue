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
                        <v-btn color="primary" @click="gerStudents" :disabled="btn.students">
                            <v-icon left>school</v-icon> students</v-btn>
                        <v-btn color="primary" @click="getLecturers" :disabled="btn.lecturers" class="ml-3">
                            <v-icon left>record_voice_over</v-icon> lecturers</v-btn>
                        <v-spacer/>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details                  
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
                        <v-btn v-if="btn.students" color="success">
                            <v-icon left>person_add</v-icon> add student</v-btn>
                        <v-btn v-if="btn.lecturers"  color="success">add lecturer</v-btn>                   
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: "personnel_management",

    data() {
        return {
            search: "",
            btn: {
                students: true,
                lecturers: false,
            },
            payload: {
                students: [],
                lecturers: [],
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
            headerLecturer: [{
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
            },
        }
    },

    methods: {
        getLecturers() {
            this.btn.lecturers = true
            this.btn.students = false
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
                    el.fullname = el.title + " " + el.firstName + " " + el.lastName
                    delete el.firstName
                    delete el.lastName
                    delete el.title
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

        gerStudents() {
            this.btn.lecturers = false
            this.btn.students = true
        },
    },

    computed: {
        swapData() {
            if(this.btn.students)
                return this.payload.students
            else if(this.btn.lecturers)
                return this.payload.lecturers       
        },
        
        swapHeader() {
            if(this.btn.students)
                return this.headerStudent
            else if(this.btn.lecturers)
                return this.headerLecturer  
        }
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
                el.fullname = el.title + " " + el.firstName + " " + el.lastName
                delete el.firstName
                delete el.lastName
                delete el.title
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

