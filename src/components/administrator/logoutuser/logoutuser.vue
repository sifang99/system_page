<template>
    <div class="logoutbox">
        <el-radio-group v-model="radio" class="logout-radio" @change="changeUser">
            <el-radio-button label="教师" ></el-radio-button>
            <el-radio-button label="学生"></el-radio-button>
        </el-radio-group>

 <!-------------------- 默认教师框 ------------------------------>
        <div id="logout-teacherbox" v-show="showteacher">
            <div id="find-teacherwrapper" class="clearfix">
                <div class="floatleft control-text">查找教师：</div>
                <el-input v-model="teacherinfo" placeholder="请输入教师职工号\姓名\学院" class="floatleft control-input"></el-input>
                <el-button type="success" round id="btn-find" class="floatleft" @click="findTeacherFilter($event)">确认</el-button>
            </div>

            <div id="logout-list">
                <div class="control-hint">全部结果：</div>

                <el-table :data="selectteacherlists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    style="width: 100%" stripe="true"
                    border="true"
                    class="table-userlists"
                    row-style="height:0"
                    cell-style="padding:5px">
                    <el-table-column prop="tno" label="职工号" align="center" ></el-table-column>
                    <el-table-column prop="tname" label="教师姓名" align="center"></el-table-column>
                    <el-table-column prop="dept" label="所在学院" width="200" align="center"></el-table-column>
                    <el-table-column prop="position" label="职务" align="center" width="120"></el-table-column>
                    <el-table-column prop="status" label="账号状态" align="center" width="150">
                        <el-button type="danger" round id="btn-logout">注销</el-button>
                    </el-table-column>
                 </el-table>

                <!-- 分页条 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1, 3, 5, 8]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum"
                    class="pagination">
                </el-pagination>
            </div>
        </div>

 <!-------------------- 学生框 ------------------------------>
        <div id="logout-studentbox" v-show="showstudent">
            <div id="find-studentwrapper" class="clearfix">
                <div class="floatleft control-text">查找学生：</div>
                <el-input v-model="studentinfo" placeholder="请输入学号\姓名\学院\年级" class="floatleft control-input"></el-input>
                <el-button type="success" round id="btn-find" class="floatleft" @click="findStudentFilter($event)">确认</el-button>
            </div>

            <div id="logout-list">
                <div class="control-hint">全部结果：</div>

                <el-table :data="selectstudentlists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    style="width: 100%" stripe="true"
                    border="true"
                    class="table-userlists"
                    row-style="height:0"
                    cell-style="padding:5px">
                    <el-table-column prop="sno" label="学号" align="center" ></el-table-column>
                    <el-table-column prop="sname" label="学生姓名" align="center"></el-table-column>
                    <el-table-column prop="dept" label="所在学院" width="200" align="center"></el-table-column>
                    <el-table-column prop="grade" label="年级" align="center" width="120"></el-table-column>
                    <el-table-column prop="status" label="账号状态" align="center" width="150">
                        <el-button type="danger" round id="btn-logout">注销</el-button>
                    </el-table-column>
                 </el-table>

                <!-- 分页条 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1, 3, 5, 8]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum"
                    class="pagination">
                </el-pagination>
            </div>
        </div>
<!-- ************************* -->
  </div>
</template>

<script>
export default {
  name: 'logout-user',
  data () {
    return {
      radio: '',
      teacherinfo: '',
      studentinfo: '',
      showteacher: true,
      showstudent: false,
      // 教师表
      teacherlists: [{
        tno: '111',
        tname: 'ddd',
        dept: 'CS',
        position: '111',
        status: 1

      },
      {
        tno: '112',
        tname: 'daa',
        dept: 'CS',
        position: '111',
        status: 1

      }, {
        tno: '113',
        tname: 'dbb',
        dept: 'CS',
        position: '111',
        status: 1
      }],
      selectteacherlists: [],

      // 学生表
      studentlists: [{
        sno: '111',
        sname: 'ddd',
        dept: 'CS',
        grade: '2017',
        status: 1
      }, {
        sno: '112',
        sname: 'xxx',
        dept: 'MA',
        grade: '2018',
        status: 1
      }, {
        sno: '113',
        sname: 'yyy',
        dept: 'EN',
        grade: '2019',
        status: 1
      }],
      teacherradio: 'teacher-radio',
      selectstudentlists: [],
      currentPage: 1, // 默认显示第一页
      pageSize: 1, // 默认每页显示10条
      totalNum: 1000 // 总页数
    }
  },
  methods: {
    // 简单实现教师输入查询的功能 tno tname dept
    findTeacherFilter (e) {
      this.selectteacherlists = this.teacherlists
        .filter(item => item.tno === this.teacherinfo || item.tname === this.teacherinfo || item.dept === this.teacherinfo)
      this.totalNum = this.selectteacherlists.length
    },
    // 简单实现学生输入查询的功能 sno sname dept grade
    findStudentFilter (e) {
      console.log(this.studentinfo)
      this.selectstudentlists = this.studentlists
        .filter(item => item.sno === this.studentinfo || item.sname === this.studentinfo ||
        item.dept === this.studentinfo || item.grade === this.studentinfo)
      this.totalNum = this.selectstudentlists.length
    },
    // 切换用户对象时
    changeUser () {
      console.log(this.radio)
      if (this.radio === '教师') {
        this.showteacher = true
        this.showstudent = false
        this.selectteacherlists = this.teacherlists
        this.totalNum = this.selectteacherlists.length
      }
      if (this.radio === '学生') {
        this.showteacher = false
        this.showstudent = true
        this.selectstudentlists = this.studentlists
        this.totalNum = this.selectstudentlists.length
      }
    },
    // 分页处理
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val // 动态改变
    },

    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val // 动态改变
    }
  },
  created () {
    this.totalNum = this.teacherlists.length
    this.selectteacherlists = this.teacherlists
    this.selectstudentlists = this.studentlists
    // 默认设置选中教师
    this.radio = '教师'
  }

}
</script>

<style>
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
#logout-teacherbox,#logout-studentbox{
    border: 1px solid #CCCCCC;
}
#find-teacherwrapper,#find-studentwrapper{
    margin-bottom: 10px;
    padding: 20px 0px 0px 0px;
}
.control-text{
    transform: translateY(50%);
}
.control-input{
    width: 40%;
}
#btn-find{
    background-color: #2E8B57;
    color: white;
    border: 0;
    border-radius: 10%;
    width: 10%;
    height: 30px;
    font-size: 80%;
    transform: translateY(25%);
  }

/* ***************************************************** */
#logout-list{
    border: 1px solid #ccc;
    background-color: #f6f7f8;
}
.control-hint{
    background-color: #2E8B57;
    text-align: left;
    color: white;
}
.table-userlists{
    margin-top: 20px;
}

#btn-logout{
    border: 0;
    border-radius: 10%;
    text-align: center;
    vertical-align: middle;
    height: 35px;
}
/************************************************************** */
  .clearfix{
    *zoom: 1;
}
.clearfix::after{
    content: ",";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
.floatleft{
    float: left;
    margin-right: 20px;
    position: relative;
    left: 20%;
}
  .pagination{
    position: relative;
    left: 25%;
    margin: 20px 0px;
  }
</style>
