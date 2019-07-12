<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="username">
        <span class="svg-container glyphicon glyphicon-user"></span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container glyphicon glyphicon-lock"></span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin">
        Login
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'will',
        password: '123456'
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      display: true,
    }
  },
  mounted(){
    // console.log(this.baseURL)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.loading = true
      this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
        console.log("login-handleLogin");
        console.log(res);
        // localStorage.setItem('Admin-Token',res.data.access_token);
        if(res.status == 0){
          this.$router.push({path:'/'})
        }
      }).catch((error) => {
        console.log('login page error')
        console.log(error)
        console.log(error.response)
        let code = error.status;
      })  
    },
  }
}
</script>