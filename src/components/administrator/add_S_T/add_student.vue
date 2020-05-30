<template>
    <div class="addStudent">
        <input type="button" value="添加" class="add-doc-student color_green" @click="add">
        <div class="separateLine color_green">添加结果(学生)</div>
            <el-table class="schedule-table" :data="students" style="width: 100%" >
                <el-table-column type="index" label="序号" width="60" ></el-table-column>
                <el-table-column label="学号" width="135" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sno" ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" width="160" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.sname" ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="性别" width="100" align="center">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.sex" placeholder="" >
                            <el-option value="0" label="女">女</el-option>
                            <el-option value="1" label="男">男</el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="出生日期" width="160" align="center">
                    <template slot-scope="scope">
                        <el-date-picker v-model="scope.row.birth" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column label="政治面貌" width="160" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.pol" ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="毕业学校" width="200" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.gs" ></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <button id="add_student_submit" class="color_green" @click="submit">提交</button>

    </div>
</template>

<script>
import qs from 'qs'
export default {
    name:'addStudent',
    data(){
        return {
            students:[],
        }
    },
    methods:{
        add(){
            if(this.students.length < 10){
                this.students.push({});
            }else{
                alert("请先提交数据！");
            }
           
        },

        submit(){
            //检验输入是否合法
            // if( this.studentInfo.sno.length != 10){
            //     alert("请输入正确的学号！");
            //     return ;
            // }
            // if(this.studentInfo.sname.length == 0){
            //     alert("请输入学生名字！");
            //     return ;
            // }
            // if(this.studentInfo.sex == null){
            //     alert("请选择学生性别！");
            //     return ;
            // }
            // if(this.studentInfo.birth == null){
            //     alert("请输入学生出生日期！");
            //     return ;
            // }
            // if(this.studentInfo.gs.length == 0){
            //     alert("请输入学生毕业学校！");
            //     return ;
            // }
            // if(this.studentInfo.pol.length == 0){
            //     alert("请输入学生政治面貌！");
            //     return ;
            // }
            // if(this.studentInfo.classno.length == 0){
            //     alert("请输入学生班级编号！");
            //     return ;
            // }
            // if(this.studentInfo.dept.length == 0){
            //     alert("请输入学生所在院系！");
            //     return ;
            // }
            // if(this.studentInfo.major.length == 0){
            //     alert("请输入学生所修专业！");
            //     return ;
            // }

            // this.students = qs.stringify(this.students);
            // this.students = JSON.stringify(this.students);
            // console.log(this.students);
            var students = JSON.stringify(this.students);
            // console.log(this.students);
            //发送http请求
            this.$axios.post("/manager/insertStudent",students)
            .then(res => {
                console.log(res);
                if(res.data.state){
                    alert("添加成功！");
                    this.students.splice(0,this.students.length);
                }else{
                    alert("添加失败！");
                }
            }).catch(function (error){
                alert("发生错误!");
            });
        }
    },
    mounted(){
        //设置录入学生出生日期时，可以输入的日期的最大值
        var date = new Date();
        var year = date.getFullYear();
        //js中获取月份时，会比当前月份少1，
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth()+1) : (date.getMonth() + 1);
        var day = date.getUTCDate();
        document.getElementById("birth").setAttribute("max",year + "-" + month + "-" + day);
    }
}
</script>

<style>

@import "../../../assets/css/color.css";

.addStudent > table > tr >td > select{
    border: none;
    width: 100%;
    height: 40px;
}

.first-level{
    width: 5%;
}

.second-level{
    width: 10%;
}

#add_student_submit{
    margin-top: 50px;
    margin-left: 45%;
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}



.addStudent > table{
    margin: 0 auto;
    width: 100%;
    border-left: 2px solid #CCCCCC;
    border-top: 2px solid #CCCCCC;
}

.addStudent> table > tr >td{
    text-align: center;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}

.addStudent > table > tr >td > input{
    border: none;
    height: 30px;
    width: 100%;
}

.addStudent > table > tr >td > select{
    border: none;
    width: 100%;
    height: 30px;
}


.add-doc-student{
    margin-top: 40px;
    margin-left: 80%;
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}

.separateLine{
    color: white;
    margin-top: 30px;
}


</style>



