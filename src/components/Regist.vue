<template>
  	<div class="login">
  		<el-card class="box-card">
	  		<div slot="header" class="clearfix">
		    	<span>账户注册</span>
		  	</div>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
			  <el-form-item label="用户名" prop="userName">
			    <el-input v-model="form.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="登录密码" prop="password">
			    <el-input v-model="form.password" type="password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
			    <el-input v-model="form.checkPass" type="password"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" prop="email">
			    <el-input v-model="form.email"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号" prop="phone">
			    <el-input v-model.number="form.phone" :maxlength="phoneLength"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('form')">注册</el-button>
			  </el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
  	let checkPass = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请再次输入密码'))
	    } else if (value !== this.form.password) {
	      callback(new Error('两次输入的密码不一致!'))
	    } else {
	      callback()
	    }
    }
    let checkUser = (rule, value, callback) => {
    	let params = {userName:value}
  		this.$http.post('/user/isExistUser',params).then(response => {
  			if(response.data){
  				callback(new Error('该用户名已被占用！'))
  			}else{
  				callback()
  			}
		}).catch(error => {
			this.$message.error('出错了'+error);
    	})
	}
    return {
        form: {
          userName: '',
          password: '',
          email: '',
          phone: ''
        },
        phoneLength: 11,
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,15}$/, message: '允许中文、字母及数字，长度3到15位', trigger: 'blur'},
            { validator: checkUser, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: checkPass, trigger: 'blur' }
          ],
          email: [
          	{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          	{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          phone: [
          	{ pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号码', trigger: 'blur'}
          ]
        }
    }
  },
  methods: {
  	submitForm(formName){
  		let vm = this
  		vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.$http.post('/user/regist', vm.form).then(response => {
			  vm.$message({
	          	message: '注册成功！',
	          	type: 'success'
	          })
  			}).catch(error => {
  				this.$message.error('出错了'+error);
        	})
          } else {
            return false
          }
        });
  	}

  }
}
</script>

<style scoped>
.box-card {
  width: 480px;
}
.login{
  width:500px;
  margin: 50px auto;
}
</style>
