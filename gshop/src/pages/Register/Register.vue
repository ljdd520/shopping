<template>
    <div id="register">
        <HeaderTop></HeaderTop>
        <div class="ljctf_icon">
            <span class="titleNames">
                <span class="o_lineIco"></span>
                <span class="o_leftIco"></span>
                <span style="font-size:24px;">注册</span>
                <span class="o_rightIco"></span>
                <span class="o_lineIco"></span>
            </span>
        </div>
        <div class="main">
            <el-form class="demo-ruleForm">
                <el-form-item prop="username">
                    <span>Team Name</span>
                    <el-input  placeholder="" v-model="user_name"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <span>Email</span>
                    <el-input type="text" placeholder="" v-model="user_email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <span>Password</span>
                    <el-input type="password" placeholder="" v-model="user_password"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="registerForm">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
/* eslint-disable camelcase */
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {user_regist} from '../../api'
export default {
  data () {
    return {
      // 邮箱
      user_email: '',
      // 队伍名
      user_name: '',
      // 用户密码
      user_password: ''
    }
  },
  computed: {
    rightEmail () {
      // 利用正则对邮箱进行匹配,返回布尔值
      return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(this.user_email)
    },
    rightPwd () {
      return (this.user_password.length > 6) && (this.user_password.length < 20)
    }
  },
  methods: {
    async registerForm () {
      // 前台表达验证
      let result
      let data
      const {user_name, user_email, user_password} = this
      if (!this.user_name) {
        this.$message.error('队伍名不能为空')
        return
      } else if (this.user_name === 'liangjie') {
        // 此处要查询数据库
        this.$message.error('队伍名已存在')
        return
      } else {
        if (!this.rightEmail) {
          this.$message.error('邮箱格式不正确')
          return
        } else {
          if (!this.user_password) {
            this.$message.error('密码不能为空')
            return
          }
          if (!this.rightPwd) {
            this.$message.error('密码长度必须是6-20位')
            return
          }
        }
      }
      // 邮箱验证登陆
      result = user_regist(user_name, user_email, user_password)
      await result.then(response => {
        console.log(response)
        data = response.data
        console.log(data)
      })
      console.log(data)
      // 数据结果处理
      if (data.status === 200) {
        this.$message.success('队伍注册成功')
        // 跳转到登陆界面
        this.$router.replace('/login')
      } else {
        this.$message.error(result.msg)
      }
    }
  },
  components: {
    HeaderTop
  }
}
</script>
<style lang="scss" scoped>
    #register{
        width: 100%;
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        .main{
            width: 40%;
            color: black;
            margin: 30px auto;
            .demo-ruleForm{
                .login-btn{
                    width: 100%;
                    button{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
