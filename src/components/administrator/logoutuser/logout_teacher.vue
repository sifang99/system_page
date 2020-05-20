<template>
    <!-------------------- 默认教师框 ------------------------------>
        <div id="logout-teacherbox" v-show="showteacher">
            <div id="find-teacherwrapper" class="clearfix">
                <div class="floatleft control-text">查找教师：</div>
                <el-input v-model="teacherinfo" placeholder="请输入教师职工号\学院" class="floatleft control-input"></el-input>
                <el-button type="success" round id="btn-find" class="floatleft" @click="findTeacher">确认</el-button>
            </div>

            <div id="logout-list">
                <div class="control-hint">全部结果：</div>

                <el-table :data="teacherlists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                        <template slot-scope="scope">
                            <el-button type="danger" round id="btn-logout" @click="delAccount(scope.$index,scope.row.tno)">注销</el-button>
                        </template>
                    </el-table-column>
                 </el-table>

                <!-- 分页条 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3, 5, 8]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum"
                    class="pagination">
                </el-pagination>
            </div>
        </div>
</template>



<script>
export default {
  name: 'logout-user',
  data () {
    return {
      radio: '',
      teacherinfo: '',
      showteacher: true,
      // 教师表
      teacherlists: [],
      delArray:[],

      teacherradio: 'teacher-radio',
      currentPage: 1, // 默认显示第一页
      pageSize: 3, // 默认每页显示10条
      totalNum: 0 // 总页数

    }
  },
  methods: {

      delAccount(index,account){
        //   console.log(index);
          this.delArray.push(account);
          console.log(this.delArray);
          this.$axios.post("/manager/cancelAccount",this.delArray)
          .then(res => {
             if(res.data.state){
                alert("删除成功！");
                this.teacherlists.splice(index,1);
             }else{
                 alert("删除失败！");
             }
          })
          .catch(function(error){
              alert("发生错误！");
          })
      },
    // 简单实现教师输入查询的功能 tno tname dept
    findTeacher() {
      if(this.teacherinfo.length == 8){
          this.$axios.get("/manager/findTeacherByTno",{params:{"tno":this.teacherinfo}})
          .then(res => {
              this.teacherlists = res.data;
              this.totalNum = 1;
          })
          .catch(function(error){
              alert("发生错误！");
          })
      }else{
          this.$axios.get("/manager/findTeacherByDept",{params:{"dept":this.teacherinfo}})
          .then(res => {
              this.teacherlists = res.data;
              this.totalNum = this.teacherlists.length;
          })
          .catch(function(error){
              alert("发生错误！");
          })
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
    // 默认设置选中教师
    this.radio = '教师'
  }

}
</script>


<style>
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