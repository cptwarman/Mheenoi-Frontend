<template>
<div>
    <v-btn
        dark
        fab
        right
        bottom
        color="red"
        fixed
        @click = "snackbar = true"
    >
        <v-icon>timer</v-icon>
    </v-btn>

    <v-snackbar v-model="snackbar" top >
        <v-flex>
            <v-icon dark class="mr-2">timer</v-icon>
             {{formattedTimeLeft}}
        </v-flex>
      <v-btn color="red" small text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar5Min" color="error" :timeout="timeout">
        <v-flex>
            <v-icon dark class="mr-2">warning</v-icon>
            You have <b>5</b> minutes left!!
        </v-flex>
      <v-btn color="white" text @click="snackbar5Min = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar1Min" color="error" :timeout="timeout">
        <v-flex>
            <v-icon dark class="mr-2">warning</v-icon>
            You have <b>1</b> minutes left!!
        </v-flex>
      <v-btn color="white" text @click="snackbar1Min = false">
        Close
      </v-btn>
    </v-snackbar>

</div>
  
</template>

<script>
export default {
name: 'timer',
data() {
    return {
        timer: {
        count: 1800,
        timer2: null,
        },
        timeout: 10000,
        snackbar: false,
        snackbar5Min: false,
        snackbar1Min: false,
    }
},

mounted() {
      this.timer.count = sessionStorage.getItem('timer')
      if(sessionStorage.getItem('jwt') != null) {
        this.timer.timer2 = setInterval(() => {
          if(this.timer.count > 0) {
            this.timer.count--
            sessionStorage.setItem('timer',this.timer.count)
          }
        }, 1000 )
      }
},

beforeDestroy() {
    clearInterval(this.timer.timer2)
    sessionStorage.removeItem('timer')
},

computed: {
    formattedTimeLeft() {
        if(this.timer.count == 0) {
            sessionStorage.removeItem('jwt')
            sessionStorage.removeItem('type')
            sessionStorage.removeItem('timer')
           this.$router.replace("/")
        }

        let count = this.timer.count / 60
        let min = parseInt(count)
        let sec = Math.round((count - min) * 60) 
         if (min == 1 && sec == 59)
            this.snackbar1Min = true
         if (min == 5 && sec == 40)
            this.snackbar5Min = true
         if (min < 10) 
            min = "0"+ min
         if (sec < 10) 
            sec = "0"+ sec

        return min + ":" + sec;

    }
}

}
</script>