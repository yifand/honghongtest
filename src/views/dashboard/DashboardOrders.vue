<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_orders_title') }}</h1>
      <el-button type="primary" size="small" @click="openOrderModal()">+ {{ $t('add_order') }}</el-button>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <el-input v-model="filters.orderTitle" :placeholder="$t('order_title')" size="small" class="filter-input" />
        <el-input v-model="filters.orderNo" :placeholder="$t('order_id')" size="small" class="filter-input" />
        <!-- <el-input v-model="filters.enterprise" :placeholder="$t('enterprise_name')" size="small" class="filter-input" /> -->
        <el-select v-model="filters.companyCode" :placeholder="$t('enterprise_name')" size="small" class="filter-input"
          clearable>
          <el-option v-for="item in partnerOptions" :key="item.companyCode" :label="item.companyName"
            :value="item.companyCode" />
        </el-select>
        <el-select v-model="filters.serviceType" :placeholder="$t('service_type')" size="small" class="filter-input"
          clearable>
          <el-option value="" :label="$t('all_types')" />
          <el-option value="NRTK" label="NRTK" />
          <el-option value="PPP-RTK" label="PPP-RTK" />
        </el-select>
        <el-select v-model="filters.accountType" :placeholder="$t('account_mode')" size="small" class="filter-input"
          clearable>
          <el-option value="" :label="$t('all_account_modes')" />
          <el-option value="Ntrip" label="Ntrip" />
          <el-option value="SDK" label="SDK" />
        </el-select>
        <el-select v-model="filters.specType" :placeholder="$t('account_spec')" size="small" class="filter-input"
          clearable>
          <el-option value="" :label="$t('all_account_specs')" />
          <el-option v-for="item in pecttypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="filters.status" :placeholder="$t('status')" size="small" class="filter-input" clearable>
          <el-option value="" :label="$t('all_status')" />
          <el-option v-for="item in pushOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button size="small" class="btn-search" @click="applyFilter">{{ $t('search') }}</el-button>
        <el-button size="small" class="btn-reset" @click="resetFilter">{{ $t('reset') }}</el-button>
      </div>
    </el-card>
    <el-card class="glass">
      <el-table :data="dataList" size="small" class="dark-table">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="companyName" :label="$t('enterprise_name')" />
        <!-- <el-table-column prop="partner" :label="$t('partner_name')" width="120" /> -->
        <el-table-column prop="orderTitle" :label="$t('order_title')" />
        <el-table-column prop="orderNo" :label="$t('order_id')" width="130">
          <template slot-scope="scope">
            <span class="text-blue text-xs">{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceType" :label="$t('service_type')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.serviceType === 'NRTK' ? 'primary' : 'info'" size="mini">{{ scope.row.serviceType
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="accountType" :label="$t('account_mode')" />
        <el-table-column prop="spec" :label="$t('account_spec')">
          <template slot-scope="scope">{{ scope.row.specType | transText(pecttypes) }}/{{ scope.row.specNumber
          }}</template>
        </el-table-column>
        <el-table-column prop="quantity" :label="$t('quantity')" width="70" />
        <el-table-column prop="device" :label="$t('device_type')" width="140" />
        <el-table-column prop="accountList" :label="$t('account_list')" min-width="160" show-overflow-tooltip />
        <el-table-column prop="orderTime" :label="$t('created_time')" width="110" />
        <el-table-column prop="status" :label="$t('status')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'" size="mini">
              {{ scope.row.status === 1 ? $t('pushed') : $t('unpushed') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="viewOrderDetail(scope.row)">{{ $t('detail') }}</el-button>
            <el-button v-if="scope.row.status !== 1" type="text" size="mini" class="text-green"
              @click="openOrderModal(scope.row)">{{ $t('edit') }}</el-button>
            <el-button v-if="scope.row.status !== 1" type="text" size="mini" class="text-orange"
              @click="handlePushOrder(scope.row.orderNo)">{{ $t('push') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <el-pagination :key="$i18n.locale" background layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>

    <!-- Order Detail Dialog -->
    <el-dialog :title="$t('order_detail_title')" :visible.sync="detailVisible" width="520px" custom-class="dark-dialog">
      <div class="detail-body">
        <div class="detail-header">
          <div class="detail-no">{{ detailRow.orderNo }}</div>
          <div class="detail-title">{{ detailRow.orderTitle }}</div>
        </div>
        <div class="detail-section">
          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_enterprise_label') }}</span>
              <span class="detail-value">{{ detailRow.companyName }}</span>
            </div>
            <!-- <div class="detail-item">
              <span class="detail-label">{{ $t('order_partner_label') }}</span>
              <span class="detail-value">{{ detailRow.partner }}</span>
            </div> -->
          </div>
          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_service_label') }}</span>
              <span class="detail-value">
                <el-tag :type="detailRow.serviceType === 'NRTK' ? 'primary' : 'info'" size="mini">{{
                  detailRow.serviceType
                }}</el-tag>
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_mode_label') }}</span>
              <span class="detail-value">{{ detailRow.accountType }}</span>
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_created_label') }}</span>
              <span class="detail-value">{{ detailRow.orderTime }}</span>
            </div>
          </div>
        </div>
        <div class="detail-divider" />
        <div class="detail-section">
          <div class="detail-row three">
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_spec_label') }}</span>
              <span class="detail-value">{{ detailRow.specType | transText(pecttypes) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_stack_label') }}</span>
              <span class="detail-value">{{ detailRow.specNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_qty_label') }}</span>
              <span class="detail-value">{{ detailRow.quantity }}</span>
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_device_label') }}</span>
              <span class="detail-value">{{ detailRow.device || '-' }}</span>
            </div>
          </div>
        </div>
        <div class="detail-divider" />
        <div class="detail-section">
          <div class="detail-row">
            <div class="detail-item full">
              <span class="detail-label">{{ $t('order_accounts_label') }}</span>
              <span class="detail-value">{{ detailRow.accountList || '-' }}</span>
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">{{ $t('order_status_label') }}</span>
              <span class="detail-value">
                <el-tag :type="detailRow.status === 'pushed' ? 'success' : 'warning'" size="mini">{{ detailRow.status
                  ===
                  'pushed' ? $t('pushed') : $t('unpushed') }}</el-tag>
              </span>
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-item full">
              <span class="detail-label">{{ $t('order_notes_label') }}</span>
              <span class="detail-value text-muted">{{ detailRow.notes || '-' }}</span>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" size="small" @click="detailVisible = false">{{ $t('ok') }}</el-button>
      </span>
    </el-dialog>

    <!-- Order Modal -->
    <el-dialog :title="form.id ? $t('edit_order') : $t('add_order')" :visible.sync="modalVisible" width="640px"
      custom-class="dark-dialog">
      <el-form ref="orderForm" :model="form" :rules="rules" label-position="top" size="small">
        <div class="form-row">
          <el-form-item prop="companyCode" :label="$t('enterprise_name')" class="form-col">
            <el-select v-model="form.companyCode" style="width: 100%">
              <el-option v-for="item in partnerOptions" :key="item.companyCode" :label="item.companyName"
                :value="item.companyCode" />
            </el-select>
          </el-form-item>
          <el-form-item prop="orderTitle" :label="$t('order_title')" class="form-col">
            <el-input v-model="form.orderTitle" :placeholder="$t('placeholder_order')" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item prop="serviceType" :label="$t('service_type')" class="form-col">
            <el-select v-model="form.serviceType" style="width: 100%" @change="onSvcTypeChange">
              <el-option value="NRTK" label="NRTK" />
              <el-option value="PPP-RTK" label="PPP-RTK" />
            </el-select>
          </el-form-item>
          <el-form-item prop="accountType" :label="$t('account_mode')" class="form-col">
            <el-select v-model="form.accountType" style="width: 100%">
              <el-option v-for="opt in modeOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </el-form-item>
        </div>
        <div class="form-row three-col">
          <el-form-item prop="specType" :label="$t('account_spec')" class="form-col">
            <el-select v-model="form.specType" style="width: 100%" @change="onSpecChange">
              <el-option v-for="item in pecttypes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item prop="specNumber" :label="$t('stack_qty')" class="form-col">
            <el-select v-model="form.specNumber" style="width: 100%">
              <el-option v-for="opt in stackOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </el-form-item>
          <el-form-item prop="quantity" :label="$t('quantity')" class="form-col">
            <el-input-number v-model="form.quantity" :min="1" :max="99" style="width: 100%" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item prop="device" :label="$t('device_type')" class="form-col">
            <el-input v-model="form.device" :placeholder="$t('placeholder_device')" />
          </el-form-item>
          <!-- <el-form-item prop="partner" :label="$t('partner_name')" class="form-col">
            <el-select v-model="form.partner" style="width: 100%">
              <el-option v-for="item in partnerOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item> -->
        </div>
        <el-form-item prop="accountList" :label="$t('account_list')">
          <el-input v-model="form.accountList" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item :label="$t('notes')">
          <el-input v-model="form.notes" :placeholder="$t('placeholder_notes')" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="handleSave">{{ $t('confirm') }}</el-button>
        <el-button size="small" class="btn-reset" @click="modalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { DB, saveOrder, pushOrder } from '@/data/dashboardDB'
import { ntripOrderSearch, ntripOrderCreate, getPartnerSearch, ntripOrderEdit, ntripOrderPush } from '@/common/js/api.js'
import { RES_SUCCESS, PECTYPEENUM, PUSHTYPEENUM } from '@/common/js/const.js'

export default {
  name: 'DashboardOrders',
  data() {
    return {
      filters: { orderTitle: '', orderNo: '', serviceType: '', companyCode: '', accountType: '', specType: '', status: '' },
      currentPage: 1,
      pageSize: 10,
      modalVisible: false,
      detailVisible: false,
      detailRow: {},
      total: 0,
      form: this.emptyForm(),
      partnerOptions: [],
      rules: {
        companyCode: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        orderTitle: [{ required: true, message: this.$t('required'), trigger: 'blur' }],
        serviceType: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        accountType: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        specType: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        specNumber: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        quantity: [{ required: true, message: this.$t('required'), trigger: 'blur' }],
        device: [{ required: true, message: this.$t('required'), trigger: 'blur' }],
        // partner: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        accountList: [{ required: true, message: this.$t('required'), trigger: 'blur' }]
      },
      modeOptions: ['Ntrip', 'SDK'],
      stackOptions: [1, 3, 5],
      dataList: [],
      pecttypes: PECTYPEENUM,
      pushOptions: PUSHTYPEENUM
    }
  },
  computed: {
    // filteredOrders() {
    //   return DB.orders.filter(o => {
    //     const matchTitle = !this.filters.title || o.title.toLowerCase().includes(this.filters.title.toLowerCase())
    //     const matchOrderNo = !this.filters.orderNo || o.orderNo.toLowerCase().includes(this.filters.orderNo.toLowerCase())
    //     const matchEnt = !this.filters.enterprise || o.enterprise.toLowerCase().includes(this.filters.enterprise.toLowerCase())
    //     const matchPartner = !this.filters.partner || o.partner === this.filters.partner
    //     const matchType = !this.filters.svcType || o.svcType === this.filters.svcType
    //     const matchMode = !this.filters.acctMode || o.acctMode === this.filters.acctMode
    //     const matchSpec = !this.filters.spec || o.spec === this.filters.spec
    //     const matchStatus = !this.filters.status || o.status === this.filters.status
    //     return matchTitle && matchOrderNo && matchEnt && matchPartner && matchType && matchMode && matchSpec && matchStatus
    //   })
    // },
    // paginatedOrders() {
    //   const start = (this.currentPage - 1) * this.pageSize
    //   return this.filteredOrders.slice(start, start + this.pageSize)
    // }
  },
  mounted() {
    this.getList()
    this.getPartnerList()
  },
  methods: {
    emptyForm() {
      return { id: null, companyCode: '', orderTitle: '', serviceType: 'NRTK', accountType: 'Ntrip', specType: 1, specNumber: 1, quantity: 1, device: '', accountList: '', notes: '' }
    },
    openOrderModal(row) {
      this.form = row ? { ...row, id: row.orderNo } : this.emptyForm()
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
      const opts = { 1: [1, 3, 5], 2: [1, 3, 6], 3: [1, 3, 7] }
      this.stackOptions = opts[Number(this.form.specType)] || [1]
      if (!this.stackOptions.includes(this.form.specNumber)) {
        this.form.specNumber = this.stackOptions[0]
      }
    },
    getList() {
      const params = { ...this.filters, pageNum: this.currentPage, pageSize: this.pageSize }
      ntripOrderSearch(params).then(res => {
        if (res.code === RES_SUCCESS || res.code === 200) {
          this.dataList = res.result.records
          this.total = res.result.total
        } else {
          this.$message.warning(res.message)
        }
      }
      )
    },
    getPartnerList() {
      getPartnerSearch({ pageNum: 1, pageSize: 9999 }).then(res => {
        if (res.code === RES_SUCCESS || res.code === 200) {
          this.partnerOptions = res.result.records
        } else {
          this.$message.warning(res.message)
        }
      }
      )
    },
    handleSave() {
      this.$refs.orderForm.validate(async valid => {
        if (!valid) return
        const res = this.form.id ? await ntripOrderEdit(this.form) : await ntripOrderCreate(this.form)
        if (res.code === RES_SUCCESS || res.code === 200) {
          this.getList()
          this.modalVisible = false
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    handlePushOrder(orderNo) {
      ntripOrderPush({ orderNo }).then(res => {
        if (res.code === RES_SUCCESS || res.code === 200) {
          this.$message.success(this.$t('order_pushed'))
          this.getList()
        } else {
          this.$message.warning(res.message)
        }
      }
      )
    },
    viewOrderDetail(row) {
      this.detailRow = row
      this.detailVisible = true
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.getList()

    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getList()

    },
    applyFilter() {
      this.currentPage = 1
      this.getList()

    },
    resetFilter() {
      this.filters = { orderTitle: '', orderNo: '', serviceType: '', companyCode: '', accountType: '', specType: '', status: '' },
        this.currentPage = 1
      this.getList()
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

.detail-body {
  padding: 8px 4px;
}

.detail-header {
  margin-bottom: 20px;

  .detail-no {
    font-size: 12px;
    color: $blue-500;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .detail-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
}

.detail-divider {
  height: 1px;
  background: $border-color;
  margin: 16px 0;
}

.detail-section {
  .detail-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;

    &.three {
      grid-template-columns: 1fr 1fr 1fr;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &.full {
      grid-column: 1 / -1;
    }

    .detail-label {
      font-size: 12px;
      color: $text-gray-500;
    }

    .detail-value {
      font-size: 14px;
      color: #fff;
      font-weight: 500;
      word-break: break-all;

      &.text-muted {
        color: $text-gray-400;
        font-weight: 400;
      }
    }
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

.pagination-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>
