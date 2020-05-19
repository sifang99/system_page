<template>
    <div class="student-info-box">

        <button class="modification stu-btn color_green" @click="Update">修改</button>
        <button class="stu-btn color_green" @click="Cancel">取消</button>

        <table border="0">
            <th colspan="2">
               个人资料
            </th>
            <tr>
                <td>
                    <label>学号：</label>
                    <label >{{studentInfo.sno}}</label>
                </td>
                <td>
                    <label>姓名：</label>
                    <label v-show="!isUpdate">{{studentInfo.sname}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.sname">
                </td>
            </tr>
            <tr>
                <td>
                    <label>性别：</label>
                    <label v-show="!isUpdate">{{studentInfo.sex}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.sex">
  
                </td>
                <td>
                    <label>毕业学校：</label>
                    <label v-show="!isUpdate">{{studentInfo.gs}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.gs">
                </td>
            </tr>
            <tr>
                <td>
                    <label>政治面貌：</label>
                    <label v-show="!isUpdate">{{studentInfo.pol}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.pol">
                </td>
                <td>
                    <label>出生日期：</label>
                    <label v-show="!isUpdate">{{studentInfo.birth}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.birth">
                </td>
            </tr>
            <tr>
                <td>
                    <label>学院：</label>
                    <label v-show="!isUpdate">{{studentInfo.dept}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.dept">
                    
                </td>
                <td>
                    <label>专业：</label>
                    <label v-show="!isUpdate">{{studentInfo.major}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.major">
                    
                </td>
            </tr>
            <tr>
                <td >
                    <label>年级：</label>
                    <label v-show="!isUpdate"> {{studentInfo.grade}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.grade">
                </td>
                <td >
                    <label>班级：</label>
                    <label v-show="!isUpdate"> {{studentInfo.classno}}</label>
                    <input type="text" v-show="isUpdate" v-model="studentInfo.classno">
                </td>
            </tr>
        </table>
        <button v-show="isUpdate" class="submit stu-btn color_green" @click="submit">提交</button>
    </div>
</template>

<script>
export default {
  name: 'stu-info',
  data () {
    return {
        student:{
            sno:this.getUser.account,
            username:this.getUser.username,
            role:this.getUser.role,
        },
        studentInfo: {
            sno: "",
            sname: "",
            sex: null,
            dept: "",
            pol: "",
            major: "",
            birth: "",
            classno: "",
            gs: "",
            grade:"",
        },
        isUpdate:false,
    }
  },
    props:[
        'getUser'
    ],
  created () {
    //   console.log(this.student);
      this.$axios.get("/student/findBySno",{params: {sno: this.student.sno}})
      .then(res => {
          console.log(res);
          this.studentInfo = res.data;
          if(this.studentInfo.sex == 0){
              this.studentInfo.sex = '女';
          }else{
              this.studentInfo.sex = '男';
          }
      })
      .catch(function(error){
          alert("获取信息失败！");
      });
  },
  methods: {
    submit(){
        this.isUpdate = false;
        if(this.studentInfo.sex == "女"){
            this.studentInfo.sex = 0;
        }else{
            this.studentInfo = 1;
        }
        this.$axios.post("/student/update",this.studentInfo)
        .then(res => {
            if(res.data.state){
                alert("修改成功！");
                console.log(this.studentInfo);
                if(this.studentInfo.sex == 0){
                    this.studentInfo.sex = '女';
                }else{
                    this.studentInfo.sex = '男';
                 }
            }else{
                alert("修改失败！");
            }
        })
        .catch(function (error){
            alert("发生错误！");
        });
    },
    Update(){
        this.isUpdate = true;
    },
    Cancel(){
        this.isUpdate = false;
    }
  },

}
</script>

<style>

.stu-btn{
    width: 60px;
    height: 30px;
    border-radius: 7%;
    border-style: none;
}

.modification{
    margin-left: 650px;
    margin-right: 30px;
    margin-bottom: 30px;
}


.submit{
    margin-left: 350px;
    margin-top: 30px;
}

.student-info-box{
    width: 80%;
    margin: 0 auto;
}

.student-info-box > table{
    margin: 0 auto;
    width: 100%;
    border-left: 2px solid #CCCCCC;
    border-top: 2px solid #CCCCCC;
}

.student-info-box > table > th{
    /* padding-top: 20px; */
    width: 100%;
    height: 50px;
    text-align: center;
    vertical-align:middle;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}

.student-info-box > table > tr{
    height: 50px;
}

.student-info-box > table > tr > td{
    width: 50%;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}
.info-wrapper{
    float: left;
}
.info-wrapper>p{
    margin-left: 50px;
}
.btn-edit-wrapper{
    float: right;
    margin-right: 20px;
}
.btn-edit{
    background-color: #2E8B57;
    color: white;
    width: 70px;
    height: 30px;
    border-radius: 10%;
    border: 0px;
}
#updateinfo{
    position: absolute;
    top: 50%;
    left: 30%;
}
</style>
