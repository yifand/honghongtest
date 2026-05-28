<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_orders_title') }}</h1>
      <el-button type="primary" size="small" @click="openOrderModal()">+ {{ $t('add_order') }}</el-button>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <el-input v-model="filters.enterprise" :placeholder="$t('enterprise_name')" size="small" class="filter-input" />
        <el-select v-model="filters.svcType" :placeholder="$t('service_type')" size="small" class="filter-input" clearable>
          <el-option value="" :label="$t('all_types')" />
          <el-option value="NRTK" label="NRTK" />
          <el-option value="PPP-RTK" label="PPP-RTK" />
        </el-select>
        <el-select v-model="filters.status" :placeholder="$t('status')" size="small" class="filter-input" clearable>
          <el-option value="" :label="$t('all_status')" />
          <el-option value="pushed" :label="$t('pushed')" />
          <el-option value="unpushed" :label="$t('unpushed')" />
        </el-select>
        <el-button size="small" class="btn-search" @click="applyFilter">{{ $t('search') }}</el-button>
        <el-button size="small" class="btn-reset" @click="resetFilter">{{ $t('reset') }}</el-button>
      </div>
    </el-card>
    <el-card class="glass">
      <el-table :data="filteredOrders" size="small" class="dark-table">
        <el-table-column prop="id" label="#" width="60" />
        <el-table-column prop="enterprise" :label="$t('enterprise_name')" />
        <el-table-column prop="title" :label="$t('order_title')" />
        <el-table-column prop="orderNo" :label="$t('order_id')" width="130">
          <template slot-scope="scope">
            <span class="text-blue text-xs">{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="svcType" :label="$t('service_type')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.svcType === 'NRTK' ? 'primary' : 'info'" size="mini">{{ scope.row.svcType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="acctMode" :label="$t('account_mode')" />
        <el-table-column prop="spec" :label="$t('account_spec')">
          <template slot-scope="scope">{{ scope.row.spec }}/{{ scope.row.stack }}</template>
        </el-table-column>
        <el-table-column prop="qty" :label="$t('quantity')" width="70" />
        <el-table-column prop="status" :label="$t('status')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'pushed' ? 'success' : 'warning'" size="mini">
              {{ scope.row.status === 'pushed' ? $t('pushed') : $t('unpushed') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="viewOrderDetail(scope.row)">Detail</el-button>
            <el-button v-if="scope.row.status === 'unpushed'" type="text" size="mini" class="text-green" @click="openOrderModal(scope.row)">{{ $t('edit') }}</el-button>
            <el-button v-if="scope.row.status === 'unpushed'" type="text" size="mini" class="text-orange" @click="handlePushOrder(scope.row.id)">Push</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Order Modal -->
    <el-dialog :title="form.id ? $t('edit_order') : $t('add_order')" :visible.sync="modalVisible" width="640px" custom-class="dark-dialog">
      <el-form :model="form" label-position="top" size="small">
        <div class="form-row">
          <el-form-item :label="$t('enterprise_name')" class="form-col">
            <el-select v-model="form.enterprise" style="width: 100%">
              <el-option v-for="u in DB.users" :key="u.id" :label="u.enterprise" :value="u.enterprise" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('order_title')" class="form-col">
            <el-input v-model="form.title" placeholder="e.g. ZNJS001_Ntrip" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item :label="$t('service_type')" class="form-col">
            <el-select v-model="form.svcType" style="width: 100%" @change="onSvcTypeChange">
              <el-option value="NRTK" label="NRTK" />
              <el-option value="PPP-RTK" label="PPP-RTK" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('account_mode')" class="form-col">
            <el-select v-model="form.acctMode" style="width: 100%">
              <el-option v-for="opt in modeOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </el-form-item>
        </div>
        <div class="form-row three-col">
          <el-form-item :label="$t('account_spec')" class="form-col">
            <el-select v-model="form.spec" style="width: 100%" @change="onSpecChange">
              <el-option value="year" label="Year" />
              <el-option value="month" label="Month" />
              <el-option value="day" label="Day" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('stack_qty')" class="form-col">
            <el-select v-model="form.stack" style="width: 100%">
              <el-option v-for="opt in stackOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('quantity')" class="form-col">
            <el-input-number v-model="form.qty" :min="1" :max="99" style="width: 100%" />
          </el-form-item>
        </div>
        <el-form-item :label="$t('device_type')">
          <el-input v-model="form.device" placeholder="e.g. GNSS-Receiver-Model-X" />
        </el-form-item>
        <el-form-item v-if="form.accountList" :label="$t('account_list')">
          <el-input v-model="form.accountList" type="textarea" :rows="3" readonly />
        </el-form-item>
        <el-form-item :label="$t('notes')">
          <el-input v-model="form.notes" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="handleSave">{{ $t('confirm') }}</el-button>
        <el-button size="small" @click="modalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { DB, saveOrder, pushOrder } from '@/data/dashboardDB'

export default {
  name: 'DashboardOrders',
  data() {
    return {
      DB,
      filters: { enterprise: '', svcType: '', status: '' },
      modalVisible: false,
      form: this.emptyForm(),
      modeOptions: ['Ntrip', 'SDK'],
      stackOptions: [1, 3, 5]
    }
  },
  computed: {
    filteredOrders() {
      return DB.orders.filter(o => {
        const matchEnt = !this.filters.enterprise || o.enterprise.toLowerCase().includes(this.filters.enterprise.toLowerCase())
        const matchType = !this.filters.svcType || o.svcType === this.filters.svcType
        const matchStatus = !this.filters.status || o.status === this.filters.status
        return matchEnt && matchType && matchStatus
      })
    }
  },
  methods: {
    emptyForm() {
      return { id: null, enterprise: '', title: '', svcType: 'NRTK', acctMode: 'Ntrip', spec: 'year', stack: 1, qty: 1, device: '', accountList: '', notes: '' }
    },
    openOrderModal(row) {
      this.form = row ? { ...row } : this.emptyForm()
      this.onSvcTypeChange()
      this.onSpecChange()
      this.modalVisible = true
    },
    onSvcTypeChange() {
      if (this.form.svcType === 'PPP-RTK') {
        this.modeOptions = ['SDK']
        this.form.acctMode = 'SDK'
      } else {
        this.modeOptions = ['Ntrip', 'SDK']
      }
    },
    onSpecChange() {
      const opts = { year: [1, 3, 5], month: [1, 3, 6], day: [1, 3, 7] }
      this.stackOptions = opts[this.form.spec] || [1]
      if (!this.stackOptions.includes(this.form.stack)) {
        this.form.stack = this.stackOptions[0]
      }
    },
    handleSave() {
      const result = saveOrder(this.form)
      if (!result.success) {
        this.$message.warning(result.message)
        return
      }
      this.modalVisible = false
    },
    handlePushOrder(id) {
      pushOrder(id)
      this.$message.success('Order pushed successfully')
    },
    viewOrderDetail(row) {
      this.$alert([
        'Order #: ' + row.orderNo,
        'Title: ' + row.title,
        'Enterprise: ' + row.enterprise,
        'Service: ' + row.svcType + ' | Mode: ' + row.acctMode,
        'Spec: ' + row.spec + ' / Stack: ' + row.stack + ' / Qty: ' + row.qty,
        'Device: ' + row.device,
        'Accounts: ' + row.accountList,
        'Status: ' + row.status,
        'Notes: ' + (row.notes || '-'),
        'Partner: ' + row.partner,
        'Created: ' + row.created
      ].join('\n'), 'Order Detail', { confirmButtonText: 'OK' })
    },
    applyFilter() { /* reactive */ },
    resetFilter() {
      this.filters = { enterprise: '', svcType: '', status: '' }
    }
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  &.three-col {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.form-col {
  margin-bottom: 0;
}

.text-blue {
  color: $blue-500;
}

.text-green {
  color: $green-400;
}

.text-orange {
  color: $orange-500;
}

.text-xs {
  font-size: 12px;
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
</style>
