<template>
    <div style="min-height: 600px;padding-top: 30px" ref="myEchart"></div>
</template>
<script>
// import Chart from 'echarts'
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    getListIng () {
      // 开始请求后台
      if (this.$route.path === '/trend') {
        let self = this
        // 请求后台获取数据
        // const result = reqGetScore()
        this.timeOut = setTimeout(() => {
          self.getListIng()
        }, 5000)
      } else {
        this.timeOut = ''
      }
    }
  },
  created () {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
    this.getListIng()
  },
  computed: {
    timeOut: {
      set (val) {
        this.$store.state.timeOut.compileTimeout = val
      },
      get () {
        return this.$store.state.timeOut.compileTimeout
      }
    }
  }
}
</script>

<style scoped>
</style>
