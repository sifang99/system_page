import Vue from 'vue'
import Router from 'vue-router'
import info from '@/components/administrator/info'
import addDocument from '../components/administrator/add_S_T/add_document'
import addStudent from '../components/administrator/add_S_T/add_student'
import addTeacher from '../components/administrator/add_S_T/add_teacher'
import addCourse from '../components/administrator/addCourse'
import administrator from '../components/administrator/admin'
import student from '../components/student/student'
import teacher from '../components/teacher/teacher'
import teacherInfo from '../components/teacher/thr_info'
import studentInfo from '../components/student/stu_info'
import changePassword from '../components/change_password'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/administrator',
      name: 'administrator',
      component: administrator,
      children: [
        {
          path:'changPassword',
          name:'changPassword',
          component:changePassword,
        },
        {
          path: 'adminInfo',
          name: 'adminInfo',
          component: info,
        },
        {
          path: 'addDocument',
          name: 'addDocument',
          component: addDocument,
          children: [
            {
              path: 'student',
              name: 'addStudent',
              component: addStudent,
            },
            {
              path: 'teacher',
              name: 'addTeacher',
              component: addTeacher,
            }
          ]
        },
        {
          path: 'addCourse',
          name: 'addCourse',
          component: addCourse,
        }
      ]
    },
    {
      path:'/student',
      name:'student',
      component: student,
      children:[
        {
          path:'changPassword',
          name:'changPassword',
          component:changePassword,
        },
        {
          path:'information',
          name:'information',
          component:studentInfo,
        }
      ]
    },
    {
      path:'/teacher',
      name:'teacher',
      component:teacher,
      children:[
        {
          path:'changPassword',
          name:'changPassword',
          component:changePassword,
        },
        {
          path:'information',
          name:'information',
          component: teacherInfo,
        }
      ]
    }

  ]
})
