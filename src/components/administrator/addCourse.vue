<template>
    <div class="course-bck">
        <p>发 布 选 课</p>
        <div class="course-line color_green"></div>


        <input type="button" value="添加" class="add-course color_green" @click="add">

        <div class="separateLine color_green" >添加结果</div>
            <el-table :data="courses" style="width: 100%" >
                <el-table-column type="index" label="序号" width="80" ></el-table-column>
                <el-table-column label="课程代码" width="100" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.cno" @change="query(scope.$index)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="cname" label="课程名" width="200" align="center">
                </el-table-column>
                <el-table-column prop="tname" label="授课教师" width="100"></el-table-column>
                <el-table-column prop="credit" label="学分" width="74"></el-table-column>
                <el-table-column prop="place" label="授课校区" width="180"></el-table-column>
                <el-table-column prop="max" label="选课人数" width="180"></el-table-column>
                
                
            </el-table>
            <input type="button" name="" id="add_course_submit" value="提交" class="color_green" @click="submit">
    </div>
</template>

<script>
export default {
    name:'addCourse',
    data(){
        return{
            courses:[],
            grade:""
        }
    },
    methods:{
        query(index){
            
            this.$axios.get('/optional/findTcByCno',{params:{"cno":this.courses[index].cno}})
            .then(res => {
                console.log(res);
                if(res.data){
                    // console.log(index);
                    // console.log(this.courses[index]);
                    this.courses[index].cname = res.data.cname;
                    this.courses[index].tname = res.data.tname;
                    this.courses[index].credit = res.data.credit;
                    this.courses[index].place = res.data.place;
                    this.courses[index].max = res.data.max;
                    this.courses[index].grade = res.data.grade;
                    this.courses[index].term = res.data.term;
                    this.courses[index].tc_id = res.data.tc_id;
                }
            })
            .catch(function(error){
                alert("发生错误！");
            })
        },
        add(){
            this.courses.push({
                cno:"",
                cname:"",
                tname:"",
                credit:"",
                place:"",
                max:"",
                grade:"",
                term:"",
                tc_id:"",
                number:0,
            })
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

.add-course{
    width: 60px;
    height: 30px;
    color: white;
    margin-top: 30px;
    margin-left: 740px;
    margin-bottom: 20px;
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