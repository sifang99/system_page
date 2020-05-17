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
            <el-table-column label="课程代码" width="100" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.cno" @change="query(scope.$index)"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="cname" label="课程名" width="200" align="center">
            </el-table-column>
            <el-table-column prop="tname" label="授课教师" width="120"></el-table-column>
            <el-table-column prop="place" label="地点" width="200"></el-table-column>
            <el-table-column prop="time" label="时间" width="180"></el-table-column>    
        </el-table>
        <input type="button" name="" id="add_schedule_submit" value="提交" class="color_green" @click="submit">
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

            courses:[],


            classes:[
                {
                    value:"4",
                    label:"4班",
                },
                {
                    value:"3",
                    label:"3班",
                },
                {
                    value:"5",
                    label:"5班",
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
        add(){
            this.courses.push({
                cno:"",
                cname:"",
                tname:"",
                place:"",
                time:"",
            })
        },
        submit(){

        }
    }
}
</script>

<style>

.schedule-select{
    margin-top: 30px;
    margin-left: 20px;
}

.schedule-table{
    margin-top: 20px;
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