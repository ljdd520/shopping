<template>
    <div style="min-height: 600px;padding-top: 30px" ref="myEchart"></div>
</template>
<script>
import Chart from 'echarts'
export default {
  data () {
    return {
      chart: null,
      option: {
        title: {
          x: '150',
          y: 'top',
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',
          borderWidth: 0,
          padding: 5,
          itemGap: 10,
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            // 主标题文字颜色
            color: '#ff6666'
          },
          text: '2019LJCTF前十名得分统计'
        },
        color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'right',
          data: [this.xcd, 'CUF'],
          textStyle: {
            color: '#1e90ff',
            fontsize: 5
          }
        },
        xAxis: {
          axisLabel: {
            // textStyle: {
            //   color: '#FFFFFF'
            // },
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: '#0B438B'
            }
          },
          type: 'category',
          boundaryGap: false,
          data: this.date
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#0B438B'
            }
          },
          axisLabel: {
            // textStyle: {
            //   color: '#FFFFFF'
            // }
          },
          boundaryGap: [0, '50%'],
          type: 'value'
        },
        grid: {
          top: '3%',
          left: '1%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        series: [
          {
            name: 'CUFen',
            type: 'line',
            data: this.data1
          },
          {
            name: 'CUF',
            type: 'line',
            data: this.data2
          }
        ]
      },
      data1: [],
      data2: '',
      now: '',
      oneDay: '',
      value: '',
      hour: '',
      minute: '',
      base: '',
      num: '',
      date: [],
      xcd: 'CUFen'
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      // 时间戳
      const strTime = [2017, 11, 27, 14, 0, 0]
      const d = new Date()
      d.setFullYear(strTime[0])
      d.setMonth(strTime[1])
      d.setDate(strTime[2])
      d.setHours(strTime[3])
      d.setMinutes(strTime[4])
      d.setSeconds(strTime[5])
      this.base = +d
      this.oneDay = 1000
      this.num = 0
      this.data1 = [Math.random()]
      this.data2 = [Math.random()]
      this.now = new Date(this.base)
      for (let i = 1; i <= 6; i++) {
        this.num = this.num + 1
        this.addData()
      }
      this.chart = Chart.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption(this.option)
      setInterval(() => {
        this.addData(true)
        this.chart.setOption({
          xAxis: {
            data: this.date
          },
          series: [
            {
              name: 'CUFen',
              data: this.data1
            },
            {
              name: 'CUF',
              data: this.data2
            }
          ]
        })
      }, 1000)
    },
    addData (shift) {
      const tmp = [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/') + '\n' + [this.now.getHours(), this.now.getMinutes(), this.now.getSeconds()].join(':')
      this.date.push(tmp)
      this.data1.push((Math.random() - 0.4) * 10 + this.data1[this.data1.length - 1])
      this.data2.push((Math.random() - 0.4) * 10 + this.data1[this.data1.length - 1])
      if (shift) {
        this.date.shift()
        this.data1.shift()
        this.data2.shift()
      }
      this.now = new Date(+new Date(this.now) + this.oneDay)
    }
  }
}
</script>

<style scoped>
</style>
