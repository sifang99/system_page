<template>
<div>
    <div id="selection-wrapper" class="clearfix">
        <el-select v-model="term" clearable placeholder="请选择学期" popper-class="terms"
        @change="GetTerm($event)">
            <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>

        <el-select v-model="grade" clearable placeholder="请选择年级" popper-class="grades"
        @change="GetGrade($event)">
            <el-option v-for="item in grades" :key="item.gradeno" :label="item.gradename" :value="item.gradeno">
            </el-option>
        </el-select>

        <el-select v-model="course" clearable placeholder="请选择课程" popper-class="courses"
        @change="GetCourse($event)">
            <el-option v-for="item in courses" :key="item.cno" :label="item.cname" :value="item.cno">
            </el-option>
        </el-select>

        <el-select v-model="cclass" clearable placeholder="请选择授课班级" popper-class="classes"
        @change="GetClass($event)">
            <el-option v-for="item in classes" :key="item.classno" :label="item.classname" :value="item.classno">
            </el-option>
        </el-select>
    </div>

    <div id="recordgrade-wrapper">
    <el-table :data="record.slice((currentPage-1)*pageSize,currentPage*pageSize)"  style="width: 100%">
        <el-table-column
        prop="num"
        label="序号"
        width="50" align="center">
        </el-table-column>

        <el-table-column
        prop="sno"
        label="学号"
        width="150">
        </el-table-column>

        <el-table-column
        prop="sname"
        label="姓名"
        width="150">
        </el-table-column>

        <el-table-column label="平时成绩">
        <el-table-column prop="normalgrade" label="占比20%" width="120">
            <!-- <el-select v-model="precent1" clearable placeholder="请选择成绩占比" >
                <el-option v-for="item in normalpercent" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->
            <!-- <el-input v-model="normalgrade" clearable @input="RecordGrade"></el-input> -->
            <el-input v-model="input" clearable></el-input>
        </el-table-column>
        </el-table-column>

        <el-table-column label="期中成绩">
        <el-table-column prop="middlegrade" label="占比30%" width="120">
                <el-input  v-module="middlegrade" clearable @input="RecordGrade"></el-input>
            </el-table-column>
        </el-table-column>

        <el-table-column label="期末成绩">
        <el-table-column
            prop="finalgrade"
            label="占比50%"
            width="120">
            <el-input v-model="finalgrade" clearable @input="RecordGrade"></el-input>
        </el-table-column>
        </el-table-column>

        <el-table-column
        prop="totalgrade"
        label="总成绩"
        v-model="totalgrade">
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
        :total="totalNum">
    </el-pagination>
    </div>
  <el-button type="success" round id="btn-sure">确定</el-button>
</div>
</template>

<script>
export default {
  name: 'Recordgrade',
  data () {
    return {
      // 年级
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

      // 课程
      courses: [{
        cno: '111',
        cname: '数据库'
      }, {
        cno: '112',
        cname: '数据库'
      }, {
        cno: '113',
        cname: '数据库'
      }],

      // 班级
      classes: [{
        classno: '01',
        classname: '一班'
      },
      {
        classno: '02',
        classname: '二班'
      },
      {
        classno: '03',
        classname: '二班'
      }],

      // 年级
      grades: [{
        gradeno: '2016',
        gradename: '2016'
      }, {
        gradeno: '2017',
        gradename: '2017'
      }, {
        gradeno: '2018',
        gradename: '2018'
      }, {
        gradeno: '2019',
        gradename: '2019'
      }],
      // 选项的值会保存到这里对应v-module的数据中
      term: '',
      course: '',
      cclass: '',
      grade: '',

      // 登记成绩记录信息-test
      record: [{
        num: '1',
        sno: '2017110406',
        sname: 'ddd',
        normalgrade: 0,
        middlegrade: 0,
        finalgrade: 0,
        totalgrade: 0
      }, {
        num: '2',
        sno: '2017110406',
        sname: 'ddd',
        normalgrade: 0,
        middlegrade: 0,
        finalgrade: 0,
        totalgrade: 0
      }, {
        num: '3',
        sno: '2017110406',
        sname: 'ddd',
        normalgrade: 0,
        middlegrade: 0,
        finalgrade: 0,
        totalgrade: 0
      }, {
        num: '4',
        sno: '2017110406',
        sname: 'ddd',
        normalgrade: 0,
        middlegrade: 0,
        finalgrade: 0,
        totalgrade: 0
      }, {
        num: '5',
        sno: '2017110406',
        sname: 'ddd',
        normalgrade: 0,
        middlegrade: 0,
        finalgrade: 0,
        totalgrade: 0
      }, {
        num: '6',
        sno: '2017110406',
        sname: 'ddd',
        normalgrade: 0,
        middlegrade: 0,
        finalgrade: 0,
        totalgrade: 0
      }],
      currentPage: 1, // 默认显示第一页
      pageSize: 1, // 默认每页显示10条
      totalNum: 1000 // 总页数
    }
  },
  methods: {
    // 记录成绩
    RecordGrade () {
    //   this.totalgrade = 0.2 * this.normalgrade + 0.3 * this.middlegrade + 0.5 * this.finalgrade
    },

    // 获取选择信息-测试用 直接用this.term就可获取到选择信息  其他选择类似
    GetTerm (e) {
      console.log(this.term)
    },
    GetGrade (e) {
      console.log(this.grade)
    },
    GetClass (e) {
      console.log(this.cclass)
    },
    GetCourse (e) {
      console.log(this.course)
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
    this.totalNum = this.record.length
  }

}
</script>

<style>
    #selection-wrapper{
        width: 100%;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .terms,.courses,.classes,.grades {
        border: 1px solid black;
        float: left;
    }

    #recordgrade-wrapper{
        width: 90%;
    }
    #btn-sure{
    background-color: #2E8B57;
    color: white;
    border: 0;
    margin: 20px 0px 0px 0px;
    position: relative;
    left: 45%;
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
