<template>
  <el-form class="login-container" ref="form" :model="form" :rules="rules" >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="form.userName" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100%" @click.native.prevent="login" :loading="logining">登录</el-button>
      <el-button type="text" @click="toRegist">没有账号，注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        form:{
          userName:'',
          password:''
        },
        logining: false,
        rules: {
          userName: [
            { required: true, message: '请输入登录账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      login(){
        let vm = this
        vm.$refs.form.validate((valid) => {
          if (valid) {
            vm.logining = true
            vm.$http.post('/user/login', vm.form).then(response => {
              vm.logining = false
              let resp = response.data
              if(resp.status == 'FAIL'){
                this.$message.error(resp.message)
              }else if(!resp.result.data){
                this.$message.error('用户名或密码错误')
              }else{
                this.$store.commit('login', resp.result.data)
                sessionStorage.setItem('accessToken', resp.result.data)
                vm.$router.push('/hello')
              }
            }).catch(error => {
              this.$message.error('出错了'+error)
            })
          } else {
            return false
          }
        })
      },
      toRegist(){
        this.$router.push('/regist')
      }
    }
  }

</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>