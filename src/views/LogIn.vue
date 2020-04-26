<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            
          <v-col cols="11" sm="7" md="4">
            <div class="mb-4 d-flex justify-center" >
              <img
                src="../assets/mheenoiLogoLogin.png"
                alt="Mheenoi Logo"
                width="115"
                height="110"
              />
            </div>
              <div class="d-flex justify-center">
                <span class="text-no-wrap font-weight-medium headline"
                  >MHEENOI UNIVERSITY</span>
              </div>
              <div class="mb-5 d-flex justify-center">
                <span class="text-no-wrap headline"
                  >Student Information System</span>
              </div>
            
            <v-form>
              <v-row>
                <v-icon large class="mr-4">account_circle</v-icon>
                <v-text-field
                  label="Mheenoi ID"
                  name="login"
                  type="text"
                  v-model="user"
                  v-on:keyup.enter="SendData()"
                />
              </v-row>
              <v-row>
                <v-icon large class="mr-4">https</v-icon>
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  v-model="pass"
                  v-on:keyup.enter="SendData()"
                />
              </v-row>
            </v-form>

            <v-alert v-if="showText" type="error" dense>
              Wrong ID or Password
            </v-alert>
            
            <div class="text-center mt-7">
              <v-btn
                class="text-center"
                color="primary"
                large
                @click.native="SendData()"
                >Sign in
            </v-btn>
            </div>
          </v-col>
           
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: "App",
  data() {
    return {
        user: "",
        pass: "",
        showText: false,
     }
  },
  methods: {
    SendData() {
      axios({
         method: 'post',
         url: 'https://chai-test-backend.herokuapp.com/login',
         data: { 
           userId: this.user,
           password: this.pass },
         headers: {
         'content-type': 'application/json'
         }
      })
       .then(res => {
         console.log(res)
         if(res.status === 200) {
           this.$emit('status',true)
           
           sessionStorage.setItem('jwt',res.data.jwt)
           sessionStorage.setItem('type',res.data.type)
           sessionStorage.setItem('timer',1800)

           if(res.data.type == 1)
             this.$router.push("/student")
           else if(res.data.type == 2)
             this.$router.push("/lecturer")
           else if(res.data.type == 3)
             this.$router.push("/staff")
           else
             this.$router.replace("/")
            
         }
       })
       .catch(err => {
         this.showText = true;
         console.error(err);
       });
    },
  },

  created() {
    this.$emit('status',false)
  }
};
</script>



