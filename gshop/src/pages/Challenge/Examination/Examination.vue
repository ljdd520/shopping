<template>
    <div class="examination">
        <!-- Table -->
        <el-button type="text" @click="dialogFormVisible = true" class="content"><span class="span">challenge</span></el-button>

        <el-dialog title="LJCTF" :visible.sync="dialogFormVisible">
            <el-container>
                <el-header>
                    curl支持file协议可用于读取本地的敏感文件
                </el-header>
                <el-main style="font-size: 25px">500</el-main>
                <el-header><a href="http://118.24.157.126" class="addressUrl">地址：http://118.24.157.126</a></el-header>
            </el-container>
            <el-form>
                <el-form-item>
                    <el-input v-model="flag" placeholder="FLAG"></el-input>
                    <el-alert
                            :title="title"
                            :type="type"
                            :closable="false"
                            v-if="show"
                            center
                            show-icon>
                    </el-alert>
                    <!--<div style="height:50px;max-width: 100%">-->
                        <!--<el-collapse-transition>-->
                            <!--<div v-show="show">-->
                                <!--<div class="transition-box">{{title}}</div>-->
                            <!--</div>-->
                        <!--</el-collapse-transition>-->
                    <!--</div>-->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" :plain="true" @click="checkFlag">确 定</el-button>
            </div>
        </el-dialog>

        <!-- Form -->
        <el-button type="text" @click="dialogTableVisible = true" class="content"><span class="span">200人solve</span></el-button>

        <el-dialog title="队伍名称" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="邮箱地址"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import {reqCheckFlag} from '../../../api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      // 用户提交的flag
      flag: '',
      // 标签是否显示
      show: false,
      // 提示信息的类型
      type: '',
      // title信息
      title: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      gridData: ''
    }
  },
  computed: {
    ...mapState(['challenge', 'userInfo'])
  },
  methods: {
    async checkFlag () {
      let result, resultData
      // 前台表单验证
      if (!this.flag.trim()) {
        this.type = 'warning'
        this.show = true
        // document.getElementsByClassName('transition-box')[0].style.background = '#e6a23c'
        this.title = '内容不能为空'
        setTimeout(this.clear, 2000)
      } else {
        // 发送ajax请求
        resultData = reqCheckFlag(this.flag, this._id)
        await resultData.then(response => {
          result = response.data
        })
        // 数据处理
        if (result.status === 200) {
          this.type = 'success'
          this.show = true
          this.title = 'success'
          // document.getElementsByClassName('transition-box')[0].style.background = '#ffff00'
          // 积分在后台操作并且添加多表关联
          setTimeout(this.clear, 2000)
        } else {
          this.type = 'error'
          this.show = true
          this.title = 'error'
          setTimeout(this.clear, 2000)
        }
      }
    },
    // 清空提示信息的内容
    clear () {
      this.type = ''
      this.show = false
      this.title = ''
    }
  }
}
</script>

<style scoped>
    .examination{
        text-align: center;
    }
    .examination .content{
        text-align: center;
    }
    .examination .content .span{
        font-size: 25px;
        color: #2c3e50;
    }
    .examination .content .span:hover{
        color: green;
    }
    .examination .addressUrl:hover{
        color: green;
    }
    .transition-box {
        margin-bottom: 10px;
        /*width: 200px;*/
        /*max-width: 100%;*/
        height: 50px;
        border-radius: 4px;
        line-height: 50px;
        /*background-color: #409EFF;*/
        text-align: center;
        /*color: #fff;*/
        color: #721c24;
        /*padding: 40px 20px;*/
        box-sizing: border-box;
        background-color: #f8d7da;
        font-weight: bold;
        font-size: 16px;
    }
</style>
