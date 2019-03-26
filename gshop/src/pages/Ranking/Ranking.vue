<template>
    <div>
        <HeaderTop></HeaderTop>
        <div class="ljctf_icon">
            <span class="titleNames">
                <span class="o_lineIco"></span>
                <span class="o_leftIco"></span>
                <span style="font-size:24px;">总排行榜</span>
                <span class="o_rightIco"></span>
                <span class="o_lineIco"></span>
            </span>
        </div>
        <div class="table">
            <el-table
                    :data="tableData3"
                    header-row-style="height:32px;"
                    :stripe="true"
                    row-style="height:40px"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="排名"
                        width="50">
                </el-table-column>
                <el-table-column prop="name"
                                 width="150"
                                 label="战队名">
                </el-table-column>
                <el-table-column prop="province"
                                 width="60"
                                 align="center"
                                 label="解题数">
                </el-table-column>
                <el-table-column prop="name"
                                 width="60"
                                 align="center"
                                 label="总分">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Web"
                        align="center"
                        width="169">
                    <el-table-column prop="name" label="总得分：44545,解题次数：12" width="169" align="left">
                        <el-table-column prop="name" label="SE." width="42.25">
                        </el-table-column>
                        <el-table-column prop="name" label="SE." width="42.25">
                        </el-table-column>
                        <el-table-column prop="name" label="SE." width="42.25">
                        </el-table-column>
                        <el-table-column prop="name" label="SE." width="42.25">
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Reverse"
                        align="center"
                        width="169">
                    <el-table-column prop="name" label="总得分：" width="169">
                        <el-table-column prop="name" label="SE." width="42.25">
                        </el-table-column>
                        <el-table-column prop="name" label="SE." width="42.25">
                        </el-table-column>
                        <el-table-column prop="name" label="SE." width="42.25">
                        </el-table-column>
                        <el-table-column prop="name" label="SE." width="42.25">
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Pwn"
                        align="center"
                        width="169">
                    <el-table-column prop="name" label="总得分：" width="169">
                        <el-table-column prop="name" label="总得分：" width="169">
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="blockchain"
                        align="center"
                        width="169">
                    <el-table-column prop="name" label="总得分：" width="169">
                        <el-table-column prop="name" label="总得分：" width="169">
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Misc"
                        align="center"
                        width="169">
                    <el-table-column prop="name" label="总得分：" width="169">
                        <el-table-column prop="name" label="总得分：" width="169">
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Crypto"
                        align="center"
                        width="169">
                    <el-table-column prop="name" label="总得分：" width="169">
                        <el-table-column prop="name" label="总得分：" width="169">
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  data () {
    return {
      tableData3: [{
        date: '1',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '4',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '1',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '8',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '6',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '7',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style scoped>
    .table{
        margin: 40px 13px;
    }
    .pagination{
        text-align: center;
        /*line-height: 50px;*/
        margin: 30px auto;
    }
</style>
