<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col sm="8" lg="7">
                <v-row justify="center" class="mb-3">
                    <v-card class="py-3 px-5" shaped>
                        <span
                        class="blue--text 
                        font-weight-bold
                        title"
                        > STAFF INFORMATION</span>
                    </v-card>
                </v-row>

                <v-card>
                    <v-card-text style="line-height: 2">
                        <!-- picture -->
                        <v-row justify="center" v-if="!this.$store.getters.getLoader">
                            <img src="../../assets/profile/staff.png" alt="staff" width="180" height="180">
                        </v-row>
                        <!-- infomation -->
                        <v-row justify="center" class="mt-5">
                            <v-col cols="11" sm="5">
                                <v-row :justify="changePosition">
                                    <div :class="changeMargin">
                                        <p> <b>Employee ID</b>: {{payload.employeeId}}</p>
                                        <p><b>Position</b>: {{payload.position}}</p>
                                        <p><b>First Name</b>: {{payload.firstName}}</p>
                                        <p><b>Last Name</b>: {{payload.lastName}}</p>
                                        <p><b>ID Card Number</b>: {{payload.idCardNumber}}</p>
                                        <p><b>Address</b>: {{payload.address}}</p>
                                    </div>
                                </v-row>
                            </v-col>
                            <v-col cols="11" sm="5">
                                <v-row :justify="changePosition2">
                                    <div :class="changeMargin2">
                                        <p><b>Faculty</b>: {{payload.faculty}}</p>
                                        <p><b>Department</b>: {{payload.depName}}</p>
                                        <p><b>Blood type</b>: {{payload.bloodType}}</p>
                                        <p><b>Gender</b>: {{payload.fullGender}}</p>
                                        <p><b>Phone</b>: {{payload.phoneNo}}</p>
                                        <p><b>E-mail</b>: {{payload.email}}</p>
                                        <p><b>Birthday</b>: {{payload.dob}}</p>
                                    </div>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="pb-5">
                        <v-spacer/>
                            <v-btn outlined class="mr-2" @click.stop="dialog.edit = true" @click="editInfo()">
                                <v-icon left>create</v-icon> edit
                            </v-btn>

                            <v-btn  color="blue" dark @click="goToHome()">
                                <v-icon left>mdi-home</v-icon> home
                            </v-btn>
                        <v-spacer/>
                    </v-card-actions>
                </v-card>

                <v-dialog v-model="dialog.edit" persistent max-width="800" scrollable>
                    <v-card>
                        <v-card-title class="blue--text title">
                            EDIT INFORMATION
                        </v-card-title>

                        <v-card-text>
                            <v-form>
                                <v-container fluid>
                                    <v-row justify="center">

                                        <v-col cols="12" sm="6">
                                            <v-text-field
                                                v-model="passPayload.firstName"
                                                :rules="rules.name"
                                                :counter="32"
                                                label="First name"
                                                required
                                            />
                                            <v-text-field
                                                v-model="passPayload.lastName"
                                                :rules="rules.name"
                                                :counter="32"
                                                label="Last name"
                                                required
                                                class="mt-5"
                                            />
                                            <v-text-field
                                                v-model="passPayload.email"
                                                :rules="rules.email"
                                                :counter="32"
                                                label="E-mail"
                                                required
                                                class="mt-5"
                                            />
                                            <v-text-field
                                                v-model="passPayload.idCardNumber"
                                                :rules="rules.idCardNumber"
                                                :counter="13"
                                                label="ID Card Number"
                                                required
                                                class="mt-5"
                                            />
                                            <v-text-field
                                                v-model="passPayload.address"
                                                :rules="rules.address"
                                                :counter="128"
                                                label="Address"
                                                required
                                                class="mt-5"
                                            />
                                        </v-col>
                                        <!-- col 2nd -->
                                        <v-col cols="12" sm="6">
                                            <v-text-field
                                                v-model="passPayload.phoneNo"
                                                :rules="rules.phone"
                                                :counter="10"
                                                label="Phone"
                                                required
                                            />
                                            <v-select
                                                v-model="passPayload.fullGender"
                                                :items="select.gender"
                                                label="Gender"
                                                required
                                                class="mt-5"
                                            />
                                            <v-select
                                                v-model="passPayload.bloodType"
                                                :items="select.bloodType"
                                                label="Blood Type"
                                                required
                                                class="mt-5"
                                            />
                                            <v-menu
                                                ref="menu"
                                                v-model="menu"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.dob"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                min-width="290px"
                                            >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="passPayload.dob"
                                                        label="Birthday"
                                                        class="mt-5"
                                                        readonly
                                                        v-on="on"
                                                        />
                                                    </template>
                                                    <v-date-picker v-model="passPayload.dob" no-title scrollable>
                                                        <v-spacer/>
                                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(passPayload.dob)">OK</v-btn>
                                                    </v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>

                         <v-card-actions class="pb-5">
                            <!-- Buttons -->
                            <v-spacer/>
                            <v-btn outlined color="error" class="mr-2" @click.stop="dialog.cancel = true">
                                <v-icon left>close</v-icon> cancel
                            </v-btn>
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
                                        <v-btn @click.stop="dialog.edit = false" color="error" class="ml-6" outlined> yes </v-btn>
                                    <v-spacer/>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                            <!-- end of pop up cancel -->

                            <!-- submit button -->
                            <v-btn @click.stop="dialog.submit = true" :disabled="$v.passPayload.$invalid" color="success" class="ml-4">
                                <v-icon left>check</v-icon> submit
                            </v-btn>

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
                                    <v-btn @click="infoSubmit()" color="success" class="ml-6" outlined> yes </v-btn>
                                    <v-spacer/>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <!-- end of pop up submit -->

                            <v-spacer/>

                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-col>
        </v-row>

        <v-snackbar v-model="snackbar.pass" color="success">
            Edit Successful
            <v-btn color="white" text @click="snackbar.pass = false"> Close </v-btn>
        </v-snackbar>

        <v-snackbar v-model="snackbar.fail" color="error">
            Something went wrong
            <v-btn color="white" text @click="snackbar.fail = false"> Close </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
