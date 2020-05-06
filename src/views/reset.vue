<template>
    <v-container fill-height>
        <v-row justify="center">
            <v-col cols="10"> 
                <v-card>
                    <v-card-title class="blue--text ml-5 pt-7">
                        RESET PASSWORD
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-row justify="center">
                            <v-col cols="12" sm="10">
                                <v-row justify="center">
                                    <v-icon large class="mr-4">https</v-icon>
                                    <v-text-field
                                        :rules="rules.password"
                                        label="Old password"
                                        name="password"
                                        type="password"
                                        v-model="password.old"
                                    />
                                </v-row>

                                <v-row justify="center">
                                    <v-icon large class="mr-4">vpn_key</v-icon>
                                    <v-text-field
                                        :rules="rules.password"
                                        label="New password"
                                        name="password"
                                        type="password"
                                        v-model="password.new"
                                    />
                                </v-row>

                                <v-row justify="center">
                                    <v-icon large class="mr-4">vpn_key</v-icon>
                                    <v-text-field
                                        :rules="rules.password"
                                        label="Confirm password"
                                        name="password"
                                        type="password"
                                        v-model="password.confirm"
                                    />
                                </v-row>

                                <v-alert v-if="error.old" type="error" dense>
                                    Old password is wrong
                                </v-alert>

                                <v-alert v-if="error.confirm" type="warning" dense>
                                    Your password is not match
                                </v-alert>

                            </v-col>
                            </v-row>
                        </v-form>

                    </v-card-text>
                    <v-card-actions class="pb-5">
                        <v-spacer/>
                        <v-btn color="primary" @click="SendData()" :disabled="$v.password.$invalid">confirm</v-btn>
                        <v-spacer/>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-snackbar v-model="snackbar.pass" color="success">
            Reset password successful
            <v-btn color="white" text @click="snackbar.pass = false"> Close </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators"
import axios from "axios"

export default {
    name: 'reset',
    data() {
        return {
            snackbar: {
                pass: false
            },

            password: {
                old: "",
                new: "",
                confirm: "",
            },

            passPayload: {
                userId: this.$store.getters.getId,
                oldPassword: "",
                newPassword: "",
            },

            error: {
                old: false,
                confirm: false,  
            },
            rules: {
                password: [
                    v => !!v || "This field is required",
                    v => v.length > 3 || "Password must be more than 3 characters",
                ]
             }
        }
    },

    validations: {
        password: {
            old: {
                required,
                minLength: minLength(4)
            },
            new: {
                required,
                minLength: minLength(4)
            },
            confirm: {
                required,
                minLength: minLength(4)
            },
        }
    },

    methods: {
        SendData() {
            this.error.confirm = false
            this.error.old = false

            if(this.password.new != this.password.confirm)
                this.error.confirm = true
            else {
                this.passPayload.oldPassword = this.password.old
                this.passPayload.newPassword = this.password.confirm
    
                let jwtToken = sessionStorage.getItem('jwt')
                axios({
                    method: 'put',
                    url: `https://chai-test-backend.herokuapp.com/set-password`,
                    data: { 
                        payload: this.passPayload 
                    },
                })
                .then(res => {
                    console.log(res)
                    this.snackbar.pass = true
                    setTimeout(() =>this.$router.replace("/"), 2500)
                }).catch(err => {
                    console.error(err.respons)
                    this.error.old = true
                });
            }
            
        },
    },

    created() {
        this.$emit('status',false)
    }

}
</script>
