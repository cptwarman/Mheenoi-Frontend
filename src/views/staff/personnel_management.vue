<template>
    <v-container fill-height fluid>
        <v-col>
            <v-row justify="center" class="mb-7">
                <v-card class="py-3 px-5" shaped>
                    <span
                        class="blue--text 
                        font-weight-bold
                        title"
                    > PERSONNEL MANAGEMENT</span>
                </v-card>
            </v-row>

            <v-row justify="center">
                <v-card>
                    <v-card-title>
                        <v-btn color="primary" small rounded @click="getStudents" :disabled="btn.students" class="mt-2">
                            <v-icon left>school</v-icon> students</v-btn>
                        <v-btn color="primary" small rounded @click="getLecturers" :disabled="btn.lecturers" class="ml-2 mt-2">
                            <v-icon left>record_voice_over</v-icon> lecturers</v-btn>
                        <v-btn color="primary" small rounded @click="getStaffs" :disabled="btn.staffs" class="ml-2 mt-2">
                            <v-icon left>person</v-icon> staffs</v-btn>
                        <v-spacer/>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details           
                                dense       
                            />
                    </v-card-title>

                    <v-card-text class="pb-0">
                        <v-data-table
                            :headers="swapHeader"
                            :items="swapData"
                            :search="search"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-btn x-small color="primary" fab @click="showDetails(item)">
                                    <v-icon> more_horiz </v-icon>     
                                </v-btn>
                            </template>

                        </v-data-table>
                    </v-card-text>

                    <v-card-actions class="pb-3 pt-0 pl-3">                       
                        <v-btn color="success" @click.stop="dialog.add = true">
                            <v-icon left>person_add</v-icon> add person</v-btn>                   
                    </v-card-actions>

                </v-card>
            </v-row>
            <!-- choose person to add -->
            <v-dialog width="800" v-model="dialog.add">
                <v-card outlined class="pa-3">
                  
                    <v-container>
                        <v-row justify="center">
                            <!-- add student -->
                            <v-col cols="12" sm="6">
                                <v-card height="100%" outlined>
                                    <v-card-title class="d-flex justify-center py-1" style="background: #1565C0;">
                                    <b class="subtitle-1 font-weight-bold white--text">ADD STUDENT</b> 
                                    </v-card-title>

                                    <v-card-text class="d-flex justify-center mt-2 pb-1">
                                        <img src="../../assets/profile/student.png" alt="student" width="170" height="170">
                                    </v-card-text>

                                    <v-card-actions class="pt-0 pb-2">
                                        <v-spacer/>

                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn rounded color="primary" dark v-on="on" @click="clearPassStudent()">click</v-btn>
                                                </template>
                                                <span>Add Student</span>
                                            </v-tooltip>

                                        <v-spacer/>
                                    </v-card-actions>
                                </v-card>
                            </v-col>

                            <!-- add EMPLOYEE -->

                            <v-col cols="12" sm="6">
                                <v-card height="100%" outlined>
                                    <v-card-title class="d-flex justify-center py-1" style="background: #FF9800;">
                                    <b class="subtitle-1 font-weight-bold white--text">ADD EMPLOYEE</b> 
                                    </v-card-title>

                                    <v-card-text class="d-flex justify-center mt-2 pb-1">
                                        <img src="../../assets/profile/lecturer.png" alt="lecturer" width="170" height="170">
                                    </v-card-text>

                                    <v-card-actions class="pt-0 pb-2">
                                        <v-spacer/>

                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn rounded color="orange" dark v-on="on" @click="clearPassEmployee()">click</v-btn>
                                                </template>
                                                <span>Add Employee</span>
                                            </v-tooltip>

                                        <v-spacer/>
                                    </v-card-actions>
                                </v-card>
                            </v-col>

                        </v-row>
                    </v-container>

                    <v-card-actions v-if="$vuetify.breakpoint.xs">
                        <v-spacer/>
                            <v-btn large color="error" @click = "dialog.add = false">close</v-btn>
                        <v-spacer/>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Student Add -->
            <!-- Student Add -->
            <!-- Student Add -->

             <v-dialog v-model="dialog.addS" persistent max-width="1200" scrollable>
                <v-card>
                    <v-card-title class="blue--text title">
                        ADD STUDENT
                        <v-spacer/>
                        <v-btn color="error" small rounded @click="clearPassStudent()">clear</v-btn>
                    </v-card-title>
                <!-- Input fields -->
                    <v-card-text class="pb-0">
                        <v-form>

                            <v-container fluid>
                                <v-col>
                                    <v-row no-gutters>
                                        <span class="blue--text subtitle-1"> 
                                            About Student
                                        </span>
                                    </v-row>
                                    <!-- row about student -->
                                    <v-row justify="center" :no-gutters="$vuetify.breakpoint.smAndDown">
                                        <!-- Column 1 -->
                                        <v-col cols="12" md="4">

                                            <v-select
                                                v-model="passPayload.students.depName"
                                                :items="department"
                                                label="Department"
                                                required
                                            ></v-select>

                                            <v-select
                                                v-model="passPayload.students.degree"
                                                :items = "degree"
                                                label="Degree"
                                                required
                                                class="mt-5"
                                            ></v-select>
                                            
                                            <v-select
                                                v-model="passPayload.students.program"
                                                :items = "program"
                                                label="Program"
                                                required
                                                 class="mt-5"
                                            ></v-select> 

                                            <v-select
                                                v-model="passPayload.students.gender"
                                                :items = "genderSelect"
                                                label="Gender"
                                                required
                                                class="mt-5"
                                            ></v-select>
                                        </v-col>

                                        <!-- column 2 -->
                                        <v-col cols="12" md="4">
                                             <v-text-field
                                                v-model="passPayload.students.firstName"
                                                :rules="Rules.nameRules"
                                                :counter="32"
                                                label="First name"
                                                required
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="passPayload.students.lastName"
                                                :rules="Rules.nameRules"
                                                :counter="32"
                                                label="Last name"
                                                required
                                                class="mt-5"
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="passPayload.students.email"
                                                :rules="Rules.emailRules"
                                                :counter="32"
                                                label="E-mail"
                                                required
                                                class="mt-5"
                                            ></v-text-field>                       

                                            <v-text-field
                                                v-model="passPayload.students.idCardNumber"
                                                :rules="Rules.idCardRules"
                                                :counter="13"
                                                label="ID Card Number"
                                                required 
                                                class="mt-5"
                                            ></v-text-field>
                                        </v-col>

                                        <!-- column 3 -->
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="passPayload.students.phoneNo"
                                                :rules="Rules.phoneRules"
                                                :counter="10"
                                                label="Phone"
                                                hint="You can use the home number instead phone number"
                                                required
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="passPayload.students.address"
                                                :rules="Rules.addressRules"
                                                :counter="128"
                                                label="Address"
                                                required
                                                class="mt-5"
                                            ></v-text-field>

                                            <v-select
                                                v-model="passPayload.students.bloodType"
                                                :items = "bloodTypeSelect"
                                                label="Blood Type"
                                                required
                                                class="mt-5"
                                            ></v-select>

                                            <v-menu
                                                ref="menu"
                                                v-model="menuS"
                                                :close-on-content-click="false"
                                                :return-value.sync="passPayload.students.dob"
                                                transition="scale-transition"
                                                offset-y
                                                offset-overflow
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                    v-model="passPayload.students.dob"
                                                    label="Birthday"
                                                    class="mt-5"
                                                    readonly
                                                    v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="passPayload.students.dob" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="menuS = false">Cancel</v-btn>
                                                    <v-btn text color="primary" @click="$refs.menu.save(passPayload.students.dob)">OK</v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-col>

                                    </v-row>

                                    <!-- Row About Family -->
                                    <!-- Header -->
                                    <v-row no-gutters class="mt-5">
                                        <span class="blue--text subtitle-1">
                                        About Family
                                        </span>
                                    </v-row>
                                    <!-- Input -->
                                    <v-row justify="center" :no-gutters="$vuetify.breakpoint.smAndDown">
                                        <!-- 1st col -->
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="passPayload.students.parent1FirstName"
                                                :rules="Rules.nameRules"
                                                :counter="32"
                                                label="Guardian1 First name"
                                                required
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="passPayload.students.parent1LastName"
                                                :rules="Rules.nameRules"
                                                :counter="32"
                                                label="Guardian1 Last name"
                                                required
                                                class="mt-5"
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="passPayload.students.parent1Career"
                                                :rules="Rules.careerRules"
                                                :counter="20"
                                                label="Guardian1 Career"
                                                required
                                                hint="If your guardian doesn' have a career, you can enter - "
                                                class="mt-5"
                                            ></v-text-field>
                                            
                                            <v-text-field
                                                v-model="passPayload.students.parent1Income"
                                                :rules="Rules.incomeRules"
                                                label="Guardian1 Income"
                                                required
                                                hint="if your guardian doesn't have income, you can enter 0"
                                                class="mt-5"
                                            ></v-text-field>           
                                        </v-col>

                                        <!-- 2nd col -->
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="passPayload.students.parent1Tel"
                                                :rules="Rules.phoneRules"
                                                :counter="10"
                                                label="Guardian1 Phone"
                                                hint="You can use the home number instead phone number"
                                                required
                                            ></v-text-field>

                                            <v-select
                                                v-model="passPayload.students.parent1Relation"
                                                :items = "RelationSelect"
                                                label="Guardian1 Relation with Student"
                                                required
                                                class="mt-5"
                                            ></v-select>

                                            <v-text-field
                                                v-model="passPayload.students.parent2FirstName"
                                                :rules="Rules.nameRules"
                                                :counter="32"
                                                label="Guardian2 First name"
                                                required
                                                class="mt-5"
                                            ></v-text-field>
                                            
                                            <v-text-field
                                                v-model="passPayload.students.parent2LastName"
                                                :rules="Rules.nameRules"
                                                :counter="32"
                                                label="Guardian2 Last name"
                                                required
                                                class="mt-5"
                                            ></v-text-field>         
                                        </v-col>

                                        <!-- 3rd col -->
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                v-model="passPayload.students.parent2Career"
                                                :rules="Rules.careerRules"
                                                :counter="20"
                                                label="Guardian2 Career"
                                                hint="If your guardian doesn't have a career, you can enter - "
                                                required
                                            ></v-text-field>

                                            <v-text-field
                                                v-model="passPayload.students.parent2Income"
                                                :rules="Rules.incomeRules"
                                                label="Guardian2 Income"
                                                required
                                                hint="if your guardian doesn't have income, you can enter 0"
                                                class="mt-5"
                                            ></v-text-field>
                                            
                                            <v-text-field
                                                v-model="passPayload.students.parent2Tel"
                                                :rules="Rules.phoneRules"
                                                :counter="10"
                                                hint="You can use the home number instead phone number"
                                                label="Guardian2 Phone"
                                                required
                                                class="mt-5"
                                            ></v-text-field>  

                                            <v-select
                                                v-model="passPayload.students.parent2Relation"
                                                :items = "RelationSelect"
                                                label="Guardian2 Relation with Student"
                                                class="mt-5"
                                            ></v-select>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-container>

                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pb-5">
                        <!-- Buttons -->
                        <v-spacer/>
                            <!-- cancel button -->
                            <v-btn outlined color="error" class="mr-2" @click.stop="dialogS.dialogCancel = true">
                                <v-icon left>close</v-icon> cancel
                            </v-btn>
                            <!-- submit button -->
                            <v-btn @click.stop="dialogS.dialogSubmit = true" :disabled="$v.passPayload.students.$invalid" color="success" class="ml-6">
                                <v-icon left>check</v-icon> submit
                            </v-btn>
                        <v-spacer/>

                    </v-card-actions>

                </v-card>

                <!-- pop up cancel -->
                <v-dialog v-model="dialogS.dialogCancel" max-width="450">
                    <v-card class="pa-5">  
                        
                        <v-card-text class="text-center">
                            <img src="../../assets/alert.png" alt="alert" width="180">
                            <h2 class="mt-4">Are you sure you want to <span class="red--text">cancel</span> ?</h2>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer/>
                                <v-btn @click.stop="dialogS.dialogCancel = false" color="error" outlined> no </v-btn>
                                <v-btn @click.stop="dialog.addS = false" color="error" class="ml-6" outlined> yes </v-btn>
                            <v-spacer/>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
                <!-- end of pop up cancel -->
            
                <!-- pop up submit -->
                <v-dialog v-model="dialogS.dialogSubmit" max-width="450">
                    <v-card class="pa-5">

                        <v-card-text class="text-center">
                            <img src="../../assets/alertSoft.png" alt="alertSoft" width="180">
                            <h2 class="mt-4">Are you sure you want to <span class="success--text">submit</span> ?</h2>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer/>
                                <v-btn @click.stop="dialogS.dialogSubmit = false" color="success" outlined> no </v-btn>
                                <v-btn @click="postNewStudent()" color="success" class="ml-6" outlined> yes </v-btn>
                            <v-spacer/>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
                <!-- end of pop up submit -->

            </v-dialog>

            <!-- End Student Add -->
            <!-- End Student Add -->
            <!-- End Student Add -->

            <!-- Employee Add -->
            <!-- Employee Add -->
            <!-- Employee Add -->

            <v-dialog v-model="dialog.addL" persistent max-width="800" scrollable>
                <v-card>
                    <v-card-title class="blue--text title">
                        ADD EMPLOYEE 
                        <v-spacer/>
                        <v-btn color="error" small rounded @click="clearPassEmployee()">clear</v-btn>
                    </v-card-title>

                    <v-card-text>
                        <v-form>
                            <v-container fluid>
                                <v-row justify="center">

                                    <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="passPayload.lecturers.depName"
                                            :items="department"
                                            label="Department"
                                            required
                                        />

                                        <v-select
                                            v-model="passPayload.lecturers.position"
                                            :items="position"
                                            label="Position"
                                            required
                                            class="mt-5"
                                        />

                                        <v-text-field
                                            v-model="passPayload.lecturers.firstName"
                                            :rules="rules.name"
                                            :counter="32"
                                            label="First name"
                                            required
                                             class="mt-5"
                                        />
                                        <v-text-field
                                            v-model="passPayload.lecturers.lastName"
                                            :rules="rules.name"
                                            :counter="32"
                                            label="Last name"
                                            required
                                            class="mt-5"
                                        />
                                        <v-text-field
                                            v-model="passPayload.lecturers.email"
                                            :rules="rules.email"
                                            :counter="32"
                                            label="E-mail"
                                            required
                                            class="mt-5"
                                        />
                                        <v-text-field
                                            v-model="passPayload.lecturers.idCardNumber"
                                            :rules="rules.idCardNumber"
                                            :counter="13"
                                            label="ID Card Number"
                                            required
                                            class="mt-5"
                                        />
                                       
                                    </v-col>
                                    <!-- col 2nd -->
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="passPayload.lecturers.bloodType"
                                            :items="select.bloodType"
                                            label="Blood Type"
                                            required                                           
                                        />

                                        <v-select
                                            v-model="passPayload.lecturers.gender"
                                            :items="select.gender"
                                            label="Gender"
                                            required
                                            class="mt-5"
                                        />

                                        <v-text-field
                                            v-model="passPayload.lecturers.phoneNo"
                                            :rules="rules.phone"
                                            :counter="10"
                                            label="Phone"
                                            required
                                            class="mt-5"
                                        />

                                        <v-menu
                                            ref="menuL"
                                            v-model="menuL"
                                            :close-on-content-click="false"
                                            :return-value.sync="passPayload.lecturers.dob"
                                            transition="scale-transition"
                                            offset-y
                                            offset-overflow
                                            min-width="290px"
                                        >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                    v-model="passPayload.lecturers.dob"
                                                    label="Birthday"
                                                    class="mt-5"
                                                    readonly
                                                    v-on="on"
                                                    />
                                                </template>
                                                <v-date-picker v-model="passPayload.lecturers.dob" no-title scrollable>
                                                    <v-spacer/>
                                                    <v-btn text color="primary" @click="menuL = false">Cancel</v-btn>
                                                    <v-btn text color="primary" @click="$refs.menuL.save(passPayload.lecturers.dob)">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>

                                         <v-text-field
                                            v-model="passPayload.lecturers.address"
                                            :rules="rules.address"
                                            :counter="128"
                                            label="Address"
                                            required
                                            class="mt-5"
                                        />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pb-5">
                        <!-- Buttons -->
                        <v-spacer/>
                        <!-- cancel button -->
                        <v-btn outlined color="error" class="mr-2" @click.stop="dialogL.cancel = true">
                            <v-icon left>close</v-icon> cancel
                        </v-btn>
                        <!-- submit button -->
                        <v-btn @click.stop="dialogL.submit = true" :disabled="$v.passPayload.lecturers.$invalid" color="success" class="ml-4">
                            <v-icon left>check</v-icon> submit
                        </v-btn>

                        <!-- pop up cancel -->
                            <v-dialog v-model="dialogL.cancel" max-width="450">
                            <v-card class="pa-5">   
                                <v-card-text class="text-center">
                                <img src="../../assets/alert.png" alt="alert" width="180">
                                <h2 class="mt-4">Are you sure you want to <span class="red--text">cancel</span> ?</h2>
                                </v-card-text>
                                <v-card-actions>
                                <v-spacer/>
                                    <v-btn @click.stop="dialogL.cancel = false" color="error" outlined> no </v-btn>
                                    <v-btn @click.stop="dialog.addL = false" color="error" class="ml-6" outlined> yes </v-btn>
                                <v-spacer/>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        <!-- end of pop up cancel -->

                        <!-- pop up submit -->
                        <v-dialog v-model="dialogL.submit" max-width="450">
                            <v-card class="pa-5">
                            <v-card-text class="text-center">
                                <img src="../../assets/alertSoft.png" alt="alertSoft" width="180">
                                <h2 class="mt-4">Are you sure you want to <span class="success--text">submit</span> ?</h2>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                    <v-btn @click.stop="dialogL.submit = false" color="success" outlined> no </v-btn>
                                    <v-btn @click="postNewEmployee()" color="success" class="ml-6" outlined> yes </v-btn>
                                <v-spacer/>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <!-- end of pop up submit -->

                        <v-spacer/>

                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- End of Employee Add -->
            <!-- End of Employee Add -->
            <!-- End of Employee Add -->

            <v-snackbar v-model="snackbar.pass" color="success">
                Add person Successful
                <v-btn color="white" text @click="snackbar.pass = false"> Close </v-btn>
            </v-snackbar>

            <v-snackbar top v-model="snackbar.fail" color="error">
                Something went wrong
                <v-btn color="white" text @click="snackbar.fail = false"> Close </v-btn>
            </v-snackbar>

        </v-col>

        <!-- Student Detail -->
        <!-- Student Detail -->
        <!-- Student Detail -->

        <v-dialog v-if="dialog.detailS" v-model="dialog.detailS" fullscreen>

            <v-card color="#e6f2ff">
                <v-container fluid v-if="!this.$store.getters.getLoader">
                    <!-- parent row -->
                    <v-row justify="center">
                        <!-- parent col -->
                        <v-col cols="12" lg="9" sm="11">
                            <!-- header -->
                            <v-col lg="12">
                                <v-row justify="center" class="mb-3">
                                    <v-card class="py-3 px-5" shaped>
                                        <span
                                            class="blue--text 
                                            font-weight-bold
                                            title"
                                        > STUDENT INFORMATION</span>
                                    </v-card>
                                </v-row>
                            </v-col>

                            <!-- pass info prop -->
                            <infoStudent :info = "RealPassPayload.students[indexOfInfo]" />
                            

                            <v-card class="pa-5 card1 mt-5">
                                <v-card-text>
                                    <!-- row 2nd about parent and student -->
                                    <v-row justify="center">

                                        <v-col sm="4" cols="8">
                                            <div :class="marginClass">
                                                <h3 class="blue--text mb-4">Student</h3>
                                                <p style="word-wrap: break-word;"><b>ID Card Number</b>: {{RealPassPayload.students[indexOfInfo].idCardNumber}}</p>
                                                <p><b>Blood type</b>: {{RealPassPayload.students[indexOfInfo].bloodType}}</p>
                                                <p><b>Phone</b>: {{RealPassPayload.students[indexOfInfo].phoneNo}}</p>
                                                <p><b>Address</b>: {{RealPassPayload.students[indexOfInfo].address}}</p>           
                                            </div>
                                        </v-col>
                                        
                                        <v-col sm="4" cols="8">
                                            <div class="d-flex justify-center flex-column">
                                                <h3 class="blue--text mb-4">Guardian 1</h3>
                                                <p><b>First Name</b>: {{RealPassPayload.students[indexOfInfo].parent1FirstName}}</p>
                                                <p><b>Last Name</b>: {{RealPassPayload.students[indexOfInfo].parent1LastName}}</p>
                                                <p><b>Career</b>: {{RealPassPayload.students[indexOfInfo].parent1Career}}</p>
                                                <p><b>Income</b>: {{RealPassPayload.students[indexOfInfo].parent1Income}} Bath</p>
                                                <p><b>Phone</b>: {{RealPassPayload.students[indexOfInfo].parent1Tel}}</p>
                                                <p><b>Relation with student</b>: {{RealPassPayload.students[indexOfInfo].parent1Relation}}</p>
                                            </div>                        
                                        </v-col>
                                    
                                        <v-col sm="4" cols="8">
                                            <div class="d-flex justify-center flex-column">
                                                <h3 class="blue--text mb-4">Guardian 2</h3>
                                                <p><b>First Name</b>: {{RealPassPayload.students[indexOfInfo].parent2FirstName}}</p>
                                                <p><b>Last Name</b>: {{RealPassPayload.students[indexOfInfo].parent2LastName}}</p>
                                                <p><b>Career</b>: {{RealPassPayload.students[indexOfInfo].parent2Career}}</p>
                                                <p><b>Income</b>: {{RealPassPayload.students[indexOfInfo].parent2Income}} Bath</p>
                                                <p><b>Phone</b>: {{RealPassPayload.students[indexOfInfo].parent2Tel}}</p>
                                                <p><b>Relation with student</b>: {{RealPassPayload.students[indexOfInfo].parent2Relation}}</p>
                                            </div>
                                        </v-col>

                                    </v-row>
                                    
                                    <v-card-actions>
                                        <v-spacer/>
                                            <v-btn outlined class="mr-2" @click.stop="dialogS.dialog = true" @click="editInfoStudent()">
                                                <v-icon left>create</v-icon> edit
                                            </v-btn>

                                            <v-btn  color="error" dark @click="dialog.detailS = false">
                                                <v-icon left>clear</v-icon> close
                                            </v-btn>
                                        <v-spacer/>
                                    </v-card-actions>

                                    <!-- edit information -->
                                    <!-- edit information -->
                                    <!-- edit information -->

                                    <v-dialog v-model="dialogS.dialog" persistent max-width="1200" scrollable>
                                        <v-card>
                                        <!-- Input fields -->
                                            <v-card-text class="pb-0">
                                                <v-form>

                                                    <v-container fluid>
                                                        <v-col>
                                                            <v-row no-gutters>
                                                                <span class="blue--text subtitle-1"> 
                                                                    About Student
                                                                </span>
                                                            </v-row>
                                                            <!-- row about student -->
                                                            <v-row justify="center" :no-gutters="$vuetify.breakpoint.smAndDown">
                                                                <!-- Column 1 -->
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field
                                                                        v-model="passPayload.students.firstName"
                                                                        :rules="Rules.nameRules"
                                                                        :counter="32"
                                                                        label="First name"
                                                                        required
                                                                    ></v-text-field>

                                                                    <v-text-field
                                                                        v-model="passPayload.students.lastName"
                                                                        :rules="Rules.nameRules"
                                                                        :counter="32"
                                                                        label="Last name"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-text-field>

                                                                    <v-text-field
                                                                        v-model="passPayload.students.email"
                                                                        :rules="Rules.emailRules"
                                                                        :counter="32"
                                                                        label="E-mail"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-text-field>                        
                                                                </v-col>

                                                                <!-- column 2 -->
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field
                                                                        v-model="passPayload.students.idCardNumber"
                                                                        :rules="Rules.idCardRules"
                                                                        :counter="13"
                                                                        label="ID Card Number"
                                                                        required
                                                                        
                                                                    ></v-text-field>

                                                                    <v-text-field
                                                                        v-model="passPayload.students.phoneNo"
                                                                        :rules="Rules.phoneRules"
                                                                        :counter="10"
                                                                        label="Phone"
                                                                        hint="You can use the home number instead phone number"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-text-field>

                                                                    <v-text-field
                                                                        v-model="passPayload.students.address"
                                                                        :rules="Rules.addressRules"
                                                                        :counter="128"
                                                                        label="Address"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-text-field>
                                                                </v-col>

                                                                <!-- column 3 -->
                                                                <v-col cols="12" md="4">
                                                                    <v-select
                                                                        v-model="passPayload.students.gender"
                                                                        :items = "genderSelect"
                                                                        label="Gender"
                                                                        required
                                                                    ></v-select>

                                                                    <v-select
                                                                        v-model="passPayload.students.bloodType"
                                                                        :items = "bloodTypeSelect"
                                                                        label="Blood Type"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-select>

                                                                    <v-menu
                                                                        ref="menu"
                                                                        v-model="menuS"
                                                                        :close-on-content-click="false"
                                                                        :return-value.sync="passPayload.students.dob"
                                                                        transition="scale-transition"
                                                                        offset-y
                                                                        offset-overflow
                                                                        min-width="290px"
                                                                    >
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-text-field
                                                                            v-model="passPayload.students.dob"
                                                                            label="Birthday"
                                                                            class="mt-5"
                                                                            readonly
                                                                            v-on="on"
                                                                            ></v-text-field>
                                                                        </template>
                                                                        <v-date-picker v-model="passPayload.students.dob" no-title scrollable>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn text color="primary" @click="menuS = false">Cancel</v-btn>
                                                                            <v-btn text color="primary" @click="$refs.menu.save(passPayload.students.dob)">OK</v-btn>
                                                                        </v-date-picker>
                                                                    </v-menu>
                                                                </v-col>

                                                            </v-row>

                                                            <!-- Row About Family -->
                                                            <!-- Header -->
                                                            <v-row no-gutters class="mt-5">
                                                                <span class="blue--text subtitle-1">
                                                                About Family
                                                                </span>
                                                            </v-row>
                                                            <!-- Input -->
                                                            <v-row justify="center" :no-gutters="$vuetify.breakpoint.smAndDown">
                                                                <!-- 1st col -->
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent1FirstName"
                                                                        :rules="Rules.nameRules"
                                                                        :counter="32"
                                                                        label="Guardian1 First name"
                                                                        required
                                                                    ></v-text-field>

                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent1LastName"
                                                                        :rules="Rules.nameRules"
                                                                        :counter="32"
                                                                        label="Guardian1 Last name"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-text-field>

                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent1Career"
                                                                        :rules="Rules.careerRules"
                                                                        :counter="20"
                                                                        label="Guardian1 Career"
                                                                        required
                                                                        hint="If your guardian doesn' have a career, you can enter - "
                                                                        class="mt-5"
                                                                    ></v-text-field>
                                                                    
                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent1Income"
                                                                        :rules="Rules.incomeRules"
                                                                        label="Guardian1 Income"
                                                                        required
                                                                        hint="if your guardian doesn't have income, you can enter 0"
                                                                        class="mt-5"
                                                                    ></v-text-field>           
                                                                </v-col>

                                                                <!-- 2nd col -->
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent1Tel"
                                                                        :rules="Rules.phoneRules"
                                                                        :counter="10"
                                                                        label="Guardian1 Phone"
                                                                        hint="You can use the home number instead phone number"
                                                                        required
                                                                    ></v-text-field>

                                                                    <v-select
                                                                        v-model="passPayload.students.parent1Relation"
                                                                        :items = "RelationSelect"
                                                                        label="Guardian1 Relation with Student"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-select>

                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent2FirstName"
                                                                        :rules="Rules.nameRules"
                                                                        :counter="32"
                                                                        label="Guardian2 First name"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-text-field>
                                                                    
                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent2LastName"
                                                                        :rules="Rules.nameRules"
                                                                        :counter="32"
                                                                        label="Guardian2 Last name"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-text-field>         
                                                                </v-col>

                                                                <!-- 3rd col -->
                                                                <v-col cols="12" md="4">
                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent2Career"
                                                                        :rules="Rules.careerRules"
                                                                        :counter="20"
                                                                        label="Guardian2 Career"
                                                                        hint="If your guardian doesn't have a career, you can enter - "
                                                                        required
                                                                    ></v-text-field>

                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent2Income"
                                                                        :rules="Rules.incomeRules"
                                                                        label="Guardian2 Income"
                                                                        required
                                                                        hint="if your guardian doesn't have income, you can enter 0"
                                                                        class="mt-5"
                                                                    ></v-text-field>
                                                                    
                                                                    <v-text-field
                                                                        v-model="passPayload.students.parent2Tel"
                                                                        :rules="Rules.phoneRules"
                                                                        :counter="10"
                                                                        hint="You can use the home number instead phone number"
                                                                        label="Guardian2 Phone"
                                                                        required
                                                                        class="mt-5"
                                                                    ></v-text-field>  

                                                                    <v-select
                                                                        v-model="passPayload.students.parent2Relation"
                                                                        :items = "RelationSelect"
                                                                        label="Guardian2 Relation with Student"
                                                                        class="mt-5"
                                                                    ></v-select>
                                                                </v-col>
                                                            </v-row>

                                                        </v-col>
                                                    </v-container>

                                                </v-form>
                                            </v-card-text>

                                            <v-card-actions class="pb-5">
                                                <!-- Buttons -->
                                                <v-spacer/>
                                                    <!-- cancel button -->
                                                    <v-btn outlined color="error" class="mr-2" @click.stop="dialogS.dialogCancel = true">
                                                        <v-icon left>close</v-icon> cancel
                                                    </v-btn>
                                                    <!-- submit button -->
                                                    <v-btn @click.stop="dialogS.dialogSubmit = true" :disabled="$v.passPayload.students.$invalid" color="success" class="ml-6">
                                                        <v-icon left>check</v-icon> submit
                                                    </v-btn>
                                                <v-spacer/>

                                                <!-- pop up cancel -->
                                                <v-dialog v-model="dialogS.dialogCancel" max-width="450">
                                                    <v-card class="pa-5">  
                                                        
                                                        <v-card-text class="text-center">
                                                            <img src="../../assets/alert.png" alt="alert" width="180">
                                                            <h2 class="mt-4">Are you sure you want to <span class="red--text">cancel</span> ?</h2>
                                                        </v-card-text>

                                                        <v-card-actions>
                                                            <v-spacer/>
                                                                <v-btn @click.stop="dialogS.dialogCancel = false" color="error" outlined> no </v-btn>
                                                                <v-btn @click.stop="dialogS.dialog = false" color="error" class="ml-6" outlined> yes </v-btn>
                                                            <v-spacer/>
                                                        </v-card-actions>

                                                    </v-card>
                                                </v-dialog>
                                                <!-- end of pop up cancel -->
                                            
                                                <!-- pop up submit -->
                                                <v-dialog v-model="dialogS.dialogSubmit" max-width="450">
                                                    <v-card class="pa-5">

                                                        <v-card-text class="text-center">
                                                            <img src="../../assets/alertSoft.png" alt="alertSoft" width="180">
                                                            <h2 class="mt-4">Are you sure you want to <span class="success--text">submit</span> ?</h2>
                                                        </v-card-text>

                                                        <v-card-actions>
                                                            <v-spacer/>
                                                                <v-btn @click.stop="dialogS.dialogSubmit = false" color="success" outlined> no </v-btn>
                                                                <v-btn @click="infoSubmitStudent()" color="success" class="ml-6" outlined> yes </v-btn>
                                                            <v-spacer/>
                                                        </v-card-actions>

                                                    </v-card>
                                                </v-dialog>
                                                <!-- end of pop up submit -->

                                            </v-card-actions>

                                        </v-card>
                                    </v-dialog>

                                </v-card-text>
                            </v-card>
                        </v-col>
                         <!-- end of parent col -->
                    </v-row>
                    <!-- end of parent row -->

                    <v-snackbar v-model="snackbarS.pass" color="success">
                        Edit Successful
                        <v-btn color="white" text @click="snackbarS.pass = false"> Close </v-btn>
                    </v-snackbar>

                    <v-snackbar v-model="snackbarS.fail" color="error">
                        Something went wrong
                        <v-btn color="white" text @click="snackbarS.fail = false"> Close </v-btn>
                    </v-snackbar>
                </v-container>
            </v-card>

        </v-dialog>

        <!--End Of Student Detail -->
        <!--End Of Student Detail -->
        <!--End Of Student Detail -->

        <!-- lecturer Detail -->
        <!-- lecturer Detail -->
        <!-- lecturer Detail -->

        <v-dialog v-if="dialog.detailL" v-model="dialog.detailL" width="1000">
            <v-card color="#e6f2ff">

                <v-container fill-height fluid>
                    <v-row justify="center">
                        <v-col sm="8">
                            <v-row justify="center" class="mb-3">
                                <v-card class="py-3 px-5" shaped>
                                    <span
                                    class="blue--text 
                                    font-weight-bold
                                    title"
                                    > LECTURER INFORMATION</span>
                                </v-card>
                            </v-row>

                            <v-card>
                                <v-card-text style="line-height: 2">
                                    <!-- picture -->
                                    <v-row justify="center">
                                        <img src="../../assets/profile/lecturer.png" alt="lecturer" width="180" height="180">
                                    </v-row>
                                    <!-- infomation -->
                                    <v-row justify="center" class="mt-5">
                                        <v-col cols="11" sm="5">
                                            <v-row :justify="changePosition">
                                                <div :class="changeMargin">
                                                    <p><b>Employee ID</b>: {{RealPassPayload.lecturers[indexOfInfo].employeeId}}</p>
                                                    <p><b>Position</b>: {{RealPassPayload.lecturers[indexOfInfo].position}}</p>
                                                    <p><b>First Name</b>: {{RealPassPayload.lecturers[indexOfInfo].firstName}}</p>
                                                    <p><b>Last Name</b>: {{RealPassPayload.lecturers[indexOfInfo].lastName}}</p>
                                                    <p><b>ID Card Number</b>: {{RealPassPayload.lecturers[indexOfInfo].idCardNumber}}</p>
                                                    <p><b>Address</b>: {{RealPassPayload.lecturers[indexOfInfo].address}}</p>
                                                </div>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="11" sm="5">
                                            <v-row :justify="changePosition2">
                                                <div :class="changeMargin2">
                                                    <p><b>Faculty</b>: {{RealPassPayload.lecturers[indexOfInfo].faculty}}</p>
                                                    <p><b>Department</b>: {{RealPassPayload.lecturers[indexOfInfo].depName}}</p>
                                                    <p><b>Blood type</b>: {{RealPassPayload.lecturers[indexOfInfo].bloodType}}</p>
                                                    <p><b>Gender</b>: {{RealPassPayload.lecturers[indexOfInfo].gender}}</p>
                                                    <p><b>Phone</b>: {{RealPassPayload.lecturers[indexOfInfo].phoneNo}}</p>
                                                    <p><b>E-mail</b>: {{RealPassPayload.lecturers[indexOfInfo].email}}</p>
                                                    <p><b>Birthday</b>: {{RealPassPayload.lecturers[indexOfInfo].dob}}</p>
                                                </div>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions class="pb-5">
                                    <v-spacer/>
                                        <v-btn outlined class="mr-2" @click.stop="dialogL.edit = true" @click="editInfoLecturer()">
                                            <v-icon left>create</v-icon> edit
                                        </v-btn>

                                        <v-btn  color="error" dark @click="dialog.detailL = false">
                                            <v-icon left>clear</v-icon> close
                                        </v-btn>
                                    <v-spacer/>
                                </v-card-actions>
                            </v-card>

                            <v-dialog v-model="dialogL.edit" persistent max-width="800" scrollable>
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
                                                            v-model="passPayload.lecturers.firstName"
                                                            :rules="rules.name"
                                                            :counter="32"
                                                            label="First name"
                                                            required
                                                        />
                                                        <v-text-field
                                                            v-model="passPayload.lecturers.lastName"
                                                            :rules="rules.name"
                                                            :counter="32"
                                                            label="Last name"
                                                            required
                                                            class="mt-5"
                                                        />
                                                        <v-text-field
                                                            v-model="passPayload.lecturers.email"
                                                            :rules="rules.email"
                                                            :counter="32"
                                                            label="E-mail"
                                                            required
                                                            class="mt-5"
                                                        />
                                                        <v-text-field
                                                            v-model="passPayload.lecturers.idCardNumber"
                                                            :rules="rules.idCardNumber"
                                                            :counter="13"
                                                            label="ID Card Number"
                                                            required
                                                            class="mt-5"
                                                        />
                                                        <v-text-field
                                                            v-model="passPayload.lecturers.address"
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
                                                            v-model="passPayload.lecturers.phoneNo"
                                                            :rules="rules.phone"
                                                            :counter="10"
                                                            label="Phone"
                                                            required
                                                        />
                                                        <v-select
                                                            v-model="passPayload.lecturers.gender"
                                                            :items="select.gender"
                                                            label="Gender"
                                                            required
                                                            class="mt-5"
                                                        />
                                                        <v-select
                                                            v-model="passPayload.lecturers.bloodType"
                                                            :items="select.bloodType"
                                                            label="Blood Type"
                                                            required
                                                            class="mt-5"
                                                        />
                                                        <v-menu
                                                            ref="menuL"
                                                            v-model="menuL"
                                                            :close-on-content-click="false"
                                                            :return-value.sync="passPayload.lecturers.dob"
                                                            transition="scale-transition"
                                                            offset-y
                                                            offset-overflow
                                                            min-width="290px"
                                                        >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                    v-model="passPayload.lecturers.dob"
                                                                    label="Birthday"
                                                                    class="mt-5"
                                                                    readonly
                                                                    v-on="on"
                                                                    />
                                                                </template>
                                                                <v-date-picker v-model="passPayload.lecturers.dob" no-title scrollable>
                                                                    <v-spacer/>
                                                                    <v-btn text color="primary" @click="menuL = false">Cancel</v-btn>
                                                                    <v-btn text color="primary" @click="$refs.menuL.save(passPayload.lecturers.dob)">OK</v-btn>
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
                                        <!-- cancel button -->
                                        <v-btn outlined color="error" class="mr-2" @click.stop="dialogL.cancel = true">
                                            <v-icon left>close</v-icon> cancel
                                        </v-btn>
                                        <!-- submit button -->
                                        <v-btn @click.stop="dialogL.submit = true" :disabled="$v.passPayload.lecturers.$invalid" color="success" class="ml-4">
                                            <v-icon left>check</v-icon> submit
                                        </v-btn>

                                        <!-- pop up cancel -->
                                            <v-dialog v-model="dialogL.cancel" max-width="450">
                                            <v-card class="pa-5">   
                                                <v-card-text class="text-center">
                                                <img src="../../assets/alert.png" alt="alert" width="180">
                                                <h2 class="mt-4">Are you sure you want to <span class="red--text">cancel</span> ?</h2>
                                                </v-card-text>
                                                <v-card-actions>
                                                <v-spacer/>
                                                    <v-btn @click.stop="dialogL.cancel = false" color="error" outlined> no </v-btn>
                                                    <v-btn @click.stop="dialogL.edit = false" color="error" class="ml-6" outlined> yes </v-btn>
                                                <v-spacer/>
                                                </v-card-actions>
                                            </v-card>
                                            </v-dialog>
                                        <!-- end of pop up cancel -->

                                        <!-- pop up submit -->
                                        <v-dialog v-model="dialogL.submit" max-width="450">
                                            <v-card class="pa-5">
                                            <v-card-text class="text-center">
                                                <img src="../../assets/alertSoft.png" alt="alertSoft" width="180">
                                                <h2 class="mt-4">Are you sure you want to <span class="success--text">submit</span> ?</h2>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer/>
                                                <v-btn @click.stop="dialogL.submit = false" color="success" outlined> no </v-btn>
                                                <v-btn @click="infoSubmitLecturer()" color="success" class="ml-6" outlined> yes </v-btn>
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

                    <v-snackbar v-model="snackbarL.pass" color="success">
                        Edit Successful
                        <v-btn color="white" text @click="snackbarL.pass = false"> Close </v-btn>
                    </v-snackbar>

                    <v-snackbar v-model="snackbarL.fail" color="error">
                        Something went wrong
                        <v-btn color="white" text @click="snackbarL.fail = false"> Close </v-btn>
                    </v-snackbar>

                </v-container>

            </v-card>
        </v-dialog> 
  
        <!--End Of lecturer Detail -->
        <!--End Of lecturer Detail -->
        <!--End Of lecturer Detail -->

        <!-- staffs Detail -->
        <!-- staffs Detail -->
        <!-- staffs Detail -->

        <v-dialog v-if="dialog.detailStaff" v-model="dialog.detailStaff" width="1000">
            <v-card color="#e6f2ff">
                <v-container fill-height fluid>
                    <v-row justify="center">
                        <v-col sm="8">
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
                                    <v-row justify="center">
                                        <img src="../../assets/profile/lecturer.png" alt="lecturer" width="180" height="180">
                                    </v-row>
                                    <!-- infomation -->
                                    <v-row justify="center" class="mt-5">
                                        <v-col cols="11" sm="5">
                                            <v-row :justify="changePosition">
                                                <div :class="changeMargin">
                                                    <p><b>Employee ID</b>: {{RealPassPayload.staffs[indexOfInfo].employeeId}}</p>
                                                    <p><b>Position</b>: {{RealPassPayload.staffs[indexOfInfo].position}}</p>
                                                    <p><b>First Name</b>: {{RealPassPayload.staffs[indexOfInfo].firstName}}</p>
                                                    <p><b>Last Name</b>: {{RealPassPayload.staffs[indexOfInfo].lastName}}</p>
                                                    <p><b>ID Card Number</b>: {{RealPassPayload.staffs[indexOfInfo].idCardNumber}}</p>
                                                    <p><b>Address</b>: {{RealPassPayload.staffs[indexOfInfo].address}}</p>
                                                </div>
                                            </v-row>
                                        </v-col>

                                        <v-col cols="11" sm="5">
                                            <v-row :justify="changePosition2">
                                                <div :class="changeMargin2">
                                                    <p><b>Faculty</b>: {{RealPassPayload.staffs[indexOfInfo].faculty}}</p>
                                                    <p><b>Department</b>: {{RealPassPayload.staffs[indexOfInfo].depName}}</p>
                                                    <p><b>Blood type</b>: {{RealPassPayload.staffs[indexOfInfo].bloodType}}</p>
                                                    <p><b>Gender</b>: {{RealPassPayload.staffs[indexOfInfo].gender}}</p>
                                                    <p><b>Phone</b>: {{RealPassPayload.staffs[indexOfInfo].phoneNo}}</p>
                                                    <p><b>E-mail</b>: {{RealPassPayload.staffs[indexOfInfo].email}}</p>
                                                    <p><b>Birthday</b>: {{RealPassPayload.staffs[indexOfInfo].dob}}</p>
                                                </div>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions class="pb-5">
                                    <v-spacer/>
                                        <v-btn  color="error" dark @click="dialog.detailStaff = false">
                                            <v-icon left>clear</v-icon> close
                                        </v-btn>
                                    <v-spacer/>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>

        <!--End Of staff Detail -->
        <!--End Of staff Detail -->
        <!--End Of staff Detail -->

    </v-container>
