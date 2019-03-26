<template>
    <div>
        <HeaderTop></HeaderTop>
        <div class="ljctf_icon">
            <span class="titleNames">
                <span class="o_lineIco"></span>
                <span class="o_leftIco"></span>
                <span style="font-size:24px;">赛题</span>
                <span class="o_rightIco"></span>
                <span class="o_lineIco"></span>
            </span>
        </div>
        <div class="cart">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="input" stretch>
                <el-tab-pane label="Web" name="first" class="class1">
                    <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>web</span>
                        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                    </div>
                    <div class="text item">
                        {{'HITCON '}}
                    </div>
                    <Examination></Examination>
                </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="Reverse" name="second" class="class1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="Pwn" name="third" class="class1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="blockchain" name="sixth" class="class1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="Misc" name="seventh" class="class1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="Crypto" name="fourth" class="class1">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>web</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div class="text item">
                            {{'HITCON '}}
                        </div>
                        <Examination></Examination>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import Examination from './Examination/Examination'
export default {
  data () {
    return {
      activeName2: 'first'
    }
  },
  components: {
    HeaderTop,
    Examination
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
    .cart{
        position: absolute;
        /*text-align: center;*/
        margin: 50px auto;
        width: 100%;
    }
    .input{
        /*text-align: center;*/
    }
    .input .class1{
        margin-top: 20px;
        width: 100%;
        padding: 0 50px;
        float: left;
    }
    .cart .box-card{
        position: relative;
        /*margin: 0 auto;*/
        /*padding: 0 auto;*/
        display: inline-block;
        text-align: center;
        width: 270px;
        height: 235px;
        /*width: 350px;*/
        /*height: 250px;*/
        margin: 20px 20px;
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
        width: 480px;
    }
</style>
