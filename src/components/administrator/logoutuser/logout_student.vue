<template>
    
 <!-------------------- 学生框 ------------------------------>
        <div id="logout-studentbox" >
            <div id="find-studentwrapper" class="clearfix">
                <!-- <p class="stu-floatleft stu-control-text">查找学生：</p> -->
                <el-input v-model="sno" placeholder="输入学号单个查找" class="stu-floatleft stu-control-input" @change="clearDG"></el-input>
                <el-input v-model="dept" placeholder="请输入学院" class="stu-floatleft stu-control-input" @change="clearSno"></el-input>
                <el-input v-model="grade" placeholder="请输入年级" class="stu-floatleft stu-control-input" @change="clearSno"></el-input>
                <el-button type="success" round id="stu-btn-find" class="stu-floatleft" @click="findStudent">查找</el-button>
                <el-button type="success" round id="btn-del" class="stu-floatleft" @click="delAll">删除全部</el-button>
            </div>

            <div id="logout-list">
                <div class="control-hint">全部结果：</div>

                <el-table :data="studentlists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                        <template slot-scope="scope">
                            <el-button type="danger" round id="btn-logout" @click="delAccount(scope.$index,scope.row.sno)">注销</el-button>
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
      sno: '',
      dept:'',
      grade:'',
      showstudent: false,
      delArray:[],
     
      // 学生表
      studentlists: [],
      currentPage: 1, // 默认显示第一页
      pageSize: 3, // 默认每页显示10条
      totalNum: 0 // 总页数
    }
  },
  methods: {

      //删除所有查询到的数据
      delAll(){
          this.$confirm("确定要删除页面上所有数据吗？","提示",{
              confirmButtonText:"确定",
              cancelButtonText:"取消",
              type:'warning'
          })
          .then(() =>{
              var i = 0;
              var length = this.studentlists.length;
              for(; i < length; i++){
                  this.delArray.push(this.studentlists[i].sno);
              }
              this.$axios.post("/manager/cancelAccount",this.delArray)
              .then(res => {
                  if(res.data.state){
                      alert("操作成功！");
                      this.studentlists.splice(0,this.studentlists.length);
                      this.delArray.splice(0, this.delArray.length);
                  }else{
                      alert("注销失败！");
                  }
              })
          })
          .catch(function(error){
              this.$message({
                  type:'info',
                  message:'已经取消操作！',
              })
          })
      },

      //输入学号时，清空学院和年级
      clearDG(){
          this.dept = '';
          this.grade = '';
      },
      //输入学院和年级时，清空学号
      clearSno(){
          this.sno = '';
      },

      delAccount(index,account){
          this.delArray.push(account);
          this.$axios.post("/manager/cancelAccount",this.delArray)
          .then(res => {
              if(res.data.state){
                  alert("删除成功！");
                  this.studentlists.splice(index,1);
              }else{
                  alert("操作失败！");
              }
          })
          .catch(function(error){
              alert("发生错误！");
          })
      },
 
    // 简单实现学生输入查询的功能 sno sname dept grade
    findStudent() {
        this.studentlists.splice(0,this.studentlists.length);

      if(this.sno != ""){
            this.$axios.get('/manager/findstudentBySno',{params:{"sno":this.sno}})
            .then(res =>{
              if(res.data != ""){
                  this.studentlists.push(res.data);
                  this.totalNum = 1;
              }else{
                  alert("获取信息失败！");
              }
            })
            .catch(function(error){
                alert("发生错误!");
            })
      }

      if(this.dept != "" && this.grade != ""){
          this.$axios.get("/manager/findStudentByDG",{params:{"dept":this.dept,"grade":this.grade}})
          .then(res => {
              if(res.data != null){
                  this.studentlists = res.data;
                  this.totalNum = this.studentlists.length;
              }else{
                  alert("查找失败！");
              }
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
    this.totalNum = this.studentlists.length
    this.selectstudentlists = this.studentlists
    // 默认设置选中教师
    this.radio = '学生'
  }

}
</script>


<style>

#stu-btn-find{
    background-color: #2E8B57;
    color: white;
    border: 0;
    padding: 0%;
    border-radius: 10%;
    width: 8%;
    height: 30px;
    font-size: 80%;
    transform: translateY(25%);
  }

#btn-del{
    background-color: #2E8B57;
    color: white;
    border: 0;
    border-radius: 10%;
    width: 10%;
    height: 30px;
    padding: 0%;
    font-size: 80%;
    transform: translateY(25%);
  }

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

.stu-control-text{
    /* transform: translateY(50%); */
    /* margin:0; */
    display: block;
    width: 100px;
}

.stu-control-input{
    width: 20%;
}
.stu-floatleft{
    float: left;
    margin-right: 20px;
    position: relative; 
    left: 2%;
}
  .pagination{
    position: relative;
    left: 25%;
    margin: 20px 0px;
  }
</style>