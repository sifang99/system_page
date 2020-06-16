<template>
<el-container>
    <el-header class="search-box clearfix">
        <div class="img-wrapper2"></div>
    </el-header>

    <el-tabs v-model="activeName">
        <el-tab-pane class="time-label" label="今天" name="first"></el-tab-pane>
        <el-tab-pane label="昨天" name="second"></el-tab-pane>
        <el-tab-pane :label="titleDay[0]" name="1"></el-tab-pane>
        <el-tab-pane :label="titleDay[1]" name="2"></el-tab-pane>
        <el-tab-pane :label="titleDay[2]" name="3"></el-tab-pane>
        <el-tab-pane :label="titleDay[3]" name="4"></el-tab-pane>
        <el-tab-pane :label="titleDay[4]" name="5"></el-tab-pane>
        <el-tab-pane label="更早" name="more"></el-tab-pane>
    </el-tabs>

    <div class="result-box clearfix">
        <div class="log-search" v-show="isShow">
            <el-date-picker v-model="day"  name="date" class="common" @input="Update($event)"></el-date-picker>
            <el-button  @click="query">搜索</el-button> 
        </div>
        <div class="result-wrapper clearfix">
            <el-card class="result-card">
                <div slot="header" class="clearfix">
                    <span class="result-title">{{title}}</span>
                </div>
                <div class="log-item result-content"  v-for="item in logList" :key="item">

                    <span class="text item result-content">{{item.created_time}}</span>
                    <span class="text item result-content">{{item.id}}</span>
                    <span class="text item result-content">{{item.level_string}}</span><br>
                    <span class="text item result-content">{{item.message}}</span><br>
                    <label >日志名：</label><span class="last-span text item result-content">{{item.logger_name}}</span>
                </div>
            </el-card>
        </div>
    </div>
</el-container>
</template>

<script >
export default {
    name: 'logInfo',
    data(){
        return{
            activeName:"first",
            isShow:false,
            day:"",
            titleDay:[],
            logList:[],
            title:null
        }
    },
    methods:{
        
        Update(){
            this.$forceUpdate()
        },

        getDate(num){
            var day = new Date()
            this.getTitleDay(day.getDay())

            this.title = day.getFullYear() + "-" + 
            (day.getMonth() + 1 < 10 ? "0" + (day.getMonth()+1) : (day.getMonth() + 1)) + "-" + 
            ((day.getDate() - num ) < 10 ? "0" + (day.getDate() - num) : (day.getDate() - num));
        },
        query(){
            if(this.day == ""){
                alert("请选择日期")
                return
            }
            console.log(this.day)
            this.getCurrentDay()
            console.log(this.title)
            this.getData()
        },

        //将用户输入的日期转换格式
        getCurrentDay(){
            this.title = this.day.getFullYear() + "-" + 
            (this.day.getMonth() + 1 < 10 ? "0" + (this.day.getMonth()+1) : (this.day.getMonth() + 1)) + "-" + 
            (this.day.getDate() < 10 ? "0" + this.day.getDate() : this.day.getDate());
            console.log(this.title)
        },

        //获取日志信息
        getData(){
            this.$axios.get("/elasticsearch/log/"+this.title)
            .then(res => {
                if(res.data){
                    this.logList = res.data
                }
            })
            .catch(function(error){
                console.log("获取日志信息发生错误！")
            })
        },

        //动态获取星期
        getTitleDay(val){
            var weeks = ["星期一" , "星期二", "星期三", "星期四", "星期五","星期六", "星期天"]
            var day = val - 2
            for(var i = 0; i < 5; i++){
                if(day <= 0){
                    day = day + 7
                }
                this.titleDay[i] = weeks[day - 1]
                day--
            }
            // console.log(this.titleDay)
        }
    },
    watch:{
        'activeName':function(val){
            this.logList.splice(0, this.logList.length)
            this.isShow = false
            if(val == "first"){
                this.getDate(0)
            }
            if(val == "second"){
                this.getDate(1)
            }
            if(val == "1"){
                this.getDate(2)
            }
            if(val == "2"){
                this.getDate(3)
            }
            if(val == "3"){
                this.getDate(4)
            }
            if(val == "4"){
                this.getDate(5)
            }
            if(val == '5'){
                this.getDate(6)
            }

            if(val == "more"){
                this.isShow = true
                this.title = ""
                return
            }
            this.getData()
        }
    },
    created(){
        this.getDate(0)
        this.getData()
    }
}
</script>

<style scoped>
@import "../../assets/css/search.css";

.time-label{
    margin-left: 20px;
}

.last-span{
    padding-bottom: 20px;
}
.log-search{
    margin-left: 100px;
    margin-top: 20px;
}
.title{
    text-align: center;
    margin-left: 20%;
}
.icon-log{
    margin-left: 25%;
}
.log-item{
    margin-top: 20px;
    border-bottom: 1px solid rgb(230, 230, 230);
}
.clearfix{
    *zoom: 1;
}
.clearfix::after{
    content: ",";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
.pagination{
    position: relative;
    bottom: -5%;
    left: 35%;
  }

</style>