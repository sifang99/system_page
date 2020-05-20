<template>
    <div id="notice">
        <p class="no_title">新 建 通 知</p>

        <div class="message">
            
            <label for="date">日期：</label><el-date-picker v-model="message.day"  name="date" class="common" @input="Update($event)"></el-date-picker>
            <label for="role">发送对象:</label>
            <el-select name="role" v-model="message.role_id" @input="Update($event)">
                <el-option :value="1">学生</el-option>
                <el-option :value="2">教师</el-option>
            </el-select>
            <br>
            <label for="title">标题：</label><el-input v-model="message.title" class="notice-title common" type="text" name="title" @input="Update($event)"></el-input><br>
            <label class="mylabel" >内容：</label><br>
            <el-input v-model="message.content" class="notice-content" type="textarea" rows="10" maxlength="200" @input="Update($event)"></el-input>

            <button class="notice-button" @click="submit">发送</button>
            
        </div>
        
    </div>
</template>

<script>
export default {
    name:'addNotice',
    data(){
        return{
            message:{
                day:"",
                role_id:"",
                title:"",
                content:"",
            }

        }
    },
    methods:{
        Update(e){
            this.$forceUpdate();
        },
        submit(){
            if(this.message.day == ""){
                alert("请输入时间！");
                return ;
            }
            if(this.message.role_id == ""){
                alert("请选择发送对象");
                return ;
            }
            if(this.message.title == ""){
                alert("请输入标题");
                return;
            }
            if(this.message.content == ""){
                alert("内容为空！");
                return;
            }

            this.$axios.post("/manager/addNotice",this.message)
            .then(res => {
                console.log(res);
                if(res.data.state){
                    alert("添加成功");
                    this.$router.push('/administrator/notice');
                }else{
                    alert("发送失败！");
                }
            })
            .catch(function(error){
                alert("发生错误！");
            })
            
        }

    },
    created(){
        var time = new Date();

        this.message.day = time.getFullYear() + "-" + 
        (time.getMonth() + 1 < 10 ? "0" + (time.getMonth()+1) : (time.getMonth() + 1)) + "-" + 
        time.getDate();
        this.$forceUpdate();
    }
}
</script>

<style>

.notice-button{
    width: 60px;
    height: 30px;
    border-radius: 7%;
    border-style: none;
    background-color: 	#2E8B57;
    margin-left: 80%;
    margin-top: 30px;
}

#notice{
    width: 90%;
    height: 500px;
    background-color: #F5F5F5;
    margin: 0 auto;
    
}
.no_title{
    background-color: #DCDCDC;
    height: 40px;
    text-align: center;
    padding-top: 10px;
    font-size: 1.5em;
    margin: 0;
}
.message{
    background-color: white;
    width: 85%;
    height: 85%;
    margin: 0 auto;
}
.message > label{
    margin-left: 40px;
}

.message > select{
    height: 30px;
    width: 20%;
    margin-left: 20px;
}

.notice-title{
    width: 50%;
    height: 25px;
}
.notice-date{
    width: 30%;
    height: 25px;
}

.notice-content{
    width: 70%;
    height: 200px;
    margin-left: 108px;
    margin-top: 20px;
}

.mylabel{
    position: relative;
    top: 20px;
}

.common{
    margin-top: 20px;
    margin-left: 20px;
}
</style>