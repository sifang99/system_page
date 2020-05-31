<template>
    <div class="schedule">
        <p>发 布 课 表</p>
        <div class="schedule-line"></div>

        <el-select class="schedule-select" placeholder="请选择学期" v-model="term" >
            <el-option v-for="item in terms " :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>

        <el-select class="schedule-select" placeholder="请选择年级" v-model="grade" >
            <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>

        <el-select class="schedule-select" placeholder="请选择班级" v-model="classno" >
            <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>

        <input type="button" value="添加" class="add-schedule color_green" @click="add">
        <el-table class="schedule-table" :data="courses" style="width: 100%" >
            <el-table-column type="index" label="序号" width="80" ></el-table-column>
            <el-table-column prop="cno" label="课程代码" width="120" align="center">
            </el-table-column>
            <el-table-column prop="tno" label="教师编号" width="130" align="center">
            </el-table-column>
            <el-table-column prop="hour" label="学时" width="100">
            </el-table-column>
            <el-table-column prop="place" label="地点" width="200">
            </el-table-column>
            <el-table-column prop="timeLabel" label="时间" width="220" >   
            </el-table-column>  
        </el-table>
        <input type="button" name="" id="add_schedule_submit" value="提交" class="color_green" @click="submit">

        <el-dialog :visible="dialogVisible">
            <el-form :model="course" label-width="140px" label-position="right" ref="ruleForm" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="cno" label="请输入课程号">
                            <el-input v-model="course.cno" ></el-input>
                        </el-form-item>
                    </el-col>                   
                    <el-col :span="12">
                        <el-form-item prop="tno" label="请输入教师编号">
                            <el-input v-model="course.tno"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="hour" label="请输入课时">
                            <el-input v-model="course.hour"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="place" label="请输入上课地点">
                            <el-input v-model="course.place"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item  label="上课时间">
                        <el-select v-model="tempDay[0]" placeholder="请选择星期">
                            <el-option v-for="day in weekdays" :value="day.value" :label="day.label"></el-option>
                        </el-select>
                        <el-select v-model="tempItem[0]" placeholder="请选择时间">
                            <el-option v-for="time in items" :value="time.value" :label="time.label"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="上课时间">
                        <el-select v-model="tempDay[1]" placeholder="请选择星期">
                            <el-option v-for="day in weekdays" :value="day.value" :label="day.label"></el-option>
                        </el-select>
                        <el-select v-model="tempItem[1]" placeholder="请选择时间">
                            <el-option v-for="time in items" :value="time.value" :label="time.label"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="上课时间">
                        <el-select v-model="tempDay[2]" placeholder="请选择星期">
                            <el-option v-for="day in weekdays" :value="day.value" :label="day.label"></el-option>
                        </el-select>
                        <el-select v-model="tempItem[2]" placeholder="请选择时间">
                            <el-option v-for="time in items" :value="time.value" :label="time.label"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-form-item>
                    <el-button @click="cancel">取消</el-button>
                    <el-button @click="addSchedule('ruleForm')" >确定</el-button>
                </el-form-item> 
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
var checkTno = (rule, value, callback) => {
    if( !Number.isInteger(Number(value))){
        return callback(new Error("只能填写数字"));
    }else if(value.length != rule.length){
        return callback(new Error("编号长度为8"));
    }else{
        return callback();
    }
}

var checkCno = (rule, value, callback) => {
    if(!Number.isInteger(Number(value))){
        return callback(new Error("只能填写数字"));
    }else{
        return callback();
    }
}

