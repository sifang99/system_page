<template>
    <div class="addTeacher">

        <!-- <input type="button" value="添加" class="add color_green" @click="add"> -->

        <div class="separateLine color_green">添加结果（教师）</div>

            <table border="0">
                <tr>
                    <td class="first-level"> 序号</td>
                    <td class="second-level"> 编号</td>
                    <td class="second-level"> 姓名 </td>
                    <td class="first-level"> 性别 </td>
                    <td class="first-level"> 工作时间 </td>
                    <td class="second-level"> 政治面貌 </td>
                    <td class="second-level"> 学历 </td>
                    <td class="second-level"> 职称 </td>
                    <td> 系别 </td>
                    <td> 联系电话 </td>
                </tr>
               <tr v-for="(item,index) in teachers" :key="index">
                    <td> {{index+1}} </td>
                    <td> 
                        <input v-model="item.tno"></input>
                    </td>
                    <td> 
                        <input v-model="item.tname"></input>
                    </td>
                    <td>  
                        <select id="" v-model="item.sex">
                            <option value="0" selected>女</option>
                            <option value="1">男</option>
                        </select>
                    </td>
                    <td> 
                        <input v-model="item.worktime" ></input>
                    </td>
                    <td> 
                        <input v-model="item.pol"></input>
                    </td>
                    <td> 
                        <input v-model="item.edurecord"></input>
                    </td>
                    <td> 
                        <input v-model="item.position"></input>
                    </td>
                    <td> 
                        <input v-model="item.dept"></input>
                    </td>
                    <td> 
                        <input v-model="item.tel" type="tel"></input>
                    </td>
                </tr>
            </table>
            <button id="add_teacher_submit" class="color_green" @click="submit">提交</button>
            <!-- <input type="button" name="" id="add_teacher_submit" value="提交" class="color_green"> -->
    </div>
</template>

<script>
import qs from 'qs';
export default {
    name:'addTeacher',
    data(){
        return {
            teachers:[],
        }
    },
    methods:{
        submit(){

            //检验输入是否合法
            // if( this.teacherInfo.tno.length != 8){
            //     alert("请输入正确的教师编号！");
            //     return ;
            // }
            // if(this.teacherInfo.tname.length == 0){
            //     alert("请输入教师名字！");
            //     return ;
            // }
            // if(this.teacherInfo.sex == null){
            //     alert("请输入教师性别！");
            //     return ;
            // }
            // if(this.teacherInfo.worktime.length == 0){
            //     alert("请输入教师工作时间！");
            //     return ;
            // }
            // if(this.teacherInfo.pol.length == 0){
            //     alert("请输入教师政治面貌！");
            //     return ;
            // }
            // if(this.teacherInfo.edurecord.length == 0){
            //     alert("请输入教师学历！");
            //     return ;
            // }
            // if(this.teacherInfo.position.length == 0){
            //     alert("请输入教师工作职位！");
            //     return ;
            // }
            // if(this.teacherInfo.dept.length == 0){
            //     alert("请输入教师工作院系！");
            //     return ;
            // }
            // if(this.teacherInfo.tel.length == 0){
            //     alert("请输入教师电话号码！");
            //     return ;
            // }
            console.log(this.teachers);
            this.teachers = JSON.stringify(this.teachers);
            console.log(this.teachers);
            // //发送http请求
            this.$axios.post("/teacher/insertTeacher",this.teachers)
            .then(res => {
                console.log(res);
                if(res.data.state){
                    alert("添加成功！");
                    // this.teacherInfo.tno = "";
                    // this.teacherInfo.tname = "";
                    // this.teacherInfo.sex = null;
                    // this.teacherInfo.worktime = "";
                    // this.teacherInfo.pol = "";
                    // this.teacherInfo.edurecord = "";
                    // this.teacherInfo.position = "";
                    // this.teacherInfo.dept = "";
                    // this.teacherInfo.tel = "";
                }else{
                    alert("添加失败！");
                }
            })
            .catch(function (error){
                alert("添加失败！");
            })
        }
    },
    created(){

        console.log("TAG"+"created()");
        //初始化数组
        var i = 0;
        for(; i< 2; i++){
            var teacher = {
                tno:"",
                tname:"",
                sex:null,
                worktime:"",
                pol:"",
                edurecord:"",
                position:"",
                dept:"",
                tel:""
            };
            this.teachers[i] = teacher;
        }
    }

}
</script>


<style>
@import "../../../assets/css/color.css";

.first-level{
    width: 5%;
}

.second-level{
    width: 10%;
}

.addTeacher> table{
    margin: 0 auto;
    width: 100%;
    border-left: 2px solid #CCCCCC;
    border-top: 2px solid #CCCCCC;
}

.addTeacher > table > tr >td > input{
    border: none;
    height: 30px;
    width: 100%;
}

.addTeacher > table > tr >td > select{
    border: none;
    width: 100%;
    height: 30px;
}

.addTeacher > table > tr >td{
    text-align: center;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}

#add_teacher_submit{
    margin-top: 50px;
    margin-left: 45%;
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
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


</style>



