<template>
    <div class="modify">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPass">
                <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
                <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPass" autocomplete="off">
                <el-input type="password" v-model="ruleForm.confirmPass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {modifyPass} from '../../api'
export default {
  data () {
    const validateOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入原密码！'))
      } else {
        if (value.length < 6 || value.length > 20) {
          return callback(new Error('密码长度为6-20位'))
        } else {
          callback()
        }
      }
    }
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.ruleForm.confirmPass !== '') {
          this.$refs.ruleForm.validateField('confirmPass')
        }
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPass: '',
        newPass: '',
        confirmPass: ''
      },
      rules: {
        oldPass: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        newPass: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        confirmPass: [
          { validator: validateConfirmPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(
        async (valid) => {
          alert('submit!')
          if (valid) {
          // 开始提交表单到后台
          // 数据处理
            let resultData, result
            resultData = modifyPass(this.oldPass, this.newPass, this.confirmPass, this.userInfo._id)
            await resultData.then(response => {
              result = response.data
            })
            if (result.status === 200) {
              this.$message.success('密码更改成功！')
            }
          } else {
            this.$message.error('密码更新失败！')
            return false
          }
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async modify () {
      let resultData, result
      resultData = modifyPass(this.oldPass, this.newPass, this.confirmPass, this.userInfo._id)
      await resultData.then(response => {
        result = response.data
      })
      return result
    }
  },
  computed: {
    // 使用来填写用户信息
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
    .modify{
        text-align: left;
    }
</style>
