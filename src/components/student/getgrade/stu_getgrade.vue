<template>
 <div class="clearfix">
    <el-select v-model="selectterm" placeholder="请选择学期" popper-class="terms" id="selectterm"
    @change="GetTermFilter($event)">
        <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>

  <el-table :data="selectgradeinfo.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" :row-class-name="getgraderow"
  border="true" highlight-current-row>
    <el-table-column prop="term" label="学期" width="200" align="center" ></el-table-column>
    <el-table-column prop="coursetype" label="课程类别" width="80" align="center"></el-table-column>
    <el-table-column prop="cno" label="课程编码" width="100" align="center"></el-table-column>
    <el-table-column prop="cname" label="课程名" align="center" width="180"></el-table-column>
    <el-table-column prop="teacher" label="授课教师" align="center" width="100"></el-table-column>
    <el-table-column prop="credit" label="课程学分" align="center" width="80"></el-table-column>
    <el-table-column prop="grade" label="成绩" align="center" ></el-table-column>
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

    <!-- <el-button type="success" round id="btn-choose">确认选择</el-button> -->
 </div>
</template>

<script>
export default {
  name: 'stu-getgrade',
  methods: {
    getgraderow ({row, rowIndex}) {
      // 如果本门成绩不及格则高亮显示
      if (row.grade < 60) {
        return 'fail-row'
      }
      return 'success-row'
    },
    // 简单实现选择器的选择功能 -学期
    GetTermFilter (e) {
      this.selectgradeinfo = this.gradeinfo.filter(item => item.term === this.selectterm)
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
  data () {
    return {
      gradeinfo: [{
        term: '2019—2020学年第一学期',
        coursetype: '选修课',
        cno: '001',
        cname: '数据库',
        teacher: 'ddd',
        credit: 4,
        grade: 90
      }, {
        term: '2019—2020学年第二学期',
        coursetype: '选修课',
        cno: '001',
        cname: '数据库',
        teacher: 'ddd',
        credit: 4,
        grade: 50
      }],
      // eslint-disable-next-line no-undef
      // 简单实现select的选择功能
      selectgradeinfo: [],
      // 学期
      terms: [{
        value: '2019—2020学年第一学期',
        label: '2019—2020学年第一学期'
      }, {
        value: '2019—2020学年第二学期',
        label: '2019—2020学年第二学期'
      }, {
        value: '2018—2019学年第一学期',
        label: '2018—2019学年第一学期'
      }, {
        value: '2018—2019学年第二学期',
        label: '2018—2019学年第二学期'
      }],
      selectterm: '',
      currentPage: 1, // 默认显示第一页
      pageSize: 1, // 默认每页显示10条
      totalNum: 1000 // 总页数
    }
  },
  created () {
    this.totalNum = this.gradeinfo.length
    this.selectgradeinfo = this.gradeinfo
  }
}
</script>

<style>
.el-table{
    border: 1px solid #cccccc;
    text-align: center;
    margin: 0px 0px 20px 0px;
}
  .el-table .fail-row{
    background-color: rgb(250, 119, 119);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
    /* 移除table组件hover背景色 */
    .success-row:hover> td{
        background: #f0f9eb !important;
    }
    .fail-row:hover> td{
        background:rgb(250, 119, 119) !important;
    }

/* #btn-choose{
    background-color: #2E8B57;
    color: white;
    border: 0;
    float: right;
    margin: 10px 0px;
  } */
  .pagination{
    position: relative;
    left: 25%;
    margin: 20px 0px;
  }

  #selectterm{
      margin-bottom: 20px;
  }
</style>
