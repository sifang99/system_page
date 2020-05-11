<template>
 <div class="clearfix">
  <el-table :data="chooseCourse" style="width: 100%" :row-class-name="getChooseCourse"
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
  <!-- <el-pagination :page-size="6" :total="60" layout="prev, pager, next" class="pagination">
  </el-pagination> -->
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
      } ]
    }
  }
}
</script>
