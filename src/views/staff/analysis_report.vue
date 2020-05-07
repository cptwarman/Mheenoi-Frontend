<template>
    <v-container fluid fill-height>
        <v-row justify="center">
            <v-col cols="12" sm="9">

                <v-row justify="center" class="mb-7">
                    <v-card class="py-3 px-5" shaped>
                        <span class="blue--text font-weight-bold title">  ANALYSIS REPORT </span>
                    </v-card>
                </v-row>

                <v-row justify="center">

                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title class="subtitle-2 d-flex flex-nowrap blue--text">
                                    <span>Number of students in each department</span> 
                            </v-card-title>

                            <v-card-text >
                                <canvas id="report1"></canvas>
                            </v-card-text>
                        </v-card>

                    </v-col>

                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title class="subtitle-2 d-flex flex-nowrap blue--text">
                                    <span>Number of employees in each department</span> 
                            </v-card-title>

                            <v-card-text >
                                <canvas id="report4"></canvas>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    
                </v-row>

                <v-row>

                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="subtitle-2 d-flex flex-nowrap blue--text">
                                    <span>Number of students requesting scholarships</span> 
                            </v-card-title>

                            <v-card-text >
                                <canvas id="report3"></canvas>
                            </v-card-text>
                        </v-card>


                    </v-col>


                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="subtitle-2 d-flex flex-nowrap blue--text">
                                    <span>Number of students in each subject</span> 
                            </v-card-title>

                            <v-card-text >
                                <canvas id="report2"></canvas>
                            </v-card-text>
                        </v-card>
                    </v-col>

                </v-row>

            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import Chart from 'chart.js'
import axios from 'axios'

export default {
    name: 'analysis_report',

    data() {
        return {
            payload: {
                studentInDep: {
                    label: [],
                    data: [],
                },
                studentInSubject: {
                    label: [],
                    data: [],
                },
                scholarship: {
                    label: [],
                    data: [],
                },
                employeeInDep: {
                    label: [],
                    data: [],
                },
            },

        }
    },


    created() {
        let jwtToken = sessionStorage.getItem('jwt')
        axios({
            method: 'get',
            url: 'https://chai-test-backend.herokuapp.com/api/analysis',
            headers: {
                Authorization: `bearer ${jwtToken}`
            }
        })
        .then(res => {
            console.log(res)
            _.filter(res.data.payload[0], el => {
                this.payload.studentInDep.label.push(el.depCode)
                this.payload.studentInDep.data.push(el.numberOfStudents)
            })

            

        //! Chart 1
            var ctx = document.getElementById('report1')
            var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.payload.studentInDep.label,
                    datasets: [{
                        label: 'Number of students',
                        data: this.payload.studentInDep.data,
                        borderColor: '#3399ff',
                        backgroundColor: '#3399ff',
                        barThickness: 40,
                },]
            },
                options: {
                    responsive: true,
                     scales: {
                        xAxes: [{
                            gridLines: { 
                                display: false,
                                color: "#ffffff" 
                            },
                             scaleLabel: {
                                display: true,
                                labelString: 'Department',
                                fontSize: 14
                            },
                        }],
                        yAxes: [{
                            gridLines: { 

                            }
                        }]
                    }
                }
            })
        //! Chart 1 end

            _.filter(res.data.payload[1], el => {
                this.payload.studentInSubject.label.push(el.subjectId)
                this.payload.studentInSubject.data.push(el.numberOfStudents)
            })

         //! Chart 2

            var ctx2 = document.getElementById('report2')
            var myChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: this.payload.studentInSubject.label.slice(0, 15),
                    datasets: [{
                        label: 'Number of students',
                        data:  this.payload.studentInSubject.data.slice(0, 15),
                        borderColor: '#33cc33',
                        backgroundColor: '#33cc33',
                        barThickness: 40,
                },]
            },
                options: {
                    responsive: true,
                     scales: {
                        xAxes: [{
                            gridLines: { 
                                display: false,
                                color: "#ffffff" 
                            },
                             scaleLabel: {
                                display: true,
                                labelString: 'Subjects',
                                fontSize: 14
                            },
                        }],
                        yAxes: [{
                            gridLines: { 

                            }
                        }]
                    }
                }
            })

         //! Chart 2 end

            _.filter(res.data.payload[2], el => {
                this.payload.scholarship.label.push(el.scholarshipName)
                this.payload.scholarship.data.push(el.numberOfRequests)
            })

        //! Chart 3

            var ctx3 = document.getElementById('report3')
            var myChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: this.payload.scholarship.label.slice(0, 8),
                    datasets: [{
                        label: 'Number of students',
                        data: this.payload.scholarship.data.slice(0, 8),
                        borderColor: '#ff9933',
                        backgroundColor: '#ff9933',
                        barThickness: 40,
                },]
            },
                options: {
                    responsive: true,
                     scales: {
                        xAxes: [{
                            gridLines: { 
                                display: false,
                                color: "#ffffff" 
                            },
                             scaleLabel: {
                                display: true,
                                labelString: 'Scholarship Name',
                                fontSize: 14
                            },
                        }],
                        yAxes: [{
                            gridLines: { 

                            }
                        }]
                    }
                }
            })

        //! Chart 3 end

            _.filter(res.data.payload[3], el => {
                this.payload.employeeInDep.label.push(el.depCode)
                this.payload.employeeInDep.data.push(el.numberOfEmployees)
            })

        //! Chart 4

            var ctx4 = document.getElementById('report4')
            var myChart = new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: this.payload.employeeInDep.label.slice(0, 5),
                    datasets: [{
                        label: 'Number of employees',
                        data: this.payload.employeeInDep.data.slice(0, 5),
                        borderColor: '#ff0066',
                        backgroundColor: '#ff0066',
                        barThickness: 40,
                },]
            },
                options: {
                    responsive: true,
                     scales: {
                        xAxes: [{
                            gridLines: { 
                                display: false,
                                color: "#ffffff" 
                            },
                             scaleLabel: {
                                display: true,
                                labelString: 'Department',
                                fontSize: 14
                            },
                        }],
                        yAxes: [{
                            gridLines: { 

                            }
                        }]
                    }
                }
            })

        //! Chart 4 end
            console.log(this.payload)

            
        })
        .catch(err => {
            console.error(err.respones);
        }); 
    },
}
</script>

<style>

</style>