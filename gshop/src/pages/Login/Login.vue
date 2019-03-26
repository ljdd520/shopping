<template>
    <div id="login">
        <HeaderTop></HeaderTop>
        <div class="ljctf_icon">
            <span class="titleNames">
                <span class="o_lineIco"></span>
                <span class="o_leftIco"></span>
                <span style="font-size:24px;">登陆</span>
                <span class="o_rightIco"></span>
                <span class="o_lineIco"></span>
            </span>
        </div>
        <div class="main">
            <el-form class="demo-ruleForm">
                <el-form-item prop="username">
                    <span>用户名或邮箱</span>
                    <el-input  placeholder="" v-model="account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <span style="height: 40px;">密码</span>
                    <el-input type="password" placeholder="" v-model="user_password"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
/* eslint-disable camelcase */

import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {user_login} from '../../api'
import Storage from '../../util/storage'

export default {
  data () {
    return {
      // 用户名或者邮箱
      account: '',
      // 用户密码
      user_password: '',
      // 用户的token
      token: ''
    }
  },
  computed: {
    // 邮箱校检
    emailLogin () {
      return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(this.account)
    },
    // 用户名校检
    nameLogin () {
      return /^[0-9A-Za-z]*$/.test(this.account)
    },
    pwdLength () {
      return (this.user_password.length > 6 && this.user_password.length < 20)
    }
  },
  components: {
    HeaderTop
  },
  inject: ['reload'],
  methods: {
    async login () {
      let result
      let data
      // 前台表单验证
      const {account, user_password} = this
      if (!this.account) {
        this.$message.error('用户名或邮箱不能为空！')
        return
      } else {
        if (!this.user_password) {
          this.$message.error('密码不能为空')
          return
        } else {
          if (!this.pwdLength) {
            this.$message.error('密码必须是6-20位')
            return
          }
        }
      }
      if (this.emailLogin) {
        // 发送ajax邮箱登陆
        result = user_login(account, user_password)
        await result.then(response => {
          data = response.data
        })
        // 数据处理
        if (data.status === 200) {
          // 保存用户信息到storage中
          Storage.localSet('token', data.token)
          // token过期的时间
          Storage.localSet('tokenTime', new Date().getTime())
          const user = data.data
          // 将user保存到vuex
          this.$store.dispatch('recordUser', user)
          if (Storage.localGet('token') !== null) {
            // this.reload()
            // window.location.reload()
            // 去题目界面
            this.$message.success('登陆成功！')
            this.$router.push('/challenge')
          } else {
            // 403页面
            this.$router.push('/dashboard')
          }
        } else {
          // 显示警告信息
          this.$message.error(data.msg)
        }
      } else if (this.nameLogin) {
        // 用户名登陆
      } else {
        this.$message.error('邮箱格式不正确或用户名包含敏感字符！')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    #login{
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
