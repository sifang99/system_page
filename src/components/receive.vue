<template>
 <div class="clearfix">
  <el-table :data="attention" style="width: 100%" :row-class-name="getReceiveAttention" >
    <el-table-column  label="" width="80" >
    </el-table-column>
    <el-table-column type="index" label="序号" width="180" ></el-table-column>
    <el-table-column label="发件人" width="180" align="center">admin</el-table-column>
    <el-table-column prop="title" label="主题" width="300" align="center">
    </el-table-column>
    <el-table-column prop="day" label="时间" width="180"></el-table-column>
    <el-table-column >
      <template slot-scope="scope">
        <a  class="isjs-ac-01" @click="detail(scope.row.day,scope.row.title,scope.row.content)" > 点击查看 </a>
      </template>
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
</template>

<script>
import { dataAcquisition } from "../assets/js/dataAcquisition";
export default {
  name: 'receiveAttention',

  data () {
    return {
      attention: [],
      // checked: false
      currentPage: 1, // 默认显示第一页
      pageSize: 1, // 默认每页显示1条
      totalNum: 0, // 数据总条数
      user:{
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
    detail(day,title,content){

      if(this.user.role == 1){
        this.$router.push("/student/contentdetail");
      }else if(this.user.role == 2){
        this.$router.push("/teacher/contentdetail");
      }
      var message = {
        day:day,
        title:title,
        content:content,
        role:this.user.role,
      }
      this.$emit('show',message);
      // console.log(message);
    },
    getReceiveAttention ({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
    },
    // 分页处理
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val // 动态改变
      this.getData();
    },

    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val // 动态改变
      this.getData();
    },

    getData(){
      this.$axios.get("user/findByPage",{params:{"page":this.currentPage,"rows":this.pageSize,"account":this.user.account}})
      .then(res => {
        if(res.data.totals != 0){
          this.attention = res.data.notices;
          this.totalNum = res.data.totals;
       }
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
    background: oldlace;
    /* border:1px solid black; */
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .pagination{
    position: relative;
    left: 25%;
    margin: 20px 0px;
  }
  #topic{
    font-weight: bold;
  }
  .pagination{
    margin-top: 20px;
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
</style>
