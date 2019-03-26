<template>
    <div class="profile">
        <HeaderTop></HeaderTop>
        <div class="ljctf_icon">
            <span class="titleNames">
                <span class="o_lineIco"></span>
                <span class="o_leftIco"></span>
                <span style="font-size:24px;">个人中心</span>
                <span class="o_rightIco"></span>
                <span class="o_lineIco"></span>
            </span>
        </div>
        <div id="mainId" >
        <div class="avtor">
            <img :src="imageUrl" alt="">
            <el-upload
                    class="avatar-uploader"
                    :action="importFileUrl"
                    :on-preview="handleAvatarPreview"
                    :show-file-list="false"
                    :limit="1"
                    :headers="headers"
                    :data="id"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class="user_info">
            <div class="info_line">
                <Middle></Middle>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
// import service from './filters'
import Storage from '../../util/storage'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import Middle from '../Profile/Middle'
import {mapState} from 'vuex'
import {reqGetHeader} from '../../api'
// import Storage from '../../util/storage'
export default {
  data () {
    return {
      // 请求的后台的地址
      // https://jsonplaceholder.typicode.com/posts/
      importFileUrl: 'http://localhost:4000/users/userUpload',
      // 默认头像地址
      imageUrl: 'https://dragonnahs.github.io/images/me.jpg',
      id: this.$store.state._id,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  },
  computed: {
    // 使用来填写用户信息
    ...mapState(['userInfo'])
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // const BASE_URL = '/api'
      // console.log(file)
      // const form = new FormData()
      // form.append('file', file)
      // form.append('id', this.$store.state._id)
      // let result, reusltData
      // reusltData = this.ajax(BASE_URL + 'users/userUpload', {form}, 'POST')
      // await reusltData.then(response => {
      //   result = response.data
      // })
      // if (result.code === 0) {
      //   this.$message.success('图片上传成功！')
      // }
      return isJPG && isLt2M
    },
    handleAvatarPreview (file) {
      // 获取服务端获取的数据
      const data = file.response
      if (data.code === 0) {
        this.$message.success('图片上传成功！')
        this.imageUrl = data.fileUrl
      }
    },
    async getHeader () {
      let resultData
      let result
      resultData = reqGetHeader(this.userInfo._id)
      await resultData.then(response => {
        result = response.data
      })
      if (result.status === 200) {
        if (this.imageUrl !== null) {
          // 获取头像信息
          this.imageUrl = result.data.userHead
        } else {
          this.imageUrl = 'https://dragonnahs.github.io/images/me.jpg'
        }
      } else {
        this.imageUrl = 'https://dragonnahs.github.io/images/me.jpg'
      }
    },
    ajax (url = '', data = {}, type = 'GET') {
      return new Promise(function (resolve, reject) {
        let promise
        let header = {
          'Auth': Storage.localGet('token'),
          'Content-Type': 'multipart/form-data'
        }
        if (type === 'GET') {
          let dataStr = ''
          Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
          })
          if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.indexOf('&'))
            url = url + '?' + dataStr
          }
          // 发送get请求
          // noinspection JSAnnotator
          promise = axios.get(url, {headers: header})
          // promise = service.get(url)
        } else {
          // 发送post请求
          promise = axios.post(url, data, {headers: header})
          // promise = service.post(url, data)
        }
        promise.then(response => {
          // 成功回调resolve()
          resolve(response)
        })
          .catch(error => {
            // 失败回调
            reject(error)
          })
      })
    }
  },
  components: {
    HeaderTop,
    Middle
  },
  created: function () {
    this.getHeader()
  }
}
</script>
<style lang="scss" scoped>
    #mainId{
        min-height: 90%;
        background-color: #fff;
        padding: 20px;

        .avtor{
            height: 150px;
            display: flex;
            justify-content: center;
            img{
                width: 150px;
                height: 150px;
                border-radius: 50%;
                vertical-align: bottom;
                margin-right: 50px;
            }
            div{
                button{
                    margin-top: 105px;
                }
            }
        }
        .user_info{
            margin-top: 20px;
            .info_line{
                display: flow;
                /*display: flex;*/
                justify-content: space-around;
                .box-card{
                    display: inline-block;
                }
                /*display: inline-block;*/
                text-align: center;
            }
            .text {
                font-size: 14px;
            }

            .item {
                margin-bottom: 18px;
            }

            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }
            .clearfix:after {
                clear: both
            }

            .box-card {
                width: 450px;
            }
        }
    }
</style>
