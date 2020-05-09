<template>
    <v-container fluid fill-height >
        <v-row justify="center">
            <v-col lg="9">

                <v-row justify="center" class="mb-7">
                    <v-card class="py-3 px-5" shaped>
                        <span :class="calFont">  SCHOLARSHIP MANAGEMENT </span>
                    </v-card>
                </v-row>

                <v-row justify="center">
                    <v-card>
                        <v-card-title class="blue--text">
                            Scholarship List
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
                            :headers="headers"
                            :items="scholar"
                            :search="search"
                        />
                        <!-- <template v-slot:item.actions="{ item }">
                            <v-btn small color="primary" rounded @click="showDetails(item)"> apply</v-btn>
                        </template> -->

                        <v-card-actions class="pb-3 pt-0 pl-3">                       
                            <v-btn color="success" @click.stop="dialog.add = true">
                            <v-icon left>post_add</v-icon> create </v-btn>                   
                        </v-card-actions>
                    </v-card>
                </v-row>

                <v-dialog v-model="dialog.add" persistent scrollable width="600">
                    <v-card>
                        <v-card-title class="blue--text">
                            CREATE SCHOLARSHIP
                            <v-spacer/>
                            <v-btn rounded small color="error" @click="clearInput()">clear</v-btn>
                        </v-card-title>

                        <v-card-text>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                label="Scholarship Name"
                                                outlined
                                                dense
                                                counter="25"
                                                :rules="rules.scholarshipName"
                                                v-model="addScholar.scholarshipName"
                                            />
                                            <v-text-field
                                                label="Donator"
                                                outlined
                                                dense
                                                counter="64"
                                                :rules="rules.donator"
                                                v-model="addScholar.donator"
                                                class="mt-5"
                                            />
                                            <v-textarea
                                                label="Scholarship Detail"
                                                outlined
                                                counter="256"
                                                :rules="rules.details"
                                                v-model="addScholar.details"
                                                class="mt-5"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>

                        <v-card-actions class="pb-5">
                            <v-spacer/>

                                <v-btn outlined color="error" @click.stop="dialog.cancel = true">
                                    <v-icon left>clear</v-icon>  close
                                </v-btn>

                                <v-btn color="success" class="ml-4" :disabled="$v.addScholar.$invalid" @click.stop="dialog.submit = true">
                                    <v-icon left>check</v-icon>  submit
                                </v-btn>

                            <v-spacer/>
                        </v-card-actions>
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
                <v-btn @click="submitAdd()" color="success" class="ml-6" outlined> yes </v-btn>
                <v-spacer/>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end of pop up submit -->

        <!-- pop up cancel -->
        <v-dialog v-model="dialog.cancel" max-width="450">
            <v-card class="pa-5">   
            <v-card-text class="text-center">
                <img src="../../assets/alert.png" alt="alert" width="180">
                <h2 class="mt-4">Are you sure you want to <span class="red--text">close</span> ?</h2>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn @click.stop="dialog.cancel = false" color="error" outlined> no </v-btn>
                <v-btn  @click="clearInput(1)" color="error" class="ml-6" outlined> yes </v-btn>
                <v-spacer/>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end of pop up cancel -->

        <v-snackbar v-model="snackbar.pass" color="success">
            Add Successful
            <v-btn color="white" text @click="snackbar.snackbarPass = false"> Close </v-btn>
        </v-snackbar>

        <v-snackbar v-model="snackbar.fail" color="error">
            Something went wrong
            <v-btn color="white" text @click="snackbar.snackbarFail = false"> Close </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
import { required, email, minLength, maxLength , between, decimal, numeric} from "vuelidate/lib/validators";
import axios from 'axios'

