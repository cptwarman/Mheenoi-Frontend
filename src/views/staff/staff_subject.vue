<template>
    <v-container fluid fill-height>
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
                            <v-col cols="3">
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
                        
                        <v-card-actions class="pb-3 pt-0 pl-3"> 
                            <v-btn color="error" v-if="btn.back" @click="backToSubject()"> back </v-btn>    

                            <v-btn color="success" @click.stop="dialog.add = true">
                                <v-icon left>note_add</v-icon> create subject
                            </v-btn>                   
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

                <!-- dialog add subject -->
                <!-- dialog add subject -->
                <!-- dialog add subject -->

                <v-dialog v-model="dialog.add" scrollable persistent max-width="800">
                    <v-card>
                        <v-card-title class="blue--text">
                            CREATE SUBJECT
                        </v-card-title>

                        <v-card-text>
                            <v-form>
                                <v-col>
                                    <p class="blue--text">Subject Description</p>

                                    <!-- About subject Input -->
                                    
                                    <div class="d-flex" v-if="$vuetify.breakpoint.smAndUp">
                                        <v-text-field
                                            label="Subject ID"
                                            outlined
                                            dense
                                            counter="6"
                                            :rules="rules.subjectId"
                                            v-model="passPayload.subjectId"
                                        />
                                        <v-text-field
                                            label="Credit"
                                            outlined
                                            dense
                                            counter="1"
                                            :rules="rules.credit"
                                            v-model="passPayload.credit"
                                            class="ml-5"
                                        />
                                    </div>

                                    <!-- xs view input -->
                                    <!-- xs view input -->
                                    <!-- xs view input -->

                                    <v-text-field
                                            label="Subject ID"
                                            outlined
                                            dense
                                            counter="6"
                                            :rules="rules.subjectId"
                                            v-model="passPayload.subjectId"
                                            v-if="$vuetify.breakpoint.xs"
                                        />
                                        <v-text-field
                                            label="Credit"
                                            outlined
                                            dense
                                            counter="1"
                                            :rules="rules.credit"
                                            v-model="passPayload.credit"
                                            class="mt-8"
                                            v-if="$vuetify.breakpoint.xs"
                                        />

                                    <!--End of xs view input -->
                                    <!--End of xs view input -->
                                    <!--End of xs view input -->
                                
                                    <v-text-field
                                        label="Subject Name"
                                        outlined
                                        dense
                                        counter="50"
                                        :rules="rules.subjectName"
                                        v-model="passPayload.subjectName"
                                        class="mt-8"
                                    />
                                    <v-textarea
                                        label="Description"
                                        outlined
                                        dense
                                        counter="200"
                                        :rules="rules.description"
                                        v-model="passPayload.description"
                                        class="mt-8"
                                    />

                                    <!-- SECTION -->

                                    <p class="blue--text mt-10">Create Section</p>
                                    <v-card outlined>
                                        <v-card-text>
                                            <div class="d-flex" v-if="$vuetify.breakpoint.smAndUp">
                                                <v-text-field
                                                    label="Section ID"
                                                    outlined
                                                    dense
                                                    counter="2"
                                                    :rules="rules.sectionId"
                                                    v-model="passPayloadBuff.sectionId"

                                                />
                                                <v-text-field
                                                    label="Seat"
                                                    outlined
                                                    dense
                                                    counter="3"
                                                    :rules="rules.seat"
                                                    v-model="passPayloadBuff.seat"
                                                    class="ml-3"
                                                />
                                            </div>

                                            <!-- xs view input -->
                                            <!-- xs view input -->
                                            <!-- xs view input -->
                                                <v-text-field
                                                    label="Section ID"
                                                    outlined
                                                    dense
                                                    counter="2"
                                                    :rules="rules.sectionId"
                                                    v-model="passPayloadBuff.sectionId"
                                                    v-if="$vuetify.breakpoint.xs"
                                                />
                                                <v-text-field
                                                    label="Seat"
                                                    outlined
                                                    dense
                                                    counter="3"
                                                    :rules="rules.seat"
                                                    v-model="passPayloadBuff.seat"
                                                    v-if="$vuetify.breakpoint.xs"
                                                    class="mt-5"
                                                />

                                            <!--End of xs view input -->
                                            <!--End of xs view input -->
                                            <!--End of xs view input -->

                                            <div class="d-flex mt-4">
                                                <v-col :cols="changeCol" :class="changePadding">
                                                    <v-text-field
                                                        label="Lecturer ID"
                                                        outlined
                                                        dense
                                                        counter="11"
                                                        :rules="rules.employeeId"
                                                        v-model="employeeId"
                                                    />
                                                </v-col>
                                                <!-- button add student -->
                                                <v-col cols="2" v-if="$vuetify.breakpoint.smAndUp">
                                                    <v-btn fab small color="info" @click="addLecturer()" :disabled="$v.employeeId.$invalid">
                                                        <v-icon dark>mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </div>
                                            
                                            <!-- xs view btn -->
                                            <!-- xs view btn -->

                                            <v-row justify="center" v-if="$vuetify.breakpoint.xs" class="mb-5">
                                                <v-btn  color="info" @click="addLecturer()" :disabled="$v.employeeId.$invalid">
                                                    add
                                                </v-btn>
                                            </v-row>

                                            <!-- Show lecturer -->

                                            <v-simple-table v-if="checkEmployee">
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <td>No</td>
                                                            <td>Lecturer ID</td>
                                                            <td>Delete</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item,index) in passPayloadBuff.employeeId" :key="index">
                                                            <td>{{index+1}}</td>
                                                            <td>{{item}}</td>
                                                            <td>
                                                                <v-icon @click="deleteLecturer(index)">delete</v-icon>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>

                                            <!-- Time picker -->
                                            <!-- Time picker -->
                                            <!-- Time picker -->

                                            <div class="d-flex mt-10">
                                                <v-menu
                                                    ref="menu3"
                                                    v-model="dialog.startDate"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="classNo.startTime"
                                                    transition="scale-transition"
                                                    offset-y
                                                    offset-overflow
                                                    max-width="290px"
                                                    min-width="290px"
                                                    >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="classNo.startTime"
                                                            outlined
                                                            dense
                                                            label="Start-time"
                                                            append-icon="access_time"
                                                            readonly
                                                            required
                                                            :rules="rules.startTime"
                                                            v-on="on"
                                                            class="mt-6"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="dialog.startDate"
                                                        v-model="classNo.startTime"
                                                        full-width
                                                        format="24hr"
                                                        scrollable
                                                        @click:minute="$refs.menu3.save(classNo.startTime)"
                                                    ></v-time-picker>
                                                </v-menu>   
                                                
                                                <!-- end time select -->

                                                <v-menu
                                                    ref="menu"
                                                    v-model="dialog.endTime"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="classNo.endTime"
                                                    transition="scale-transition"
                                                    offset-y
                                                    offset-overflow
                                                    max-width="290px"
                                                    min-width="290px"
                                                    v-if="$vuetify.breakpoint.smAndUp"
                                                    >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="classNo.endTime"
                                                            outlined
                                                            dense
                                                            label="End-time"
                                                            append-icon="access_time"
                                                            readonly
                                                            required
                                                            :rules="rules.endTime"
                                                            v-on="on"
                                                            class="mt-6 ml-3"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="dialog.endTime"
                                                        v-model="classNo.endTime"
                                                        full-width
                                                        format="24hr"
                                                        scrollable
                                                        @click:minute="$refs.menu.save(classNo.endTime)"
                                                    ></v-time-picker>
                                                </v-menu>
                                            </div>

                                            <!-- xs view end time -->
                                            <!-- xs view end time -->
                                            <!-- xs view end time -->

                                            <v-menu
                                                ref="menu"
                                                v-model="dialog.endTime"
                                                :close-on-content-click="false"
                                                :return-value.sync="classNo.endTime"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                max-width="290px"
                                                min-width="290px"
                                                v-if="$vuetify.breakpoint.xs"
                                                >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="classNo.endTime"
                                                        outlined
                                                        dense
                                                        label="End-time"
                                                        append-icon="access_time"
                                                        readonly
                                                        required
                                                        :rules="rules.endTime"
                                                        v-on="on"
                                                        class="mt-4"
                                                    ></v-text-field>
                                                </template>
                                                <v-time-picker
                                                    v-if="dialog.endTime"
                                                    v-model="classNo.endTime"
                                                    full-width
                                                    format="24hr"
                                                    scrollable
                                                    @click:minute="$refs.menu.save(classNo.endTime)"
                                                ></v-time-picker>
                                            </v-menu>

                                            <!-- week day select -->
                                            <div class="d-flex mt-4" v-if="$vuetify.breakpoint.smAndUp">
                                                <v-col :cols="changeCol">
                                                    <v-select
                                                        label="Weekday"
                                                        outlined
                                                        dense
                                                        :items="day"
                                                        :rules="rules.weekday"
                                                        v-model="classNo.weekday"
                                                    />
                                                </v-col>

                                                <!-- button add time and weekday -->
                                                <v-col cols="2">
                                                    <v-btn fab small color="info" @click="addTime()" :disabled="$v.classNo.$invalid">
                                                        <v-icon dark>mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </div>

                                            <!-- xs view btn and select weekday -->
                                            <!-- xs view btn and select weekday -->
                                            <!-- xs view btn and select weekday -->

                                            <v-select
                                                label="Weekday"
                                                outlined
                                                dense
                                                :items="day"
                                                :rules="rules.weekday"
                                                v-model="classNo.weekday"
                                                v-if="$vuetify.breakpoint.xs"
                                                class="mt-4"
                                            />

                                            <v-row justify="center" v-if="$vuetify.breakpoint.xs" class="mb-5">
                                                <v-btn  color="info" @click="addTime()" :disabled="$v.classNo.$invalid">
                                                    add
                                                </v-btn>
                                            </v-row>

                                            <!-- Show time -->

                                            <v-simple-table v-if="checkClass">
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <td>No</td>
                                                            <td>Weekday</td>
                                                            <td>Start time</td>
                                                            <td>End time</td>
                                                            <td>Delete</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item,index) in passPayloadBuff.class" :key="index">
                                                            <td>{{index+1}}</td>
                                                            <td>{{item.weekday}}</td>
                                                            <td>{{item.startTime}}</td>
                                                            <td>{{item.endTime}}</td>
                                                            <td>
                                                                <v-icon @click="deleteTime(index)">delete</v-icon>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>

                                        </v-card-text>
                                    </v-card>

                                    <!-- created button -->

                                    <v-row justify="center" class="mt-6">
                                        <v-btn color="primary" large rounded @click="createSection()" :disabled="$v.passPayloadBuff.$invalid"> create section</v-btn>
                                    </v-row>

                                    <!-- Show Section -->
                                    <v-card
                                        v-for="(item,index) in passPayload.sections"
                                        :key="index"
                                        class="mt-8"
                                        raised
                                    >
                                        <v-card-title class="blue--text subtitle-1 pl-7">
                                            {{passPayload.subjectId}} {{passPayload.subjectName}}
                                            <v-spacer/>  
                                            <v-btn class="mb-4" fab x-small color="error" v-if="$vuetify.breakpoint.smAndUp" @click="deleteSection(index)">
                                                <v-icon>clear</v-icon>
                                            </v-btn>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-row justify="center" :class="calMargin1">
                                                <v-col cols="12">
                                                    <p class="mr-5">
                                                        <b>Description:</b> {{passPayload.description}} 
                                                    </p>
                                                </v-col>
                                            </v-row>

                                            <v-row justify="center" :class="calMargin1">
                                                <v-col cols="12" sm="4">
                                                    <p>
                                                    <b>Section:</b> {{item.sectionId}}
                                                    </p>  
                                                </v-col>

                                                <v-col cols="12" sm="4">
                                                    <p class="mr-5">
                                                        <b>Seat: </b> {{item.seat}} 
                                                    </p>
                                                </v-col>

                                                <v-col cols="12" sm="4">
                                                    <p>
                                                    <b>Credit:</b>  {{passPayload.credit}}
                                                    </p>  
                                                </v-col>
                                            </v-row>

                                            <v-row justify="center" :class="calMargin2">
                                                <!-- Show real lecturer -->
                    
                                                <v-col cols="12" sm="5">
                                                    <p> <b>Lecturer List</b> </p> 
                                                    <v-list-item
                                                        v-for="(value,index) in item.employeeId" 
                                                        :key="index"
                                                    >
                                                        {{index+1}}. {{value}}
                                                    </v-list-item>
                                                </v-col>
                                        

                                                <!-- Show real time -->

                                                <v-col cols="12" sm="5">
                                                    <p> <b>Time List</b> </p> 
                                                    <v-list-item
                                                        v-for="(value,index) in item.class" 
                                                        :key="index"
                                                    >
                                                        {{index+1}}. {{value.weekday}} {{value.startTime}} - {{value.endTime}}
                                                    </v-list-item>
                                                </v-col>

                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer/>
                                                <v-btn class="mb-4" color="error" v-if="$vuetify.breakpoint.xs" @click="deleteSection(index)">
                                                    clear
                                                </v-btn>
                                            <v-spacer/>
                                        </v-card-actions>
                                    </v-card>
                                    
                                </v-col>
                            </v-form>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer/>

                                <v-btn outlined color="error" @click.stop="dialog.cancel = true">
                                    <v-icon left>clear</v-icon>  close
                                </v-btn>

                                <v-btn color="success" class="ml-4"  @click.stop="dialog.submit = true" :disabled="$v.passPayload.$invalid">
                                    <v-icon left>check</v-icon>  submit
                                </v-btn>

                            <v-spacer/>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- dialog confirm submit and cancel -->
                <!-- dialog confirm submit and cancel -->
                <!-- dialog confirm submit and cancel -->

                <!-- pop up cancel -->
                <v-dialog v-model="dialog.cancel" max-width="450">
                    <v-card class="pa-5">   
                        <v-card-text class="text-center">
                        <img src="../../assets/alert.png" alt="alert" width="180">
                        <h2 class="mt-4">Are you sure you want to <span class="red--text">cancel</span> ?</h2>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer/>
                            <v-btn @click.stop="dialog.cancel = false" color="error" outlined> no </v-btn>
                            <v-btn @click.stop="cancel()" color="error" class="ml-6" outlined> yes </v-btn>
                        <v-spacer/>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- end of pop up cancel -->

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
                        <v-btn @click="postTOServer()" color="success" class="ml-6" outlined> yes </v-btn>
                        <v-spacer/>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- end of pop up submit -->

                <!-- snackbar -->
                <!-- snackbar -->
                <!-- snackbar -->

                <!-- delete Successful -->
                <v-snackbar v-model="snackbar.pass" color="success">
                    Create subject successful
                    <v-btn color="white" text @click="snackbar.pass = false"> Close </v-btn>
                </v-snackbar>
                
                <!-- delete fail -->
                <v-snackbar v-model="snackbar.fail" color="error">
                    Something went wrong
                    <v-btn color="white" text @click="snackbar.fail = false"> Close </v-btn>
                </v-snackbar>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {required, email, minLength, maxLength , between, decimal, numeric} from "vuelidate/lib/validators";
