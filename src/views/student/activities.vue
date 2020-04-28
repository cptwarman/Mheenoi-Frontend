<template>
  <v-container fluid fill-height>
      <v-row justify="center">
            <v-col cols="10">
                <v-row justify="center">
                     <v-card width="1000">
                        <v-card-title class="blue--text">
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
                                    <v-icon> more_horiz </v-icon>     
                                </v-btn>
                            </template>
                        </v-data-table>
                        <!-- dialog details -->
                        <v-dialog v-model="dialog.details">
                            <v-card>
                                test
                            </v-card>
                        </v-dialog>

                    </v-card>
                </v-row>
                <v-row justify="center" class="mt-5">
                    <v-btn color="primary" @click="dialog.new = true">new activity</v-btn>
                </v-row>

                <v-dialog v-model="dialog.new" persistent max-width="950" scrollable>
                   <v-card>
                       <v-card-title class="blue--text ml-5 py-4">
                           NEW ACTIVITY
                       </v-card-title>
                       <v-card-text>
                           <v-form>
                               <v-container fluid>
                                   <v-col>
                                       <!-- header of activity -->
                                       <v-row no-gutters>
                                           <span class="black--text subtitle-1">Activity Information</span>
                                       </v-row>
                                        <!-- activity detail -->
                                        <v-row justify="center">
                                            <!-- 1st col -->
                                            <v-col cols="12" md="6">

                                                <v-text-field
                                                v-model="passPayload.name"
                                                :rules="rules.name"
                                                :counter="64"
                                                label="Activity name"
                                                append-icon="view_headline"
                                                required        
                                                />

                                                <v-text-field
                                                v-model="passPayload.location"
                                                :rules="rules.location"
                                                :counter="64"
                                                append-icon="location_on"
                                                label="Location"
                                                required
                                                class="mt-5"
                                                />

                                                <v-textarea
                                                v-model="passPayload.detail"
                                                :rules="rules.detail"
                                                :counter="256"
                                                label="Detail"
                                                append-icon="sms"
                                                required
                                                class="mt-5"
                                                />

                                            </v-col>
                                            <!-- 2nd col -->
                                            <v-col cols="12" md="6">
                                                <!-- start date -->
                                                <v-menu
                                                ref="menu"
                                                v-model="dialog.menu"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.startDate"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                min-width="290px"
                                                 >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="passPayload.startDate"
                                                        label="Activity start date"
                                                        readonly
                                                        required
                                                        :rules="rules.picker"
                                                        append-icon="date_range"
                                                        v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="passPayload.startDate" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="dialog.menu = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(passPayload.startDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>

                                                <!-- start time -->

                                                <v-menu
                                                ref="menu3"
                                                v-model="dialog.menu3"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.startTime"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                max-width="290px"
                                                min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="passPayload.startTime"
                                                            label="Activity start time"
                                                            append-icon="access_time"
                                                            readonly
                                                            required
                                                            v-on="on"
                                                            class="mt-6"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="dialog.menu3"
                                                        v-model="passPayload.startTime"
                                                        full-width
                                                        format="24hr"
                                                        scrollable
                                                        @click:minute="$refs.menu3.save(passPayload.startTime)"
                                                    ></v-time-picker>
                                                </v-menu>
                                                
                                                <!-- end date -->

                                                <v-menu
                                                ref="menu2"
                                                v-model="dialog.menu2"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.endDate"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                min-width="290px"
                                                 >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="passPayload.endDate"
                                                        label="Activity end date"
                                                        readonly
                                                        required
                                                        append-icon="date_range"
                                                        v-on="on"
                                                        class="mt-6"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="passPayload.endDate" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="dialog.menu2 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu2.save(passPayload.endDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>

                                                <!-- end time -->

                                                <v-menu
                                                ref="menu4"
                                                v-model="dialog.menu4"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.endTime"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                max-width="290px"
                                                min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="passPayload.endTime"
                                                            label="Activity end time"
                                                            append-icon="access_time"
                                                            readonly
                                                            required
                                                            v-on="on"
                                                            class="mt-6"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="dialog.menu4"
                                                        v-model="passPayload.endTime"
                                                        full-width
                                                        format="24hr"
                                                        scrollable
                                                        @click:minute="$refs.menu4.save(passPayload.endTime)"
                                                    ></v-time-picker>
                                                </v-menu>

                                            </v-col>
                                        </v-row>

                                        <!-- header of student -->
                                       <v-row no-gutters class="mt-5">
                                           <span class="black--text subtitle-1">Add Students</span>
                                       </v-row>

                                   </v-col>
                               </v-container>
                           </v-form>
                       </v-card-text>
                       <v-card-actions>
                           <v-spacer/>
                                <v-btn outlined color="error" @click.stop = "dialog.new = false">cancel</v-btn>
                                <v-btn class="ml-5" color="success">submit</v-btn>
                           <v-spacer/>
                       </v-card-actions>
                   </v-card>
                </v-dialog>
                
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
            details: false,
            new: false,
            meun: false,
            menu2: false,
            menu3: false,
            menu4: false,
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
                text: "Duration (Hr.)", 
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

        payload: {},
        passPayload: {
            name: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            detail: "",
            location: "",
        },
        rules: {
            name: [
                v => !!v || "This field is required",
                v => v.length > 2 || "Activity name must be more than 2 characters",
                v => v.length <= 64 || "Activity name must be less than 32 characters",
            ],
            detail: [
                v => !!v || "This field is required",
                v => v.length > 9  || "Detail must be more than 9 characters",
                v => v.length <= 256 || "Detail name must be less than 256 characters",
            ],
            location: [
                v => !!v || "This field is required",
                v => v.length > 2  || "Detail must be more than 2 characters",
                v => v.length <= 64 || "Detail name must be less than 64 characters",
            ],
            picker: [
                v => !!v || "This field is required",
            ]
        },
    }
},

methods: {
    showDetails(item) {
        this.dialog.details  = true
    }
},

computed: {

},

}
</script>

<style>

</style>