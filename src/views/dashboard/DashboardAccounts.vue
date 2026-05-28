<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_accounts_title') }}</h1>
      <el-button size="small" class="btn-secondary" @click="exportAccountsCSV">{{ $t('export_csv') }}</el-button>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <el-input v-model="filters.name" :placeholder="$t('account_name')" size="small" class="filter-input" />
        <el-input v-model="filters.enterprise" :placeholder="$t('enterprise_name')" size="small" class="filter-input" />
        <el-select v-model="filters.svcType" :placeholder="$t('service_type')" size="small" class="filter-input" clearable>
          <el-option value="" :label="$t('all_types')" />
          <el-option value="NRTK" label="NRTK" />
          <el-option value="PPP-RTK" label="PPP-RTK" />
        </el-select>
        <el-select v-model="filters.activated" :placeholder="$t('activation_status')" size="small" class="filter-input" clearable>
          <el-option value="" :label="$t('all_status')" />
          <el-option value="activated" :label="$t('activated')" />
          <el-option value="inactive" :label="$t('inactive')" />
        </el-select>
        <el-button size="small" class="btn-search" @click="applyFilter">{{ $t('search') }}</el-button>
        <el-button size="small" class="btn-reset" @click="resetFilter">{{ $t('reset') }}</el-button>
      </div>
    </el-card>
    <el-card class="glass">
      <el-table :data="filteredAccounts" size="small" class="dark-table">
        <el-table-column prop="id" label="#" width="60" />
        <el-table-column prop="name" :label="$t('account_name')">
          <template slot-scope="scope">
            <span class="text-blue">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="password" :label="$t('password')">
          <template slot-scope="scope">
            <span class="text-gray text-xs">••••••••</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise" :label="$t('enterprise_name')" />
        <el-table-column prop="svcType" :label="$t('service_type')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.svcType === 'NRTK' ? 'primary' : 'info'" size="mini">{{ scope.row.svcType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mode" :label="$t('account_mode')" />
        <el-table-column prop="spec" :label="$t('account_spec')">
          <template slot-scope="scope">{{ scope.row.spec }}/{{ scope.row.stack }}</template>
        </el-table-column>
        <el-table-column prop="activated" :label="$t('activation_status')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.activated === 'activated' ? 'success' : 'info'" size="mini">{{ scope.row.activated }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created" :label="$t('created_time')" width="100" />
        <el-table-column prop="expires" :label="$t('expire_time')" width="100" />
        <el-table-column :label="$t('actions')" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="showPassword(scope.row)">Show</el-button>
            <el-button type="text" size="mini" class="text-green" @click="openPasswordModal(scope.row)">Chg Pwd</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Password Modal -->
    <el-dialog :title="$t('change_password')" :visible.sync="modalVisible" width="400px" custom-class="dark-dialog">
      <el-form label-position="top" size="small">
        <el-form-item :label="$t('account_name')">
          <el-input v-model="passwordForm.name" readonly />
        </el-form-item>
        <el-form-item :label="$t('new_password')">
          <el-input v-model="passwordForm.newPassword" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="handleSavePassword">{{ $t('confirm') }}</el-button>
        <el-button size="small" @click="modalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { DB, updatePassword, exportAccountsCSV } from '@/data/dashboardDB'

export default {
  name: 'DashboardAccounts',
  data() {
    return {
      DB,
      filters: { name: '', enterprise: '', svcType: '', activated: '' },
      modalVisible: false,
      passwordForm: { id: null, name: '', newPassword: '' }
    }
  },
  computed: {
    filteredAccounts() {
      return DB.accounts.filter(a => {
        const matchName = !this.filters.name || a.name.toLowerCase().includes(this.filters.name.toLowerCase())
        const matchEnt = !this.filters.enterprise || a.enterprise.toLowerCase().includes(this.filters.enterprise.toLowerCase())
        const matchType = !this.filters.svcType || a.svcType === this.filters.svcType
        const matchStatus = !this.filters.activated || a.activated === this.filters.activated
        return matchName && matchEnt && matchType && matchStatus
      })
    }
  },
  methods: {
    showPassword(row) {
      this.$alert('Account: ' + row.name + '\nPassword: ' + row.password, 'Account Password', { confirmButtonText: 'OK' })
    },
    openPasswordModal(row) {
      this.passwordForm = { id: row.id, name: row.name, newPassword: '' }
      this.modalVisible = true
    },
    handleSavePassword() {
      updatePassword(this.passwordForm.id, this.passwordForm.newPassword)
      this.modalVisible = false
    },
    exportAccountsCSV,
    applyFilter() { /* reactive */ },
    resetFilter() {
      this.filters = { name: '', enterprise: '', svcType: '', activated: '' }
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
</style>
