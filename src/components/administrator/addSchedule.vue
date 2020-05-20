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
            <el-table-column type="index" label="序号" width="60" ></el-table-column>
            <el-table-column label="课程代码" width="160" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.cno" ></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="tno" label="教师编号" width="160" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.tno"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="hour" label="学时" width="100">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.hour"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="place" label="地点" width="220">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.place"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="时间" width="180" >
                <template  slot-scope="scope">
                    <el-button @click="showDialog(scope.$index)">添加时间</el-button>
                </template>    
            </el-table-column>    
        </el-table>
        <input type="button" name="" id="add_schedule_submit" value="提交" class="color_green" @click="submit">

        <el-dialog :visible.sync="dialogVisible"  class="time-dialog">
            <el-form>
                <el-form-item label="请选择上课时间">
                    <el-select v-model="tempDay">
                        <el-option v-for="item in weekdays" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请选择上课时间">
                    <el-select v-model="tempItem">
                        <el-option v-for="item in items" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button @click="addTime">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"addSchedule",
    data(){
        return{
            term:"",
            grade:"",
            classno:"",
            dialogVisible:false,
            tempDay:'',
            tempItem:'',
            index:-1,

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
                    value:"1",
                    label:"1班",
                },
                {
                    value:"2",
                    label:"2班",
                },
                {
                    value:"3",
                    label:"3班",
                },
                {
                    value:"4",
                    label:"4班",
                },
                {
                    value:"5",
                    label:"5班",
                },
                {
                    value:"6",
                    label:"6班",
                },
                {
                    value:"7",
                    label:"7班",
                }
            ],

            grades:[
                {
                    value:"2016",
                    label:"2016级"
                },
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
                
            ],
            terms:[
                {
                    value:"2017-2018学年第一学期",
                    label:"2017-2018学年第一学期"
                },
                {
                    value:"2017-2018学年第二学期",
                    label:"2017-2018学年第二学期"
                },
                {
                    value:"2018-2019学年第一学期",
                    label:"2018-2019学年第一学期"
                },
                {
                    value:"2018-2019学年第二学期",
                    label:"2018-2019学年第二学期"
                },
                {
                    value:"2019-2020学年第一学期",
                    label:"2019-2020学年第一学期"
                },               
                {
                    value:"2019-2020学年第二学期",
                    label:"2019-2020学年第二学期"
                }
            ]
        }
    },
    methods:{
        cancel(){
            this.dialogVisible = false;
        },
        addTime(){
            var time = this.tempDay + "" + this.tempItem
            if(this.courses[this.index].time == ""){
                this.courses[this.index].time = time;
            }else{
                this.courses[this.index].time = this.courses[this.index].time + "," + time;
            }
            
            console.log(this.courses[this.index].time);
            this.dialogVisible = false;
            this.tempDay = '';
            this.tempItem = '';
            this.index = -1;
        },
        showDialog(index){
            this.index = index;
            this.dialogVisible = true;
        },
        add(){
            this.courses.push({
                cno:"",
                tno:"",
                hour:"",
                place:"",
                time:"",
                term:"",
                grade:"",
                classno:"",
            })
        },
        //将学期、年级、班级信息添加到课程信息中
        addMessage(){
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
            var i = 0;
            var length = this.courses.length;
            for(; i < length ; i++){
                this.courses[i].term = this.term;
                this.courses[i].grade = this.grade;
                this.courses[i].classno = this.classno;
            }
        },
        submit(){
            this.addMessage();
            console.log(this.courses);
            // this.courses = JSON.stringify(this.courses);
            this.$axios.post("/manager/addSchedule",this.courses)
            .then(res => {
                if(res.data.state){
                    alert("添加成功！");
                }else{
                    alert("添加失败！");
                }
                console.log(res);
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
</style>