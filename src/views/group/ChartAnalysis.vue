<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.chart

      .ds-button-group
        .ds-button.text-button(:class="{ selected: type === 0 } " @click="type = 0" ) 团队用户图表
        .ds-button.text-button(:class="{ selected: type === 1 } " @click="type = 1" ) 团队销量图表
        .ds-button.text-button(:class="{ selected: type === 2 } " @click="type = 2" ) 团队盈亏图表
      
      // LineChart.line-chart(style="width: 10rem height: 6rem")
      .filters(style="width: 2rem; position: absolute; right: 2%; top: 1.2rem; line-height: .4rem; z-index: 1")
        .ds-radio-label(:class="{active: timeType === 0 }" @click=" timeType = 0 ")
          .ds-radio.white
          | 最近一周
        .ds-radio-label(:class="{active: timeType === 1 }" @click=" timeType = 1 ")
          .ds-radio.white
          | 最近一月
        .ds-radio-label(:class="{active: timeType === 2 }" @click=" timeType = 2 ")
          .ds-radio.white
          | 最近3月
        .ds-radio-label(:class="{active: timeType === 3 }" @click=" timeType = 3 ")
          .ds-radio.white
          | 最近6月
        .ds-radio-label(:class="{active: timeType === 4 }" @click=" timeType = 4 " style="margin-left: .1rem")
          .ds-radio.white
          | 最近一年
      IEcharts(:option="line" @ready="onReady" @click="onClick" resizable=true style="height: 80%; width: 80%; margin: 0 auto")
      
</template>

<script>
  import IEcharts from 'vue-echarts-v3'
  // import LineChart from 'components/LineChart'
  import api from '../../http/api'
  import { dateFormat } from '../../util/Date'

  export default {
    components: {
      // LineChart,
      IEcharts
    },
    data () {
      return {
        type: 0,
        url: [api.teamStatistic, api.getTeamSale, api.getTeamProfit],
        timeType: 1,
        stEt: [
          [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date().getTime()],
          [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date().getTime()],
          [new Date().getTime() - 3600 * 1000 * 24 * 90, new Date().getTime()],
          [new Date().getTime() - 3600 * 1000 * 24 * 180, new Date().getTime()],
          [new Date().getTime() - 3600 * 1000 * 24 * 364, new Date().getTime()]
        ],
        // loading: true,
        line: {
          // title: {
          //   text: '团队近期图表'
          // },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            left: 'right',
            feature: {
              magicType: {type: ['line', 'bar']},
              // saveAsImage: {show: true},
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              // restore: {},
              saveAsImage: {},
              myToolweek: {
                show: true,
                title: '最近一周',
                icon: '周'
              }
            }
          },
          xAxis: {
            data: []
          },
          // dataZoom: [{
          //   startValue: '2014-06-01'
          // }, {
          //   type: 'inside'
          // }],
          // visualMap: {
          //   top: 50,
          //   right: 0,
          //   pieces: [{
          //     gt: 0,
          //     lte: 50,
          //     color: '#096'
          //   }, {
          //     gt: 50,
          //     lte: 100,
          //     color: '#ffde33'
          //   }, {
          //     gt: 100,
          //     lte: 150,
          //     color: '#ff9933'
          //   }, {
          //     gt: 150,
          //     lte: 200,
          //     color: '#cc0033'
          //   }, {
          //     gt: 200,
          //     lte: 300,
          //     color: '#660099'
          //   }, {
          //     gt: 300,
          //     color: '#7e0023'
          //   }],
          //   outOfRange: {
          //     color: '#999'
          //   }
          // },
          yAxis: {
            splitLine: {
              show: true
            }
          },
          series: []
        }
      }
    },
    computed: {
    },
    watch: {
      type () {
        this.loading = true
        this.CHART.clear()
        this.getData()
      },
      timeType () {
        this.getData()
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      // 7.团队盈亏图表（投注+返点+中奖+结算+中奖率） http://192.168.169.44:9901/cagamesclient/team/teamStatistic.do?method=getTeamProfit&startDay=170226&endDay=170303
      // getTeamProfit: api + 'team/teamStatistic.do?method=getTeamProfit',
      // 10.团队总销量（投注+返奖数据）  http://192.168.169.44:9901/cagamesclient/team/teamStatistic.do?method=getTeamSale&startDay=170226&endDay=170303
      // getTeamSale: api + 'team/teamStatistic.do?method=getTeamSale'
      // 12 团队用户图表（用户数图表：总用户数，活跃用户数，投注用户数）  http://192.168.169.44:9901/cagamesclient/team/teamStatistic.do?method=getTeamUserChart&startDay=170226&endDay=170303
      // teamStatistic: api + 'team/teamStatistic.do?method=getTeamUserChart'
      getData () {
        let loading = this.$loading({
          text: '数据获取中...',
          target: this.$el
        }, 10000, '数据获取失败...')
        this.$http.get(this.url[this.type], {
          startDay: dateFormat(this.stEt[this.timeType][0], 6).replace(/[-]/g, ''),
          endDay: dateFormat(this.stEt[this.timeType][1], 6).replace(/[-]/g, '')
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.line.xAxis = {
              data: data.chartData.map(function (item) {
                item.days += ''
                return item.days.slice(0, 2) + '/' + item.days.slice(2, 4) + '/' + item.days.slice(4, 6)
              })
            }
            if (this.type === 0) {
              this.line.legend = {
                data: ['总人数', '活跃人数', '参与游戏人数']
              }
              this.line.series = [{
                name: '总人数',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.userCount
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                }
                // markLine: {
                //   data: [
                //       {type: 'average', name: '平均值'}
                //   ]
                // }
              }, {
                name: '活跃人数',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.userActivity
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                }
                // markLine: {
                //   data: [
                //       {type: 'average', name: '平均值'}
                //   ]
                // }
              }, {
                name: '参与游戏人数',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.buyUserCount
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                }
                // markLine: {
                //   data: [
                //       {type: 'average', name: '平均值'}
                //   ]
                // }
              }]
            }
            if (this.type === 1) {
              this.line.legend = {
                data: ['投注额', '中奖额']
              }
              this.line.series = [{
                name: '投注额',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.buy
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
                }
              }, {
                name: '中奖额',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.prize
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
                }
              }]
            }
            if (this.type === 2) {
              this.line.legend = {
                data: ['投注额', '中奖额', '中奖率', '返点额', '结算额']
              }
              this.line.series = [{
                name: '投注额',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.buy
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
                }
              }, {
                name: '中奖额',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.prize
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
                }
              }, {
                name: '返点额',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.point
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
                }
              }, {
                name: '结算额',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.profit
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
                }
              }, {
                name: '中奖率',
                type: 'line',
                smooth: true,
                data: data.chartData.map(function (item) {
                  return item.rate
                }),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
                }
              }]
            }
          } else loading.text = '数据获取失败'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 1000)
        })
      },
      onReady (instance) {
        this.CHART = instance
      },
      onClick (event, instance, echarts) {
        console.log(arguments)
      }
    }
  }
</script>


<style lang="stylus" scoped>
  @import '../../var.stylus'
  .chart
    top TH
    text-align center

  .ds-radio-label
    color #999
  .ds-radio-label.active
    color BLUE
</style>