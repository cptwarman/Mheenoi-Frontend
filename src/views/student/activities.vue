<template>
  <v-container fluid>
      <v-row justify="center">
            <v-col cols="10">
                <v-row justify="center">
                     <v-card>
                        <v-card-title>
                            Activities
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
                        :headers="table.headers"
                        :items="table.items"
                        :search="search"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-btn x-small color="primary" fab @click="showDetails(item)">
                                    <v-icon>
                                        more_horiz
                                    </v-icon>     
                                </v-btn>
                            </template>
                        </v-data-table>
                        <!-- dialog details -->
                        <v-dialog v-model="dialog.dialogDetails">
                            <v-card>
                                test
                            </v-card>
                        </v-dialog>

                    </v-card>
                </v-row>
                <v-row justify="center">
                    <v-btn color="primary" >add activity</v-btn>
                </v-row>
            </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
name: "activities",
data() {
    return {
        search: "",

        dialog: {
            dialogDetails: false
        },

        table: {
            headers: [{
                text: "Activities Name", 
                value: "name"
            },
            {
                text: "Date", 
                value: "date"
            },
            {
                text: "Duration", 
                value: "dateCal", 
            },
            {
                text: "Location",
                value: "location"
            },
            {
                value: 'actions',
                align: "center",
                sortable: false 
            }],
            items: [
                {
                    name: "กิจกรรมรักการอ่าน",
                    date: "2000-12-25",
                    dateCal: "10",
                    location: "มหาวิยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
                },
                {
                    name: "กิจกรรมรักการอ่าน",
                    date: "2000-12-25",
                    dateCal: "10",
                    location: "มหาวิยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
                },
                {
                    name: "กิจกรรมรักการอ่าน",
                    date: "2000-12-25",
                    dateCal: "10",
                    location: "มหาวิยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
                },
                {
                    name: "กิจกรรมรักการอ่าน",
                    date: "2000-12-25",
                    dateCal: "10",
                    location: "มหาวิยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
                },
                {
                    name: "กิจกรรมรักการอ่าน",
                    date: "2000-12-25",
                    dateCal: "10",
                    location: "มหาวิยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
                },
            ],
        },
    }
},

methods: {
    showDetails(item) {
        this.dialog.dialogDetails  = true
    }
},

computed: {

},

}
</script>

<style>

</style>