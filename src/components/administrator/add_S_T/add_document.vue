<template>
    <div class="doc-box">
        <router-link to="/administrator/addDocument/student" >
            <input type="button" value="添加学生" class="btn color_green">
        </router-link>
        <router-link to="/administrator/addDocument/teacher" >
            <input type="button" value="添加教师" class="btn color_green">
        </router-link>

        <!-- <div class="line color_green"></div> -->

        <router-view></router-view>
    </div>
</template>

<style>
@import "../../../assets/css/color.css";
.doc-box{
    width: 95%;
    margin: 0 auto;
    border: 2px solid #CCCCCC;
}

.btn{
    margin-top: 20px;
    margin-left: 60px;
    width: 40%;
    height: 30px;
    color: white;
    border-radius: 7%;
    border-style: none;
}

.line{
    width: 90%;
    border: 2px solid #2E8B57;
    margin-top: 10px;
    margin-left: 50px;
}


</style>