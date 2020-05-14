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
            <el-option v-for="item in courses" :key="item.cno" :label="item.cname" :value="item.cname">
            </el-option>
        </el-select>

        <el-select v-model="cclass" clearable placeholder="请选择授课班级" popper-class="classes"
        @change="GetClass($event)">
            <el-option v-for="item in classes" :key="item.classno" :label="item.classname" :value="item.classno">
            </el-option>
        </el-select>

        <el-button type="success" round id="btn-query" @click="query">查询</el-button>
    </div>

    <div id="recordgrade-wrapper">
    <el-table :model="grade" :data="record.slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%">
        <el-table-column
        type="index"
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
            <el-input v-model="grade.normalgrade" clearable @input="RecordGrade($event)"></el-input>
        </el-table-column>
        </el-table-column>

        <el-table-column label="期中成绩">
        <el-table-column prop="middlegrade" label="占比30%" width="120">
                <el-input  clearable @input="RecordGrade($event)"></el-input>
            </el-table-column>
        </el-table-column>

        <el-table-column label="期末成绩">
        <el-table-column
            prop="finalgrade"
            label="占比50%"
            width="120">
            <el-input  clearable @input="RecordGrade($event)"></el-input>
        </el-table-column>
        </el-table-column>

        <el-table-column
        prop="totalgrade"
        label="总成绩"
        v-model="totalgrade">
        </el-table-column>

    </el-table>

    <div class="pagination">
            <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" 
                :page-sizes="[5, 10, 20, 40]" 
                :page-size="pagesize" 
                layout="total, sizes,prev, pager, next" 
                :total="record.length" 
                prev-text="上一页" 
                next-text="下一页">
            </el-pagination>
        </div>
    </div>
  <el-button type="success" round id="btn-sure" @click="submit">提交</el-button>
</div>
</template>

<script>
export default {
  name: 'Recordgrade',
  data () {
    return {
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数 
      record: [], //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面

       // 登记成绩记录信息
      totalgrade:0,
      normalgrade:"",
      middlegrade:"",
      finalgrade:"",

      // 选项的值会保存到这里对应v-model的数据中
      term: '',
      course: '',
      cclass: '',
      grade: '',
      year:'',

      terms: [{
        value: '2017-2018学年第一学期',
        label: '2017-2018学年第一学期'
      },
      {
        value: '2017-2018学年第二学期',
        label: '2017-2018学年第二学期'
      },
      {
        value: '2018-2019学年第一学期',
        label: '2018-2019学年第一学期'
      },
      {
        value: '2018-2019学年第二学期',
        label: '2018-2019学年第二学期'
      },
      {
        value: '2019-2020学年第一学期',
        label: '2019-2020学年第一学期'
      },
      {
        value: '2019-2020学年第二学期',
        label: '2019-2020学年第二学期'
      }],

      // 课程
      courses: [{
        cno: '001',
        cname: '数据库'
      }, {
        cno: '002',
        cname: '网络安全'
      }, {
        cno: '003',
        cname: '操作系统'
      }],

      // 班级
      classes: [{
        classno: '1',
        classname: '一班'
      },
      {
        classno: '2',
        classname: '二班'
      },
      {
        classno: '3',
        classname: '三班'
      },
      {
        classno: '4',
        classname: '四班'
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
      
      grade:[],
    }
  },

  methods: {
    submit(){
      console.log(this.record);
    },
     // 记录成绩
    RecordGrade (e) {
    //   this.totalgrade = 0.2 * this.normalgrade + 0.3 * this.middlegrade + 0.5 * this.finalgrade
    },
    getData() {
        // console.log("page:",this.currentPage," rows: ",this.pagesize, 
        // " cname: ",this.course," grade: ",this.grade, " classno: ",this.cclass);
        this.$axios.get('/student/findByPage',{params:{"page":this.currentPage,
         "rows":this.pagesize, "cname":this.course, "grade":this.grade,"classno":this.cclass}})
        .then(response => {
          // console.log(response.data);
          if(response.data.totalPage == 0){
            alert("查询失败！");
          }else{
            this.record = response.data.students;
            var i = 0;
            for(; i<this.record.length; i++){
              this.record[i].middlegrade = "";
              this.record[i].normalgrade = "";
              this.record[i].finalgrade = "";
              this.record[i].totalgrade = 0;
            }
            console.log(this.record);
          }      
        }).catch(function(error){
          alert("发生错误！");
        }) ;
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
    },

    //查询班级
    query(){
        this.getData();
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
    }
  }
}
</script>

<style>
    #selection-wrapper{
        width: 100%;
        margin: 0 auto;
        margin-bottom: 20px;
    }

    .terms,.courses,.classes,.grades ,.years{
        border: 1px solid black;
        float: left;
    }

    .el-select{
      width: 20%;
    }

    #btn-query{
       background-color: #2E8B57;
      color: white;
      border: 0;
      margin-left: 20px;
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
