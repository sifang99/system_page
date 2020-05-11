<template>
    <div id="login-content">
        <div class="login_background color_darkgray">
            <canvas id="left_circular" class="circular"></canvas>
            <canvas id="right_circular" class="circular"></canvas>
            <div class="login_bck_white color_white">
                <div class="login_box color_white">
                    <p class="login_title color_gray">用户登录</p>
                    <div class="form">
                        <label>账号：</label>
                        <input type="text" v-model="user.account" class="user_id">
                        <br>
                        <label>密码：</label>
                        <input type="password" v-model="user.password" class="user_psd">
                        <br>
                        <input type="checkbox" v-model="remember" class="remember_psd">
                        <label>记住用户</label>
                        <br>
                        <button id="submit" type="button" class="color_green" @click="login">确认</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script >
export default {
    name: 'login_content',
    data() {
        return{
            user:{
                account:"",
                password:"",
                username:"",
                role:'0',
            },
            remember: false,
        }
    },
    methods: {
        login() {
                //登录

                //判断账号是否合法
                const length = this.user.account.length;
                if(length != 6 && length != 8 && length != 10){
                    alert("输入账号错误！");
                    return;
                }

                var i = length;
                var account = this.user.account.toString();
                while(i){
                    if(account[i-1]>'9' || account[i-1] < '0'){
                        alert("输入账号错误！");
                        return;
                    }
                    i--;
                }

                //判断密码是否为空
                if(this.user.password.length == 0){
                    alert("请输入密码！");
                    return;
                }
                
                this.$axios.post("/user/login",this.user).then((response) => {

                    // console.log(response.data);
                    
                    this.$emit("Login",response.data);
                    
                    }).catch(function (error){
                        console.log("TAG","错误");        
                    });
                 
            }
    },

    mounted(){
        //在登录界面绘制两个小圆点
        var l_canvas = document.getElementById("left_circular");
        var l_ctx = l_canvas.getContext("2d");

        var r_canvas = document.getElementById("right_circular");
        var r_ctx = r_canvas.getContext("2d");

        l_canvas.width = 30;
        l_canvas.height = 30;
        l_ctx.beginPath();
        l_ctx.arc(10, 10, 10, 0, Math.PI * 2, true);
        l_ctx.fillStyle = "#2E8B57";
        l_ctx.fill();
        l_ctx.strokeStyle = "#2E8B57";
        l_ctx.stroke();

        r_canvas.width = 30;
        r_canvas.height = 30;
        r_ctx.beginPath();
        r_ctx.arc(10, 10, 10, 0, Math.PI * 2, true);
        r_ctx.fillStyle = "#2E8B57";
        r_ctx.fill();
        r_ctx.strokeStyle = "#2E8B57";
        r_ctx.stroke();
    }
}
</script>

<style>
@import "../../assets/css/login.css";
@import "../../assets/css/color.css";
</style>