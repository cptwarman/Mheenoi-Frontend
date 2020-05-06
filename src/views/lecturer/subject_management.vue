<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col cols="10">

                 <v-row justify="center" class="mb-7">
                    <v-card class="py-3 px-5" shaped>
                        <span class="blue--text font-weight-bold title">  MY SUBJECT </span>
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

                <v-dialog v-if="dialog.detail" v-model="dialog.detail" scrollable max-width="1000">
                    <v-card>
                        <v-card-title class="blue--text subtitle-1">
                            {{payload.sectionsDistinct[0].subjectId}}  {{payload.sectionsDistinct[0].subjectName}}
                            <v-spacer/>
                            <v-btn color="error" fab x-small @click="dialog.detail = false">
                                <v-icon>clear</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <div class="blue--text">
                                    <span>lecturer List</span>
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
                                    <span>Student List</span>
                        
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Student ID</th>
                                                    <th class="text-center">Student Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item,index) in payload.students" :key="index">
                                                    <td>{{ item.studentId }}</td>
                                                    <td>{{ item.fullName }}</td>
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
            },

            headers: {
                subjects: [
                    {
                        text: "Subject ID", 
                        value: "subjectId"
                    },
                    {
                        text: "Subject Name", 
                        value: "subjectName"
                    },
                    {
                        text: "Credit", 
                        value: "credit"
                    },
                    {
                        text: "Description",
                        value: "description"
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
        }
    },

    methods: {
        selectSubject(item) {
            //console.log("item.subjectID = " + item.subjectId)
            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'get',
                url: `https://chai-test-backend.herokuapp.com/api/subjects/${item.subjectId}/details`,
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
            //console.log(this.payload.sections)
            let res  =  await axios({
                                        method: 'get',
                                        url: `https://chai-test-backend.herokuapp.com/api/subjects/${item.subjectId}/students`,
                                        headers: { Authorization: `bearer ${jwtToken}`}
                                    })
            this.payload.students = []                        
            if(res.data.payload.length == 0)
                this.payload.students.push({studentId: "-", fullName: "-"})
            else
                this.payload.students = res.data.payload

            this.payload.sectionsSelect = []
            this.dialog.detail = true

            _.filter(this.payload.sections, el => {
                if(el.sectionId == item.sectionId)
                    this.payload.sectionsSelect.push(el)
            })
            //console.log(this.payload.students)
        },

        backToSubject() {
            this.btn.back = false
            this.payload.sectionsDistinct = []
        },
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

