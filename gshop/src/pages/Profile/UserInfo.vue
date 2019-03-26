<template>
    <div class="userInfo">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="邮箱">
                <el-input v-model="form.email" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.radio">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="中文名">
                <el-input v-model="form.chinaName"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.detailAddress"></el-input>
            </el-form-item>
            <el-form-item label="自我描述">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {reqSaveProfile, formEcho} from '../../api'
export default {
  data () {
    return {
      form: {
        userName: '',
        radio: '1',
        chinaName: '',
        detailAddress: '',
        description: '',
        email: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      let result
      let resultData
      // 验证前台表单
      if (!this.form.userName) {
        this.$message.error('昵称不能为空')
        return false
      } else {
        if (!this.checkUserName) {
          this.$message.error('昵称只能是字符加数字')
          return false
        } else {
          if (!this.form.chinaName) {
            this.$message.error('中文名不能为空')
            return false
          } else {
            if (!this.checkChinaName) {
              this.$message.error('中文名只能为中文')
              return false
            } else {
              if (!this.form.detailAddress) {
                this.$message.error('详细地址不能为空')
              } else {
                if (!this.form.description) {
                  this.$message.error('自我描述不能为空')
                  return false
                } else {
                  // 表单已验证发送ajax请求，其中profile是profile表中的_id字段
                  resultData = reqSaveProfile(this.form.userName, this.form.radio, this.form.chinaName, this.form.detailAddress, this.form.description, this.userInfo._id)
                  console.log(this.userInfo._id)
                  await resultData.then(response => {
                    result = response.data
                  })
                  // 数据处理
                  if (result.status === 200) {
                    // 修改表单数据
                    this.form.userName = result.data.userName
                    this.form.radio = result.data.gender
                    this.form.chinaName = result.data.chinaName
                    this.form.description = result.data.description
                    this.form.detailAddress = result.data.detailAddress
                    this.$message.success('保存成功！')
                    this.reload()
                  }
                }
              }
            }
          }
        }
      }
    },
    // ajax表单回显
    async formEcho () {
      let result
      let resuleData
      resuleData = formEcho(this.userInfo._id)
      await resuleData.then(response => {
        result = response.data
      })
      if (result.status === 200) {
        const profile = result.data
        // 更新表单的值
        this.form.email = this.userInfo.useremail
        this.form.userName = profile.userName
        this.form.radio = profile.gender.toString()
        this.form.chinaName = profile.chinaName
        this.form.description = profile.description
        this.form.detailAddress = profile.detailAddress
      }
    }
  },
  // 生命周期钩子函数
  created: function () {
    // 表单数据的回显
    this.formEcho()
  },
  computed: {
    checkUserName () {
      return /^[0-9A-Za-z]*$/.test(this.form.userName)
    },
    checkChinaName () {
      return /^[\u4e00-\u9fa5]+$/g.test(this.form.chinaName)
    },
    // 获取用户的状态
    ...mapState(['userInfo'])
  },
  inject: ['reload']
}
</script>

<style scoped>
    .userInfo{
        text-align: left;
    }
</style>
