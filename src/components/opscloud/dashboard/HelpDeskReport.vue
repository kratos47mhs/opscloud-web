<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <el-row>
        <span style="float: right">
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button type="text" icon="el-icon-refresh" :disabled="loading" style="margin-left: 5px"
                       @click="handlerRefresh" size="mini" plain></el-button>
          </el-tooltip>
        </span>
      </el-row>
      <div id="helpDeskReportChart" style="width: 100%; height: 300px;"></div>
    </el-card>
  </div>
</template>

<script>

import { queryHelpDeskGroupByWeeks, refreshHelpDeskGroupByWeeks } from '@api/dashboard/dashboard'

let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/map/js/china')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  name: 'HelpDeskReport',
  data () {
    return {
      loading: false
    }
  },
  mixins: [],
  components: {},
  mounted () {
    this.fetchData()
  },
  methods: {
    initChart (data) {
      let myChart = echarts.init(document.getElementById('helpDeskReportChart'))
      // 指定图表的配置项和数据
      let weeks = data.helpDeskGroupByWeeks.map(function (item) {
        return item['weeks']
      })
      let type0 = data.helpDeskGroupByWeeks.map(function (item) {
        return item['type0']
      })
      let type1 = data.helpDeskGroupByWeeks.map(function (item) {
        return item['type1']
      })
      let type2 = data.helpDeskGroupByWeeks.map(function (item) {
        return item['type2']
      })
      let type3 = data.helpDeskGroupByWeeks.map(function (item) {
        return item['type3']
      })
      let type4 = data.helpDeskGroupByWeeks.map(function (item) {
        return item['type4']
      })
      let type5 = data.helpDeskGroupByWeeks.map(function (item) {
        return item['type5']
      })
      let type6 = data.helpDeskGroupByWeeks.map(function (item) {
        return item['type6']
      })
      let type7 = data.helpDeskGroupByWeeks.map(function (item) {
        return item['type7']
      })

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['桌面维护', '资产管理', '网络管理', 'User Management', '邮箱管理', 'IT知识库', '监控管理', '行为管理']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: weeks
        },
        series: [
          {
            name: '桌面维护',
            type: 'bar',
            stack: '总量',
            label: {
              position: 'insideRight'
            },
            data: type0
          },
          {
            name: '资产管理',
            type: 'bar',
            stack: '总量',
            label: {
              position: 'insideRight'
            },
            data: type1
          },
          {
            name: '网络管理',
            type: 'bar',
            stack: '总量',
            label: {
              position: 'insideRight'
            },
            data: type2
          },
          {
            name: 'User Management',
            type: 'bar',
            stack: '总量',
            label: {
              position: 'insideRight'
            },
            data: type3
          },
          {
            name: '邮箱管理',
            type: 'bar',
            stack: '总量',
            label: {
              position: 'insideRight'
            },
            data: type4
          },
          {
            name: 'IT知识库',
            type: 'bar',
            stack: '总量',
            label: {
              position: 'insideRight'
            },
            data: type5
          },
          {
            name: '监控管理',
            type: 'bar',
            stack: '总量',
            label: {
              position: 'insideRight'
            },
            data: type6
          },
          {
            name: '行为管理',
            type: 'bar',
            stack: '总量',
            label: {
              position: 'insideRight'
            },
            data: type7
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true)
    },
    fetchData () {
      queryHelpDeskGroupByWeeks()
        .then(res => {
          this.initChart(res.body)
        })
    },
    handlerRefresh () {
      this.loading = true
      refreshHelpDeskGroupByWeeks()
        .then(res => {
          this.initChart(res.body)
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
