<template>
    <div>
        <h3>登陆总次数：{{this.loginTotal}}</h3>
        <div class="clearfix">
            <div id="student"></div>
            <div id="teacher"></div>
        </div>
        <div id="record">
            <h4>用户轨迹：</h4>
            <el-input v-model="account" placeholder="输入用户账号查询" class="input-user"></el-input>
            <el-button class="query" @click="query">查询</el-button>

            <el-table :data="traces" style="width: 100%" stripe="true"
                border="true"
                class="table-userlists"
                row-style="height:0"
                cell-style="padding:5px">
                <el-table-column type="index" label="序号" width="80" ></el-table-column>
                <el-table-column prop="sfTime" label="开始时间" width="100" align="center"></el-table-column>
                <el-table-column prop="efTime" label="结束时间" width="100" align="center"></el-table-column> 
                <el-table-column prop="path" label="访问页面" width="300" align="center"></el-table-column>
                <el-table-column prop="type" label="操作" width="100"></el-table-column>
                <el-table-column prop="className" label="操作元素"></el-table-column>
                <el-table-column prop="val" label="值"></el-table-column>
            </el-table>

            <!-- 分页条 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[4, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum"
                class="pagination">
            </el-pagination>
        </div>
    </div>
</template>

<script >
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
    name: 'userAction',
    data(){
        return{
            currentPage: 1, // 默认显示第一页
            pageSize: 4, // 默认每页显示1条
            totalNum: 0, // 数据总条数

            account:'',
            traces:[],
            loginTotal:0,

            teachers:{
                title: {
                    text: '教师端浏览记录'
                },
                tooltip:{

                },
                xAxis:{
                    data:["登记成绩", "查看课表", "修改个人信息"]
                },
                yAxis:{},
                series:[{
                    name:'教师',
                    type: 'bar',
                    data:[],
                    itemStyle:{
                        normal:{
                            color:function(){
                                return '#336699'
                            }
                        }
                    }   
                }],  
            },
            students:{
                title:{
                    text: '学生端浏览记录'
                },
                tooltip:{},
                xAxis:{
                    data:["查看成绩","学生选课","查看课表","修改个人档案"]
                },
                yAxis:{},
                series:[]
            }
        }
    },
    methods:{
        handleSizeChange(val){
            this.pageSize = val
            this.getData()
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getData()
        },
        getData(){
            if(this.account == ''){
                alert("请输入正确的账号！")
                return
            }
            console.log(this.pageSize)
            console.log(this.currentPage)
            this.$axios.get('/manager/showAction', 
            {params:{'page':this.currentPage, 'rows':this.pageSize, 'userID':this.account}})
            .then(res => {
                console.log(res)
                if(res.data){
                    this.totalNum = res.data.totals
                    this.traces = res.data.action
                }
            })
            .catch(function(error){
                alert("发生错误，请联系管理员！")
            })
        },
        query(){
            this.getData()
            console.log(this.students)
            console.log(this.teachers)
        },
        getLoginTotal(){
            var actions = ['LOGIN']
            actions = JSON.stringify(actions)
            this.$axios.post('/manager/showActionCount', actions)
            .then(res => {
                if(res.data){
                    this.loginTotal = res.data[0].count
                }
            })
            .catch(function(error){
                console.log("获取登录总数发生错误！")
            })
        },
        getStudentTotal(){
            var actions = ['GET_GRADE','CHOOSE_COURSE','STUDENT_COURSE_TABLE','STUDNET_UPDATE_INFO']
            actions = JSON.stringify(actions)
            this.$axios.post('/manager/showActionCount', actions)
            .then(res => {
                if(res.data){
                    var item = {
                        title:'学生',
                        type:'bar',
                        data:[],
                        itemStyle:{
                            normal:{
                                color:function(){
                                    return '#669999'
                                }
                            }
                        }
                    }
                    var length = res.data.length
                    for(var i = 0; i < length; i++){
                        if(res.data[i].action === 'GET_GRADE'){
                            item.data[0] = res.data[i].count
                        }
                        if(res.data[i].action === 'CHOOSE_COURSE'){
                            item.data[1] = res.data[i].count
                        }
                        if(res.data[i].action == 'STUDENT_COURSE_TABLE'){
                            item.data[2] = res.data[i].count
                        }
                        if(res.data[i].action == 'STUDNET_UPDATE_INFO'){
                            item.data[3] = res.data[i].count
                        }
                    }
                    this.students.series.push(item)
                    this.init()
                    console.log(this.students.series[0].data)
                }
            })
            .catch(function(error){
                console.log("获取学生浏览数据发生错误")
            })
        },
        getTeacherTotal(){
            var actions = ['TEACHER_RECORD_GRADE','TEACHER_COURSE_TABLE','TEACHER_UPDATE_INFO']
            actions = JSON.stringify(actions)
            this.$axios.post('/manager/showActionCount',actions)
            .then(res => {
                if(res.data){
                    var length = res.data.length
                    for(var i = 0; i < length; i++){
                        if(res.data[i].action == 'TEACHER_RECORD_GRADE'){
                            this.teachers.series[0].data[0] = res.data[i].count
                        }
                        if(res.data[i].action == 'TEACHER_COURSE_TABLE'){
                            this.teachers.series[0].data[1] = res.data[i].count
                        }
                        if(res.data[i].action == 'TEACHER_UPDATE_INFO'){
                            this.teachers.series[0].data[2] = res.data[i].count
                        }
                    }
                    this.init()
                }
            })
            .catch(function(error){
                console.log("获取教师浏览数据发生错误")
            })

        },
        init(){
            let  studentEchart = echarts.init(document.getElementById('student'));
            let  teacherEchart = echarts.init(document.getElementById('teacher'));
            studentEchart.setOption(this.students);
            teacherEchart.setOption(this.teachers)
        }
    },
    
    mounted(){
        this.init()
    },
    created(){
        this.getLoginTotal()
        this.getStudentTotal()
        this.getTeacherTotal()
    }
}
</script>

<style scoped>
.query{
    margin-left: 20px;
}
.input-user{
    width: 200px;
}
#student{
    width: 500px;
    height: 400px;
    margin-top: 30px;
    float: left;
}
#teacher{
    width: 500px;
    height: 400px;
    margin-top: 30px;
    float: left;
}

.clear{
    clear: both;
}

.clearfix{
    *zoom: 1;
}
.clearfix:after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
</style>