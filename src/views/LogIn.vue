<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-row class="mb-10" align="center" justify="center">
              <img
                src="../assets/mheenoiLogoLogin.png"
                alt="Mheenoi Logo"
                width="115"
                height="110"
              />
              <div class="ml-3">
                <span class="text-no-wrap font-weight-medium headline"
                  >MHEENOI UNIVERSITY</span
                >
                <br />
                <span class="text-no-wrap headline"
                  >Student Information System</span
                >
              </div>
            </v-row>
            <v-form>
              <v-row>
                <v-icon large class="mr-4">account_circle</v-icon>
                <v-text-field
                  label="Mheenoi ID"
                  name="login"
                  type="text"
                  v-model="user"
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
                />
              </v-row>
            </v-form>

            <v-alert v-if="showText" type="error" dense>
              Wrong ID or Password
            </v-alert>
            <v-alert v-if="showText" type="error" dense>
              Wrong ID or Password
            </v-alert>
            
            <div class="text-center mt-7">
              <v-btn
                class="text-center"
                color="primary"
                x-large
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
    }
  },

  created() {
    this.$emit('status',false)
  }
};
</script>



