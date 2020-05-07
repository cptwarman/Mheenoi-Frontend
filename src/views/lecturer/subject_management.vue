<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col cols="10">

                 <v-row justify="center" class="mb-7">
                    <v-card class="py-3 px-5" shaped>
                        <span :class="calFont">  SUBJECTS MANAGEMENT </span>
                    </v-card>
                </v-row>

                <v-row justify="center">
                    <v-card width="1000" >

                        <v-card-title class="blue--text ml-3">
                                <span v-if="!btn.back">Subjects List</span>
                                <span v-if="btn.back">{{payload.sectionsDistinct[0].subjectName}}</span>
                            <v-spacer/>

                            <!-- search -->
                            <v-col cols="4">
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                />
                            </v-col>
                        </v-card-title>
                            
                        <v-card-text>

                            <v-data-table
                                :headers="changeHeader"
                                :items="changeItem"
                                :search="search"
                                class="table"
                                >

                                <template v-slot:item.actions="{ item }">
                                    <v-btn v-if="btnShowSection" x-small color="info" fab @click="selectSubject(item)">
                                        <v-icon>navigate_next</v-icon>     
                                    </v-btn>

                                    <v-btn v-if="btnShowSectionDetail" x-small color="info" fab @click="showDetails(item)">
                                        <v-icon>more_horiz</v-icon>     
                                    </v-btn>
                                </template>

                            </v-data-table>

                        </v-card-text>
                        <!-- btn back -->
                        <v-card-actions class="pb-3 pt-0 pl-3"> 
                            <v-btn color="error" v-if="btn.back" @click="backToSubject()"> back </v-btn>            
                        </v-card-actions>
                        
                    </v-card>
                </v-row>

                <!-- dialog detail Section-->
                <!-- dialog detail Section-->
                <!-- dialog detail Section-->

                <v-dialog v-if="dialog.detail" v-model="dialog.detail" persistent scrollable max-width="1000">
                    <v-card>
                        <v-card-title class="blue--text subtitle-1">
                            {{payload.sectionsDistinct[0].subjectId}}  {{payload.sectionsDistinct[0].subjectName}}
                            <v-spacer/>
                            <v-btn color="error" fab x-small @click="closeGrade()">
                                <v-icon>clear</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <div >
                                    <v-list-item >
                                        <span class="blue--text">lecturer List</span>
                                    </v-list-item >
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Section ID</th>
                                                    <th class="text-center">Class</th>
                                                    <th class="text-center">Weekday</th>
                                                    <th class="text-center">Start</th>
                                                    <th class="text-center">End</th>
                                                    <th class="text-center">Lecturer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in payload.sectionsSelect" :key="index">
                                                    <td class="text-center">{{ item.sectionId }}</td>
                                                    <td class="text-center">{{ item.class }}</td>
                                                    <td class="text-center">{{ item.weekday }}</td>
                                                    <td class="text-center">{{ item.startTime }}</td>
                                                    <td class="text-center">{{ item.endTime }}</td>
                                                    <td class="text-center">{{ item.lecturerFullname }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </div>

                                <div class="mt-7 blue--text">
                                    <v-list-item >
                                        <span class="blue--text">Student List</span>
                                        <v-spacer/>
                                        <v-btn small color="info" @click="clickEdit()" v-if="btn.edit && showEdit">edit</v-btn>
                                        <v-btn small color="success" v-if="btn.submit" @click.stop="dialog.submit = true">submit</v-btn>
                                    </v-list-item>
                                        
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Student ID</th>
                                                    <th class="text-center">Student Name</th>
                                                    <th>Grade</th>
                                                </tr>
                                            </thead>

                                            <tbody> 
                                                <tr v-for="(item,index) in payload.students" :key="index">
                                                    <td>{{ item.studentId }}</td>
                                                    <td>{{ item.fullName }}</td>
                                                    <td class="text-start" v-if="item.grade != null && btn.edit"> {{item.grade}} </td>
                                                    <td class="text-start" v-if="item.grade == null && btn.edit"> - </td>                                            
                                                    <td v-if="btn.submit"> 
                                                        <v-select
                                                            dense
                                                            :items="grade"
                                                            v-model="item.grade"
                                                            style="width: 60px;"
                                                            class="mt-3"
                                                        />
                                                    </td>                                            
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </div>
                        
                            </v-container>
                            
                        </v-card-text>
                    </v-card>
                </v-dialog>

            </v-col>
        </v-row>

        <!-- pop up submit -->
        <v-dialog v-model="dialog.submit" max-width="450">
            <v-card class="pa-5">
            <v-card-text class="text-center">
                <img src="../../assets/alertSoft.png" alt="alertSoft" width="180">
                <h2 class="mt-4">Are you sure you want to <span class="success--text">submit</span> ?</h2>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn @click.stop="dialog.submit = false" color="success" outlined> no </v-btn>
                <v-btn @click="submitGrade()" color="success" class="ml-6" outlined> yes </v-btn>
                <v-spacer/>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end of pop up submit -->

        <!-- delete Successful -->
        <v-snackbar v-model="snackbar.pass" color="success">
            Submit successful
            <v-btn color="white" text @click="snackbar.pass = false"> Close </v-btn>
        </v-snackbar>
        
        <!-- delete fail -->
        <v-snackbar v-model="snackbar.fail" color="error">
            Something went wrong
            <v-btn color="white" text @click="snackbar.fail = false"> Close </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: "subject_management",

    data() {
        return {
            search: "",
            btn: {
                back: false,
                submit: false,
                edit: true,
            },

            headers: {
                subjects: [
                    {
                        text: "Subject ID", 
                        value: "subjectId",
                        width: "13%"
                    },
                    {
                        text: "Subject Name", 
                        value: "subjectName",
                    },
                    {
                        text: "Credit", 
                        value: "credit",
                        sortable: false 
                    },
                    {
                        text: "Description",
                        value: "description",
                        sortable: false 
                    },
                    {
                        value: "actions",
                        text: "Show Sections",
                        align: "center",
                        sortable: false 
                    }
                ],
                sections: [
                    {
                        text: "Subject ID", 
                        value: "subjectId"
                    },
                    {
                        text: "Section", 
                        value: "sectionId"
                    },
                    {
                        text: "Seat", 
                        value: "seat"
                    },
                    {
                        text: "Detail",
                        value: "actions",
                        align: "center",
                        sortable: false 
                    }
                ],
            },

            payload: {
                subjects: [],
                sections: [],
                sectionsDistinct: [],
                sectionsSelect: [],
                students: [],
            },

            dialog: {
                detail: false,
                cancel: false,
                submit: false,
            },
            
            snackbar: {
                pass: false,
                fail: false,
            },

            grade: ["A","B+","B","C+","C","D+","D","F","-"],
        }
    },

    methods: {
        selectSubject(item) {
            //console.log("item.subjectID = " + item.subjectId)
            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'get',
                url: `https://chai-test-backend.herokuapp.com/api/subjects/${this.$store.getters.getId}/${item.subjectId}/details`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                console.log(res.data)
                if(res.data.payload.length == 0) 
                    this.snackbar.fail = true
                else {
                    this.payload.sections = _.cloneDeep(res.data.payload)
                    // got the distinct sectionId
                    let sectionId
                    _.filter(res.data.payload, el => {
                        if(res.data.payload.indexOf(el) == 0) {
                            sectionId = el.sectionId
                            this.payload.sectionsDistinct.push(el)
                        }
                        else if(el.sectionId !== sectionId) {
                            sectionId = el.sectionId
                            this.payload.sectionsDistinct.push(el)
                        }
                    })
                    //console.log(this.payload.sectionsDistinct)
                    this.btn.back = true
                }
            })
            .catch(err => {
                console.error(err.respones);
            });
        },

        async showDetails(item) {
            let jwtToken = sessionStorage.getItem('jwt')
            // console.log(this.payload.sections)
            // try {
            //     let res  =  await axios({
            //                                 method: 'get',
            //                                 url: `https://chai-test-backend.herokuapp.com/api/subjects/${item.subjectId}/students`,
            //                                 headers: { Authorization: `bearer ${jwtToken}`}
            //                             })
            //     console.log(res)

            //     this.payload.sectionsSelect = []
            //     this.payload.students = []    
            //     this.dialog.detail = true

            //     if(res.data.payload.length == 0)
            //         this.payload.students.push({studentId: "-", fullName: "-"})
            //     else
            //         this.payload.students = res.data.payload

            //    console.log( this.payload.students)

            //     _.filter(this.payload.sections, el => {
            //         if(el.sectionId == item.sectionId)
            //             this.payload.sectionsSelect.push(el)
            //     })
                    
            // } catch(err) {
            //     console.log(err.respones)
            // }


            try {
                // console.log(item.subjectId)
                // console.log(item.sectionId)
                let res2  =  await axios({
                                            method: 'get',
                                            url: `https://chai-test-backend.herokuapp.com/api/grades/${item.subjectId}/${item.sectionId}`,
                                            headers: { Authorization: `bearer ${jwtToken}`}
                                        })
                console.log(res2)

                this.payload.sectionsSelect = []
                this.payload.students = []    
                this.dialog.detail = true

                if(res2.data.payload.length == 0)
                    this.payload.students.push({studentId: "-", fullName: "-", grade: "-"})
                else {
                    this.payload.students = res2.data.payload
                    _.filter(this.payload.students, el => {
                        if(el.grade == 4)
                            el.grade = "A"
                        else if(el.grade == 3.5)
                            el.grade = "B+"
                        else if(el.grade == 3)
                            el.grade = "B"
                        else if(el.grade == 2.5)
                            el.grade = "C+"
                        else if(el.grade == 2)
                            el.grade = "C"
                        else if(el.grade == 1.5)
                            el.grade = "D+"
                        else if(el.grade == 1)
                            el.grade = "D"
                        else if(el.grade == 0)
                            el.grade = "F"
                    })
                }

               //console.log( this.payload.students)

                _.filter(this.payload.sections, el => {
                    if(el.sectionId == item.sectionId)
                        this.payload.sectionsSelect.push(el)
                })

            } catch(err) {
                console.log(err.respones)
            }

            //console.log(this.payload.students)
        },

        backToSubject() {
            this.btn.back = false
            this.payload.sectionsDistinct = []
        },

        clickEdit() {
            this.btn.edit = false
            this.btn.submit = true
        },

        closeGrade() {
            this.dialog.detail = false
            this.btn.edit = true
            this.btn.submit = false
        },

        submitGrade() {
            _.filter(this.payload.students, el => {
                if(el.grade == "A")
                    el.grade = 4
                else if(el.grade == "B+")
                    el.grade = 3.5
                else if(el.grade == "B")
                    el.grade = 3
                else if(el.grade == "C+")
                    el.grade = 2.5
                else if(el.grade == "C")
                    el.grade = 2
                else if(el.grade == "D+")
                    el.grade = 1.5
                else if(el.grade == "D")
                    el.grade = 1
                else if(el.grade == "F")
                    el.grade = 0
                else if(el.grade == "-")
                    el.grade = null
            })
            //console.log(this.payload.students)

            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'put',
                url: `https://chai-test-backend.herokuapp.com/api/grades`,
                data: { 
                    payload: this.payload.students
                },
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                console.log(res)
                this.snackbar.pass = true
                this.dialog.submit = false
                this.dialog.detail = false

                this.btn.edit = true
                this.btn.submit = false
            })
            .catch(err => {
                console.error(err.respones);
                this.dialog.submit = false
                this.snackbar.fail = true
            });

        }
    },

    computed: {
        changeHeader() {
            if(this.payload.sectionsDistinct.length != 0)
                return this.headers.sections
            else
                return this.headers.subjects
        },

        changeItem() {
            if(this.payload.sectionsDistinct.length != 0) 
                return this.payload.sectionsDistinct
            else
                return this.payload.subjects
        },

        btnShowSection() {
            if(!this.$store.getters.getLoader && this.btn.back == false)
                return true
            else 
                return false
        },

        btnShowSectionDetail() {
            if(!this.$store.getters.getLoader && this.btn.back == true)
                return true
            else 
                return false
        },

        calFont() {
            if(this.$vuetify.breakpoint.xs)
                return "blue--text font-weight-bold subtitle-1"
            else
                return "blue--text font-weight-bold title"
        },

        showEdit() {
            if(this.payload.students[0].studentId == "-")
                return false
            else
                return true
        }
    },

    created() {
        let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'get',
                url: `https://chai-test-backend.herokuapp.com/api/subjects/${this.$store.getters.getId}`,
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                console.log(res)
                this.payload.subjects = _.cloneDeep(res.data.payload)
            })
            .catch(err => {
                console.error(err.respones);
            });
    },
}
</script>

<style>
    .table {
        table-layout : fixed;
    }
</style>
