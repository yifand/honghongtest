<template>
  <div class="dash-tab">
    <div class="tab-header">
      <h1 class="page-title">{{ $t('dash_partners_title') }}</h1>
      <el-button type="primary" size="small" @click="openPartnerModal()">+ {{ $t('add_partner') }}</el-button>
    </div>
    <el-card class="glass filter-card">
      <div class="filter-row">
        <el-input v-model="filters.name" :placeholder="$t('partner_name')" size="small" class="filter-input" style="width: 260px" />
        <el-button size="small" class="btn-search" @click="applyFilter">{{ $t('search') }}</el-button>
        <el-button size="small" class="btn-reset" @click="resetFilter">{{ $t('reset') }}</el-button>
      </div>
    </el-card>
    <el-card class="glass">
      <el-table :data="filteredPartners" size="small" class="dark-table">
        <el-table-column prop="id" label="#" width="60" />
        <el-table-column prop="name" :label="$t('partner_name')" />
        <el-table-column prop="code" :label="$t('partner_code')">
          <template slot-scope="scope">
            <span class="text-xs">{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise" :label="$t('enterprise_name')" />
        <el-table-column prop="notes" :label="$t('notes')" />
        <el-table-column :label="$t('actions')" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openPartnerModal(scope.row)">Detail</el-button>
            <el-button type="text" size="mini" class="text-red" @click="handleDelete(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Partner Modal -->
    <el-dialog :title="form.id ? $t('edit_partner') : $t('add_partner')" :visible.sync="modalVisible" width="480px" custom-class="dark-dialog">
      <el-form :model="form" label-position="top" size="small">
        <el-form-item :label="$t('partner_name')">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item :label="$t('enterprise_name')">
          <el-input v-model="form.enterprise" />
        </el-form-item>
        <el-form-item :label="$t('partner_code')">
          <el-input v-model="form.code" placeholder="e.g. ZNJS" />
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
import { DB, savePartner, deletePartner } from '@/data/dashboardDB'

export default {
  name: 'DashboardPartners',
  data() {
    return {
      DB,
      filters: { name: '' },
      modalVisible: false,
      form: this.emptyForm()
    }
  },
  computed: {
    filteredPartners() {
      return DB.partners.filter(p => {
        return !this.filters.name || p.name.toLowerCase().includes(this.filters.name.toLowerCase())
      })
    }
  },
  methods: {
    emptyForm() {
      return { id: null, name: '', enterprise: '', code: '', notes: '' }
    },
    openPartnerModal(row) {
      this.form = row ? { ...row } : this.emptyForm()
      this.modalVisible = true
    },
    handleSave() {
      const result = savePartner(this.form)
      if (!result.success) {
        this.$message.warning(result.message)
        return
      }
      this.modalVisible = false
    },
    handleDelete(id) {
      this.$confirm(this.$t('confirm_delete') + ' ID: ' + id, '', { type: 'warning' }).then(() => {
        deletePartner(id)
      }).catch(() => {})
    },
    applyFilter() { /* reactive */ },
    resetFilter() {
      this.filters = { name: '' }
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
