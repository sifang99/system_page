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
import chooseCourse from '../components/student/stu_choosecourse'
import recordgrade from '../components/teacher/recordgrade'
import Attention from '../components/receive'
import contentDetail from '../components/contentdetail'
import addNotice from '../components/administrator/addNotice'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/administrator',
      name: 'administrator',
      component: administrator,
      children: [
        {
          path:'addNotice',
          name:'addNotice',
          component:addNotice,
        },
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
          path:'attention',
          name:'attention',
          component:Attention,
        },
        {
          path:'contentdetail',
          name:'contentdetail',
          component:contentDetail,
        },
        {
          path:'chooseCourse',
          name:'chooseCourse',
          component:chooseCourse,

        },
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
          path:'attention',
          name:'attention',
          component:Attention,
        },
        {
          path:'contentdetail',
          name:'contentdetail',
          component:contentDetail,
        },
        {
          path:'recordgrade',
          name:'recordegrade',
          component:recordgrade
        },
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