import axios from 'axios'

export default {
name: "staff_subject",
data() {
    return {
        index: "",
        search: "",
        btn: {
            back: false,
        },

        snackbar: {
            pass: false,
            fail: false,
        },

        dialog: {
            detail: false,
            add: false,
            cancel: false,
            submit: false,
            startDate: false,
            endDate: false,
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
        // post to serverc 
        passPayload: {
            subjectId: null, 
            subjectName: null,
            credit: null,
            description: null,
            sections: []
        },

        passPayloadBuff: {
            sectionId: null,
            seat: null,
            employeeId: [],
            class: []
        },

        employeeId: null,
        classNo: {
            no: null,
            weekday: null,
            startTime: null,
            endTime: null,
        },

        rules: {
            subjectId: [
                v => !!v || "This field is required",
                v => (v && v.length <= 6) || "subject ID must be less than 6 characters",
            ],
            subjectName: [
                v => !!v || "This field is required",
                v => (v && v.length <= 50) || "Subject Name must be less than 50 characters",
            ],
            credit: [
                v => !!v || "This field is required",
                v => (v && v.length <= 1) || "credit must be 1 digit",
                v => !isNaN(v)  || "credit must be numeric",
            ],
            description: [
                v => !!v || "This field is required",
                v => (v && v.length > 9) || "description must be more than 10 characters",
                v => (v && v.length <= 200) || "description must be less than 200 characters",
            ],
            employeeId: [
                v => !!v || "This field is required",
                v => (v && v.length == 11) || "Lecturer ID must be 11 digits",
                v => !isNaN(v)  || "Lecturer ID must be numeric",
            ],
            weekday: [
                v => !!v || "weekday is required",
            ],
            startTime: [
                v => !!v || "Start time is required",
            ],
            endTime: [
                v => !!v || "End time is required",
            ],
            sectionId: [
                v => !!v || "This field is required",
                v => (v && v.length <= 2) || "Lecturer ID must be less than 2 digits",
                v => !isNaN(v)  || "Section ID must be numeric",
            ],
            seat: [
                v => !!v || "This field is required",
                v => (v && v.length <= 3) || "Seat ID must be less than 3 digits",
                v => !isNaN(v)  || "Seat must be numeric",
            ],
        },

        day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }
},

validations: {
    passPayload: {
        subjectId: {
            required,
            maxLength: maxLength(6)
        },
        subjectName: {
            required,
            maxLength: maxLength(50)
        },
        credit: {
            required,
            numeric,
            between: between(1,9)
        },
        description: {
            required,
            minLength: minLength(10),
            maxLength: maxLength(200)
        },

        sections: {
            required
        },
    },

    employeeId: {
        required,
        numeric,
        minLength: minLength(11),
        maxLength: maxLength(11)
    },

    classNo: {
        weekday: {
            required
        },
        startTime: {
            required
        },
        endTime: {
            required
        },
    },

    passPayloadBuff: {
        sectionId: {
            required,
            numeric,
            between: between(1,99)
        },

        seat: {
            required,
            numeric,
            between: between(1,999)
        },

        employeeId: {
            required,
        },

        class: {
            required,
        },
    }
},

methods: {
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
                //console.log(res.data.payload)
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

    backToSubject() {
        this.btn.back = false
        this.payload.sectionsDistinct = []
    },

    cancel() {
        this.dialog.add = false
        this.dialog.cancel = false

        this.employeeId = null
        this.passPayloadBuff.sectionId = null
        this.passPayloadBuff.seat = null
        this.passPayloadBuff.employeeId = []
        this.passPayloadBuff.class = []

        this.passPayload.subjectId = null
        this.passPayload.subjectName = null
        this.passPayload.credit = null
        this.passPayload.description = null

        for(let key in this.classNo)
            this.classNo[key] = null
    },

    addLecturer() {
        this.passPayloadBuff.employeeId.push(this.employeeId)
        this.employeeId = null
    },

    addTime() {
        this.passPayloadBuff.class.push(JSON.parse(JSON.stringify(this.classNo)))
        console.log(this.classNo)
        for(let key in this.classNo)
            this.classNo[key] = null
    },

    deleteLecturer(index) {
        this.passPayloadBuff.employeeId.splice(index,1)
    },

    deleteTime(index) {
        this.passPayloadBuff.class.splice(index,1)
    },

    createSection() {
        let count = 1
        _.filter(this.passPayloadBuff.class, el => {
            el.no = count
            count++
        })
        console.log(this.passPayloadBuff.class)

        this.passPayload.sections.push(JSON.parse(JSON.stringify(this.passPayloadBuff)))
        // clear input
        this.employeeId = null
        this.passPayloadBuff.sectionId = null
        this.passPayloadBuff.seat = null
        this.passPayloadBuff.employeeId = []
        this.passPayloadBuff.class = []

        for(let key in this.classNo)
            this.classNo[key] = null
    },

    deleteSection(index) {
        this.passPayload.sections.splice(index,1)
    },

    postTOServer() {
        console.log(this.passPayload)

        let jwtToken = sessionStorage.getItem('jwt');
        axios({
            method: 'post',
            url: `https://chai-test-backend.herokuapp.com/api/subjects`,
            data: { 
                payload: this.passPayload 
            },
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            console.log(res)
            this.dialog.add  = false
            this.snackbar.pass = true
            this.dialog.submit = false
            setTimeout(() => location.reload() , 2000)
        })
        .catch(err => {
            console.error(err);
            this.dialog.submit = false
            this.snackbar.fail = true
        });
    }

},

computed: {
    calFont() {
        if(this.$vuetify.breakpoint.xs)
            return "blue--text font-weight-bold subtitle-1"
        else
            return "blue--text font-weight-bold title"
    },

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

    checkClass() {
        if(this.passPayloadBuff.class.length != 0)
            return true
        else
            return false
    },

    checkEmployee() {
        if(this.passPayloadBuff.employeeId.length != 0)
            return true
        else
            return false
    },

    calMargin1() {
        if(this.$vuetify.breakpoint.smAndUp)
            return "ml-10"
        else
            return "ml-5"
    },

    calMargin2() {
        if(this.$vuetify.breakpoint.smAndUp)
            return ""
        else
            return "ml-5"
    },

    changeCol() {
        if(this.$vuetify.breakpoint.smAndUp)
            return "10"
        else
            return "12"
    },

    changePadding() {
        if(this.$vuetify.breakpoint.smAndUp)
            return ""
        else
            return "pa-0"
    }
},

created() {
    let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            url: 'https://chai-test-backend.herokuapp.com/api/subjects',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            this.payload.subjects = _.cloneDeep(res.data.payload)
            //console.log(this.payload.subjects)
        })
        .catch(err => {
            console.error(err.respones);
        });
},

}
</script>

