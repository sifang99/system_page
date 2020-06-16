<template>
    <div class="logoutbox">
        <el-radio-group v-model="radio" class="logout-radio" @change="changeUser">
            <el-radio-button label="教师" ></el-radio-button>
            <el-radio-button label="学生"></el-radio-button>
        </el-radio-group>
        <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'logout-user',
  data () {
    return {
      radio: '',
      showteacher: true,
      showstudent: false,
      teacherradio: 'teacher-radio',
     
    }
  },
  methods: {

    // 切换用户对象时
    changeUser () {
      console.log(this.radio)
      if (this.radio === '教师') {
        this.showteacher = true
        this.showstudent = false
        this.$router.push("/administrator/logoutUser/teacher");
      }
      if (this.radio === '学生') {
        this.showteacher = false
        this.showstudent = true
        this.$router.push("/administrator/logoutUser/student");
      }
    },
  
  },
  created () {
    // 默认设置选中教师
    this.radio = '教师'
    this.$router.push("/administrator/logoutUser/teacher");
  }

}
</script>

<style scoped>
.logoutbox{
    width: 90%;
    margin: 0 auto;
}
.logout-radio{
    margin-bottom: 10px;
    position: relative;
    left: 40%;
}
:checked.el-radio-button__orig-radio + .el-radio-button__inner{
    background-color:#2E8B57;
    border-color:#2E8B57;
}
/****** */


/* ***************************************************** */

/************************************************************** */

</style>
