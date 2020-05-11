<template>
    <div class="changepwd-box">
        <div>设置密码</div>
        <div id="changepwd-wrapper">
          <table id="changepwd-content">
                <tr>
                    <td>旧密码：</td>
                    <td><input type="password" id="oldpwd" v-model="oldpwd"></td>
                </tr>
                <tr>
                    <td>新密码：</td>
                    <td><input type="password" id="newpwd" v-model="newpwd"></td>
                </tr>
                <tr>
                    <td>确认密码：</td>
                    <td><input type="password" id="repwd" v-model="repwd"></td>
                </tr>
            </table>
            <button id="btn-editpwd" @click="checkpwd">确认修改</button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'change-password',
  data () {
    return {
      user:{
        account: this.getUser.account,
        username:this.getUser.username,
        role: this.getUser.role,
        password:"",
      },
      oldpwd: "",
      newpwd: "",
      repwd: "",
    }
  },
  props:[
    'getUser'
  ],
  methods: {
    checkpwd () {
      
      
      // console.log("TAG",this.oldpwd);
      // console.log("TAG",this.newpwd);
      // console.log("TAG",this.repwd);
      this.user.password = this.oldpwd;
      // console.log(this.user);

      //判断新密码是否为空
      if(this.newpwd == ""||this.repwd == ""||this.oldpwd == ""){
        alert("密码不能为空！");
        return;
      }
      //判断新密码是否与旧密码相同
      if (this.newpwd == this.oldpwd) {
        alert("修改的密码与原密码相同！");
        return;
      }
      //判断输入得两次密码是否相同
      if (this.newpwd != this.repwd) {
        alert('两次输入的新密码不一致！');
        return;
      } 

      //通过登录接口，验证原密码是否正确
      this.$axios.post("/user/login",this.user)
      .then(res => {
        console.log(res);

        if(!res.data.state){
          alert("原密码错误！");          
        }
        else{
          this.user.password = this.newpwd;
          this.$axios.post("/user/changePassword",this.user)
          .then(res => {
            console.log(res);
          if(res.data.state){
            alert("修改成功！");
            this.oldpwd="";
            this.newpwd="";
            this.repwd="";
          }else{
            alert("修改失败！");
          }
          })
          .catch(function (error){
            alert("修改失败！");
          });
        }
      }).catch(function (error){
        alert("验证失败！");
        return;
      });

      
    }
  }
}
</script>
<style>

.changepwd-box{
    width:60%;
    margin: 0 auto;
    padding: 0px;
    border-top: 4px solid #2E8B57;
}
#changepwd-wrapper{
    text-align: center;
    vertical-align: middle;
    margin: 0px;
    padding: 0px 30px;
    border:1px solid white;
    background-color: rgb(241, 241, 239);
}
.changepwd-box>div{
    background-color: #CCCCCC;
    margin: 0 auto;
    border:1px solid white;
    vertical-align: middle;
    text-align: center;
    font-size: larger;
    padding: 10px 20px;
    font-weight: bold;
}

#changepwd-content{
    border: 1px solid black;
    position: relative;
    left:15%;
    padding: 20px 40px;
    background-color: white;
    margin:20px 0px;
    border-spacing: 10px;
}

#btn-editpwd{
    background-color: #2E8B57;
    color: white;
    width: 18%;
    height: 40px;
    border-radius: 10%;
    border: 0px;
    margin-bottom: 20px;

}
</style>
