<template>
  <div id="app">
      <router-view v-on:Login="getLoginPage" v-on:Search="getSearchPage" v-bind:getUser="user" v-on:Logout="logout"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      user:null,
    }
  },
  methods:{
    getSearchPage(){
      this.$router.push('/search')
    },
    logout(value){
      this.$router.push('/login');
    },
    getLoginPage(user){
      if(user!=null){
        this.user = user;
        console.log(this.user);
        if(user.role == '3'){
          this.$router.push('/administrator');
        }else if(user.role == '2'){
          this.$router.push('/teacher');
        }else if(user.role == '1'){
          this.$router.push('/student');
        }
      }            
    }
  },
  created(){
    this.$router.push("/login");
  }
}
</script>