import { required, email, minLength, maxLength , between, decimal, numeric} from "vuelidate/lib/validators";
import axios from 'axios'
export default {
    name: "Staff_info",

    data() {
        return {
            menu: false,
            payload: [],
            passPayload: [],
            dialog: {
                edit: false,
                submit: false,
                cancel: false,
            },
            snackbar: {
                pass: false,
                fail: false,
            },
            select: {
                bloodType: ["A","B","O","AB"],
                gender: ["Male", "Female"],
                Relation: ["Brother", "Father", "Uncle", "Grandfather", "Sister", "Mother", "Aunt", "Grandmother"],
            },
            rules: {
                name: [
                    v => !!v || 'Name is required',
                    v => (v.length > 2) || 'Name must be more than 2 characters',
                    v => (v.length <= 32) || 'Name must be less than 32 characters',
                ],
                idCardNumber: [
                    v => !!v || 'ID card number is required',
                    v => !isNaN(v) || 'ID card number must be a number',
                    v => v.length == 13 || 'ID card number must be 13 digits',
                ],
                email: [
                    v => !!v || 'E-mail is required',
                    v => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v) || 'E-mail must be valid',
                    v => v.length <= 32 || 'E-mail must be less than 32 characters',
                ],
                phone: [
                    v => !!v || 'Phone number is required',
                    v => (v.length == 10 || v.length == 9) || 'Phone must be 10 digits or 9 digits (home number)',
                    v => !isNaN(v) || 'Phone must be a number',
                ],
                address: [
                    v => !!v || 'Address is required',
                    v => (v.length > 4) || 'Address must be more than 4 characters',
                    v => (v.length <= 128) || 'Address must be less than 128 characters',
                ],
            },
        }
    },

    validations: {
        passPayload: {
            email: {
                required,
                email
            },

            firstName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(32)
            },

            lastName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(32)
            },

            phoneNo: {
                numeric,
                required,
                minLength: minLength(9),
                maxLength: maxLength(10)
            },

            address: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(128)
            },

            idCardNumber: {
                required,
                numeric,
                minLength: minLength(13),
                maxLength: maxLength(13)
            },
        },
  },

    methods: {
        editInfo() {
            this.passPayload = {...this.payload}
        },

        infoSubmit() {
            this.dialog.edit = false;
            this.$store.dispatch("syncfirstName",this.passPayload.firstName)
            if(this.passPayload.fullGender === "Male") {
                this.passPayload.title = "Mr."
                this.passPayload.gender = "M"
            }
            else {
                this.passPayload.title = "Ms."
                this.passPayload.gender = "F"
            }   
             
            delete this.passPayload.fullGender
            console.log(this.passPayload)

            let jwtToken = sessionStorage.getItem('jwt')
            axios({
                method: 'put',
                //! อย่าลืมแก้ ID !!!
                url: `https://chai-test-backend.herokuapp.com/api/employees/39999999999/info`,
                data: { 
                    payload: this.passPayload 
                },
                headers: {
                    Authorization: `bearer ${jwtToken}`
                }
            })
            .then(res => {
                this.snackbar.pass = true
                setTimeout(() => location.reload(), 2000)

            }).catch(err => {
                console.error(err.respons)
                this.snackbar.fail = true
            });
        },

        goToHome() {
            this.$router.push("/staff")
        }
    },

    computed: {
        changePosition() {
            if(this.$vuetify.breakpoint.smAndUp)
                return "end"
            else
                return "center"
        },

        changeMargin() {
            if(this.$vuetify.breakpoint.smAndUp)
                return "mr-7"
            else
                return "mr-0"
        },

        changePosition2() {
            if(this.$vuetify.breakpoint.smAndUp)
                return "start"
            else
                return "center"
        },

        changeMargin2() {
            if(this.$vuetify.breakpoint.smAndUp)
                return "ml-7"
            else
                return "ml-0"
        },
    },

    created() {
        let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            //! อย่าลืมแก้ ID !!!
            url: 'https://chai-test-backend.herokuapp.com/api/staffs/39999999999/info',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            this.payload = res.data.payload[0]
            //console.log(this.payload.picturePath)
            this.payload.dob = res.data.payload[0].dob.substr(0, 10);
            //Chage gender data
            if (res.data.payload[0].gender === "M")
                this.payload.fullGender = "Male";
            else if (res.data.payload[0].gender === "F")
                this.payload.fullGender = "Female";
            console.log(this.payload)
        })
        .catch(err => {
            console.error(err.respones);
        });
    }
}
</script>

<style scoped>
p {
    word-wrap: break-word;
}
</style>

