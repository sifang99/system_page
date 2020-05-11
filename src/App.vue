<template>
  <div id="app">
    <div v-if="!isLogin">
        <login_header ></login_header>
        <login_content v-on:Login="getLoginPage"></login_content>
    </div>
    <div v-if="isLogin">
        <!-- 绑定getUser属性，使得渲染出来的组件可以使用父组件的user值 -->
        <router-view v-bind:getUser="user" v-on:Logout="logout"></router-view>
    </div> 
  </div>
</template>

<script>
import login_header from './components/login/login_header'
import login_content from './components/login/login_content'


export default {
  name: 'App',
  data(){
    return {
      isLogin: false,
       user:null,
    }
  },
  methods:{
    logout(value){
      this.isLogin = value;
    },
    getLoginPage(user){
      if(user!=null){
        // console.log(user);
        this.user = user;
        this.isLogin = true;
      }

      if(user.role == '3'){
        this.$router.push('/administrator');
      }else if(user.role == '2'){
        this.$router.push('/teacher');
      }else if(user.role == '1'){
        this.$router.push('/student');
      }
                   
    }
  },
  components:{
    login_content,
    login_header,
  }
}
</script>

