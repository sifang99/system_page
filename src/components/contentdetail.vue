<template>
    <div id="content-box">
        <div id="content-title">
            <h3 id="title">{{message.title}}</h3>
            <el-divider content-position="right" id="date">{{message.day}}</el-divider>
            <!-- <p id="date">2020.5.14</p> -->
        </div>
        <div id="content-wrapper">
            <p id="attention_content">{{message.content}}</p>
        </div>
        <div>
            <button id="btn-return" @click="back">返回</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ContentDetail',
  data () {
    return {
        message:{
            title:this.getDetail.title,
            role:this.getDetail.role,
            day:this.getDetail.day,
            content:this.getDetail.content,
        }, 
    }
  },
  methods: {
      back(){
          console.log(this.message);
            if(this.message.role == 1){
                this.$router.push('/student/attention');
            }else if(this.message.role == 2){
                this.$router.push('/teacher/attention');
            }else if(this.message.role == 3){
                this.$router.push('/administrator/notice');
            }
          
      },
  },

  props: [
      'getDetail'
  ],
  created(){
  }
}
</script>

<style>
#content-box{
    widows: 100%;
    margin: 0 auto;
    text-align-last: center;
}
#content-title{
    padding: 0px 40px;
}
#title{
    font-family: "Helvetica Neue";
    margin: 0 auto;
}
#date{
    color: #a7a7a7;
    font-size: 200%;
     margin: 20px 0px;
}
#attention_content{
    font-family: "Hiragino Sans GB";
    font-size: 120%;
    margin: 0 auto;
    padding: 10px 0px;
}
#btn-return{
    background-color: #2E8B57;
    color: white;
    border: 0;
    width: 10%;
    height: 30px;
    margin: 0 auto;
    border-radius: 10%;
    margin-top: 20px;
}
</style>
