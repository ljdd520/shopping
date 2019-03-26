<template>
    <div class="trend">
        <HeaderTop></HeaderTop>
        <TrendMiddle v-bind:message="message"></TrendMiddle>
        <TrendFooter v-bind:plan_table="plan_table"></TrendFooter>
    </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import TrendMiddle from './ChildTrend/TrendMiddle'
import TrendFooter from './ChildTrend/TrendFooter3'
export default {
  name: 'Trend',
  data () {
    return {
      message: '总趋势',
      plan_table: []
    }
  },
  components: {
    HeaderTop,
    TrendMiddle,
    TrendFooter
  }
}
</script>

<style scoped>

</style>
