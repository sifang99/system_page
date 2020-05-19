<template>
 <div class="clearfix">

   <el-select v-model="role" class="choose-role" placeholder="学生" @change="getNotice">
     <el-option value="1" label="学生"> 学生 </el-option>
     <el-option value="2" label="教师"> 教师 </el-option>
   </el-select>

   <el-button type="success" round class="btn-sty add-newNotice" @click="addNotice"> 添加 </el-button>

  <el-table :data="attention" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" label="" width="80" ></el-table-column>
    <el-table-column type="index" label="序号" width="80" ></el-table-column>
    <el-table-column label="发件人" width="100" align="center">admin</el-table-column>
    <el-table-column prop="title" label="主题" width="300" align="center">
    </el-table-column>
    <el-table-column prop="day" label="时间" width="180"></el-table-column>
    <el-table-column >
      <template slot-scope="scope">
        <a  @click="detail(scope.row.day,scope.row.title,scope.row.content)" > 点击查看 </a>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button class="delete">点击删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!-- 分页条 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        class="pagination">
    </el-pagination>

  <el-button type="success" round class="btn-sty delete-notice">删除</el-button>
 </div>
</template>

<script>
export default {
  name: 'receiveAttention',

  data () {
    return {
      attention: [],
      checked: null,
      currentPage: 1, // 默认显示第一页
      pageSize: 10, // 默认每页显示1条
      totalNum: 0, // 数据总条数
      role:"1",
      userRole:3,
    }
  },
  methods: {
    getNotice(){
      this.getData();
      // console.log(this.role);
    },
    addNotice(){
        this.$router.push('/administrator/addNotice');
    },
    detail(day,title,content){

      this.$router.push("/administrator/contentdetail");

      var message = {
        time:day,
        title:title,
        content:content,
        role:3,
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
      this.$axios.get("notice/MfindByPage",{params:{"page":this.currentPage,"rows":this.pageSize,"role":this.role}})
      .then(res => {
        if(res.data.totals != 0){
          this.attention = res.data.notices;
          this.totalNum = res.data.totals;
          console.log(res);
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

  .choose-role{
    margin-left: 80px;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .add-newNotice{
    position: relative;
    left: 53%;
  }
  .delete-notice{
    position: relative;
    left:83% ;
  }

  .delete{
    width: 80px;
    height: 30px;
    text-align: center;
    padding: 0%;
  }

  .btn-sty{
    background-color: #2E8B57;
    color: white;
    border: 0;
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
