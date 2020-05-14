<template>
    <div class="addStudent">
        <input type="button" value="添加" class="add color_green" @click="add">
        <div class="separateLine color_green">添加结果(学生)</div>
            <table border="0" id="studentList" name="studentList"> 
                <tr>
                    <td class="first-level"> 序号</td>
                    <td class="second-level"> 学号</td>
                    <td class="second-level"> 姓名 </td>
                    <td class="first-level"> 性别 </td>
                    <td class="second-level"> 出生日期 </td>
                    <td class="second-level"> 政治面貌 </td>
                    <td> 毕业学校 </td>
                    <td> 学院 </td>
                    <td class="second-level"> 专业 </td>
                    <td class="second-level"> 年级 </td> 
                    <td class="first-level"> 班级编号 </td>
                </tr>
                <tr v-for="(item,index) in students" :key="index">
                    <td> {{index+1}} </td>
                    <td> 
                        <input v-model="item.sno"></input>
                    </td>
                    <td> 
                        <input v-model="item.sname"></input>
                    </td>
                    <td>  
                        <select id="" v-model="item.sex">
                            <option value="0" selected>女</option>
                            <option value="1">男</option>
                        </select>
                    </td>
                    <td> 
                        <input v-model="item.birth" id="birth" type="date" min="1990-01-01"></input>
                    </td>
                    <td> 
                        <input v-model="item.pol"></input>
                    </td>
                    <td> 
                        <input v-model="item.gs"></input>
                    </td>
                    <td> 
                        <input v-model="item.dept"></input>
                    </td>
                    <td> 
                        <input v-model="item.major"></input>
                    </td>
                    <td> 
                        <input v-model="item.grade"></input>
                    </td>
                    <td> 
                        <input v-model="item.classno"></input>
                    </td>
                </tr>

            </table>    
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
           this.students.push({});
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
            this.$axios.post("student/insertStudent",students)
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


.add{
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



