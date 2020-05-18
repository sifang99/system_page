<template>
    <div class="table-container">
        <el-select v-model="selectterm" placeholder="请选择学期" popper-class="terms" id="selectterm"
        @change="GetTermFilter($event)">
            <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>

        <table class="courseplantable" >
            <thead id="courseplan-head">
                <tr>
                    <th colspan="2">时间</th>
                    <th v-for="(week, weekIndex) in weeks" :key="weekIndex"> {{'星期' + digital2Chinese(weekIndex, 'week')}}</th>
                </tr>
            </thead>
            <tbody id="courseplan-body">
                <tr v-for="(lesson, lessonIndex) in studentCourseData.lessonstime" :key="lessonIndex">
                    <td v-if="lessonIndex == 0? true:false" rowspan="5" class="time">上午</td>
                    <td v-if="lessonIndex == 5? true:false" rowspan="5" class="time">下午</td>
                    <td v-if="lessonIndex == 10? true:false" rowspan="3" class="time">傍晚</td>
                    <td>
                        <p>{{'第' + digital2Chinese(lessonIndex) + "节"}}</p>
                        <p class="period">{{ lesson }}</p>
                    </td>
                    <td v-for="(week, courseIndex) in weeks" :key="courseIndex" class="course" >
                        <p>{{studentCourseData.courses[lessonIndex][courseIndex]}}</p>
                        <p>{{studentCourseData.places[lessonIndex][courseIndex]}}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
  name: 'stu-CoursePlan',
  data () {
    return {
      studentCourseData: {
        // 记录课程信息 是一个13行7列的二维数组 行表示第几节课 列表示星期
        // 数组中的每一个元素都是一个课程信息对象 包括课程名cname 教师姓名teacher 教学地点place 上课节数num
        courses:[13][7],
        places:[13][7],

        // 上课时间
        lessonstime: [
          // 上午
          '08:10-08:55',
          '09:00-09:45',
          '10:10-10:55',
          '11:00-11:45',
          '11:50-12:35',
          // 下午
          '14:10-14:55',
          '15:00-15:45',
          '16:10-16:55',
          '17:00-17:45',
          '17:50-18:35',
          // 晚上
          '19:10-19:55',
          '20:00-20:45',
          '20:50-21:35'
        ],
 
      },

      weeks:["","","","","","",""],

      user:{
        account:this.getUser.account,
        username:this.getUser.username,
        role:this.getUser.role,
      },

      // 学期
      terms: [{
        value: '2019-2020学年第一学期',
        label: '2019-2020学年第一学期'
      }, {
        value: '2019-2020学年第二学期',
        label: '2019-2020学年第二学期'
      }, {
        value: '2018-2019学年第一学期',
        label: '2018-2019学年第一学期'
      }, {
        value: '2018-2019学年第二学期',
        label: '2018-2019学年第二学期'
      },{
        value: '2017-2018学年第二学期',
        label: '2017-2018学年第二学期'
      },{
        value: '2017-2018学年第一学期',
        label: '2017-2018学年第一学期'
      }
      ],
      selectterm: '',
      data:"",
        
    }
  },
  props:[
    'getUser'
  ],
  created() {
    this.initCourse();
    this.initPlace();
  },
  methods: {

    initCourse(){
      var i = 0;
      var j = 0;
      var array = new Array();
      for(; i<13; i++){
        array[i] = new Array();
        for(j = 0; j < 7; j++){
          array[i][j] = "";
        }
      }
      this.studentCourseData.courses = array;
    },
    initPlace(){
      var i = 0;
      var j = 0;
      var array = new Array();
      for(; i<13; i++){
        array[i] = new Array();
        for(j = 0; j < 7; j++){
          array[i][j] = "";
        }
      }
      this.studentCourseData.places = array;
    },

    GetTermFilter(e){
      
      if(this.user.role == 1){
          this.$axios.get("/student/findScheduleS",{params:{"sno":this.user.account,"term":this.selectterm}})
          .then(res => {
            this.data = res.data;
            this.initCourse();
            this.initPlace();
            this.getArray();
            console.log(res.data);
          })
          .catch(function(error){
            alert("发生错误！");
          })
      }else if(this.user.role == 2)
      {
          this.$axios.get("/teacher/findScheduleT",{params:{"tno":this.user.account,"term":this.selectterm}})
          .then(res => {
            this.data = res.data;
            this.initCourse();
            this.initPlace();
            this.getArray();
            console.log(res.data);
          })
          .catch(function(error){
            alert("发生错误！");
          })
          console.log(this.user.role);
      }
      
    },

    getArray(){
      console.log("我进入了getArray");
      var i = 0;
      for(; i < this.data.length; i++){
        var length = 0;   //length为课程时间安排的长度
        var count = 0;    //count为一节大课的节数
        var index = 0;    //courses的行号
        var day = 0;      //course的列号
        var time = 0;     //某门课程一周有几节课
        var count = 0;//count为一节大课的节数
        console.log("我进入了getArray的第一层循环");
        time = this.data[i].time.length;
        var j = 0;
        for(; j < time; j++){
          console.log("我进入了getArray的第二层循环");
          this.pushCourse(length,count,index,day,i,j);
        }
        
      }  
      console.log(this.courses);
    },

    pushCourse(length, count, index, day, i, j){

      console.log("我进入了pushCourse");

      day = this.getDay(this.data[i].time[j].day);
      length = this.data[i].time[j].time.length;

      if(day == 0 || length == 0){
        return ;
      }
      
      if(length == 2){
          count = 2;
      }else if(length == 3){
          count = 3;
      }else if(length == 4){
          var s = this.data[i].time[j].time.substr(0,2);   //时间的前两位数字
          if(s == "89"){
            count = 3;
          }else if(s == "11"){
            count = 2;
          }else if(s == "12"){
            count = 2;
          }
      }else if(length == 6){
          count = 3;
      }

      index = Number(this.data[i].time[j].time.substr(0,1));
      console.log("index",index);
      if(count == 2){
        //添加课程信息
        this.studentCourseData.courses[index-1][day-1] = this.data[i].cname;
        this.studentCourseData.courses[index][day-1] = this.data[i].cname;

        //添加地点
        this.studentCourseData.places[index-1][day-1] = this.data[i].place;
        this.studentCourseData.places[index][day-1] = this.data[i].place;
        
      }else if(count == 3){
        this.studentCourseData.courses[index-1][day-1] = this.data[i].cname;
        this.studentCourseData.courses[index][day-1] = this.data[i].cname;
        this.studentCourseData.courses[index+1][day-1] = this.data[i].cname;

        this.studentCourseData.places[index-1][day-1] = this.data[i].place;
        this.studentCourseData.places[index][day-1] = this.data[i].place;
        this.studentCourseData.places[index+1][day-1] = this.data[i].place;
      }

    },

    //将后台传来的“星期X”转换为数字
    getDay(day){
        var result;
        if(day == "星期一"){
          result = 1;
        }else if(day == "星期二"){
          result = 2;
        }else if(day == "星期三"){
          result = 3;
        }else if(day == "星期四"){
          result = 4;
        }else if(day == "星期五"){
          result = 5;
        }else if(day == "星期六"){
          result = 6;
        }else if(day == "星期七"){
          result = 7;
        }else{
          result = 0;
        }

        return result;
    },
    /**
        * 数字转中文
        * @param {Number} num 需要转换的数字
        * @param {String} identifier 标识符
        * @returns {String} 转换后的中文
        */
    digital2Chinese (num, identifier) {
      const character = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三']
      return identifier === 'week' && (num === 6) ? '日' : character[num]
    }
  }
}
</script>
<style>
    .table-container {
        margin: 0 auto;
        width: 80%;
    }

    .courseplantable{
        table-layout: fixed;
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse
    }

    #courseplan-head {
        background-color: #eaeef3;
        line-height: 40px;
    }

    #courseplan-head>tr>th {
         color: #333;
        font-weight: bold;
        border: 1px solid black;
    }
    .time{
        background-color: #eaeef3;
        color: #333;
        font-weight: bold;
        font-size: 15px;
    }
    #courseplan-body {
        background-color: #f6f7f8;
    }
    #courseplan-body>tr>td {
        color: black;
        text-align: center;
        border: 1px solid #333;
    }
    .courseplantable> th {
        width: 12%;
        font-size: 12px;
        text-align: center;
        border: 1px solid #333;
        padding: 0px;
    }

    .courseplantable> tr td:first-child {
        color: #333;
    }
     .period {
         font-size: 12px;
     }
    #selectterm{
      margin-bottom: 20px;
  }
  .course{
      background-color: white;
  }
</style>