</template>

<script>
import { required, email, minLength, maxLength , between, decimal, numeric} from "vuelidate/lib/validators";
import infoStudent from '../../components/infoStudent'
import axios from 'axios'

export default {
    name: "personnel_management",
    components: {
        infoStudent
    },

    data() {
        return {
            //! own
                search: "",
                indexOfInfo: "",
                
                btn: {
                    students: true,
                    lecturers: false,
                    staffs: false,
                },


                headerStudent: [{
                        text: "Student ID",
                        value: "studentId",
                    },
                    {
                        text: "Student Name",
                        value: "fullname",
                    },
                    {
                        text: "Faculty",
                        value: "faculty",
                    },
                    {
                        text: "Department",
                        value: "depName",
                    },
                    {
                        text: "Degree",
                        value: "degree"
                    },
                    {
                        value: 'actions',
                        align: "center",
                        sortable: false 
                    },
                ],

                headerEmployees: [{
                        text: "Employee ID",
                        value: "employeeId",
                    },
                    {
                        text: "Student Name",
                        value: "fullname",
                    },
                    {
                        text: "Faculty",
                        value: "faculty",
                    },
                    {
                        text: "Department",
                        value: "depName",
                    },
                    {
                        value: 'actions',
                        align: "center",
                        sortable: false 
                    },
                ],

                payload: {
                    students: [],
                    lecturers: [],
                    staffs: [],
                },

                RealPassPayload: {
                    students: [],
                    lecturers: [],
                    staffs: [],
                },

                passPayload: {
                    students: {},
                    lecturers: {},
                    staffs: {},
                },

                dialog: {
                    detailS: false,
                    detailL: false,
                    detailStaff: false,
                    add: false,
                    addS: false,
                    addL: false,
                    addStaff: false,
                    submit: false,
                    cancel: false,
                },

                snackbar: {
                    pass: false,
                    fail: false,
                },

                position: ["Lecturer","Staff"],

                department: [
                    "Computer Engineering", 
                    "Chemical Engineering", 
                    "Electrical Engineering",
                    "Electrical Technology Education",
                    "School of Information Technology"
                    ],
              

                degree: ["Bachelor","Master","Doctoral"],
                program: ["Thai", "Inter"],
            //! own

            //? from info student

                menuS: false,
                dialogS: {
                    dialog: false,
                    dialogSubmit: false,
                    dialogCancel: false,
                },

                bloodTypeSelect: ["A","B","O","AB"],
                genderSelect: ["Male", "Female"],
                RelationSelect: ["Brother", "Father", "Uncle", "Grandfather", "Sister", "Mother", "Aunt", "Grandmother"],
                Rules: {
                    nameRules: [
                        v => !!v || 'Name is required',
                        v => (v.length > 2) || 'Name must be more than 2 characters',
                        v => (v.length <= 32) || 'Name must be less than 32 characters',
                    ],
                    idCardRules: [
                        v => !!v || 'ID card number is required',
                        v => !isNaN(v) || 'ID card number must be a number',
                        v => v.length == 13 || 'ID card number must be 13 digits',
                    ],
                    emailRules: [
                        v => !!v || 'E-mail is required',
                        v => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v) || 'E-mail must be valid',
                        v => v.length <= 32 || 'E-mail must be less than 32 characters',
                    ],
                    phoneRules: [
                        v => !!v || 'Phone number is required',
                        v => (v.length == 10 || v.length == 9) || 'Phone must be 10 digits or 9 digits (home number)',
                        v => !isNaN(v) || 'Phone must be a number',
                    ],
                    addressRules: [
                        v => !!v || 'Address is required',
                        v => (v.length > 4) || 'Address must be more than 4 characters',
                        v => (v.length <= 128) || 'Address must be less than 128 characters',
                    ],
                    careerRules: [
                        v => !!v || 'Career is required',
                        v => (v.length <= 20) || 'Career be less than 20 characters',
                    ],
                    incomeRules: [
                        v => !!v || 'Income is required',
                        v => !isNaN(v) || 'income must be a number',
                    ],
                },
                
                snackbarS: {
                    pass: false,
                    fail: false,
                },

            //? from info student
            
            //* from info lecturer

                menuL: false,
                dialogL: {
                    edit: false,
                    submit: false,
                    cancel: false,
                },
                snackbarL: {
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
            
            //* from info lecturer
         
        }
    },

    validations: {
        passPayload: {
            students: {
                bloodType: {
                    required
                },

                dob: {
                    required
                },

                parent1Relation: {
                    required
                },

                parent2Relation: {
                    required
                },

                depName: {
                    required
                },

                degree: {
                    required
                },

                program: {
                    required
                },

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

                parent1Career: {
                    required,
                    minLength: minLength(1),
                    maxLength: maxLength(20)
                },

                parent1FirstName: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(32)
                },

                parent1Income: {
                    required,
                    decimal
                },

                parent1LastName: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(32)
                },

                parent1Tel: {
                    numeric,
                    required,
                    minLength: minLength(9),
                    maxLength: maxLength(10)
                },

                parent2Career: {
                    required,
                    minLength: minLength(1),
                    maxLength: maxLength(20)
                },

                parent2FirstName: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(32)
                },

                parent2Income: {
                    required,
                    decimal
                },

                parent2LastName: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(32)
                },

                parent2Tel: {
                    numeric,
                    required,
                    minLength: minLength(9),
                    maxLength: maxLength(10)
                },
            },
            lecturers: {
                depName: {
                    required
                },

                bloodType: {
                    required
                },

                dob: {
                    required
                },

                position: {
                    required
                },

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
    },

    methods: {

        //! own
            postNewStudent() {
                this.dialog.addS = false;
                //this.$store.dispatch("syncfirstName",this.passPayload.firstName)
                if(this.passPayload.students.gender === "Male") {
                    this.passPayload.students.title = "Mr."
                    this.passPayload.students.gender = "M"
                }
                else {
                    this.passPayload.students.title = "Ms."
                    this.passPayload.students.gender = "F"
                }
                delete this.passPayload.students.fullGender
                this.passPayload.students.year = 1

                if(this.passPayload.students.depName == "Computer Engineering")
                    this.passPayload.students.departmentId = 1
                else if(this.passPayload.students.depName == "Chemical Engineering")
                    this.passPayload.students.departmentId = 2
                else if(this.passPayload.students.depName == "Electrical Engineering")
                    this.passPayload.students.departmentId = 3
                else if(this.passPayload.students.depName == "Electrical Technology Education")
                    this.passPayload.students.departmentId = 4
                else if(this.passPayload.students.depName == "School of Information Technology")
                    this.passPayload.students.departmentId = 5
                
                console.log(this.passPayload.students)
                let jwtToken = sessionStorage.getItem('jwt')
                axios({
                    method: 'post',
                    url: `https://chai-test-backend.herokuapp.com/api/students`,
                    data: { 
                        payload: this.passPayload.students
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

            postNewEmployee() {
                this.dialog.addL = false;
                //this.$store.dispatch("syncfirstName",this.passPayload.firstName)
                if(this.passPayload.lecturers.gender === "Male") {
                    this.passPayload.lecturers.title = "Mr."
                    this.passPayload.lecturers.gender = "M"
                }
                else {
                    this.passPayload.lecturers.title = "Ms."
                    this.passPayload.lecturers.gender = "F"
                }
                delete this.passPayload.lecturers.fullGender

                if(this.passPayload.lecturers.depName == "Computer Engineering")
                    this.passPayload.lecturers.departmentId = 1
                else if(this.passPayload.lecturers.depName == "Chemical Engineering")
                    this.passPayload.lecturers.departmentId = 2
                else if(this.passPayload.lecturers.depName == "Electrical Engineering")
                    this.passPayload.lecturers.departmentId = 3
                else if(this.passPayload.lecturers.depName == "Electrical Technology Education")
                    this.passPayload.lecturers.departmentId = 4
                else if(this.passPayload.lecturers.depName == "School of Information Technology")
                    this.passPayload.lecturers.departmentId = 5
                
                console.log(this.passPayload.lecturers)
                let jwtToken = sessionStorage.getItem('jwt')
                axios({
                    method: 'post',
                    url: `https://chai-test-backend.herokuapp.com/api/employees`,
                    data: { 
                        payload: this.passPayload.lecturers
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

            getLecturers() {
                this.btn.lecturers = true
                this.btn.students = false
                this.btn.staffs = false

                let jwtToken = sessionStorage.getItem('jwt')
                axios({
                    method: 'get',
                    url: 'https://chai-test-backend.herokuapp.com/api/lecturers',
                    headers: {
                        Authorization: `bearer ${jwtToken}`
                    }
                })
                .then(res => {
                    //console.log(res)
                    this.payload.lecturers = _.cloneDeep(res.data.payload)
                    this.RealPassPayload.lecturers = _.cloneDeep(this.payload.lecturers)
                    //console.log(this.RealPassPayload.lecturers)

                    _.filter(this.RealPassPayload.lecturers, el => {
                        //change dob foramt
                        el.dob = el.dob.substr(0, 10);
                        //change gebder format
                        if(el.gender === "M")
                            el.gender = "Male"
                        else if(el.gender === "F")
                            el.gender = "Female"
                    })

                    _.filter(this.payload.lecturers, el => {
                        // concatnate  name
                        el.fullname = el.firstName + " " + el.lastName
                        delete el.firstName
                        delete el.lastName
                        //change dob foramt
                        el.dob = el.dob.substr(0, 10);
                        //change gebder format
                        if(el.gender === "M")
                            el.gender = "Male"
                        else if(el.gender === "F")
                            el.gender = "Female"
                    })
                    //console.log(this.RealPassPayload.lecturers)
                })
                .catch(err => {
                    console.error(err.respones);
                });
            },

            getStaffs() {
                this.btn.lecturers = false
                this.btn.students = false
                this.btn.staffs = true

                let jwtToken = sessionStorage.getItem('jwt')
                axios({
                    method: 'get',
                    url: 'https://chai-test-backend.herokuapp.com/api/staffs',
                    headers: {
                        Authorization: `bearer ${jwtToken}`
                    }
                })
                .then(res => {
                    //console.log(res)
                    this.payload.staffs = _.cloneDeep(res.data.payload)
                    this.RealPassPayload.staffs = _.cloneDeep(this.payload.staffs)

                    _.filter(this.RealPassPayload.staffs, el => {
                        //change dob foramt
                        el.dob = el.dob.substr(0, 10);
                        //change gebder format
                        if(el.gender === "M")
                            el.gender = "Male"
                        else if(el.gender === "F")
                            el.gender = "Female"
                    })

                    _.filter(this.payload.staffs, el => {
                        // concatnate  name
                        el.fullname = el.firstName + " " + el.lastName
                        delete el.firstName
                        delete el.lastName
                        //change dob foramt
                        el.dob = el.dob.substr(0, 10);
                        //change gebder format
                        if(el.gender === "M")
                            el.gender = "Male"
                        else if(el.gender === "F")
                            el.gender = "Female"
                    })
                    //console.log(this.payload.staffs)
                })
                .catch(err => {
                    console.error(err.respones);
                });
            },

            getStudents() {
                this.btn.lecturers = false
                this.btn.students = true
                this.btn.staffs = false
            },  

            showDetails(item) {
                // get student info by index and open dialog
                if(this.btn.students) {
                    this.indexOfInfo = this.payload.students.indexOf(item)
                    this.dialog.detailS = true
                    //console.log(this.RealPassPayload.students[this.indexOfInfo])
                }
                // get lecturer info by index and open dialog
                else if(this.btn.lecturers) {
                    this.indexOfInfo = this.payload.lecturers.indexOf(item)
                    this.dialog.detailL = true
                    //console.log(this.RealPassPayload.lecturers[this.indexOfInfo].employeeId)
                }
                // get staff info by index and open dialog
                else if(this.btn.staffs) {
                    this.indexOfInfo = this.payload.staffs.indexOf(item)
                    this.dialog.detailStaff = true
                }
            },

            clearPassStudent() {
                
                this.passPayload.students = _.cloneDeep(this.RealPassPayload.students[0]) 
                for(let key in this.passPayload.students) {
                    this.passPayload.students[key] = ""
                }
                this.dialog.addS = true
                this.dialog.add = false
            },

            clearPassEmployee() {
                //? user did not open the lecturer page
                console.log(this.RealPassPayload.lecturers.length)
               
                    let jwtToken = sessionStorage.getItem('jwt')
                    axios({
                        method: 'get',
                        url: 'https://chai-test-backend.herokuapp.com/api/lecturers',
                        headers: {
                            Authorization: `bearer ${jwtToken}`
                        }
                    })
                    .then(res => {
                        //console.log(res)
                        this.RealPassPayload.lecturers = _.cloneDeep(res.data.payload)
                        console.log(this.RealPassPayload.lecturers)

                        _.filter(this.RealPassPayload.lecturers, el => {
                            //change dob foramt
                            el.dob = el.dob.substr(0, 10);
                            //change gebder format
                            if(el.gender === "M")
                                el.gender = "Male"
                            else if(el.gender === "F")
                                el.gender = "Female"
                        })
                        //console.log(this.RealPassPayload.lecturers)
                        this.passPayload.lecturers = _.cloneDeep(this.RealPassPayload.lecturers[0])  

                        for(let key in this.passPayload.lecturers) {
                            this.passPayload.lecturers[key] = ""
                        }  
                        this.dialog.addL = true
                        this.dialog.add = false
                    })
                    .catch(err => {
                        console.error(err.respones);
                    });
            },

        //! own

        //? from info student
            editInfoStudent() {
                this.passPayload.students = {...this.RealPassPayload.students[this.indexOfInfo]}
            },

            infoSubmitStudent() {
                //this.$store.dispatch("syncfirstName",this.passPayload.firstName)
                    if(this.passPayload.students.gender === "Male") {
                        this.passPayload.students.title = "Mr."
                        this.passPayload.students.gender = "M"
                    }
                    else {
                        this.passPayload.students.title = "Ms."
                        this.passPayload.students.gender = "F"
                    }   
                
                delete this.passPayload.students.fullGender
                //console.log(this.payload.students[this.indexOfInfo].studentId)

                let jwtToken = sessionStorage.getItem('jwt')
                axios({
                    method: 'put',
                    url: `https://chai-test-backend.herokuapp.com/api/students/${this.payload.students[this.indexOfInfo].studentId}/info`,
                    data: { 
                        payload: this.passPayload.students
                    },
                    headers: {
                        Authorization: `bearer ${jwtToken}`
                    }
                })
                .then(res => {
                    this.dialogS.dialog = false; 
                    this.snackbarS.pass = true
                    setTimeout(() => location.reload(), 2000)

                }).catch(err => {
                    console.error(err.respons)
                    this.snackbarS.fail = true
                    this.dialogS.dialogSubmit = false;
                });
            },
        //? from info student

        //* from info lecturer
            editInfoLecturer() {
                this.passPayload.lecturers = {...this.RealPassPayload.lecturers[this.indexOfInfo]}
            },

            infoSubmitLecturer() {
                this.dialogL.edit = false;
                //this.$store.dispatch("syncfirstName",this.passPayload.firstName)
                if(this.passPayload.lecturers.gender === "Male") {
                    this.passPayload.lecturers.title = "Mr."
                    this.passPayload.lecturers.gender = "M"
                }
                else {
                    this.passPayload.lecturers.title = "Ms."
                    this.passPayload.lecturers.gender = "F"
                }   
                
                delete this.passPayload.lecturers.fullGender
                //console.log(this.passPayload.lecturers)
                let jwtToken = sessionStorage.getItem('jwt')
                axios({
                    method: 'put',
                    url: `https://chai-test-backend.herokuapp.com/api/employees/${this.payload.lecturers[this.indexOfInfo].employeeId}/info`,
                    data: { 
                        payload: this.passPayload.lecturers
                    },
                    headers: {
                        Authorization: `bearer ${jwtToken}`
                    }
                })
                .then(res => {
                    this.snackbarL.pass = true
                    setTimeout(() => location.reload(), 2000)

                }).catch(err => {
                    console.error(err.respons)
                    this.snackbarL.fail = true
                });
        },
        //* from info lecturer
    },

    computed: {
        //! own
        //! own

        swapData() {
            if(this.btn.students)
                return this.payload.students
            else if(this.btn.lecturers)
                return this.payload.lecturers
            else if(this.btn.staffs)   
                return this.payload.staffs
        },
        
        swapHeader() {
            if(this.btn.students)
                return this.headerStudent
            else if(this.btn.lecturers || this.btn.staffs)
                return this.headerEmployees
        },


        //? from info student
        //? from info student

        marginClass() {
            if(this.$vuetify.breakpoint.smAndUp)
                return "ml-4 d-flex justify-center flex-column"
            else
                return "d-flex justify-center flex-column"
        },

        justifyClass() {
            if(this.$vuetify.breakpoint.smAndUp)
                return "center"
            else 
                return "start"
        },

        //* from info lecturer
        //* from info lecturer

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
            url: 'https://chai-test-backend.herokuapp.com/api/students',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            //console.log(res)
            this.payload.students = _.cloneDeep(res.data.payload)
            this.RealPassPayload.students = _.cloneDeep(this.payload.students)
            
            _.filter(this.RealPassPayload.students, el => {
                //change dob foramt
                el.dob = el.dob.substr(0, 10);
                //change gebder format
                if(el.gender === "M")
                    el.gender = "Male"
                else if(el.gender === "F")
                    el.gender = "Female"
            })

            _.filter(this.payload.students, el => {
                // concatnate name
                el.fullname =  el.firstName + " " + el.lastName
                delete el.firstName
                delete el.lastName
                //change dob foramt
                el.dob = el.dob.substr(0, 10);
                //change gebder format
                if(el.gender === "M")
                    el.gender = "Male"
                else if(el.gender === "F")
                    el.gender = "Female"
            })
            //console.log(this.RealPassPayload.students)
        })
        .catch(err => {
            console.error(err.respones);
        });
    }
}
</script>

<style scope>
    .card1 p:not(:last-child) {
        margin-bottom: 35px;
    }

    p {
        word-wrap: break-word;
    }
</style>
