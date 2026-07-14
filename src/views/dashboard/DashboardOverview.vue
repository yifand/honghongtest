<template>
  <div class="dash-tab">
    <h1 class="page-title">{{ $t('dash_overview_title') }}</h1>
    <div class="stats-row">
      <el-card class="stat-card glass card-hover">
        <div class="stat-header">
          <span class="stat-label">{{ $t('dash_total_users') }}</span>
          <div class="stat-icon icon-blue">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <p class="stat-value text-gradient">{{ overviewData.totalUser }}</p>
      </el-card>
      <el-card class="stat-card glass card-hover">
        <div class="stat-header">
          <span class="stat-label">{{ $t('dash_active_accounts') }}</span>
          <div class="stat-icon icon-green">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="stat-value text-gradient">{{ overviewData.activeAccountNbr }}</p>
      </el-card>
      <el-card class="stat-card glass card-hover">
        <div class="stat-header">
          <span class="stat-label">{{ $t('dash_pending_orders') }}</span>
          <div class="stat-icon icon-orange">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="stat-value text-gradient">{{ overviewData.pendingOrders }}</p>
      </el-card>
      <el-card class="stat-card glass card-hover">
        <div class="stat-header">
          <span class="stat-label">{{ $t('dash_total_partners') }}</span>
          <div class="stat-icon icon-purple">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <p class="stat-value text-gradient">{{ overviewData.partners }}</p>
      </el-card>
    </div>

    <div class="overview-grid">
      <el-card class="glass">
        <h3 class="panel-title">{{ $t('dash_recent_orders') }}</h3>
        <el-table :data="overviewData.recentOrders.slice(0, 10)" size="small" class="dark-table">
          <el-table-column prop="orderNo" :label="$t('order_no_label')" width="250">
            <template slot-scope="scope">
              <span class="text-blue">{{ scope.row.orderNo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" :label="$t('enterprise_name')" width="300" />
          <el-table-column prop="serviceType" :label="$t('service_type')" width="100" />
          <el-table-column prop="status" :label="$t('status')" width="90">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 'pushed' ? 'success' : 'warning'" size="mini">
                {{ scope.row.status === 'pushed' ? $t('pushed') : $t('unpushed') }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card class="glass">
        <h3 class="panel-title">{{ $t('dash_account_status') }}</h3>
        <div class="progress-list">
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">NRTK Ntrip</span>
              <span>{{ overviewData.nrtkNtripNbr }}</span>
            </div>
            <el-progress :percentage="getPercentage(overviewData.nrtkNtripNbr)" color="#3b82f6" :show-text="false" />
          </div>
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">NRTK SDK</span>
              <span>{{ overviewData.nrtkSdkNbr }}</span>
            </div>
            <el-progress :percentage="getPercentage(overviewData.nrtkSdkNbr)" color="#06b6d4" :show-text="false" />
          </div>
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">PPP-RTK Ntrip</span>
              <span>{{ overviewData.ppprtkNtripNbr }}</span>
            </div>
            <el-progress :percentage="getPercentage(overviewData.ppprtkNtripNbr)" color="#22c55e" :show-text="false" />
          </div>
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">PPP-RTK SDK</span>
              <span>{{ overviewData.ppprtkSdkNbr }}</span>
            </div>
            <el-progress :percentage="getPercentage(overviewData.ppprtkSdkNbr)" color="#22c55e" :show-text="false" />
          </div>
        </div>
        <div class="creds-row">
          <span class="progress-label">{{ $t('dash_nrtk_creds') }}</span>
          <span class="creds-value">{{ overviewData.credentials }} / {{ overviewData.credentialsKey }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>

import { dashboard_overview, ntripAccountListByOrderNo } from "@/common/js/api";
import { RES_SUCCESS } from "@/common/js/const";

export default {
  name: 'DashboardOverview',
  data() {
    return {
      overviewData: {
        totalUser: 0,
        activeAccountNbr: 0,
        pendingOrders: 0,
        partners: 0,
        recentOrders: [],
        nrtkNtripNbr: 0,
        nrtkSdkNbr: 0,
        ppprtkNtripNbr: 0,
        ppprtkSdkNbr: 0,
        credentials: "",
        credentialsKey: "",
      }
    }
  },
  computed: {
    totalAccounts() {
      const { nrtkNtripNbr, nrtkSdkNbr, ppprtkNtripNbr, ppprtkSdkNbr } = this.overviewData
      return (nrtkNtripNbr || 0) + (nrtkSdkNbr || 0) + (ppprtkNtripNbr || 0) + (ppprtkSdkNbr || 0)
    }
  },
  methods: {
    getPercentage(value) {
      const val = Number(value) || 0
      if (this.totalAccounts === 0) return 0
      return Math.round((val / this.totalAccounts) * 100)
    }
  },
  mounted() {
    dashboard_overview().then(res => {
      if (res.code === RES_SUCCESS || res.code === 200) {
        this.overviewData = res.result
      } else {
        this.$message.warning(res.message)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  border-radius: 12px;

  ::v-deep .el-card__body {
    padding: 20px;
  }
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 13px;
  color: $text-gray-400;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }

  &.icon-blue {
    background: rgba(59, 130, 246, 0.2);
    color: $blue-500;
  }

  &.icon-green {
    background: rgba(74, 222, 128, 0.2);
    color: $green-400;
  }

  &.icon-orange {
    background: rgba(249, 115, 22, 0.2);
    color: $orange-500;
  }

  &.icon-purple {
    background: rgba(139, 92, 246, 0.2);
    color: $purple-500;
  }
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-item {
  .progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-bottom: 6px;
  }

  .progress-label {
    color: $text-gray-400;
  }
}

.creds-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid $border-color;
  font-size: 13px;

  .creds-value {
    font-family: monospace;
    color: $blue-500;
  }
}

.text-blue {
  color: $blue-500;
}
</style>
