<template>
    <div class="course-bck">
        <p>发 布 选 课</p>
        <div class="course-line color_green"></div>
        <input type="button" value="添加" class="add color_green" @click="add">

        <div class="separateLine color_green" >添加结果</div>
            <table border="0" class="addForm">
                <tr>
                    <td> 序号</td>
                    <td> 课程代码</td>
                    <td> 课程名 </td>
                    <td> 授课教师 </td>
                    <td> 学分 </td>
                    <td> 授课校区 </td>
                    <td> 选课人数 </td>
                </tr>
                <tr v-for="(item,index) in courses" :key="index">
                    <td> {{index+1}} </td>
                    <td>
                        <input v-model="item.cno"></input>
                    </td>
                    <td> 
                        <input v-model="item.cname"></input>
                    </td>
                    <td>  
                        <input v-model="item.tname"></input>
                    </td>
                    <td> 
                        <input v-model="item.credit"></input>
                    </td>
                    <td> 
                        <input v-model="item.place"></input>
                    </td>
                    <td>  
                        <input v-model="item.max"></input>
                    </td>
                </tr>
            </table>
            <input type="button" name="" id="add_course_submit" value="提交" class="color_green" @click="submit">
    </div>
</template>

<script>
export default {
    name:'addCourse',
    data(){
        return{
            courses:[],
        }
    },
    methods:{
        add(){
            this.courses.push({})
        },
        submit(){
            var i = 0;
            for( ; i < this.courses.length; i++){
                this.courses[i].number = 0;
            }
            var courses = JSON.stringify(this.courses);
            console.log(courses);
            this.$axios.post("/optional/addOptional",courses)
            .then(res => {
                console.log(res);
                if(res.data.state){
                    alert("添加成功！");
                    this.courses.splice(0,this.courses.length);
                }else{
                    alert("添加失败！");
                }
            })
            .catch(function(error){
                alert("发生错误！");
            });
        }
    }
}
</script>

<style>
@import "../../assets/css/color.css";

.separateLine{
    margin-top: 10px;
    width: 100%;
    height: 25px;
    color: white;
}

#add_course_submit{
    margin-top: 50px;
    margin-left: 45%;
    width: 60px;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}

.course-bck > p{
    text-align: center;
    font-size: 1.2em;
}
.course-bck{
    border: 2px solid #CCCCCC;
    width: 90%;
    margin: 0 auto;
}

.addForm{
    margin-top: 20px;
    margin-bottom: 50px;
    margin: 0 auto;
    width: 100%;
    border-left: 2px solid #CCCCCC;
    border-top: 2px solid #CCCCCC;
}

.addForm > tr >td{
    text-align: center;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}

.addForm  > tr >td > input{
    border: none;
    height: 30px;
    width: 100%;
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

.course-line{
    width: 80%;
    border: 2px solid #2E8B57;
    margin-top: 10px;
    margin-left: 10%;
}
</style>