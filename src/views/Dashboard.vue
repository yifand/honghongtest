<template>
  <div class="dashboard-page">
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar glass">
        <div class="sidebar-header">
          <div class="brand-icon">
            <svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div class="user-info">
            <p class="user-name">admin@globalservice.com</p>
            <p class="user-role">{{ $t('role_admin') }}</p>
          </div>
        </div>

        <el-menu :default-active="activeTab" class="sidebar-menu" @select="activeTab = $event">
          <el-menu-item index="overview">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            <span slot="title">{{ $t('dash_overview') }}</span>
          </el-menu-item>
          <el-menu-item index="users">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <span slot="title">{{ $t('dash_users') }}</span>
          </el-menu-item>
          <el-menu-item index="orders">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            <span slot="title">{{ $t('dash_orders') }}</span>
          </el-menu-item>
          <el-menu-item index="accounts">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
            </svg>
            <span slot="title">{{ $t('dash_accounts') }}</span>
          </el-menu-item>
          <el-menu-item index="partners">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span slot="title">{{ $t('dash_partners') }}</span>
          </el-menu-item>
        </el-menu>

        <div class="sidebar-footer">
          <el-button class="logout-btn" @click="handleLogout">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span>{{ $t('logout') }}</span>
          </el-button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="dashboard-main custom-scrollbar">
        <!-- Overview -->
        <div v-show="activeTab === 'overview'" class="dash-tab">
          <h1 class="page-title">{{ $t('dash_overview_title') }}</h1>
          <div class="stats-row">
            <el-card class="stat-card glass card-hover">
              <div class="stat-header">
                <span class="stat-label">{{ $t('dash_total_users') }}</span>
                <div class="stat-icon icon-blue">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
              </div>
              <p class="stat-value text-gradient">{{ DB.users.length }}</p>
            </el-card>
            <el-card class="stat-card glass card-hover">
              <div class="stat-header">
                <span class="stat-label">{{ $t('dash_active_accounts') }}</span>
                <div class="stat-icon icon-green">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <p class="stat-value text-gradient">{{ activeAccountsCount }}</p>
            </el-card>
            <el-card class="stat-card glass card-hover">
              <div class="stat-header">
                <span class="stat-label">{{ $t('dash_pending_orders') }}</span>
                <div class="stat-icon icon-orange">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <p class="stat-value text-gradient">{{ pendingOrdersCount }}</p>
            </el-card>
            <el-card class="stat-card glass card-hover">
              <div class="stat-header">
                <span class="stat-label">{{ $t('dash_total_partners') }}</span>
                <div class="stat-icon icon-purple">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
              </div>
              <p class="stat-value text-gradient">{{ DB.partners.length }}</p>
            </el-card>
          </div>

          <div class="overview-grid">
            <el-card class="glass">
              <h3 class="panel-title">{{ $t('dash_recent_orders') }}</h3>
              <el-table :data="DB.orders.slice(0, 5)" size="small" class="dark-table">
                <el-table-column prop="orderNo" :label="$t('order_id')" width="130">
                  <template slot-scope="scope">
                    <span class="text-blue">{{ scope.row.orderNo }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="enterprise" :label="$t('enterprise_name')" />
                <el-table-column prop="svcType" :label="$t('service_type')" width="100" />
                <el-table-column prop="status" :label="$t('status')" width="100">
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
                    <span class="progress-label">NRTK - Ntrip</span>
                    <span>45</span>
                  </div>
                  <el-progress :percentage="45" color="#3b82f6" :show-text="false" />
                </div>
                <div class="progress-item">
                  <div class="progress-header">
                    <span class="progress-label">NRTK - SDK</span>
                    <span>98</span>
                  </div>
                  <el-progress :percentage="68" color="#06b6d4" :show-text="false" />
                </div>
                <div class="progress-item">
                  <div class="progress-header">
                    <span class="progress-label">PPP-RTK - SDK</span>
                    <span>43</span>
                  </div>
                  <el-progress :percentage="35" color="#22c55e" :show-text="false" />
                </div>
              </div>
              <div class="creds-row">
                <span class="progress-label">{{ $t('dash_nrtk_creds') }}</span>
                <span class="creds-value">user_abc123 / ••••••••</span>
              </div>
            </el-card>
          </div>
        </div>

        <!-- Users -->
        <div v-show="activeTab === 'users'" class="dash-tab">
          <div class="tab-header">
            <h1 class="page-title">{{ $t('dash_users_title') }}</h1>
            <el-button type="primary" size="small" @click="openUserModal()">+ {{ $t('add_user') }}</el-button>
          </div>
          <el-card class="glass filter-card">
            <div class="filter-row">
              <el-input v-model="userFilters.name" :placeholder="$t('enterprise_name')" size="small" class="filter-input" />
              <el-input v-model="userFilters.code" :placeholder="$t('user_code')" size="small" class="filter-input" />
              <el-button size="small" class="btn-search" @click="applyUserFilter">{{ $t('search') }}</el-button>
              <el-button size="small" class="btn-reset" @click="resetUserFilter">{{ $t('reset') }}</el-button>
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
              <el-table-column prop="code" :label="$t('user_code')" />
              <el-table-column prop="instance" :label="$t('service_instance')" />
              <el-table-column prop="poolName" :label="$t('resource_pool')" />
              <el-table-column prop="created" :label="$t('created_time')" />
              <el-table-column :label="$t('actions')" width="140">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="openUserModal(scope.row)">{{ $t('edit') }}</el-button>
                  <el-button type="text" size="mini" class="text-red" @click="deleteUser(scope.row.id)">{{ $t('delete') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>

        <!-- Orders -->
        <div v-show="activeTab === 'orders'" class="dash-tab">
          <div class="tab-header">
            <h1 class="page-title">{{ $t('dash_orders_title') }}</h1>
            <el-button type="primary" size="small" @click="openOrderModal()">+ {{ $t('add_order') }}</el-button>
          </div>
          <el-card class="glass filter-card">
            <div class="filter-row">
              <el-input v-model="orderFilters.enterprise" :placeholder="$t('enterprise_name')" size="small" class="filter-input" />
              <el-select v-model="orderFilters.svcType" :placeholder="$t('service_type')" size="small" class="filter-input" clearable>
                <el-option value="" :label="$t('all_types')" />
                <el-option value="NRTK" label="NRTK" />
                <el-option value="PPP-RTK" label="PPP-RTK" />
              </el-select>
              <el-select v-model="orderFilters.status" :placeholder="$t('status')" size="small" class="filter-input" clearable>
                <el-option value="" :label="$t('all_status')" />
                <el-option value="pushed" :label="$t('pushed')" />
                <el-option value="unpushed" :label="$t('unpushed')" />
              </el-select>
              <el-button size="small" class="btn-search" @click="applyOrderFilter">{{ $t('search') }}</el-button>
              <el-button size="small" class="btn-reset" @click="resetOrderFilter">{{ $t('reset') }}</el-button>
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
                  <el-button v-if="scope.row.status === 'unpushed'" type="text" size="mini" class="text-green" @click="editOrder(scope.row)">{{ $t('edit') }}</el-button>
                  <el-button v-if="scope.row.status === 'unpushed'" type="text" size="mini" class="text-orange" @click="pushOrder(scope.row.id)">Push</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>

        <!-- Accounts -->
        <div v-show="activeTab === 'accounts'" class="dash-tab">
          <div class="tab-header">
            <h1 class="page-title">{{ $t('dash_accounts_title') }}</h1>
            <el-button size="small" class="btn-secondary" @click="exportAccounts">{{ $t('export_csv') }}</el-button>
          </div>
          <el-card class="glass filter-card">
            <div class="filter-row">
              <el-input v-model="accountFilters.name" :placeholder="$t('account_name')" size="small" class="filter-input" />
              <el-input v-model="accountFilters.enterprise" :placeholder="$t('enterprise_name')" size="small" class="filter-input" />
              <el-select v-model="accountFilters.svcType" :placeholder="$t('service_type')" size="small" class="filter-input" clearable>
                <el-option value="" :label="$t('all_types')" />
                <el-option value="NRTK" label="NRTK" />
                <el-option value="PPP-RTK" label="PPP-RTK" />
              </el-select>
              <el-select v-model="accountFilters.activated" :placeholder="$t('activation_status')" size="small" class="filter-input" clearable>
                <el-option value="" :label="$t('all_status')" />
                <el-option value="activated" :label="$t('activated')" />
                <el-option value="inactive" :label="$t('inactive')" />
              </el-select>
              <el-button size="small" class="btn-search" @click="applyAccountFilter">{{ $t('search') }}</el-button>
              <el-button size="small" class="btn-reset" @click="resetAccountFilter">{{ $t('reset') }}</el-button>
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
        </div>

        <!-- Partners -->
        <div v-show="activeTab === 'partners'" class="dash-tab">
          <div class="tab-header">
            <h1 class="page-title">{{ $t('dash_partners_title') }}</h1>
            <el-button type="primary" size="small" @click="openPartnerModal()">+ {{ $t('add_partner') }}</el-button>
          </div>
          <el-card class="glass filter-card">
            <div class="filter-row">
              <el-input v-model="partnerFilters.name" :placeholder="$t('partner_name')" size="small" class="filter-input" style="width: 260px" />
              <el-button size="small" class="btn-search" @click="applyPartnerFilter">{{ $t('search') }}</el-button>
              <el-button size="small" class="btn-reset" @click="resetPartnerFilter">{{ $t('reset') }}</el-button>
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
                  <el-button type="text" size="mini" class="text-red" @click="deletePartner(scope.row.id)">{{ $t('delete') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>
    </div>

    <!-- User Modal -->
    <el-dialog :title="userForm.id ? $t('edit_user') : $t('add_user')" :visible.sync="userModalVisible" width="560px" custom-class="dark-dialog">
      <el-form :model="userForm" label-position="top" size="small">
        <el-form-item :label="$t('enterprise_name')">
          <el-input v-model="userForm.enterprise" />
        </el-form-item>
        <div class="form-row">
          <el-form-item :label="$t('login_account')" class="form-col">
            <el-input v-model="userForm.account" />
          </el-form-item>
          <el-form-item :label="$t('login_password')" class="form-col">
            <el-input v-model="userForm.password" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item :label="$t('user_code')" class="form-col">
            <el-input v-model="userForm.code" placeholder="e.g. ZNJS001" />
          </el-form-item>
          <el-form-item :label="$t('phone')" class="form-col">
            <el-input v-model="userForm.phone" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item :label="$t('email')" class="form-col">
            <el-input v-model="userForm.email" />
          </el-form-item>
          <el-form-item :label="$t('service_instance')" class="form-col">
            <el-input v-model="userForm.instance" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item :label="$t('resource_pool_name')" class="form-col">
            <el-input v-model="userForm.poolName" />
          </el-form-item>
          <el-form-item :label="$t('resource_pool_no')" class="form-col">
            <el-input v-model="userForm.poolNo" />
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="saveUser">{{ $t('confirm') }}</el-button>
        <el-button size="small" @click="userModalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>

    <!-- Order Modal -->
    <el-dialog :title="orderForm.id ? $t('edit_order') : $t('add_order')" :visible.sync="orderModalVisible" width="640px" custom-class="dark-dialog">
      <el-form :model="orderForm" label-position="top" size="small">
        <div class="form-row">
          <el-form-item :label="$t('enterprise_name')" class="form-col">
            <el-select v-model="orderForm.enterprise" style="width: 100%">
              <el-option v-for="u in DB.users" :key="u.id" :label="u.enterprise" :value="u.enterprise" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('order_title')" class="form-col">
            <el-input v-model="orderForm.title" placeholder="e.g. ZNJS001_Ntrip" />
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item :label="$t('service_type')" class="form-col">
            <el-select v-model="orderForm.svcType" style="width: 100%" @change="onOrderSvcTypeChange">
              <el-option value="NRTK" label="NRTK" />
              <el-option value="PPP-RTK" label="PPP-RTK" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('account_mode')" class="form-col">
            <el-select v-model="orderForm.acctMode" style="width: 100%">
              <el-option v-for="opt in orderModeOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </el-form-item>
        </div>
        <div class="form-row three-col">
          <el-form-item :label="$t('account_spec')" class="form-col">
            <el-select v-model="orderForm.spec" style="width: 100%" @change="onOrderSpecChange">
              <el-option value="year" label="Year" />
              <el-option value="month" label="Month" />
              <el-option value="day" label="Day" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('stack_qty')" class="form-col">
            <el-select v-model="orderForm.stack" style="width: 100%">
              <el-option v-for="opt in orderStackOptions" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('quantity')" class="form-col">
            <el-input-number v-model="orderForm.qty" :min="1" :max="99" style="width: 100%" />
          </el-form-item>
        </div>
        <el-form-item :label="$t('device_type')">
          <el-input v-model="orderForm.device" placeholder="e.g. GNSS-Receiver-Model-X" />
        </el-form-item>
        <el-form-item v-if="orderForm.accountList" :label="$t('account_list')">
          <el-input v-model="orderForm.accountList" type="textarea" :rows="3" readonly />
        </el-form-item>
        <el-form-item :label="$t('notes')">
          <el-input v-model="orderForm.notes" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="saveOrder">{{ $t('confirm') }}</el-button>
        <el-button size="small" @click="orderModalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>

    <!-- Partner Modal -->
    <el-dialog :title="partnerForm.id ? $t('edit_partner') : $t('add_partner')" :visible.sync="partnerModalVisible" width="480px" custom-class="dark-dialog">
      <el-form :model="partnerForm" label-position="top" size="small">
        <el-form-item :label="$t('partner_name')">
          <el-input v-model="partnerForm.name" />
        </el-form-item>
        <el-form-item :label="$t('enterprise_name')">
          <el-input v-model="partnerForm.enterprise" />
        </el-form-item>
        <el-form-item :label="$t('partner_code')">
          <el-input v-model="partnerForm.code" placeholder="e.g. ZNJS" />
        </el-form-item>
        <el-form-item :label="$t('notes')">
          <el-input v-model="partnerForm.notes" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="savePartner">{{ $t('confirm') }}</el-button>
        <el-button size="small" @click="partnerModalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>

    <!-- Password Modal -->
    <el-dialog :title="$t('change_password')" :visible.sync="passwordModalVisible" width="400px" custom-class="dark-dialog">
      <el-form label-position="top" size="small">
        <el-form-item :label="$t('account_name')">
          <el-input v-model="passwordForm.name" readonly />
        </el-form-item>
        <el-form-item :label="$t('new_password')">
          <el-input v-model="passwordForm.newPassword" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="savePassword">{{ $t('confirm') }}</el-button>
        <el-button size="small" @click="passwordModalVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  data() {
    return {
      activeTab: 'overview',
      userModalVisible: false,
      orderModalVisible: false,
      partnerModalVisible: false,
      passwordModalVisible: false,
      // Raw data store (mirrors the test HTML DB)
      DB: {
        users: [
          { id: 1, enterprise: 'SenseTime', account: 'sensetime@gs.com', password: 'Abc12345', code: 'ZNJS001', phone: '+86-755-86189999', email: 'contact@sensetime.com', instance: 'SRV-SZX-001', poolName: 'Pool-ST-01', poolNo: 'RP-20260501-001', created: '2026-05-01' },
          { id: 2, enterprise: 'DJI', account: 'dji@gs.com', password: 'Xyz67890', code: 'CH003', phone: '+86-755-26656818', email: 'dev@dji.com', instance: 'SRV-SZX-002', poolName: 'Pool-DJI-01', poolNo: 'RP-20260502-001', created: '2026-05-03' },
          { id: 3, enterprise: 'XAG', account: 'xag@gs.com', password: 'Pwd11111', code: 'CH005', phone: '+86-20-83936333', email: 'api@xag.cn', instance: 'SRV-CAN-001', poolName: 'Pool-XAG-01', poolNo: 'RP-20260503-001', created: '2026-05-05' },
          { id: 4, enterprise: 'AutoX', account: 'autox@gs.com', password: 'Qwe22222', code: 'ZNJS003', phone: '+86-21-61133333', email: 'rd@autox.ai', instance: 'SRV-SH-001', poolName: 'Pool-AX-01', poolNo: 'RP-20260504-001', created: '2026-05-08' },
          { id: 5, enterprise: 'DeepRoute', account: 'deeproute@gs.com', password: 'Asd33333', code: 'ZNJS005', phone: '+86-755-86368888', email: 'info@deeproute.ai', instance: 'SRV-SZX-003', poolName: 'Pool-DR-01', poolNo: 'RP-20260505-001', created: '2026-05-10' }
        ],
        orders: [
          { id: 1, enterprise: 'SenseTime', title: 'ZNJS001_Ntrip_Year', orderNo: 'ORD-20260501', svcType: 'NRTK', acctMode: 'Ntrip', spec: 'year', stack: 3, qty: 20, device: 'GNSS-Receiver-V3', accountList: 'ntrip_st001~ntrip_st020', notes: '', status: 'pushed', partner: 'ZNJS', created: '2026-05-02' },
          { id: 2, enterprise: 'DJI', title: 'CH003_SDK_Month', orderNo: 'ORD-20260502', svcType: 'PPP-RTK', acctMode: 'SDK', spec: 'month', stack: 6, qty: 10, device: 'Drone-M300-RTK', accountList: 'DID_dji001~DID_dji010', notes: 'Drone fleet', status: 'unpushed', partner: 'CH', created: '2026-05-06' },
          { id: 3, enterprise: 'XAG', title: 'CH005_Ntrip_Day', orderNo: 'ORD-20260503', svcType: 'NRTK', acctMode: 'Ntrip', spec: 'day', stack: 7, qty: 50, device: 'Agri-Drone-P100', accountList: 'ntrip_xag001~ntrip_xag050', notes: 'Trial batch', status: 'pushed', partner: 'CH', created: '2026-05-07' },
          { id: 4, enterprise: 'AutoX', title: 'ZNJS003_SDK_Year', orderNo: 'ORD-20260504', svcType: 'NRTK', acctMode: 'SDK', spec: 'year', stack: 5, qty: 15, device: 'RoboTaxi-Gen5', accountList: 'DID_ax001~DID_ax015', notes: '', status: 'unpushed', partner: 'ZNJS', created: '2026-05-09' }
        ],
        accounts: [
          { id: 1, name: 'ntrip_st001', password: 'aB3xK9mQ', enterprise: 'SenseTime', svcType: 'NRTK', mode: 'Ntrip', spec: 'year', stack: 3, device: 'GNSS-Receiver-V3', activated: 'activated', created: '2026-05-02', expires: '2027-05-02', partner: 'ZNJS' },
          { id: 2, name: 'ntrip_st002', password: 'pQ7rT2wN', enterprise: 'SenseTime', svcType: 'NRTK', mode: 'Ntrip', spec: 'year', stack: 3, device: 'GNSS-Receiver-V3', activated: 'activated', created: '2026-05-02', expires: '2027-05-02', partner: 'ZNJS' },
          { id: 3, name: 'DID_dji001', password: 'xM4kL8jH', enterprise: 'DJI', svcType: 'PPP-RTK', mode: 'SDK', spec: 'month', stack: 6, device: 'Drone-M300-RTK', activated: 'inactive', created: '2026-05-06', expires: '2026-11-06', partner: 'CH' },
          { id: 4, name: 'DID_dji002', password: 'cV2nB5fG', enterprise: 'DJI', svcType: 'PPP-RTK', mode: 'SDK', spec: 'month', stack: 6, device: 'Drone-M300-RTK', activated: 'activated', created: '2026-05-06', expires: '2026-11-06', partner: 'CH' },
          { id: 5, name: 'ntrip_xag001', password: 'zA9sD4eR', enterprise: 'XAG', svcType: 'NRTK', mode: 'Ntrip', spec: 'day', stack: 7, device: 'Agri-Drone-P100', activated: 'activated', created: '2026-05-07', expires: '2026-05-14', partner: 'CH' },
          { id: 6, name: 'DID_ax001', password: 'yU6hJ3kN', enterprise: 'AutoX', svcType: 'NRTK', mode: 'SDK', spec: 'year', stack: 5, device: 'RoboTaxi-Gen5', activated: 'inactive', created: '2026-05-09', expires: '2027-05-09', partner: 'ZNJS' }
        ],
        partners: [
          { id: 1, name: 'SenseTime', code: 'ZNJS', enterprise: 'SenseTime Group Ltd.', notes: 'Strategic partner' },
          { id: 2, name: 'China Mobile IoT', code: 'CH', enterprise: 'China Mobile IoT Co.', notes: 'Channel partner' },
          { id: 3, name: 'AutoX Partner', code: 'ZNJS', enterprise: 'AutoX Inc.', notes: '' }
        ],
        nextUserId: 6,
        nextOrderId: 5,
        nextAccountId: 7,
        nextPartnerId: 4
      },
      // Filters
      userFilters: { name: '', code: '' },
      orderFilters: { enterprise: '', svcType: '', status: '' },
      accountFilters: { name: '', enterprise: '', svcType: '', activated: '' },
      partnerFilters: { name: '' },
      // Forms
      userForm: this.emptyUserForm(),
      orderForm: this.emptyOrderForm(),
      partnerForm: this.emptyPartnerForm(),
      passwordForm: { id: null, name: '', newPassword: '' },
      orderModeOptions: ['Ntrip', 'SDK'],
      orderStackOptions: [1, 3, 5]
    }
  },
  computed: {
    activeAccountsCount() {
      return this.DB.accounts.filter(a => a.activated === 'activated').length
    },
    pendingOrdersCount() {
      return this.DB.orders.filter(o => o.status === 'unpushed').length
    },
    filteredUsers() {
      return this.DB.users.filter(u => {
        const matchName = !this.userFilters.name || u.enterprise.toLowerCase().includes(this.userFilters.name.toLowerCase())
        const matchCode = !this.userFilters.code || u.code.toLowerCase().includes(this.userFilters.code.toLowerCase())
        return matchName && matchCode
      })
    },
    filteredOrders() {
      return this.DB.orders.filter(o => {
        const matchEnt = !this.orderFilters.enterprise || o.enterprise.toLowerCase().includes(this.orderFilters.enterprise.toLowerCase())
        const matchType = !this.orderFilters.svcType || o.svcType === this.orderFilters.svcType
        const matchStatus = !this.orderFilters.status || o.status === this.orderFilters.status
        return matchEnt && matchType && matchStatus
      })
    },
    filteredAccounts() {
      return this.DB.accounts.filter(a => {
        const matchName = !this.accountFilters.name || a.name.toLowerCase().includes(this.accountFilters.name.toLowerCase())
        const matchEnt = !this.accountFilters.enterprise || a.enterprise.toLowerCase().includes(this.accountFilters.enterprise.toLowerCase())
        const matchType = !this.accountFilters.svcType || a.svcType === this.accountFilters.svcType
        const matchStatus = !this.accountFilters.activated || a.activated === this.accountFilters.activated
        return matchName && matchEnt && matchType && matchStatus
      })
    },
    filteredPartners() {
      return this.DB.partners.filter(p => {
        return !this.partnerFilters.name || p.name.toLowerCase().includes(this.partnerFilters.name.toLowerCase())
      })
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    emptyUserForm() {
      return { id: null, enterprise: '', account: '', password: '', code: '', phone: '', email: '', instance: '', poolName: '', poolNo: '' }
    },
    emptyOrderForm() {
      return { id: null, enterprise: '', title: '', svcType: 'NRTK', acctMode: 'Ntrip', spec: 'year', stack: 1, qty: 1, device: '', accountList: '', notes: '' }
    },
    emptyPartnerForm() {
      return { id: null, name: '', enterprise: '', code: '', notes: '' }
    },
    // Users
    openUserModal(row) {
      if (row) {
        this.userForm = { ...row }
      } else {
        this.userForm = this.emptyUserForm()
      }
      this.userModalVisible = true
    },
    saveUser() {
      const data = { ...this.userForm }
      if (!data.enterprise || !data.account || !data.password) {
        this.$message.warning('Enterprise, Account, and Password are required')
        return
      }
      if (data.id) {
        const idx = this.DB.users.findIndex(u => u.id === data.id)
        if (idx !== -1) this.$set(this.DB.users, idx, data)
      } else {
        data.id = this.DB.nextUserId++
        data.created = new Date().toISOString().slice(0, 10)
        this.DB.users.push(data)
      }
      this.userModalVisible = false
    },
    deleteUser(id) {
      this.$confirm(this.$t('confirm_delete') + ' ID: ' + id, '', { type: 'warning' }).then(() => {
        this.DB.users = this.DB.users.filter(u => u.id !== id)
      }).catch(() => {})
    },
    applyUserFilter() { /* reactive */ },
    resetUserFilter() {
      this.userFilters = { name: '', code: '' }
    },
    // Orders
    openOrderModal(row) {
      if (row) {
        this.orderForm = { ...row }
      } else {
        this.orderForm = this.emptyOrderForm()
      }
      this.onOrderSvcTypeChange()
      this.onOrderSpecChange()
      this.orderModalVisible = true
    },
    editOrder(row) {
      this.openOrderModal(row)
    },
    onOrderSvcTypeChange() {
      if (this.orderForm.svcType === 'PPP-RTK') {
        this.orderModeOptions = ['SDK']
        this.orderForm.acctMode = 'SDK'
      } else {
        this.orderModeOptions = ['Ntrip', 'SDK']
      }
    },
    onOrderSpecChange() {
      const opts = { year: [1, 3, 5], month: [1, 3, 6], day: [1, 3, 7] }
      this.orderStackOptions = opts[this.orderForm.spec] || [1]
      if (!this.orderStackOptions.includes(this.orderForm.stack)) {
        this.orderForm.stack = this.orderStackOptions[0]
      }
    },
    saveOrder() {
      const data = { ...this.orderForm }
      if (!data.title) {
        this.$message.warning('Order title is required')
        return
      }
      const user = this.DB.users.find(u => u.enterprise === data.enterprise)
      const code = user ? user.code : 'XXX'
      const prefix = data.acctMode === 'Ntrip' ? 'ntrip_' : 'DID_'
      data.accountList = prefix + code.toLowerCase() + '001~' + prefix + code.toLowerCase() + String(data.qty).padStart(3, '0')
      if (data.id) {
        const idx = this.DB.orders.findIndex(o => o.id === data.id)
        if (idx !== -1) this.$set(this.DB.orders, idx, { ...this.DB.orders[idx], ...data })
      } else {
        data.id = this.DB.nextOrderId++
        data.orderNo = 'ORD-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + String(data.id).padStart(2, '0')
        data.status = 'unpushed'
        data.partner = (this.DB.partners.find(p => p.enterprise && p.enterprise.includes(data.enterprise)) || {}).code || code
        data.created = new Date().toISOString().slice(0, 10)
        this.DB.orders.push(data)
      }
      this.orderModalVisible = false
    },
    pushOrder(id) {
      const o = this.DB.orders.find(x => x.id === id)
      if (!o) return
      o.status = 'pushed'
      const existing = this.DB.accounts.filter(a => a.enterprise === o.enterprise && a.orderNo === o.orderNo)
      if (existing.length === 0) {
        const prefix = o.acctMode === 'Ntrip' ? 'ntrip_' : 'DID_'
        const user = this.DB.users.find(u => u.enterprise === o.enterprise)
        const code = user ? user.code.toLowerCase() : 'xxx'
        for (let i = 1; i <= o.qty; i++) {
          const randStr = () => Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
          this.DB.accounts.push({
            id: this.DB.nextAccountId++,
            name: prefix + code + String(i).padStart(3, '0'),
            password: randStr(),
            enterprise: o.enterprise,
            svcType: o.svcType,
            mode: o.acctMode,
            spec: o.spec,
            stack: o.stack,
            device: o.device,
            activated: 'inactive',
            created: new Date().toISOString().slice(0, 10),
            expires: new Date(Date.now() + (o.spec === 'year' ? 365 : o.spec === 'month' ? 30 : 7) * 86400000).toISOString().slice(0, 10),
            partner: o.partner,
            orderNo: o.orderNo
          })
        }
      }
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
    applyOrderFilter() { /* reactive */ },
    resetOrderFilter() {
      this.orderFilters = { enterprise: '', svcType: '', status: '' }
    },
    // Accounts
    showPassword(row) {
      this.$alert('Account: ' + row.name + '\nPassword: ' + row.password, 'Account Password', { confirmButtonText: 'OK' })
    },
    openPasswordModal(row) {
      this.passwordForm = { id: row.id, name: row.name, newPassword: '' }
      this.passwordModalVisible = true
    },
    savePassword() {
      const a = this.DB.accounts.find(x => x.id === this.passwordForm.id)
      if (a && this.passwordForm.newPassword) {
        a.password = this.passwordForm.newPassword
      }
      this.passwordModalVisible = false
    },
    exportAccounts() {
      const header = 'Account,Password,Enterprise,Type,Mode,Spec,Stack,Device,Status,Created,Expires'
      const rows = this.DB.accounts.map(a => [a.name, a.password, a.enterprise, a.svcType, a.mode, a.spec, a.stack, a.device, a.activated, a.created, a.expires].join(',')).join('\n')
      const blob = new Blob([header + '\n' + rows], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'accounts_export_' + new Date().toISOString().slice(0, 10) + '.csv'
      a.click()
      URL.revokeObjectURL(url)
    },
    applyAccountFilter() { /* reactive */ },
    resetAccountFilter() {
      this.accountFilters = { name: '', enterprise: '', svcType: '', activated: '' }
    },
    // Partners
    openPartnerModal(row) {
      if (row) {
        this.partnerForm = { ...row }
      } else {
        this.partnerForm = this.emptyPartnerForm()
      }
      this.partnerModalVisible = true
    },
    savePartner() {
      const data = { ...this.partnerForm }
      if (!data.name || !data.enterprise) {
        this.$message.warning('Partner name and enterprise are required')
        return
      }
      if (data.id) {
        const idx = this.DB.partners.findIndex(p => p.id === data.id)
        if (idx !== -1) this.$set(this.DB.partners, idx, data)
      } else {
        data.id = this.DB.nextPartnerId++
        this.DB.partners.push(data)
      }
      this.partnerModalVisible = false
    },
    deletePartner(id) {
      this.$confirm(this.$t('confirm_delete') + ' ID: ' + id, '', { type: 'warning' }).then(() => {
        this.DB.partners = this.DB.partners.filter(p => p.id !== id)
      }).catch(() => {})
    },
    applyPartnerFilter() { /* reactive */ },
    resetPartnerFilter() {
      this.partnerFilters = { name: '' }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  min-height: calc(100vh - 64px);
}

.dashboard-layout {
  display: flex;
  min-height: calc(100vh - 64px);
}

.dashboard-sidebar {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid $border-color;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  gap: 12px;

  .brand-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, $blue-500, $cyan-400);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon-svg {
      width: 20px;
      height: 20px;
      color: #fff;
    }
  }

  .user-name {
    font-size: 14px;
    font-weight: 600;
  }

  .user-role {
    font-size: 12px;
    color: $green-400;
  }
}

.sidebar-menu {
  flex: 1;
  border-right: none !important;
  background: transparent !important;

  ::v-deep .el-menu-item {
    color: $text-gray-400;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 48px;
    line-height: 48px;
    border-radius: 8px;
    margin: 4px 8px;

    &.is-active {
      background: rgba(59, 130, 246, 0.15) !important;
      color: #fff !important;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.05) !important;
    }
  }
}

.menu-icon {
  width: 18px;
  height: 18px;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid $border-color;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent !important;
  border: none !important;
  color: $text-gray-400 !important;

  &:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    color: #fff !important;
  }
}

.dashboard-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.tab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  .page-title {
    margin-bottom: 0;
  }
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

.text-red {
  color: #ef4444;
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
