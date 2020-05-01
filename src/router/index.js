import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/LogIn.vue'
import reset from '../views/reset.vue'
// student
import student_main from '../views/student/student_main.vue'
import student_info from '../views/student/student_info.vue'
import enrollment_from from '../views/student/enrollment_from.vue'
import activities from '../views/student/activities.vue'
import scholarship from '../views/student/scholarship.vue'
// lectuere
import lecturer_main from '../views/lecturer/lecturer_main.vue'
import lecturer_info from '../views/lecturer/lecturer_info.vue'
import grade_assignment from '../views/lecturer/grade_assignment.vue'
import subject_management from '../views/lecturer/subject_management.vue'
// staff
import staff_main from '../views/staff/staff_main.vue'
import staff_info from '../views/staff/staff_info.vue'
import staff_subject from '../views/staff/staff_subject.vue'
import scholarship_editor from '../views/staff/scholarship_editor.vue'
import personnel_management from '../views/staff/personnel_management.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/reset',
    name: 'reset',
    component: reset,
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
    path: '/activities',
    name: 'activities',
    component: activities
  },
  {
    path: '/scholarship',
    name: 'scholarship',
    component: scholarship
  },

  // Lecturer

  {
    path: '/lecturer',
    name: 'lecturer',
    component: lecturer_main
  },
  {
    path: '/lecturer_info',
    name: 'lecturer_info',
    component: lecturer_info
  },
  {
    path: '/grade',
    name: 'grade',
    component: grade_assignment
  },
  {
    path: '/subject',
    name: 'subject_management',
    component: subject_management
  },


  // Staff

  {
    path: '/staff',
    name: 'staff',
    component: staff_main
  },
  {
    path: '/staff_info',
    name: 'staff_info',
    component: staff_info
  },
  {
    path: '/staff_subject',
    name: 'staff_subject',
    component: staff_subject
  },
  {
    path: '/scholarship_editor',
    name: 'scholarship_editor',
    component: scholarship_editor
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: personnel_management
  },
]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to,from,next) => {
  if(to.name !== "LogIn" && to.name !== "reset"  && sessionStorage.getItem('jwt') === null)
      next('/')
  else if(to.name == "LogIn" && sessionStorage.getItem('jwt') !== null)
      next(false)
  else
      next()
})
