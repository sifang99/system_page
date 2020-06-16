<template>

    <div id="student">
        <div id="header">
        <img src="../../assets/img/logo.jpg" class="logo">
        <p class="title">某高校教学管理系统</p>
        <input type="button" class="isjs-ac-userlogout logout" value="退出登录" @click="logout">
        <p class="user_role">角色： 学生</p>
        <p class="user_name">用户：{{student.username}}</p>
        <img src="../../assets/img/user_logo.png" class="user_logo">
    </div>
        <div id="stu_content">
            <div class="left-bar  color_darkgray">
                <ul>
                    <li>
                        <img src="../../assets/img/icon_i.png" alt="">
                        <router-link to="/student/information">
                            <input type="button" value="个人信息" class="isjs-ac-01 menu-item">
                        </router-link>
                    </li>
                    <li>
                        <img src="../../assets/img/icon_attention.png" alt="">
                        <router-link to="/student/attention">
                            <input type="button" value="我需留意" class="isjs-ac-02 menu-item">
                        </router-link>
                    </li>
                    <li>
                        <img src="../../assets/img/icon_book.jpg" alt="">
                        <router-link to="/student/chooseCourse">
                            <input type="button" value="选课" class="isjs-ac-03 menu-item">
                        </router-link>
                    </li>
                    <li>
                        <img src="../../assets/img/icon_people.jpg" alt="">
                        <router-link to="/student/schedule">
                            <input type="button" value="行课" class="isjs-ac-studentTable menu-item">
                        </router-link>
                    </li>
                    <li>
                        <img src="../../assets/img/icon_right.png" alt="">
                        <router-link to="/student/grade">
                            <input type="button" value="成绩" class="isjs-ac-checkGrade menu-item">
                        </router-link>
                    </li>
                     <li>
                        <img src="../../assets/img/icon_key.jpg" alt="">
                        <router-link to="/student/changPassword">
                            <input type="button" value="修改密码" class="isjs-ac-06 menu-item">
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="right-content">
                <div class="top-bar color_darkgray"></div>
                <div class="content_bck color_darkgray clearfix">
                    <div class="content_white_bck color_white clearfix">
                        <canvas id="left_circular" class="circular"></canvas>
                        <canvas id="right_circular" class="circular"></canvas>
                        <div class="operation">
                            <router-view v-bind:getUser="student" v-on:show="showDetail" v-bind:getDetail="message"></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { dataAcquisition } from "../../assets/js/dataAcquisition";
export default {
    name: 'Student_content',
    data(){
        return {
            student:{
                account:this.getUser.account,
                username:this.getUser.username,
                role:this.getUser.role,
            },
            message:""
        }
    },
    props:[
        'getUser'
    ],
    methods:{
        showDetail(e){
            this.message = e;
        },
        logout(){
            if(localStorage.getItem('account')){
                localStorage.removeItem('account')
            }
            if(localStorage.getItem('role')){
                localStorage.removeItem('role')
            }
            if(localStorage.getItem('isLogin')){
                localStorage.removeItem('isLogin')
            }
            this.$emit("Logout",false);       
        }
    },
  mounted () {
    // 在帆布上画两个绿色的小圆点
    // eslint-disable-next-line camelcase
    var l_canvas = document.getElementById('left_circular')
    // eslint-disable-next-line camelcase
    var l_ctx = l_canvas.getContext('2d')

    // eslint-disable-next-line camelcase
    var r_canvas = document.getElementById('right_circular')
    // eslint-disable-next-line camelcase
    var r_ctx = r_canvas.getContext('2d')

    l_canvas.width = 30
    l_canvas.height = 30
    l_ctx.beginPath()
    l_ctx.arc(10, 10, 10, 0, Math.PI * 2, true)
    l_ctx.fillStyle = '#2E8B57'
    l_ctx.fill()
    l_ctx.strokeStyle = '#2E8B57'
    l_ctx.stroke()

    r_canvas.width = 30
    r_canvas.height = 30
    r_ctx.beginPath()
    r_ctx.arc(10, 10, 10, 0, Math.PI * 2, true)
    r_ctx.fillStyle = '#2E8B57'
    r_ctx.fill()
    r_ctx.strokeStyle = '#2E8B57'
    r_ctx.stroke()
  },

  created(){
      console.log(this.student);
      this.$router.push('/student/attention');
  }

}
</script>

<style scoped>
@import "../../assets/css/administrator.css";
@import "../../assets/css/color.css";

#stu_content{
    position: relative;
    top: 0%;
}

</style>
