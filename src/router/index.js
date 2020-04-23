import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/LogIn.vue'
// student
import student_main from '../views/student/student_main.vue'
import student_info from '../views/student/student_info.vue'
import enrollment_from from '../views/student/enrollment_from.vue'
import enrollment_details from '../views/student/enrollment_details.vue'
import scholarship from '../views/student/scholarship.vue'
// lectuere
import lecturer_main from '../views/lecturer/lecturer_main.vue'
// staff
import staff_main from '../views/staff/staff_main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/student',
    name: 'student',
    component: student_main,
    props: true,
  },
  {
    path: '/student_info',
    name: 'student_info',
    component: student_info,
    props: true,
  },
  {
    path: '/enrollment_from',
    name: 'enrollment_from',
    component: enrollment_from
  },
  {
    path: '/enrollment_details',
    name: 'enrollment_details',
    component: enrollment_details
  },
  {
    path: '/scholarship',
    name: 'scholarship',
    component: scholarship
  },
  {
    path: '/lecturer',
    name: 'lecturer',
    component: lecturer_main
  },
  {
    path: '/staff',
    name: 'staff',
    component: staff_main
  },
]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to,from,next) => {
  if(to.name !== "LogIn" && sessionStorage.getItem('jwt') === null)
      next('/')
  else if(to.name == "LogIn" && sessionStorage.getItem('jwt') !== null)
      next(false)
  else
      next()
})
