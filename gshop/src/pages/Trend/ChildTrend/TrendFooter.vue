<template>
    <div style="min-height: 600px;padding-top: 30px" ref="myEchart"></div>
</template>
<script>
/* eslint-disable standard/object-curly-even-spacing */
import Chart from 'echarts'
export default {
  data () {
    return {
      chart: null,
      option: {
        // axisPointer: {
        //   show: true,
        //   type: 'line',
        //   label: {
        //     show: false
        //   }
        // },
        title: {
          x: '150', // 水平安放位置，默认为左对齐，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: 'top',
          // textAlign: null
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc', // 标题边框颜色
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
          itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            // 主标题文字颜色
            color: '#ff6666'
          },
          text: '2019LJCTF前十名得分统计'
        },
        color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'],
        tooltip: { trigger: 'axis'},
        // 图例--折线提示提示
        legend: {
          x: 'center',
          y: '30',
          borderColor: '#6699FF', // 边框颜色
          textStyle: {
            color: '#1e90ff' // 图例文字颜色
          },
          data: ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8', 'team9', 'team10']
        },
        // 右上角的工具箱
        toolbox: {
          x: '80%',
          y: 'top',
          show: true,
          // feature: {
          //   mark: {show: true},
          //   // 是否可以保存图片
          //   saveAsImage: {show: true},
          //   // dataView : '数据视图',
          //   dataView: {show: true}
          // }
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: {
          // type: 'time',
          // name: '时间',
          // min: '2018-11-27 14:00',
          // max: '2018-11-29 02:00',
          // splitNumber: 6,
          // splitLine: {show: false}
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: [
          {
            type: 'value',
            name: '得分',
            min: '0',
            max: '1000',
            splitNumber: 5,
            axisPointer: {
              show: false
            },
            splitLine: {show: false}
          }
        ],
        series: [
          {
            name: 'team1',
            type: 'line',
            data: [
              0, 132, 301, 134, 900,
              230, 210
            ]
          },
          {
            name: 'team2',
            type: 'line',
            data: [
              0, 82,
              201, 134,
              190, 230,
              110
            ]
          },
          {
            name: 'team3',
            type: 'line',
            data: [
              0, 332, 333, 334, 390,
              330, 320
            ]
          },
          {
            name: 'team4',
            type: 'line',
            data: [
              0, 732, 791, 734,
              890, 930, 820
            ]
          },
          {
            name: 'team5',
            type: 'line',
            data: []
          },
          {
            name: 'team6',
            type: 'line',
            data: []
          },
          {
            name: 'team7',
            type: 'line',
            data: []
          },
          {
            name: 'team8',
            type: 'line',
            data: []
          },
          {
            name: 'team9',
            type: 'line',
            data: []
          },
          {
            name: 'team10',
            type: 'line',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      for (let i = 0; i < this.plan_table.length; i++) {
        this.option.xAxis.data.push(this.plan_table[i].city)
        // 大修金额总计
        this.option.series[0].data.push(this.plan_table[i].d_money)
        // 中修金额
        this.option.series[1].data.push(this.plan_table[i].z_money)
        // 预防性养护金额合计
        this.option.series[2].data.push(this.plan_table[i].y_money)
        // 金额总计
        this.option.series[3].data.push(this.plan_table[i].sum_money)
        // Y轴最大值的设置：向上取整并家500
        this.option.yAxis[0].max = Math.ceil(this.plan_table[0].sum_money) + 500
      }
      this.chart = Chart.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption(this.option)
    }
  },
  beforeDestroy () {
    if (!this.chart) { return }
    this.chart.dispose()
    this.chart = null
  },
  props: ['plan_table']
}
</script>

<style scoped>
</style>
