<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_partners_title') }}</h1>
      <el-button type="primary" size="small" @click="openPartnerModal()">+ {{ $t('add_partner') }}</el-button>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <el-input v-model="filters.companyName" :placeholder="$t('partner_name')" size="small" class="filter-input"
          style="width: 260px" />
        <el-button size="small" class="btn-search" @click="applyFilter">{{ $t('search') }}</el-button>
        <el-button size="small" class="btn-reset" @click="resetFilter">{{ $t('reset') }}</el-button>
      </div>
    </el-card>
    <el-card class="glass">
      <el-table v-loading="tableLoading" :data="dataList" size="small" class="dark-table">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="companyName" :label="$t('partner_name')" />
        <el-table-column prop="companyCode" :label="$t('partner_code')">
          <template slot-scope="scope">
            <span class="text-xs">{{ scope.row.companyCode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise" :label="$t('enterprise_name')" />
        <el-table-column prop="note" :label="$t('notes')" />
        <el-table-column :label="$t('actions')" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openPartnerModal(scope.row, true)">{{ $t('detail') }}</el-button>
            <el-button type="text" size="mini" class="text-green" @click="openPartnerModal(scope.row, false)">{{
              $t('edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <el-pagination :key="$i18n.locale" background layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>

    <!-- Partner Modal -->
    <el-dialog :title="dialogTitle" :visible.sync="modalVisible" width="480px" custom-class="dark-dialog"
      @closed="resetForm">
      <el-form ref="partnerForm" :model="form" :rules="formRules" label-position="top" size="small">
        <el-form-item :label="$t('partner_name')" prop="companyName">
          <el-input v-model="form.companyName" :placeholder="$t('placeholder_partner_name')"
            :disabled="modalReadonly" />
        </el-form-item>
        <el-form-item :label="$t('partner_code')" prop="companyCode">
          <el-input v-model="form.companyCode" :placeholder="$t('placeholder_prefix')" :disabled="modalReadonly" />
        </el-form-item>
        <el-form-item :label="$t('notes')">
          <el-input v-model="form.note" :placeholder="$t('placeholder_notes')" :disabled="modalReadonly" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button v-if="!modalReadonly" type="primary" size="small" @click="handleSave">{{ $t('confirm') }}</el-button>
        <el-button size="small" class="btn-reset" @click="modalVisible = false">{{ modalReadonly ? $t('ok') :
          $t('cancel')
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { DB, savePartner, deletePartner } from '@/data/dashboardDB'
import { partnerCreate, getPartnerSearch, partnerDetail, partnerEdit } from '@/common/js/api.js'
import { RES_SUCCESS } from '@/common/js/const.js'
export default {
  name: 'DashboardPartners',
  data() {
    return {
      DB,
      filters: { companyName: '' },
      dataList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      modalVisible: false,
      modalReadonly: false,
      tableLoading: false,
      form: this.emptyForm(),
      formRules: {
        companyName: [
          { required: true, message: this.$t('required'), trigger: 'blur' }
        ],
        companyCode: [
          { required: true, message: this.$t('required'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogTitle() {
      if (this.modalReadonly) return this.$t('partner_detail_title')
      return this.form.id ? this.$t('edit_partner') : this.$t('add_partner')
    },
    // filteredPartners() {
    //   return DB.partners.filter(p => {
    //     return !this.filters.name || p.name.toLowerCase().includes(this.filters.name.toLowerCase())
    //   })
    // },
    // paginatedPartners() {
    //   const start = (this.pageNum - 1) * this.pageSize
    //   return this.filteredPartners.slice(start, start + this.pageSize)
    // }
  },
  mounted() {
    this.getList()
  },
  methods: {
    emptyForm() {
      return { id: null, companyName: '', companyCode: '', note: '' }
    },
    openPartnerModal(row, readonly = false) {
      this.modalReadonly = readonly
      this.form = row ? { ...row, id: row.companyCode } : this.emptyForm()
      this.modalVisible = true
      this.$nextTick(() => {
        this.$refs.partnerForm && this.$refs.partnerForm.clearValidate()
      })
    },
    getList() {
      this.tableLoading = true
      const params = { ...this.filters, pageNum: this.pageNum, pageSize: this.pageSize }
      getPartnerSearch(params).then(res => {
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
    async handleSave() {
      this.$refs.partnerForm.validate(async valid => {
        if (!valid) return
        const res = this.form.id ? await partnerEdit(this.form) : await partnerCreate(this.form)
        if (res.code === RES_SUCCESS || res.code === 200) {
          this.$message.success(this.form.id ? this.$t('edit_success') : this.$t('add_success'))
          this.getList()
          this.modalVisible = false
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    resetForm() {
      this.$refs.partnerForm && this.$refs.partnerForm.clearValidate()
    },
    handleDelete(id) {
      this.$confirm(this.$t('confirm_delete') + ' ID: ' + id, '', { type: 'warning' }).then(() => {
        deletePartner(id)
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
      this.filters = { companyName: '' }
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

.text-red {
  color: #ef4444;
}

.text-green {
  color: #22c55e;
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

.pagination-bar {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>
