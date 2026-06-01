<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_users_title') }}</h1>
      <el-button type="primary" size="small" @click="openUserModal()">+ {{ $t('add_user') }}</el-button>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <el-input v-model="filters.name" :placeholder="$t('enterprise_name')" size="small" class="filter-input" />
        <el-input v-model="filters.code" :placeholder="$t('user_code')" size="small" class="filter-input" />
        <el-select v-model="filters.partner" :placeholder="$t('partner_name')" size="small" class="filter-input" clearable>
          <el-option v-for="item in partnerOptions" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        <el-button size="small" class="btn-search" @click="applyFilter">{{ $t('search') }}</el-button>
        <el-button size="small" class="btn-reset" @click="resetFilter">{{ $t('reset') }}</el-button>
      </div>
    </el-card>
    <el-card class="glass">
      <el-table :data="filteredUsers" size="small" class="dark-table">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="enterprise" :label="$t('enterprise_name')" />
        <el-table-column prop="account" :label="$t('login_account')">
          <template slot-scope="scope">
            <span class="text-blue">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="password" :label="$t('login_password')" />
        <el-table-column prop="code" :label="$t('user_code')" />
        <el-table-column prop="instance" :label="$t('service_instance')" />
        <el-table-column prop="poolNo" :label="$t('resource_pool_no')" />
        <el-table-column prop="poolName" :label="$t('resource_pool_name')" />
        <el-table-column prop="created" :label="$t('created_time')" />
        <el-table-column prop="updated" :label="$t('updated_time')" />
        <el-table-column :label="$t('actions')" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openUserModal(scope.row)">{{ $t('edit') }}</el-button>
            <el-button type="text" size="mini" class="text-red" @click="handleDeleteUser(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- User Modal -->
    <el-dialog :title="form.id ? $t('edit_user') : $t('add_user')" :visible.sync="modalVisible" width="560px" custom-class="dark-dialog">
      <el-form ref="form" :model="form" :rules="rules" label-position="top" size="small">
        <el-form-item :label="$t('enterprise_name')" prop="enterprise">
          <el-input v-model="form.enterprise" :placeholder="$t('placeholder_enterprise')" />
        </el-form-item>
        <div class="form-row">
          <el-form-item :label="$t('login_account')" prop="account" class="form-col">
            <el-input v-model="form.account" :placeholder="$t('placeholder_account')" />
          </el-form-item>
          <el-form-item :label="$t('login_password')" prop="password" class="form-col">
            <el-input v-model="form.password" :placeholder="$t('placeholder_password')" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item :label="$t('user_code')" class="form-col">
            <el-input v-model="form.code" :placeholder="$t('placeholder_code')" />
          </el-form-item>
          <el-form-item :label="$t('service_instance')" class="form-col">
            <el-input v-model="form.instance" :placeholder="$t('placeholder_instance')" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item :label="$t('resource_pool_name')" class="form-col">
            <el-input v-model="form.poolName" :placeholder="$t('placeholder_pool_name')" />
          </el-form-item>
          <el-form-item :label="$t('resource_pool_no')" class="form-col">
            <el-input v-model="form.poolNo" :placeholder="$t('placeholder_pool_no')" />
          </el-form-item>
        </div>
        <!-- <div class="form-row">
          <el-form-item :label="$t('updated_time')" class="form-col">
            <el-input v-model="form.updated" disabled />
          </el-form-item>
          <el-form-item class="form-col" />
        </div> -->
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="handleSave">{{ $t('confirm') }}</el-button>
        <el-button size="small" class="btn-reset" @click="modalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { DB, saveUser, deleteUser } from '@/data/dashboardDB'

export default {
  name: 'DashboardUsers',
  data() {
    return {
      DB,
      filters: { name: '', code: '', partner: '' },
      modalVisible: false,
      form: this.emptyForm(),
      rules: {
        enterprise: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    partnerOptions() {
      const map = new Map()
      DB.partners.forEach(p => {
        if (!map.has(p.code)) map.set(p.code, p)
      })
      return Array.from(map.values())
    },
    filteredUsers() {
      return DB.users.filter(u => {
        const matchName = !this.filters.name || u.enterprise.toLowerCase().includes(this.filters.name.toLowerCase())
        const matchCode = !this.filters.code || u.code.toLowerCase().includes(this.filters.code.toLowerCase())
        const matchPartner = !this.filters.partner || u.code === this.filters.partner
        return matchName && matchCode && matchPartner
      })
    }
  },
  methods: {
    emptyForm() {
      return { id: null, enterprise: '', account: '', password: '', code: '', phone: '', email: '', instance: '', poolName: '', poolNo: '', updated: '' }
    },
    openUserModal(row) {
      this.form = row ? { ...row } : this.emptyForm()
      this.modalVisible = true
    },
    handleSave() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const result = saveUser(this.form)
        if (!result.success) {
          this.$message.warning(result.message)
          return
        }
        this.modalVisible = false
      })
    },
    handleDeleteUser(id) {
      this.$confirm(this.$t('confirm_delete') + ' — ID: ' + id, '', { type: 'warning' }).then(() => {
        deleteUser(id)
      }).catch(() => {})
    },
    applyFilter() { /* reactive */ },
    resetFilter() {
      this.filters = { name: '', code: '', partner: '' }
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
}

.form-col {
  margin-bottom: 0;
}

.text-blue {
  color: $blue-500;
}

.text-red {
  color: #ef4444;
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
