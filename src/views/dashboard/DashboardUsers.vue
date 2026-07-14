<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_users_title') }}</h1>
      <el-button type="primary" size="small" @click="openUserModal()">+ {{ $t('add_user') }}</el-button>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <!-- <el-input v-model="filters.companyName" :placeholder="$t('enterprise_name')" size="small" class="filter-input" /> -->
        <el-input v-model="filters.userCode" :placeholder="$t('login_account')" size="small" class="filter-input" />
        <el-select v-model="filters.companyCode" :placeholder="$t('enterprise_name')" size="small" class="filter-input"
          clearable>
          <el-option v-for="item in partnerOptions" :key="item.companyCode" :label="item.companyName"
            :value="item.companyCode" />
        </el-select>
        <el-button size="small" class="btn-search" @click="applyFilter">{{ $t('search') }}</el-button>
        <el-button size="small" class="btn-reset" @click="resetFilter">{{ $t('reset') }}</el-button>
      </div>
    </el-card>
    <el-card class="glass">
      <el-table v-loading="tableLoading" :data="dataList" size="small" class="dark-table">
        <el-table-column type="index" :label="$t('serial_number')" width="60">
        </el-table-column>
        <el-table-column prop="enterpriseName" :label="$t('enterprise_name')" />
        <el-table-column prop="userCode" :label="$t('login_account')">
          <template slot-scope="scope">
            <span class="text-blue">{{ scope.row.userCode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="password" :label="$t('login_password')" />
        <!-- <el-table-column prop="userCode" :label="$t('user_code')" /> -->
        <!--        <el-table-column prop="serviceInstance" :label="$t('service_instance')" />-->
        <!-- <el-table-column prop="poolNo" :label="$t('resource_pool_no')" /> -->
        <!--        <el-table-column prop="resourcePool" :label="$t('resource_pool_name')" />-->
        <el-table-column prop="createTime" :label="$t('created_time')" min-width="100" />
        <el-table-column prop="updateTime" :label="$t('updated_time')" min-width="100" />
        <el-table-column :label="$t('actions')" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openUserModal(scope.row)">{{ $t('edit') }}</el-button>
            <el-button type="text" size="mini" class="text-red" @click="handleDeleteUser(scope.row.userCode)">{{
              $t('delete')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <el-pagination :key="$i18n.locale" background layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>

    <!-- User Modal -->
    <el-dialog :title="form.id ? $t('edit_user') : $t('add_user')" :visible.sync="modalVisible" width="560px"
      custom-class="dark-dialog">
      <el-form ref="form" :model="form" :rules="rules" label-position="top" size="small">
        <el-form-item :label="$t('enterprise_name')" prop="companyCode">
          <el-select v-model="form.companyCode" :placeholder="$t('partner_name')" size="small" class="filter-input"
            :disabled="!!form.id" clearable>
            <el-option v-for="item in partnerOptions" :key="item.companyCode" :label="item.companyName"
              :value="item.companyCode" />
          </el-select>
        </el-form-item>
        <div class="form-row">
          <el-form-item :label="$t('login_account')" prop="userCode" class="form-col">
            <el-input v-model="form.userCode" :placeholder="$t('placeholder_account')" :disabled="!!form.id" />
          </el-form-item>
          <el-form-item :label="$t('login_password')" prop="password" class="form-col">
            <el-input v-model="form.password" :placeholder="$t('placeholder_password')"
              @input="form.password = $event.replace(/\s/g, '')" />
          </el-form-item>
        </div>
        <!-- <div class="form-row">
          <el-form-item :label="$t('resource_pool_name')" class="form-col">
            <el-input v-model="form.poolName" :placeholder="$t('placeholder_pool_name')" />
          </el-form-item>
          <el-form-item :label="$t('service_instance')" class="form-col">
            <el-input v-model="form.instance" :placeholder="$t('placeholder_instance')" />
          </el-form-item>
        </div> -->
        <!-- <div class="form-row"> -->
        <!-- <el-form-item :label="$t('user_code')" class="form-col">
            <el-input v-model="form.code" :placeholder="$t('placeholder_code')" />
          </el-form-item> -->
        <!-- <el-form-item :label="$t('resource_pool_no')" class="form-col">
            <el-input v-model="form.poolNo" :placeholder="$t('placeholder_pool_no')" />
          </el-form-item> -->
        <!-- </div> -->
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
// import { DB, saveUser, deleteUser } from '@/data/dashboardDB'
import { userInfoCreate, getUserInfoSearch, userInfoRemove, userInfoEdit, getPartnerSearch } from '@/common/js/api.js'
import { RES_SUCCESS } from '@/common/js/const.js'
import { validatePasswordComplexity, validateAccountNoChineseAndSpace } from '@/common/js/utils.js'
export default {
  name: 'DashboardUsers',
  data() {
    return {
      // DB,
      filters: { companyCode: '', userCode: '' },
      currentPage: 1,
      pageSize: 10,
      modalVisible: false,
      form: this.emptyForm(),
      dataList: [],
      total: 0,
      partnerOptions: [],
      tableLoading: false,
      rules: {
        companyCode: [{ required: true, message: this.$t('please_select_enterprise'), trigger: 'change' }],
        userCode: [
          { required: true, message: this.$t('please_enter_account'), trigger: 'blur' },
          { validator: (rule, value, callback) => validateAccountNoChineseAndSpace(value, callback), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('please_enter_password'), trigger: 'blur' },
          { validator: (rule, value, callback) => validatePasswordComplexity(value, callback, this.$t), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  mounted() {
    this.getList()
    this.getPartnerList()
  },
  methods: {
    emptyForm() {
      return { id: null, enterprise: '', account: '', password: '', code: '', phone: '', email: '', instance: '', poolName: '', poolNo: '', updated: '' }
    },
    openUserModal(row) {
      this.form = row ? { ...row, id: row.userCode } : this.emptyForm()
      this.modalVisible = true
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    getList() {
      this.tableLoading = true
      const params = { ...this.filters, pageNum: this.pageNum, pageSize: this.pageSize }
      getUserInfoSearch(params).then(res => {
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
    handleSave() {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const form = { ...this.form, password: this.form.password.replace(/\s/g, '') }
        const res = this.form.id ? await userInfoEdit(form) : await userInfoCreate(form)
        if (res.code === RES_SUCCESS || res.code === 200) {
          this.$message.success(this.form.id ? this.$t('edit_success') : this.$t('add_success'))
          this.getList()
          this.modalVisible = false
        } else {
          this.$message.warning(res.message)
        }
        this.modalVisible = false
      })
    },
    handleDeleteUser(userCode) {
      this.$confirm(this.$t('confirm_delete') + ' — userCode: ' + userCode, '', { type: 'warning' }).then(() => {
        userInfoRemove({ userCode }).then(res => {
          if (res.code === RES_SUCCESS || res.code === 200) {
            this.$message.success(this.$t('delete_success'))
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        })
      }).catch(() => { })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.pageNum = 1
      this.getList()
    },
    handleCurrentChange(page) {
      this.pageNum = page
      this.getList()
    },
    applyFilter() {
      this.pageNum = 1
      this.getList()
    },
    resetFilter() {
      this.filters = { name: '', code: '', partner: '' }
      this.pageNum = 1
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

.pagination-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>
