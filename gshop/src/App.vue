<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  async mounted () {
    this.getUserInfo()
    // 通过this.$store,dispatch方法触发调用Action
    // this.$store.dispatch('getChallenge')
    this.getChallenge()
  },
  methods: {
    ...mapActions(['getUserInfo', 'getChallenge']),
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
}
</style>
