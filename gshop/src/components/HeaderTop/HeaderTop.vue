<template>
    <div id="top">
        <el-menu
                class="el-menu-demo right"
                :defaultActive="activeIndex"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title" style="height: 100px;width: 80px">
                    <img src="https://dragonnahs.github.io/images/me.jpg" style="width: 80px;height: 50px;border-radius: 50%;">
                    {{userInfo.username==null?'个人中心':userInfo.username}}
                </template>
                <el-menu-item index="1-1">博客</el-menu-item>
                <el-menu-item index="1-2" @click="goto('profile')">信息</el-menu-item>
                <el-menu-item index="1-3" @click="logout">退出</el-menu-item>

            </el-submenu>
            <!--<el-menu-item index="2" disabled>消息中心</el-menu-item>-->
            <el-menu-item index="4"><a href="javascript:" @click="goto('/login')" target="_blank">登陆</a></el-menu-item>
            <el-menu-item index="5"><a href="javascript:" @click="goto('/register')">注册</a></el-menu-item>
            <el-menu-item index="6"><a href="javascript:" target="_blank" @click="goto('/trend')">趋势</a></el-menu-item>
            <el-menu-item index="7"><a href="javascript:" target="_blank" @click="goto('/challenge')">挑战</a></el-menu-item>
            <el-menu-item index="8"><a href="javascript:" @click="goto('/ranking')" target="_blank">排行榜</a></el-menu-item>
            <el-menu-item index="9"><a href="javascript:" target="_blank">公告</a></el-menu-item>
            <el-menu-item index="3"><a href="javascript:" @click="goto('/home')" target="_blank">首页</a></el-menu-item>

            <el-menu-item style="width: 200px;height: 61px;text-align: left;overflow: hidden;float: left" index="11"><img src="https://ctf.bugku.com/themes/core/static/img/bugku.png" style="height: 61px;width: 200px;text-align: left"></el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Storage from '../../util/storage'
import {MessageBox} from 'element-ui'
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    // 使用来填写用户信息
    ...mapState(['userInfo'])
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    goto (path) {
      this.$router.replace(path)
    },
    // 退出登陆
    async logout () {
      MessageBox.confirm('确认退出吗?').then(
        action => {
          // 调用前台的接口
          this.$store.dispatch('logout')
          // 清除token
          Storage.localRemove('token')
          // 跳转到登陆界面
          this.$router.replace('/login')
        },
        action => {
          console.log('取消登陆')
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
    #top{
        width: 100%;
        min-width: 1280px;
        height: 61px;
        ul{
            li{
                float: right;
            }
            height: 61px;
        }
        .el-menu.el-menu--horizontal{
            border: none;
        }
    }
</style>
