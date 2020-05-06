import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index';
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
import subject_management from '../views/lecturer/subject_management.vue'
// staff
import staff_main from '../views/staff/staff_main.vue'
import staff_info from '../views/staff/staff_info.vue'
import staff_subject from '../views/staff/staff_subject.vue'
import scholarship_editor from '../views/staff/scholarship_editor.vue'
import personnel_management from '../views/staff/personnel_management.vue'
import activities_management from '../views/staff/activities_management.vue'

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
    meta: {
      type: 1
    }
  },
  {
    path: '/student_info',
    name: 'student_info',
    component: student_info,
    props: true,
    meta: {
      type: 1
    }
  },
  {
    path: '/enrollment_from',
    name: 'enrollment_from',
    component: enrollment_from,
    meta: {
      type: 1
    }
  },
  {
    path: '/activities',
    name: 'activities',
    component: activities,
    meta: {
      type: 1
    }
  },
  {
    path: '/scholarship',
    name: 'scholarship',
    component: scholarship,
    meta: {
      type: 1
    }
  },

  // Lecturer

  {
    path: '/lecturer',
    name: 'lecturer',
    component: lecturer_main,
    meta: {
      type: 2
    },
  },
  {
    path: '/lecturer_info',
    name: 'lecturer_info',
    component: lecturer_info,
    meta: {
      type: 2
    },
  },
  {
    path: '/subject',
    name: 'subject_management',
    component: subject_management,
    meta: {
      type: 2
    },
  },


  // Staff

  {
    path: '/staff',
    name: 'staff',
    component: staff_main,
    meta: {
      type: 3
    },
  },
  {
    path: '/staff_info',
    name: 'staff_info',
    component: staff_info,
    meta: {
      type: 3
    },
  },
  {
    path: '/staff_subject',
    name: 'staff_subject',
    component: staff_subject,
    meta: {
      type: 3
    },
  },
  {
    path: '/scholarship_editor',
    name: 'scholarship_editor',
    component: scholarship_editor,
    meta: {
      type: 3
    },
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: personnel_management,
    meta: {
      type: 3
    },
  },
  {
    path: '/activities_management',
    name: 'activities_management',
    component: activities_management,
    meta: {
      type: 3
    },
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router

router.beforeEach((to,from,next) => {
  // protect from manual direct to another page without login
  if(to.name !== "LogIn" && to.name !== "reset"  && sessionStorage.getItem('jwt') === null)
      next('/')
  // protect from manual direct to reset page 
  else if(store.getters.getStatusCode !== 426 && to.name == "reset")
      next(false)
  // protect from manual direct to login pahe without logout
  else if(to.name == "LogIn" && sessionStorage.getItem('jwt') !== null)
      next(false)
  // protect from permission
  else if(from.meta.type != to.meta.type && (from.name != "LogIn" && from.name != "reset" && to.name != "LogIn") && from.name != null)
      next(false)
  else
      next()
})
