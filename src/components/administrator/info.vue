<template>
    <div class="info-box"> 
        <table border="0">
            <th colspan="2">
               个人资料
            </th>
            <tr>
                <td>
                    职工编号：{{info.mno}}
                </td>
                <td>
                    姓名： {{info.mname}}
                </td>
            </tr>
            <tr>
                <td>
                    性别： {{info.msex}}
                </td>
                <td>
                    工作时间： {{info.worktime}}
                </td>
            </tr>
            <tr>
                <td>
                    政治面貌： {{info.pol}}
                </td>
                <td>
                    学历： {{info.edurecord}}
                </td>
            </tr>
            <tr>
                <td>
                    职称： {{info.position}}
                </td>
               <td>
                    联系方式： {{info.tel}}
                </td>
            </tr>
            
        </table>
    </div>
</template>

<script>
export default {
    name:'info',
    data(){
        return {
            admin:this.getUser,
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

</style>