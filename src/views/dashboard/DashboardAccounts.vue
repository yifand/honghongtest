<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_accounts_title') }}</h1>
      <el-button size="small" class="btn-secondary" @click="exportAccountsCSV">{{ $t('export_csv') }}</el-button>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <el-input v-model="filters.account" :placeholder="$t('account_name')" size="small" class="filter-input" />
        <el-select v-model="filters.company" :placeholder="$t('enterprise_name')" size="small" class="filter-input"
          clearable>
          <el-option v-for="item in partnerOptions" :key="item.companyCode" :label="item.companyName"
            :value="item.companyCode" />
        </el-select>
        <el-select v-model="filters.serviceType" :placeholder="$t('service_type')" size="small" class="filter-input"
          clearable>
          <el-option value="NRTK" label="NRTK" />
          <el-option value="PPP-RTK" label="PPP-RTK" />
        </el-select>
        <el-select v-model="filters.status" :placeholder="$t('activation_status')" size="small" class="filter-input"
          clearable>
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="filters.accountType" :placeholder="$t('account_mode')" size="small" class="filter-input"
          clearable>
          <el-option value="Ntrip" label="Ntrip" />
          <el-option value="SDK" label="SDK" />
        </el-select>
        <el-select v-model="filters.specType" :placeholder="$t('account_spec')" size="small" class="filter-input"
          clearable>
          <el-option v-for="item in pecttypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button size="small" class="btn-search" @click="applyFilter">{{ $t('search') }}</el-button>
        <el-button size="small" class="btn-reset" @click="resetFilter">{{ $t('reset') }}</el-button>
      </div>
    </el-card>
    <el-card class="glass">
      <el-table :data="dataList" v-loading="tableLoading" size="small" class="dark-table">
        <el-table-column type="index" width="50" />
        <el-table-column prop="user" :label="$t('account_name')">
          <template slot-scope="scope">
            <span class="text-blue">{{ scope.row.user }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pwd" :label="$t('password')">
          <template slot-scope="scope">
            <span class="text-gray text-xs">
              {{ visiblePasswordIds[scope.row.id] ? scope.row.pwd : '••••••••' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" :label="$t('enterprise_name')" />
        <el-table-column prop="serviceType" :label="$t('service_type')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.serviceType === 'NRTK' ? 'primary' : 'info'" size="mini">{{ scope.row.serviceType
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="accountType" :label="$t('account_mode')" />
        <el-table-column prop="specType" :label="$t('account_spec')">
          <template slot-scope="scope">{{ scope.row.specType | transText(pecttypes) }}/{{ scope.row.specNumber
            }}</template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('activation_status')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.activated === 1 ? 'success' : 'info'" size="mini">{{ scope.row.status |
              transText(statusList)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="activeTime" :label="$t('activation_time')" width="120" />
        <el-table-column prop="createTime" :label="$t('created_time')" width="100" />
        <el-table-column prop="expireTime" :label="$t('expire_time')" width="100" />
        <el-table-column :label="$t('actions')" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="showPassword(scope.row)">{{ $t('show') }}</el-button>
            <el-button type="text" size="mini" class="text-green" @click="openPasswordModal(scope.row)">{{
              $t('change_password_short') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <el-pagination :key="$i18n.locale" background layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>

    <!-- Password Modal -->
    <el-dialog :title="$t('change_password')" :visible.sync="modalVisible" width="400px" custom-class="dark-dialog">
      <el-form label-position="top" :model="passwordForm" ref="passwordForm" size="small" :rules="rules">
        <el-form-item :label="$t('account_name')">
          <el-input v-model="passwordForm.account" readonly />
        </el-form-item>
        <el-form-item :label="$t('new_password')" prop="pwd">
          <el-input v-model="passwordForm.pwd" :placeholder="$t('placeholder_new_password')" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="handleSavePassword">{{ $t('confirm') }}</el-button>
        <el-button size="small" class="btn-reset" @click="modalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { STATUSENUM, RES_SUCCESS, PECTYPEENUM, } from '@/common/js/const'
import { ntripAccountListByOrderNo, ntripAccountDownload, ntripAccountSearch, ntripAccountChgpwd, getPartnerSearch } from '@/common/js/api.js'
export default {
  name: 'DashboardAccounts',
  data() {
    return {
      filters: { account: '', company: null, serviceType: null, status: null, specType: null, accountType: null },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      modalVisible: false,
      passwordForm: { id: null, account: '', pwd: '' },
      visiblePasswordIds: {},
      statusList: STATUSENUM,
      tableLoading: false,
      pecttypes: PECTYPEENUM,
      partnerOptions: [],
      dataList: [],
      rules: {
        pwd: [{ required: true, message: this.$t('please_enter_new_password'), trigger: 'blur' }]
      }
    }
  },
  computed: {

  },
  mounted() {
    this.getPartnerList()
    this.getNtripAccountSearch()
  },
  methods: {
    getNtripAccountSearch() {
      this.tableLoading = true
      const params = { ...this.filters, pageNum: this.currentPage, pageSize: this.pageSize }
      ntripAccountSearch(params).then(res => {
        if (res.code === RES_SUCCESS || res.code === 200) {
          this.dataList = res.result.records
          this.total = res.result.total
        } else {
          this.$message.warning(res.message)
        }
      }).finally(() => {
        this.tableLoading = false
      })
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
    showPassword(row) {
      this.$alert(this.$t('account_label') + ': ' + row.user + '\n' + this.$t('password_label') + ': ' + row.pwd, this.$t('account_password_title'), { confirmButtonText: this.$t('ok') }).catch(() => { })
    },
    openPasswordModal(row) {
      this.passwordForm = { id: row.user, account: row.user, pwd: '' }
      this.modalVisible = true
    },
    handleSavePassword() {
      this.$refs.passwordForm.validate(async valid => {
        if (!valid) return
        const res = await ntripAccountChgpwd(this.passwordForm)
        if (res.code === RES_SUCCESS || res.code === 200) {
          this.$message.success(this.$t('edit_success'))
          this.getNtripAccountSearch()
          this.modalVisible = false
        } else {
          this.$message.warning(res.message)
        }
        this.modalVisible = false
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.getNtripAccountSearch()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getNtripAccountSearch()

    },
    applyFilter() {
      this.currentPage = 1
      this.getNtripAccountSearch()
    },
    resetFilter() {
      this.filters = { account: '', company: null, serviceType: null, status: null, specType: null, accountType: null }
      this.currentPage = 1
      this.getNtripAccountSearch()
    },
    exportAccountsCSV() {
      ntripAccountDownload({ ...this.filters }).then(res => {
        if (res.data && res.headers) {
          const blob = new Blob([res.data], {
            type: res.headers['content-type'] || 'application/octet-stream'
          })
          const contentDisposition = res.headers['content-disposition']
          const fileName = contentDisposition
            ? decodeURIComponent(contentDisposition.split('=')[1])
            : $t('dash_accounts_title') + '.csv'
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        }
      })
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

.text-blue {
  color: $blue-500;
}

.text-green {
  color: $green-400;
}

.text-gray {
  color: $text-gray-500;
}

.text-xs {
  font-size: 12px;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid $border-color !important;
  color: #fff !important;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
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

.pagination-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>
