<template>
    <div class="info-box"> 
        
        <button class="modification info-btn color_green" @click="Update">修改</button>
        <button class="info-btn color_green" @click="Cancel">取消</button>

        <table border="0">
            <th colspan="2">
               个人资料
            </th>
            <tr>
                <td>
                    职工编号：{{info.mno}}
                </td>
                <td>
                    <label>姓名：</label>
                    <label v-show="!isUpdate">{{info.mname}}</label>
                    <input type="text" v-show="isUpdate" v-model="info.mname">
                </td>
            </tr>
            <tr>
                <td>
                    <label>性别：</label>
                    <label v-show="!isUpdate">{{info.msex}}</label>
                    <select class="man-select-sex" type="text" v-show="isUpdate" v-model="info.msex">
                        <option value="0">女</option>
                        <option value="1">男</option>
                    </select>
                </td>
                <td>
                    <label>工作时间：</label>
                    <label v-show="!isUpdate">{{info.worktime}}</label>
                    <input type="text" v-show="isUpdate" v-model="info.worktime">
                </td>
            </tr>
            <tr>
                <td>
                    <label>政治面貌：</label>
                    <label v-show="!isUpdate">{{info.pol}}</label>
                    <input type="text" v-show="isUpdate" v-model="info.pol">
                </td>
                <td>
                    <label>学历：</label>
                    <label v-show="!isUpdate">{{info.edurecord}}</label>
                    <input type="text" v-show="isUpdate" v-model="info.edurecord">
                </td>
            </tr>
            <tr>
                <td>
                    <label>职称：</label>
                    <label v-show="!isUpdate">{{info.position}}</label>
                    <input type="text" v-show="isUpdate" v-model="info.position">
                </td>
               <td>
                    <label>联系方式：</label>
                    <label v-show="!isUpdate">{{info.tel}}</label>
                    <input type="text" v-show="isUpdate" v-model="info.tel">
                </td>
            </tr>
            
        </table>
         <button v-show="isUpdate" class="submit info-btn color_green" @click="submit">提交</button>
    </div>
</template>

<script>
export default {
    name:'info',
    data(){
        return {
            admin:this.getUser,
            isUpdate:false,
            info:{
                mno:"",
                mname:"",
                msex:"",
                position:"",
                edurecord:"",
                pol:"",
                tel:"",
                worktime:"",
            }
        }
    },
    methods:{
        Update(){
            this.isUpdate = true;
        },
        Cancel(){
            this.isUpdate = false;
        },
        submit(){
            this.$axios.post("/manager/update",this.info)
            .then(res => {
                if(res.data.state){
                    alert("修改成功！");
                    if(this.info.msex == '0'){
                        this.info.msex = '女';
                    }
                    if(this.info.msex == '1'){
                        this.info.msex = '男';
                     }
                     this.isUpdate = true;
                }else{
                    alert("修改失败！");
                }
            })
            .catch(function (error){
                alert("发生错误！");
            })
        }
    },
    props:[
        'getUser'
    ],
    created(){
        this.$axios.get("/manager/findByMno",{params: {mno: this.admin.account}})
        .then(res => {
            if(res != null){
                this.info = res.data;
                if(this.info.msex == '0'){
                    this.info.msex = '女';
                }
                if(this.info.msex == '1'){
                    this.info.msex = '男';
                }
            }else{
                alert("获取信息失败！");
            }
        }).catch(function (error){
            alert("获取个人信息失败！");
            console.log("TAG"+"获取信息失败！");
        });
    }
}
</script>

<style>

.info-btn{
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

.info-box{
    width: 90%;
    margin: 0 auto;
}

.info-box > table{
    margin: 0 auto;
    width: 100%;
    border-left: 2px solid #CCCCCC;
    border-top: 2px solid #CCCCCC;
}

.info-box > table > th{
    /* padding-top: 20px; */
    width: 100%;
    height: 50px;
    text-align: center;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}

.info-box > table > tr{
    height: 50px;
}

.info-box > table > tr > td{
    width: 50%;
    border-right: 2px solid #CCCCCC;
    border-bottom: 2px solid #CCCCCC;
}

.man-select-sex{
    width: 150px;
}

</style>