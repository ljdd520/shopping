<template>
    <div class="middle">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <UserInfo></UserInfo>
            </el-tab-pane>
            <el-tab-pane label="我的比赛" name="second">
                <Match></Match>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="third">
                <Modify></Modify>
            </el-tab-pane>
            <el-tab-pane label="团队信息" name="fourth">团队信息</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import UserInfo from '../Profile/UserInfo'
import Modify from '../Profile/Modify'
import Match from '../Profile/Match'
export default {
  data () {
    return {
      activeName2: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    UserInfo,
    Modify,
    Match
  }
}
</script>

<style lang="scss" scoped>
    .middle{
        display:inline-block;
        /*display: flow;*/
        text-align: center;
        width: 800px;
        height: 500px;
    }
</style>
