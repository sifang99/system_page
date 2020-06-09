<template>
<div>
    <div id="selection-wrapper" class="clearfix">
        <el-select v-model="term" clearable placeholder="请选择学期" popper-class="terms"
        @change="clickTerm($event)">
            <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>

        <el-select v-model="grade" clearable placeholder="请选择年级" popper-class="grades"
        @change="clickGrade($event)">
            <el-option v-for="item in grades" :key="item.gradeno" :label="item.gradename" :value="item.gradeno">
            </el-option>
        </el-select>

        <el-select v-model="course" clearable placeholder="请选择课程" popper-class="courses"
        @change="clickCourse($event)">
            <el-option v-for="item in courses" :key="item" :label="item" :value="item">
            </el-option>
        </el-select>

        <el-select v-model="cclass" clearable placeholder="请选择授课班级" popper-class="classes"
        @change="clickClass($event)">
            <el-option v-for="item in classes" :key="item" :label="item" :value="item">
            </el-option>
        </el-select>

        <el-button type="success" round id="btn-query" @click="query">查询</el-button>
    </div>

    <div id="recordgrade-wrapper">
    <el-table :data="record"  style="width: 100%">
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
          <template slot-scope="normal">
            <el-input v-model="normal.row.normalgrade" clearable @input="change($event)" max="100" min="0" maxlength="2"></el-input>
          </template>
        </el-table-column>
        </el-table-column>

        <el-table-column label="期中成绩">
        <el-table-column prop="middlegrade" label="占比30%" width="120">
            <template slot-scope="middle">
              <el-input v-model="middle.row.middlegrade" clearable @input="change($event)"  max="100" min="0" maxlength="2"></el-input>
            </template>
        </el-table-column>
        </el-table-column>

        <el-table-column label="期末成绩">
        <el-table-column
            prop="finalgrade"
            label="占比50%"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.finalgrade" clearable  @input="change($event)" max="100" min="0" maxlength="2"></el-input>
            </template>   
         </el-table-column>
        </el-table-column>

        <el-table-column
        prop="grade"
        label="总成绩">
            <template slot-scope="total">
              <span>  {{total.row.normalgrade*0.2 + total.row.middlegrade*0.3 + total.row.finalgrade*0.5 | numFilter }} </span>
            </template>  
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
                :total="totals" 
                prev-text="上一页" 
                next-text="下一页">
            </el-pagination>
        </div>
    </div>
  <el-button type="success" class="isjs-ac-recordGrade" round id="btn-sure" @click="submit">提交</el-button>
</div>
</template>

