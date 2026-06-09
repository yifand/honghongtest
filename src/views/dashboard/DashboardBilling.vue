<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_billing_title') }}</h1>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <el-input placeholder="请输入账号 / 设备ID" v-model="searchForm.account" clearable size="small" class="filter-input">
        </el-input>
        <div class="picker__group">
          <span>时间范围</span>
          <el-date-picker v-model="searchForm.dateTimerRange" type="datetimerange" :picker-options="pickerOptions"
            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"
            align="right" popper-class="sidebar-right" size="small">
          </el-date-picker>
        </div>
        <el-button class="btn-search" size="small" icon="el-icon-search" @click="getPilotInfo">查询</el-button>
        <el-button class="btn-reset" size="small" @click="clearForm">重置</el-button>
      </div>
    </el-card>

    <el-card class="glass table-card">
      <div class="table-title">服务账号基本信息</div>
      <el-table v-loading="accountInfoLoading" :data="accountInfo" stripe fit size="small" class="dark-table"
        style="width: 100%" :cell-style="{ 'user-select': 'text' }">
        <el-table-column label="账号类型" prop="accountType" show-overflow-tooltip min-width="120">
        </el-table-column>
        <el-table-column label="账号名称" prop="account" show-overflow-tooltip min-width="120">
        </el-table-column>
        <el-table-column label="设备ID" prop="deviceId" show-overflow-tooltip min-width="80">
        </el-table-column>
        <el-table-column label="当前状态" prop="status" show-overflow-tooltip min-width="80">
          <template slot-scope="scope">
            <span :class="{
              'text-red':
                scope.row.status === '未激活' ||
                scope.row.status === '已到期',
            }" v-text="scope.row.status"></span>
          </template>
        </el-table-column>
        <el-table-column label="信控状态" prop="creditStatus" show-overflow-tooltip min-width="80">
        </el-table-column>
        <el-table-column label="过期时间" prop="expireTime" show-overflow-tooltip min-width="140">
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="glass table-card">
      <div class="table-title">最新信息</div>
      <el-table v-loading="latestInfoLoading" :data="latestInfo" stripe fit size="small" class="dark-table"
        style="width: 100%" :cell-style="{ 'user-select': 'text' }">
        <el-table-column label="当前状态" prop="status" show-overflow-tooltip min-width="120">
          <template slot-scope="scope">{{
            scope.row.status | transText(pilotStatusEnum)
            }}</template>
        </el-table-column>
        <el-table-column label="最近登录时间" prop="loginTime" show-overflow-tooltip min-width="140">
        </el-table-column>
        <el-table-column label="最近登出时间" prop="logoutTime" show-overflow-tooltip min-width="140">
        </el-table-column>
        <el-table-column label="接入方式" prop="switchType" show-overflow-tooltip min-width="80">
        </el-table-column>
        <el-table-column label="最近挂载点" prop="sourceNode" show-overflow-tooltip min-width="120">
        </el-table-column>
        <el-table-column label="最近GGA时间" prop="ggaTime" show-overflow-tooltip min-width="140">
        </el-table-column>
        <el-table-column label="最近播发时间" prop="broadcastTime" show-overflow-tooltip min-width="140">
        </el-table-column>
        <el-table-column label="GGA状态" prop="locateStatus" show-overflow-tooltip min-width="80">
          <template slot-scope="scope">{{
            scope.row.locateStatus | transText(pilotLocateStatusEnum)
            }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="glass table-card">
      <div class="table-title">使用情况</div>
      <div class="user-charts" v-loading="logStatisticsLoading">
        <div class="user-lines" ref="userLines"></div>
        <div class="user-bars" ref="userBars"></div>
      </div>
    </el-card>

    <el-card class="glass table-card">
      <div class="table-title">异常信息</div>
      <el-table v-loading="abnormalInfoLoading" :data="abnormalInfo" stripe fit size="small" class="dark-table"
        style="width: 100%" :cell-style="{ 'user-select': 'text' }">
        <el-table-column label="序号" min-width="120">
          <template slot-scope="scope">
            {{
              scope.$index +
              1 +
              abnormalInfoPageinationPagesize * (abnormalInfoCurrentPage - 1)
            }}
          </template>
        </el-table-column>
        <el-table-column label="发生时间" prop="time" show-overflow-tooltip min-width="140">
        </el-table-column>
        <el-table-column label="客户端IP和端口" prop="ipPort" show-overflow-tooltip min-width="140">
        </el-table-column>
        <el-table-column label="挂载点" prop="mountPoint" show-overflow-tooltip min-width="100">
        </el-table-column>
        <el-table-column label="报错内容" prop="errorDesc" show-overflow-tooltip min-width="160">
        </el-table-column>
        <el-table-column label="报错日志" prop="errorLog" show-overflow-tooltip min-width="200">
        </el-table-column>
      </el-table>
    </el-card>

    <!-- <el-card class="glass table-card"> -->
    <!-- <div class="table-title">覆盖范围查询</div>
      <div class="coverage-search filter-row">
        <div class="picker__group">
          <span>经度</span>
          <el-input placeholder="例: 121.420366" v-model="coverageForm.lon" clearable size="small"></el-input>
        </div>
        <div class="picker__group">
          <span>纬度</span>
          <el-input placeholder="例: 30.945919" v-model="coverageForm.lat" clearable size="small"></el-input>
        </div>
        <el-button class="btn-search" size="small" icon="el-icon-search">查询</el-button>
        <el-button class="btn-reset" size="small" @click="clearCoverageForm">重置</el-button>
      </div> -->
    <!-- <div class="coverage-result" v-loading="serviceAreaLoading">
        <span class="default-txt" v-if="coverageResult === ''">点击查询，显示查询结果</span>
        <span class="result-txt success" v-else-if="coverageResult"><i
            class="iconfont el-icon-corsmaint-xiaolian"></i>该地区已全覆盖</span>
        <span class="result-txt failed" v-else><i class="iconfont el-icon-corsmaint-xiaolianhaoping"></i>该地区尚未覆盖</span>
      </div> -->
    <!-- </el-card> -->

    <el-card class="glass table-card">
      <div class="table-title">登录信息查询</div>
      <el-table v-loading="accountCoordInfoLoading" :data="accountCoordInfo" stripe fit size="small" class="dark-table"
        style="width: 100%" :cell-style="{ 'user-select': 'text' }">
        <el-table-column label="序号" min-width="120">
          <template slot-scope="scope">
            {{
              scope.$index +
              1 +
              accountCoordInfoPageinationPagesize *
              (accountCoordInfoCurrentPage - 1)
            }}
          </template>
        </el-table-column>
        <el-table-column label="登录时间" prop="loginTime" show-overflow-tooltip min-width="160">
        </el-table-column>
        <el-table-column label="坐标系" prop="coor" show-overflow-tooltip min-width="100">
        </el-table-column>
        <el-table-column label="挂载点" prop="mountPoint" show-overflow-tooltip min-width="120">
        </el-table-column>
        <el-table-column label="服务端IP和端口" prop="hostPort" show-overflow-tooltip min-width="160">
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="glass table-card">
      <div class="table-title">用户信息查询</div>
      <el-table v-loading="historyInfoLoading" :data="historyInfo" stripe fit size="small" class="dark-table"
        style="width: 100%" :cell-style="{ 'user-select': 'text' }">
        <el-table-column label="序号" min-width="100">
          <template slot-scope="scope">
            {{
              scope.$index +
              1 +
              historyInfoPageinationPagesize * (historyInfoCurrentPage - 1)
            }}
          </template>
        </el-table-column>
        <el-table-column label="发生时间" prop="time" show-overflow-tooltip min-width="160">
        </el-table-column>
        <el-table-column label="经度" prop="lon" show-overflow-tooltip min-width="110">
        </el-table-column>
        <el-table-column label="纬度" prop="lat" show-overflow-tooltip min-width="100">
        </el-table-column>
        <el-table-column label="省份" prop="country" show-overflow-tooltip min-width="80">
        </el-table-column>
        <el-table-column label="GGA" prop="gga" show-overflow-tooltip min-width="400">
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <el-button class="btn-reset" size="small" @click="changeHisPrevious"
          :disabled="historyInfoCurrentPage <= 1">上一页</el-button>
        <el-button class="btn-reset" size="small" @click="changeHisNext">下一页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  PILOTSTATUSENUM,
  PILOTLOCATESTATUSENUM,
  PAGINATION_PAGESIZES,
  PAGINATION_DEFAULT_PAGESIZE,
  EXPIRED_TOKEN,
  RES_SUCCESS
} from '@/common/js/const'

