<template>
    <div class="course-bck">
        <p>发 布 选 课</p>
        <div class="course-line color_green"></div>
        <input type="button" value="添加" class="add color_green">

        <div class="separateLine color_green">添加结果</div>
        
        <form action="#" class="addForm">
            <table border="0">
                <tr>
                    <td> 课程代码</td>
                    <td> 课程名 </td>
                    <td> 授课教师 </td>
                    <td> 学分 </td>
                    <td> 授课校区 </td>
                    <td> 选课人数 </td>
                </tr>
            </table>
            <input type="button" name="" id="add_course_submit" value="提交" class="color_green">
        </form>
    </div>
</template>

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
}

.addForm > table{
    margin: 0 auto;
    width: 100%;
    border-left: 2px solid #CCCCCC;
    border-top: 2px solid #CCCCCC;
}

.addForm > table > tr >td{
    text-align: center;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
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