<script>
import {dataAcquisition} from '../../assets/js/dataAcquisition'
export default {
  name: 'Recordgrade',
  data () {
    return {
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数 
      record: [], //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
      totals:0, //返回记录总条数

      // 选项的值会保存到这里对应v-model的数据中
      term: '',   //选中的学期
      course: '',//选中的课程
      cclass: '',//授课班级
      grade: '',//选中的年级
      // year:'',

      terms: [
      {
        value: '2019-2020学年第一学期',
        label: '2019-2020学年第一学期'
      },
      {
        value: '2019-2020学年第二学期',
        label: '2019-2020学年第二学期'
      },
      {
        value: '2020-2021学年第一学期',
        label: '2020-2021学年第一学期'
      },
      {
        value: '2020-2021学年第二学期',
        label: '2020-2021学年第二学期'
      }],
      // 年级
      grades: [{
        gradeno: '2017',
        gradename: '2017级'
      }, {
        gradeno: '2018',
        gradename: '2018级'
      }, {
        gradeno: '2019级',
        gradename: '2019级'
      }, {
        gradeno: '2020',
        gradename: '2020级'
      }],

      // 返回来的课程
      courses: [],

      // 返回来的班级
      classes: [],

      teacher:{
        username: this.getUser.username,
        account:this.getUser.account,
        role:this.getUser.role,
      }
    }
  },
  filters:{
    numFilter(value){
      var realVal;
      if(! isNaN(value) && value !== ''){
        //截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2)
      }else{
        realVal = value
      }
      return realVal
    }
  },
  props:[
    'getUser'
  ],

  methods: {
    change(e){
      this.$forceUpdate();
      // console.log(e);
    },
    submit(){
      console.log(this.record);
      var i = 0;
      for(; i< this.record.length; i++){
        var grade = this.record[i].normalgrade*0.2 + this.record[i].middlegrade*0.3+this.record[i].finalgrade*0.5 ;
        this.record[i].grade = grade.toFixed(2);
        this.record[i].cname = this.course;
        delete this.record[i].normalgrade;
        delete this.record[i].middlegrade;
        delete this.record[i].finalgrade;
        delete this.record[i].sname;
      }
       console.log(this.record);
      this.$axios.post("/limitTea/updateGrade",this.record)
      .then(res => {
        if(res.data.state){
          alert("登记成功！");
          this.record.splice(0, this.record.length);
        }else{
          alert("登记失败！");
        }   
      })
      .catch(function(error){
        alert("发生错误！");
      })
    },
 
    getData() {
        // console.log("page:",this.currentPage," rows: ",this.pagesize, 
        // " cname: ",this.course," grade: ",this.grade, " classno: ",this.cclass);
        if(this.grade == ""){
          alert("请选择年级！");
          return
        }else if(this.course == "" ){
          alert("请选择课程名！");
          return
        }else if (this.cclass == ""){
          alert("请选择班级！");
          return
        }else{
            this.$axios.get('/limitTea/findByPage',{params:{"page":this.currentPage,
            "rows":this.pagesize, "cname":this.course, "grade":this.grade,"classno":this.cclass}})
            .then(response => {
              // console.log(response);
              if(response.data.totalPage == 0){
                alert("查询失败！");
              }else{
                this.record = response.data.students;
                var i = 0;
                for (; i<response.data.students.length; i++){
                  this.$set(this.record[i], 'middlegrade',"");
                  this.$set(this.record[i], 'normalgrade',"");
                  this.$set(this.record[i], 'finalgrade',"");
                  this.$set(this.record[i], 'grade',"0");
                }
                
                this.totals = response.data.totals;
                // console.log(this.record);
              }//if      
            }).catch(function(error){
              alert("发生错误！");
            }) ;
        }//if    
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.getData();
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getData();
      console.log(this.currentPage) 
    },

    //查询班级
    query(){
        this.getData();
    },
   
    // 获取选择信息-测试用 直接用this.term就可获取到选择信息  其他选择类似
    clickTerm (e) {
      this.courses = null;
      this.classes = null;
      this.course = "";
      this.cclass = "";
      this.grade = "";
      if(this.term != "" && this.grade != ""){
        // console.log("TAG",this.teacher, "TAG ",this.term , " TAG ",this.grade);
        this.$axios.get("/teacher/findCname",{params:{"tno":this.teacher.account,"term":this.term,"grade":this.grade}})
        .then(res => {
          // console.log(res);
          if(res.data != null){
            this.courses = res.data;
          }else{
            alert("获取课程失败！");
            this.courses = null;
          }
        })
        .catch(function(error){
          alert("发生错误！");
        })
      }
      // console.log(this.term)
    },
    clickGrade (e) {
      this.courses = null;
      this.classes = null;
      this.course = "";
      this.cclass = "";
      if(this.term != "" && this.grade != ""){
        // console.log("TAG",this.teacher, "TAG ",this.term , " TAG ",this.grade);
        this.$axios.get("/teacher/findCname",{params:{"tno":this.teacher.account,"term":this.term,"grade":this.grade}})
        .then(res => {
          // console.log(res);
          if(res.data != null){
            this.courses = res.data;
          }else{
            alert("获取课程失败！");
            this.courses = null;
          }
        })
        .catch(function(error){
          alert("发生错误！");
        })
      }
    },
    clickClass (e) {
      
    },
    clickCourse (e) {
      this.classes = null;
      this.cclass = "";
      if(this.term != "" && this.grade != "" && this.course != ""){
        this.$axios.get("/teacher/findClassno",{params:{"tno":this.teacher.account,"term":this.term,"grade":this.grade,"cname":this.course}})
        .then(res => {
          if(res.data != null){
            this.classes = res.data;
          }else{
            alert("获取班级失败！");
          }
        })
        .catch(function(error){
          alert("发生错误！");
        });
      }else{

      }
     
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
      /* margin-left: 20px; */
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
