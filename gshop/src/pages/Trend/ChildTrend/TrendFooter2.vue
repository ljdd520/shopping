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
            color: '#ff6666'
          },
          text: '2019LJCTF前十名得分统计'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            const date = new Date(params.name)
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.data
        }]
      },
      data: [],
      now: '',
      oneDay: '',
      value: '',
      hour: '',
      minute: ''
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      // 时间格式化
      this.now = +new Date(2017, 11, 27)
      // 小时制
      this.hour = 3600 * 1000
      // 分钟制
      this.minute = 60 * 1000
      // 天制
      this.oneDay = 24 * 3600 * 1000
      // value的值是0-1000
      this.value = Math.random() * 1000
      for (let i = 0; i < 1000; i++) {
        this.data.push(this.randomData())
      }
      this.chart = Chart.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption(this.option)
      setInterval(() => {
        for (let i = 0; i < 5; i++) {
          this.data.shift()
          this.data.push(this.randomData())
        }
        this.chart.setOption({
          series: [{
            data: this.data
          }]
        })
      }, 1000)
    },
    randomData () {
      this.now = new Date(+this.now + this.oneDay)
      this.value = this.value + Math.random() * 21 - 10
      return {
        name: this.now.toString(),
        value: [
          [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
          Math.round(this.value)
        ]
      }
    },
    // 将时间戳转换为日期格式
    timestampToTime (timestamp) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const date = new Date(timestamp * 1000)
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = date.getDate() + ' '
      const h = date.getHours() + ':'
      const m = date.getMinutes() + ':'
      const s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style scoped>
</style>