export default {
    name: "scholarship_editor",

    data() {
        return  {
            dialog: {
                dialogDetails: false,
                cancel: false,
                submit: false,
                add: false,
            },

            detailOfScholarship: [],
            search: "",
            payload: {},
            scholar: [],
            headers: [
                {
                    text: "Scholarship ID",
                    value: "scholarshipId",
                    align: "center"
                },
                {
                    text: "Scholarship Name",
                    value: "scholarshipName",          
                },
                {
                    text: "Donator",
                    value: "donator",
                },
                {
                    text: "Detail",
                    value: "details",
                    sortable: false,
                },
            ],
        
            rules: {
                scholarshipName: [
                    v => v.length > 2 || 'Min 3 characters',
                    v => v.length <= 25 || 'Max 25 characters',
                    v => !!v || "This field is required"
                ],

                donator: [
                    v => v.length > 2 || 'Min 3 characters',
                    v =>  v.length <= 64 || 'Max 64 characters',
                    v => !!v || "This field is required"
                ],

                details: [
                    v => v.length > 9 || 'Min 10 characters',
                    v =>  v.length <= 256 || 'Max 256 characters',
                    v => !!v || "This field is required"
                ],
            },

            reason: "",
            indexOfScholarship: "",
            nameOfScholarship: "",

            addScholar: {
                scholarshipName: "",
                donator: "",
                details: "",
            },

            activitieShow: [],
            passPayload: {},
            snackbar: {
                pass: false,
                fail: false,
            },
        }
    },

    validations: {
        act: {
            name: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(128)
            },

            type: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(32)
            }
        },
        reason: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(256)
        },

        addScholar: {
            scholarshipName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(25)
            },
            donator: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(64)
            },
            details: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(256)
            },
        }
    },

    methods: {
        showDetails(item) {
          let jwtToken = sessionStorage.getItem('jwt');
           axios({
             method: 'get',
             url: `https://chai-test-backend.herokuapp.com/api/students/${this.$store.getters.getStudentId}/info`,
             headers: {
              Authorization: `bearer ${jwtToken}`
             }
          })
           .then(res => {
            //console.log(res)
            this.payload = res.data.payload[0]
            this.payload.dob = res.data.payload[0].dob.substr(0, 10);
            //Chage gender data
            if (res.data.payload[0].gender === "M")
              this.payload.fullGender = "Men";
            else if (res.data.payload[0].gender === "W")
              this.payload.fullGender = "Women";

            this.nameOfScholarship = item.scholarshipName
            this.indexOfScholarship = this.scholar.indexOf(item)
            this.dialog.dialogDetails = true
           }).catch(err => {
             console.error(err);
           });
        
        },

        submit() {
            this.passPayload.studentId = this.$store.getters.getStudentId
            this.passPayload.scholarshipId = this.scholar[this.indexOfScholarship].scholarshipId
            this.passPayload.reasonOfRequest = this.reason
            this.passPayload.activities = this.activitieShow
            let count = 1
            this.passPayload.activities.forEach(el => {
              el.index = count
              count++
            })
            console.log(this.passPayload)

            let jwtToken = sessionStorage.getItem('jwt');
            axios({
              method: 'post',
              url: `https://chai-test-backend.herokuapp.com/api/scholarships/requests`,
              data: { 
                payload: this.passPayload },
              headers: {
                Authorization: `bearer ${jwtToken}`
              }
          })
           .then(res => {
              console.log(res)
              this.dialog.dialogSubmit = false
              this.cancel()
              this.snackbar.snackbarPass = true
           }).catch(err => {
              console.error(err.respones);
              this.dialog.dialogSubmit = false
              this.dialog.dialogDetails = false
              this.snackbar.snackbarFail = true
              this.cancel()
           });
        },

        cancel(){
            this.activitieShow = []
            this.act.name = ""
            this.act.type = ""
            this.reason = ""
            this.dialog.dialogDetails = false
        },

        clearInput(e) {
            if(e)
                this.dialog.add = false
            this.dialog.cancel = false
            this.addScholar.scholarshipName = ""
            this.addScholar.donator = ""
            this.addScholar.details = ""
        },

        submitAdd() {
            console.log(this.addScholar)
            let jwtToken = sessionStorage.getItem('jwt');
            axios({
                method: 'post',
                url: `https://chai-test-backend.herokuapp.com/api/scholarships`,
                data: { 
                    payload: this.addScholar 
                },
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                //console.log(res)
                this.dialog.submit = false
                this.clearInput(1)
                this.snackbar.pass = true
                setTimeout(() => location.reload(), 2000)
            }).catch(err => {
                console.error(err.respones);
                this.clearInput(1)
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
        }
    }, 

    created() {
        let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            url: 'https://chai-test-backend.herokuapp.com/api/scholarships',
            headers: {
            Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            this.scholar = res.data.payload
            console.log(this.scholar)
        })
        .catch(err => {
            console.error(err);
        });
    }
}

</script>

<style scoped>

</style>