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
import chooseCourse from '../components/student/choosecourse/stu_choosecourse'
import recordgrade from '../components/teacher/recordgrade'
import Attention from '../components/receive'
import contentDetail from '../components/contentdetail'
import addNotice from '../components/administrator/addNotice'
import notice from '../components/administrator/Notice'
import getGrade from '../components/student/getgrade/stu_getGrade'
import addSchedule from '../components/administrator/addSchedule'
import schedule from '../components/courseplan'
import login from '../components/login/login_content'
import logoutUser from '../components/administrator/logoutuser/logoutuser'
import logoutTeacher from '../components/administrator/logoutuser/logout_teacher'
import logoutStudent from '../components/administrator/logoutuser/logout_student'
import permission from '../components/administrator/permission/permission'
import manageRole from '../components/administrator/permission/managerole'
import userAction from '../components/administrator/userAction'
import search from '../components/administrator/search'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/search',
      name:'search',
      component:search
    },
    {
      path:'/login',
      name:'login',
      component:login,
    },
    {
      path: '/administrator',
      name: 'administrator',
      component: administrator,
      beforeEnter: (to, from, next) => {
        const role = localStorage.getItem('role')
        const isLogin = localStorage.getItem('isLogin')
        if(isLogin && role == "3"){
          next()
        }
      },
      children: [
        {
          path:'userAction',
          name:'userAction',
          component:userAction
        },
        {
          path:'manageRole',
          name: 'manageRole',
          component: manageRole
        },
        {
          path:'permission',
          name:'permission',
          component: permission
        },
        {
          path:'logoutUser',
          name:'logoutUser',
          component:logoutUser,
          children:[
            {
              path:'teacher',
              name:'logoutteacher',
              component:logoutTeacher,
            },{
              path:'student',
              name:'logoutstudent',
              component:logoutStudent,
            }
          ]
        },
        {
          path:'addSchedule',
          name:'addSchedule',
          component:addSchedule,
        },
        {
          path:'contentdetail',
          name:'contentdetail',
          component:contentDetail,
        },
        {
          path:'notice',
          name:'notice',
          component:notice,
        },
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
      beforeEnter: (to, from, next) => {
        const role = localStorage.getItem('role')
        const isLogin = localStorage.getItem('isLogin')
        if(isLogin && role == "1"){
          console.log(isLogin)
          console.log(role)
          next()
        }
      },
      children:[
        {
          path:'schedule',
          name:'schedule',
          component:schedule,
        },
        {
          path:'grade',
          name:'grade',
          component:getGrade,
        },
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
      beforeEnter: (to, from, next) => {
        const role = localStorage.getItem('role')
        const isLogin = localStorage.getItem('isLogin')
        if(isLogin && role == "2"){
          console.log(isLogin)
          console.log(role)
          next()
        }
      },
      children:[
        {
          path:'schedule',
          name:'schedule',
          component:schedule,
        },
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