import {
  downloadGGA,
  downloadRTCM,
  downloadAbnormalInfo,
  downloadAccountCoordInfo,
  downloadHistoryInfo,
  getPilotSearch,
  getPilotGGA
} from '@/common/js/api'

import { debounce } from '@/common/js/utils'
export default {
  name: 'DashboardBilling',
  data() {
    return {
      searchForm: {
        account: '',
        dateTimerRange: [
          this.$root.$options.filters.timeFormat(new Date(), 'YMD++'),
          this.$root.$options.filters.timeFormat(new Date(), 'YMDHMS')
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近30分钟',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 0.5)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近1小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近4小时',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 4)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '今天',
            onClick: (picker) => {
              const end = new Date()
              const start = new Date()
              start.setTime(
                new Date(
                  this.$root.$options.filters.timeFormat(Date.now(), 'YMD++')
                )
              )
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick: (picker) => {
              const end = new Date()
              const start = new Date()
              start.setTime(
                new Date(
                  this.$root.$options.filters.timeFormat(
                    Date.now() - 24 * 60 * 60 * 1000,
                    'YMD++'
                  )
                )
              )
              end.setTime(
                new Date(
                  this.$root.$options.filters.timeFormat(
                    Date.now() - 24 * 60 * 60 * 1000,
                    'YMD---'
                  )
                )
              )
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近五天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 5)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近七天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }],
      },
      isFixedTop: false,
      coverageForm: {
        lat: '',
        lon: ''
      },
      pageinationPagesizes: PAGINATION_PAGESIZES,
      abnormalInfoPageinationPagesize: PAGINATION_DEFAULT_PAGESIZE,
      historyInfoPageinationPagesize: PAGINATION_DEFAULT_PAGESIZE,
      abnormalInfoCurrentPage: 1,
      historyInfoCurrentPage: 1,
      abnormalInfoTotal: 0,
      historyInfoTotal: 0,
      accountInfo: [],
      accountInfoLoading: false,
      latestInfo: [],
      latestInfoLoading: false,
      abnormalInfo: [],
      abnormalInfoLoading: false,
      logStatisticsLoading: false,
      serviceAreaLoading: false,
      historyInfo: [],
      historyInfoLoading: false,
      pilotStatusEnum: PILOTSTATUSENUM,
      pilotLocateStatusEnum: PILOTLOCATESTATUSENUM,
      loginNoutData: [],
      xAxisMin: 0,
      xAxisMax: 0,
      coverageResult: '',
      accountCoordInfoPageinationPagesize: PAGINATION_DEFAULT_PAGESIZE,
      accountCoordInfo: [],
      accountCoordInfoLoading: false,
      accountCoordInfoCurrentPage: 1,
      accountCoordInfoTotal: 0,
      basicName: null
    }
  },
  computed: {
    planTagType() {
      const planMap = {
        'Enterprise': 'success',
        'Professional': 'primary',
        'Basic': 'info'
      }
      return planMap[this.accountInfo.plan] || 'info'
    }
  },
  methods: {
    downloadAbnormalInfo() {
      downloadAbnormalInfo({
        query: this.searchForm.account,
        beginTime:
          this.searchForm.dateTimerRange && this.searchForm.dateTimerRange[0],
        endTime:
          this.searchForm.dateTimerRange && this.searchForm.dateTimerRange[1]
      }).then((res) => {
        // eslint-disable-next-line no-prototype-builtins
        if (res.hasOwnProperty('data')) {
          var blob = new Blob([res.data], {
            type: res.headers['content-type']
          })
          const contentDisposition = res.headers['content-disposition']
          let fileName = '异常信息.xlsx'
          if (contentDisposition) {
            fileName = window.decodeURI(
              res.headers['content-disposition'].split('=')[1]
            )
          }
          if (blob.size > 0) {
            var Temp = document.createElement('a')
            Temp.href = window.URL.createObjectURL(blob)
            Temp.download = fileName
            document.body.appendChild(Temp)
            Temp.click()
            window.URL.revokeObjectURL(Temp.href)
            document.body.removeChild(Temp)
          }
        } else {
          var reader = new FileReader()
          reader.readAsText(
            new Blob([res], {
              type: res.type
            }),
            'utf-8'
          )
          reader.onload = (e) => {
            res = JSON.parse(e.target.result)
            // console.log(res)
            this.$message({
              message: res.message,
              type: 'warning'
            })
            if (res.code === EXPIRED_TOKEN) {
              this.$store.dispatch('logout').then(() => {
                this.$router.push({
                  path: '/login'
                })
              })
            }
          }
        }
      })
    },
    downloadAccountCoordInfo() {
      downloadAccountCoordInfo({
        query: this.searchForm.account,
        beginTime:
          this.searchForm.dateTimerRange && this.searchForm.dateTimerRange[0],
        endTime:
          this.searchForm.dateTimerRange && this.searchForm.dateTimerRange[1]
      }).then((res) => {
        // console.log(res)
        // eslint-disable-next-line no-prototype-builtins
        if (res.hasOwnProperty('data')) {
          var blob = new Blob([res.data], {
            type: res.headers['content-type']
          })
          const contentDisposition = res.headers['content-disposition']
          let fileName = '登录信息.xlsx'
          if (contentDisposition) {
            fileName = window.decodeURI(
              res.headers['content-disposition'].split('=')[1]
            )
          }
          if (blob.size > 0) {
            var Temp = document.createElement('a')
            Temp.href = window.URL.createObjectURL(blob)
            Temp.download = fileName
            document.body.appendChild(Temp)
            Temp.click()
            window.URL.revokeObjectURL(Temp.href)
            document.body.removeChild(Temp)
          }
        } else {
          var reader = new FileReader()
          reader.readAsText(
            new Blob([res], {
              type: res.type
            }),
            'utf-8'
          )
          reader.onload = (e) => {
            res = JSON.parse(e.target.result)
            // console.log(res)
            this.$message({
              message: res.message,
              type: 'warning'
            })
            if (res.code === EXPIRED_TOKEN) {
              this.$store.dispatch('logout').then(() => {
                this.$router.push({
                  path: '/login'
                })
              })
            }
          }
        }
      })
    },
    getPilotInfo() {
      this.resetData()
      this.getDataSearch()
      this.getHistoryInfo(true)
    },
    initLineCharts() {
      const colors = ['#91cc75', '#ee6666', '#5470c6']
      this.lineInstance = this.$echarts.init(this.$refs.userLines)
      this.lineInstance.resize()

      const option = {
        color: colors,
        title: {
          show: true,
          text: '登录: 0次, 登出: 0次, 在线总时长: 0秒, GGA总数: 0个, 无效GGA数: 0个, 固定率: 0%',
          left: 'center',
          textStyle: {
            fontWeight: 'bolder',
            fontSize: 13
          },
          top: 0
        },
        legend: {
          data: ['GGA状态', '有效解算卫星数'],
          top: 25
        },
        tooltip: {
          trigger: 'axis'
        }, grid: {
          show: false,
          top: 80,
          bottom: 35,
          left: 80,
          right: 100
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            }
          },
          right: 10
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: [
          {
            type: 'category',
            name: 'GGA状态\n(取值：0~9)',
            nameTextStyle: {
              fontWeight: 'bold',
              align: 'right',
              color: colors[0]
            }, axisLabel: {
              show: true,
              formatter: function (value) {
                return value === '-1'
                  ? '-1-无效GGA'
                  : value === '0'
                    ? '0-定位无效'
                    : value === '1'
                      ? '1-单点'
                      : value === '2'
                        ? '2-伪距'
                        : value === '3'
                          ? '3-PPS'
                          : value === '4'
                            ? '4-固定'
                            : value === '5'
                              ? '5-浮点'
                              : value === '9'
                                ? '9-未知状态'
                                : ''
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            split: {
              show: true
            },
            data: ['-1', '0', '1', '2', '3', '4', '5', '9']
          },
          {
            type: 'value',
            name: '{b|有效解算卫星数}',
            nameTextStyle: {
              align: 'center',
              rich: {
                b: {
                  fontWeight: 'bold',
                  color: colors[1]
                }
              }
            },
            splitLine: {
              show: false
            },
            offset: 50,
            axisLabel: {
              show: true
            }, axisLine: {
              show: false
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            interval: 5,
            data: [0, 5, 10, 15, 20, 25, 30, 35, 40]
          }
        ],
        series: [
          {
            name: 'GGA状态',
            type: 'line',
            yAxisIndex: 0,
            data: [],
            lineStyle: {
              width: 3
            }
          },
          {
            name: '有效解算卫星数',
            type: 'line',
            yAxisIndex: 1,
            data: [],
            lineStyle: {
              width: 3
            }
          }
        ]
      }
      this.lineInstance.setOption(option)
      this.lineInstance.on('dataZoom', (params) => {
        console.log(params)
        const option = this.barInstance.getOption()
        if (
          this._.hasIn(params.batch[0], 'startValue') &&
          this._.hasIn(params.batch[0], 'endValue')
        ) {
          option.xAxis[0].min = params.batch[0].startValue
          option.xAxis[0].max = params.batch[0].endValue
        } else {
          option.xAxis[0].min = this.xAxisMin
          option.xAxis[0].max = this.xAxisMax
        }
        this.barInstance.setOption(option)
      })

      window.addEventListener(
        'resize',
        debounce(() => {
          this.lineInstance.resize()
        }, 300)
      )
    },
    initBarCharts() {
      this.barInstance = this.$echarts.init(this.$refs.userBars)
      this.barInstance.resize()

      const option = {
        tooltip: {
          formatter: (params) => {
            return (
              '登录时间: ' +
              this.$options.filters.timeFormat(params.value[0], 'YMDHMS') +
              '<br/>登出时间: ' +
              this.$options.filters.timeFormat(params.value[1], 'YMDHMS') +
              '<br/>在线时长: ' +
              params.value[2] +
              '<br/>挂载点: ' +
              params.value[3]
            )
          }
        },
        grid: {
          show: false,
          height: 90,
          bottom: 35,
          left: 80,
          right: 100
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          data: ['登录登出']
        },
        series: [
          {
            type: 'custom',
            renderItem: this.renderItem,
            itemStyle: {
              opacity: 0.8,
              color: '#00AF00'
            },
            encode: {
              x: [1, 2],
              y: 1
            },
            data: this.loginNoutData
          }
        ]
      }
      this.barInstance.setOption(option)

      window.addEventListener(
        'resize',
        debounce(() => {
          this.barInstance.resize()
        }, 300)
      )
    },
    updateLines(list, tData) {
      const option = this.lineInstance.getOption()
      option.xAxis[0].min = this.xAxisMin
      option.xAxis[0].max = this.xAxisMax
      if (this._.isEmpty(list)) {
        option.series[0].data = []
        option.series[1].data = []
      } else {
        const sortedData = [...list].sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        )
        option.series[0].data = this._.map(sortedData, (v) => {
          return [v.time, v.ggaStatus + '']
        })
        option.series[1].data = this._.map(sortedData, (v) => {
          return [v.time, v.effectiveSatellites]
        })
      }
      option.title = {
        text: `登录: ${tData.loginTimes || 0}次, 登出: ${tData.logoutTimes || 0}次, 在线总时长: ${tData.totalOnlineTimes || '0秒'}, GGA总数: ${tData.ggaTimes || 0}个, 无效GGA数: ${tData.negativeTimes || 0}个, 固定率: ${tData.fixedRate ? (tData.fixedRate * 100).toFixed(2) : 0}%`
      }
      this.lineInstance.setOption(option)
    },
    updateBars(data) {
      this.loginNoutData = []
      this._.map(data, (v) => {
        const value = []
        value[0] = v.logInTime
        value[1] = v.logOutTime
        value[2] = v.onlineTime
        value[3] = v.mountPoint
        this.loginNoutData.push(value)
      })

      const option = this.barInstance.getOption()
      option.xAxis[0].min = this.xAxisMin
      option.xAxis[0].max = this.xAxisMax
      option.series[0].data = this.loginNoutData
      this.barInstance.setOption(option)
    },
    renderItem(params, api) {
      var start = api.coord([api.value(0), 0])
      var end = api.coord([api.value(1), 0])
      var height = api.size([0, 1])[1] * 0.6
      var rectShape = this.$echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        }
      )
      return (
        rectShape && {
          type: 'rect',
          transition: ['shape'],
          shape: rectShape,
          style: api.style()
        }
      )
    },
    getDataSearch() {
      getPilotSearch({
        account: this.searchForm.account,
        beginTime:
          this.searchForm.dateTimerRange && this.searchForm.dateTimerRange[0],
        endTime:
          this.searchForm.dateTimerRange && this.searchForm.dateTimerRange[1]
      }).then((res) => {
        console.log({ res })

        if (res.code === RES_SUCCESS) {
          if (
            res.result.basicInfoResp &&
            (!this._.isEmpty(res.result.basicInfoResp.diffAccount) ||
              !this._.isEmpty(res.result.basicInfoResp.accountType) ||
              !this._.isEmpty(res.result.basicInfoResp.deviceId) ||
              !this._.isEmpty(res.result.basicInfoResp.expireTime) ||
              !this._.isEmpty(res.result.basicInfoResp.subOrderId) ||
              !this._.isEmpty(res.result.basicInfoResp.status))
          ) {
            this.accountInfo = [res.result.basicInfoResp]
          } else {
            this.accountInfo = []
          }

          if (
            res.result.latestSessionInfo &&
            (!this._.isEmpty(res.result.latestSessionInfo.sourceNode) ||
              !this._.isEmpty(res.result.latestSessionInfo.loginTime) ||
              !this._.isEmpty(res.result.latestSessionInfo.logoutTime) ||
              !this._.isEmpty(res.result.latestSessionInfo.status) ||
              !this._.isEmpty(res.result.latestSessionInfo.switchType) ||
              !this._.isEmpty(res.result.latestSessionInfo.broadcastTime) ||
              !this._.isEmpty(res.result.latestSessionInfo.ggaTime) ||
              !this._.isEmpty(res.result.latestSessionInfo.locateStatus))
          ) {
            this.latestInfo = [res.result.latestSessionInfo]
          } else {
            this.latestInfo = []
          }
          this.abnormalInfo = res.result.abnormalInfoRespList
          this.accountCoordInfo = res.result.loginInfoList
          this.abnormalInfoTotal = res.result.abnormalInfoRespList.length
          this.accountCoordInfoTotal = res.result.loginInfoList.length
          const sortedData = [...res.result.ggaStateList].sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
          )
          const sortedData2 = [...res.result.loginStatistics].sort((a, b) =>
            new Date(a.logInTime).getTime() - new Date(b.logInTime).getTime()
          )
          const sortedData3 = [...res.result.loginStatistics].sort(
            (a, b) =>
              new Date(a.logInTime).getTime() - new Date(b.logOutTime).getTime()
          )
          if (
            !this._.isEmpty(res.result.ggaStateList) &&
            !this._.isEmpty(res.result.loginStatistics)
          ) {
            this.xAxisMin = this._.min([
              sortedData && new Date(sortedData[0].time).getTime(),
              sortedData2 && new Date(sortedData2[0].logInTime).getTime()
            ])
            const outTime =
              sortedData3 &&
              new Date(
                sortedData3[sortedData3.length - 1].logOutTime
              ).getTime()
            const time =
              sortedData &&
              new Date(sortedData[sortedData.length - 1].time).getTime()
            this.xAxisMax = this._.max([time, outTime])
          }
          this.updateLines(res.result.ggaStateList, res.result.stateStatistics)
          this.updateBars(res.result.loginStatistics)
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    changeHisPrevious() {
      this.historyInfoCurrentPage -= 1
      this.getHistoryInfo()
    },
    changeHisNext() {
      this.historyInfoCurrentPage += 1
      this.getHistoryInfo()
    },
    getHistoryInfo(reset = false) {
      this.historyInfoLoading = true
      if (reset) this.historyInfoCurrentPage = 1
      getPilotGGA({
        account: this.searchForm.account,
        beginTime:
          this.searchForm.dateTimerRange && this.searchForm.dateTimerRange[0],
        endTime:
          this.searchForm.dateTimerRange && this.searchForm.dateTimerRange[1],
        pageNum: this.historyInfoCurrentPage,
        pageSize: this.historyInfoPageinationPagesize
      })
        .then((res) => {
          if (res.code === RES_SUCCESS) {
            this.historyInfo = res.result
            this.historyInfoTotal = res.total
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
        .finally((_) => {
          this.historyInfoLoading = false
        })
    },
    resetData() {
      this.accountInfo = []
      this.latestInfo = []
      this.abnormalInfo = []
      this.accountCoordInfo = []
      this.historyInfo = []
    },
    clearForm() {
      this.$set(this, 'searchForm', {
        account: '',
        dateTimerRange: []
      })
    },
    clearCoverageForm() {
      this.$set(this, 'coverageForm', {
        lat: '',
        lon: ''
      })
      this.coverageResult = ''
    },
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 0;
}

.tab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.filter-card {
  margin-bottom: 16px;

  ::v-deep .el-card__body {
    padding: 16px;
  }
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.filter-input {
  width: 200px;
}

.table-card {
  margin-bottom: 16px;

  ::v-deep .el-card__body {
    padding: 16px;
  }
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.picker__group {
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 13px;
    color: $text-gray-400;
    white-space: nowrap;
  }

  .el-input {
    width: 200px;
  }
}

.btn-search {
  background: rgba(59, 130, 246, 0.2) !important;
  border: 1px solid rgba(59, 130, 246, 0.3) !important;
  color: #60a5fa !important;

  &:hover {
    background: rgba(59, 130, 246, 0.3) !important;
    color: #93c5fd !important;
  }
}

.btn-reset {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #9ca3af !important;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
  }
}

.user-charts {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .user-lines,
  .user-bars {
    width: 100%;
    height: 300px;
  }
}

.coverage-search {
  margin-bottom: 16px;
}

.coverage-result {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid $border-color;

  .default-txt {
    color: $text-gray-500;
    font-size: 13px;
  }

  .result-txt {
    font-size: 14px;
    font-weight: 500;

    &.success {
      color: $green-400;
    }

    &.failed {
      color: #ef4444;
    }

    i {
      margin-right: 6px;
    }
  }
}

.text-red {
  color: #ef4444;
}

.pagination-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>
