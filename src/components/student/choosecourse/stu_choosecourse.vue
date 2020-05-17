<template>
 <div class="clearfix">
   <el-button id="update-data" round @click="update">刷新</el-button>
  <el-table :data="chooseCourse" style="width: 100%" :row-class-name="getChooseCourse">
    <el-table-column prop="cno" label="课程代码" width="120" align="center" ></el-table-column>
    <el-table-column prop="cname" label="课程名" width="180" align="center"></el-table-column>
    <el-table-column prop="credit" label="学分" width="100" align="center"></el-table-column>
    <el-table-column prop="tname" label="授课老师" align="center" width="120"></el-table-column>
    <el-table-column prop="place" label="授课校区" align="center" width="150"></el-table-column>
    <el-table-column prop="number" label="已选人数" align="center" width="120"></el-table-column>
    <el-table-column prop="max" label="选课人数" align="center" width="120"></el-table-column>
    <el-table-column label="选课" align="center" >
        <template slot-scope="scope">
           <el-checkbox v-model="scope.row.ischoiced" @change="choose(scope.$index,scope.row.ischoiced)">加入课程</el-checkbox>
        </template>
       
    </el-table-column>
  </el-table>

    <!-- 分页条 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        class="pagination">
    </el-pagination>

    <el-button type="success" round id="btn-choose" @click="submit">确认选择</el-button>
 </div>
</template>



<script>
export default {
  name: 'stu-chooseCourse',
  data () {
    return {
      chooseCourse: [],
      currentPage: 1, // 默认显示第一页
      pageSize: 4, // 默认每页显示10条
      totalNum: 0 ,// 总页数
      choiced:false,//判断是否选择了课程
      index:null,//记录选择的课程序号
      student:{
        account:this.getUser.account,
        username:this.getUser.username,
        role:this.getUser.role,
      }
    }
  },
  props:[
    'getUser'
  ],
  methods: {
    update(){
      this.getData();
    },
    submit(){
      if(!this.choiced){
        alert("请选择课程！");
      }else{
        this.$axios('/optional/update',{params:{"cno":this.chooseCourse[this.index].cno,"sno":this.student.account}})
        .then(res => {
          if(res.data.state){
            alert("选课成功！");
          }else{
            alert("选课失败！");
          }
        })
        .catch(function(error){
          alert("发生错误！");
        })

        this.getData();
      }
    },
    getChooseCourse ({row, rowIndex}) {
      // console.log(row);
      if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
    },
    choose(e, c){
      var i = 0;
      for(; i < this.chooseCourse.length; i++){
        if(i!= e){
          this.chooseCourse[i].ischoiced = false;
        }
        this.index = e;
        this.choiced = c;
      }
      // console.log(e,c);
    },
    // 分页处理
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val // 动态改变
      this.getData();
    },

    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val // 动态改变
      this.getData();
    },
    getData(){
      this.$axios('/optional/sfindByPage',{params:{"page":this.currentPage,"rows":this.pageSize}})
      .then(res => {
        if(res.data.totals != 0){
          this.chooseCourse = res.data.optionals;
          this.totalNum = res.data.totals;
          var i = 0;
          for(; i < this.chooseCourse.length; i++){
            this.$set(this.chooseCourse[i],'ischoiced',"");
          }
        }
        // console.log(this.chooseCourse);
      })
      .catch(function(error){
        alert("发生错误！");
      })
    }
  },
  created () {
    this.getData();
  }
}
</script>

<style>
.el-table{
    border: 1px solid #cccccc;
    text-align: center;
    margin: 0px 0px 20px 0px;
}

#update-data{
  float: right;
  margin-bottom: 20px;
  margin-right: 20px;
  width: 60px;
  height: 40px;
  padding: 0%;
  color: white;
  background-color: #2E8B57;
}
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
#btn-choose{
    background-color: #2E8B57;
    color: white;
    border: 0;
    width: 80px;
    height: 40px;
    float: right;
    margin: 10px 0px;
    padding: 0%;
  }
  .pagination{
    position: relative;
    left: 25%;
    margin: 20px 0px;
  }
</style>
