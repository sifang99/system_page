<template>
    <div class="teacher-info-box">

        <button class="modification teacher-info-btn color_green" @click="Update">修改</button>
        <button class="teacher-info-btn color_green" @click="Cancel">取消</button>

        <table border="0">
            <th colspan="2">
               个人资料
            </th>
            <tr>
                <td>
                    <label>职工号：</label>
                    <label>{{teacherInfo.tno}}</label>
                </td>
                <td>
                    <label>姓名：</label>
                    <label v-show="!isUpdate">{{teacherInfo.tname}}</label>
                    <input type="text" v-show="isUpdate" v-model="teacherInfo.tname">
                </td>
            </tr>
            <tr>
                <td>
                    <label>性别：</label>
                    <label v-show="!isUpdate">{{teacherInfo.sex}}</label>
                    <select class="teacher-select-sex" type="text" v-show="isUpdate" v-model="teacherInfo.sex">
                        <option value="0">女</option>
                        <option value="1">男</option>
                    </select>
                </td>
                <td>
                    <label>工作时间：</label>
                    <label v-show="!isUpdate">{{teacherInfo.worktime}}</label>
                    <input type="text" v-show="isUpdate" v-model="teacherInfo.worktime">
                </td>
            </tr>
            <tr>
                <td>
                    <label>政治面貌：</label>
                    <label v-show="!isUpdate">{{teacherInfo.pol}}</label>
                    <input type="text" v-show="isUpdate" v-model="teacherInfo.pol">
                </td>
                <td>
                    <label>学历：</label>
                    <label v-show="!isUpdate">{{teacherInfo.edurecord}}</label>
                    <input type="text" v-show="isUpdate" v-model="teacherInfo.edurecord">
                </td>
            </tr>
            <tr>
                <td>
                    <label>职称：</label>
                    <label v-show="!isUpdate">{{teacherInfo.position}}</label>
                    <input type="text" v-show="isUpdate" v-model="teacherInfo.position">
                </td>
                <td>
                    <label>系别：</label>
                    <label v-show="!isUpdate"> {{teacherInfo.dept}}</label>
                    <input type="text" v-show="isUpdate" v-model="teacherInfo.dept">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <label>联系方式：</label>
                    <label v-show="!isUpdate">{{teacherInfo.tel}}</label>
                    <input type="text" v-show="isUpdate" v-model="teacherInfo.tel">
                </td>
            </tr>
        </table>
        <button v-show="isUpdate" class="isjs-ac-teacherInfo submit teacher-info-btn color_green" @click="submit">提交</button>
    </div>
</template>

<script>
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
  name: 'thr-info',
  data () {
    return {
        teacher:{
            tno: this.getUser.account,
            tname: this.getUser.username,
            role: this.getUser.role,
        },
        teacherInfo: {
            tno: "",
            tname: "",
            sex: null,
            worktime: "",
            pol: "",
            edurecord: "",
            position: "",
            dept: "",
            tel: ""
        },
     isUpdate:false,
    }
  },
    props:[
        'getUser'
    ],

    methods:{
        Update(){
            this.isUpdate = true;
        },
        submit(){
            this.isUpdate = false;
            this.$axios.post("/teacher/update",this.teacherInfo)
            .then(res => {
                if(res.data.state){
                    alert("修改成功！");
                    if(this.teacherInfo.sex == 0){
                        this.teacherInfo.sex = '女';
                    }else{
                        this.teacherInfo.sex = '男';
                    }
                }else{
                    alert("修改失败！");
                }
            })
            .cath(function (error){
                alert("发生错误！");
            })
        },
        Cancel(){
            this.isUpdate = false;
        },
    },
  created () {
      var account = localStorage.getItem('account')
      this.$axios.get("/teacher/findByTno",{params:{tno: account}})
      .then(res => {
          console.log(res);
          this.teacherInfo = res.data;
          if(this.teacherInfo.sex == 0){
              this.teacherInfo.sex = '女';
          }else{
              this.teacherInfo.sex = '男';
          }
      })
      .catch(function(error){
          alert("获取信息失败！");
      });
  },
  
}
</script>

<style scoped>
@import "../../assets/css/color.css";
.teacher-info-btn{
    width: 60px;
    height: 30px;
    border-radius: 7%;
    border-style: none;
}

.teacher-select-sex{
    width: 150px;
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

.teacher-info-box{
    width: 80%;
    margin: 0 auto;
}

.teacher-info-box > table{
    margin: 0 auto;
    width: 100%;
    border-left: 2px solid #CCCCCC;
    border-top: 2px solid #CCCCCC;
}

.teacher-info-box > table > th{
    /* padding-top: 20px; */
    width: 100%;
    height: 50px;
    text-align: center;
    vertical-align:middle;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}

.teacher-info-box > table > tr{
    height: 50px;
}

.teacher-info-box > table > tr > td{
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
