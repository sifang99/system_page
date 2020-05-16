<template>
 <div class="clearfix">
  <el-table :data="chooseCourse.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" :row-class-name="getChooseCourse"
  border="true">
    <el-table-column prop="cno" label="课程代码" width="120" align="center" ></el-table-column>
    <el-table-column prop="cname" label="课程名" width="180" align="center"></el-table-column>
    <el-table-column prop="credit" label="学分" width="100" align="center"></el-table-column>
    <el-table-column prop="teacher" label="授课老师" align="center" width="120"></el-table-column>
    <el-table-column prop="place" label="授课校区" align="center" width="150"></el-table-column>
    <el-table-column prop="number" label="选课人数" align="center" width="120"></el-table-column>
    <el-table-column label="选课" align="center">
        <el-checkbox v-model="checked">加入课程</el-checkbox>
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

    <el-button type="success" round id="btn-choose">确认选择</el-button>
 </div>
</template>

<style>
.el-table{
    border: 1px solid #cccccc;
    text-align: center;
    margin: 0px 0px 20px 0px;
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
    float: right;
    margin: 10px 0px;
  }
  .pagination{
    position: relative;
    left: 25%;
    margin: 20px 0px;
  }
</style>

<script>
export default {
  name: 'stu-chooseCourse',
  methods: {
    getChooseCourse ({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
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
      chooseCourse: [{
        cno: '001',
        cname: '数据库',
        credit: 4,
        teacher: 'ddd',
        place: '成龙',
        // maxnumber: '50',
        // choosenumber: '10',
        // eslint-disable-next-line no-undef
        // number: choosenumber + '/' + maxnumber
        number: 11
      }],
      currentPage: 1, // 默认显示第一页
      pageSize: 1, // 默认每页显示10条
      totalNum: 1000 // 总页数
    }
  },
  created () {
    this.totalNum = this.chooseCourse.length
  }
}
</script>