var checkHour = (rule, value, callback) => {
    if(!Number.isInteger(Number(value))){
        return callback(new Error("只能填写整数"));
    }else{
        return callback();
    }
}
export default {
    name:"addSchedule",
    data(){
        return{
            term:"",
            grade:"",
            classno:"",
            dialogVisible:false,
            tempDay:[],
            tempItem:[],
            index:-1,   //记录当前选中的行

            course:{
                tno:"",
                cno:"",
                hour:"",
                place:"",
                time:"",
                timeLabel:"",
                term:"",
                grade:"",
                classno:"",
            },

            courses:[],
            weekdays:[
                {
                    value:"1",
                    label:"星期一"
                },
                {
                    value:"2",
                    label:"星期二"
                },
                {
                    value:"3",
                    label:"星期三"
                },
                {
                    value:"4",
                    label:"星期四"
                },
                {
                    value:"5",
                    label:"星期五"
                },
                {
                    value:"6",
                    label:"星期六"
                },
                {
                    value:"7",
                    label:"星期日"
                }
            ],
            items:[
                {
                    value:"12",
                    label:"上午第一二节",
                },
                {
                    value:"34",
                    label:"上午第三四节",
                },{
                    value:"123",
                    label:"上午第一二三节",
                },{
                    value:"345",
                    label:"上午第三四五节",
                },
                {
                    value:"67",
                    label:"下午第一二节",
                },
                {
                    value:"89",
                    label:"下午第三四节",
                },
                {
                    value:"678",
                    label:"下午第一二三节",
                },
                {
                    value:"8900",
                    label:"下午第三四五节",
                },
                {
                    value:"0102",
                    label:"晚上第一二节",
                },
                {
                    value:"010203",
                    label:"晚上第一二三节",
                }
            ],
            classes:[
                {
                    value:"01",
                    label:"1班",
                },
                {
                    value:"02",
                    label:"2班",
                },
                {
                    value:"03",
                    label:"3班",
                },
                {
                    value:"04",
                    label:"4班",
                },
                {
                    value:"05",
                    label:"5班",
                },
                {
                    value:"06",
                    label:"6班",
                },
                {
                    value:"07",
                    label:"7班",
                }
            ],
            grades:[
                {
                    value:"2017",
                    label:"2017级"
                },
                {
                    value:"2018",
                    label:"2018级"
                },
                {
                    value:"2019",
                    label:"2019级"
                },
                {
                    value:"2020",
                    label:"2020级"
                },
                
            ],
            terms:[
                {
                    value:"2019-2020学年第一学期",
                    label:"2019-2020学年第一学期"
                },
                {
                    value:"2019-2020学年第二学期",
                    label:"2019-2020学年第二学期"
                },
                {
                    value:"2020-2021学年第一学期",
                    label:"2020-2021学年第一学期"
                }
            ],
            rules:{
                cno:[
                    {required: true, message:'课程号不能为空', trigger: 'blur'},
                    {validator: checkCno, trigger: 'blur'}

                ],
                tno:[
                    {required: true, message:"教师编号不能为空", trigger: 'blur'},
                    {length: 8, validator: checkTno, trigger: 'blur'}
                ],
                hour:[
                    {required: true, message:"课时不能为空", trigger: 'blur'},
                    {validator: checkHour, trigger: 'blur'}
                ],
                place:[
                    {required: true, message:"上课地点不能为空", trigger: 'blur'}
                ],
                time:[
                    {required: true, message:"每门课程一周至少一节", trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        cancel(){
            this.course = {
                tno:"",
                cno:"",
                hour:"",
                place:"",
                time:"",
                timeLabel:"",
                term:"",
                grade:"",
                classno:"",
            }
            this.dialogVisible = false;
        },

        //点击添加按钮，显示对话框
        add(){
            if(this.term == ''){
                alert("请选择学期！");
                return;
            }
            if(this.grade == ''){
                alert("请选择年级！");
                return;
            }
            if(this.classno == ''){
                alert("请选择班级");
                return;
            }
            this.dialogVisible = true;
        },

        //在对话框中填写课程信息点击确定后，保存数据
        addSchedule(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    const length = this.tempDay.length
                    for(var i = 0; i < length; i++){
                        for(var j = 0; j < 7; j++){
                            if(this.tempDay[i] == this.weekdays[j].value){
                                this.course.time = this.course.time + this.tempDay[i]
                                this.course.timeLabel = this.course.timeLabel + this.weekdays[j].label
                                break
                            }
                        }
                        for(var m = 0; m < 10; m++){
                            if(this.tempItem[i] == this.items[m].value){
                                this.course.time = this.course.time + this.tempItem[i]
                                this.course.timeLabel = this.course.timeLabel + this.items[m].label
                                break
                            }
                        }

                        if(i < length - 1){
                            this.course.time = this.course.time + ','
                            this.course.timeLabel = this.course.timeLabel + '；'
                        }
                    }
                    // console.log(this.course)
                    this.courses.push(this.course);
                    this.course = {
                        tno:"",
                        cno:"",
                        hour:"",
                        place:"",
                         time:"",
                        timeLabel:"",
                        term:"",
                        grade:"",
                        classno:"",
                    }
                    this.clearDay()
                    this.clearItem()
                    this.dialogVisible = false
                }
            })
        },

        //清空tempDay
        clearDay(){
            var i = 0;
            var length = this.tempDay.length
            for(; i < length; i++){
                this.tempDay[i] = ""
            }
        },

        //清空tempItem
        clearItem(){
            var i = 0;
            var length = this.tempItem.length
            for( ; i < length; i++){
                this.tempItem[i] = ""
            }
        },

        //将学期、年级、班级信息添加到课程信息中
        delMessage(){
            var i = 0;
            var length = this.courses.length;
            for(; i < length ; i++){
                this.courses[i].term = this.term;
                this.courses[i].grade = this.grade;
                this.courses[i].classno = this.classno;

                //删除timeLabel属性
                delete this.courses[i].timeLabel;
            }
        },
        submit(){
            this.delMessage();
            // console.log(this.courses);
            // this.courses = JSON.stringify(this.courses);
            this.$axios.post("/manager/addSchedule",this.courses)
            .then(res => {
                if(res.data.state){
                    alert("添加成功！");
                }else{
                    alert("添加失败！");
                }
                // console.log(res);
            })
            .catch(function(error){
                alert("发生错误！");
            })
        }
    }
}
</script>

<style>

.time-dialog{
    width: 80%;
}

.schedule-select{
    margin-top: 30px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.schedule-table{
    margin-top: 20px;
}

.weekday{
    width: 100%;
}

#add_schedule_submit{
    margin-top: 50px;
    margin-left: 45%;
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}

.add-schedule{
    width: 60px;
    height: 30px;
    color: white;
    margin-top: 30px;
    margin-left: 30px;
    border-radius: 7%;
    border-style: none;
}
.schedule-line{
    width: 80%;
    border: 2px solid #2E8B57;
    margin-top: 10px;
    margin-left: 10%;
}
.schedule > p{
    text-align: center;
    font-size: 1.2em;
}
.schedule{
    border: 2px solid #CCCCCC;
    width: 90%;
    margin: 0 auto;
}
.delete-schedule-btn{
    width: 60px;
    height: 30px;
    text-align: center;
    padding: 0%;
}
.update-schedule-btn{
    width: 60px;
    height: 30px;
    text-align: center;
    padding: 0%;
}

</style>