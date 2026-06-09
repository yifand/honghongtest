<template>
  <div class="dashboard-page">
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar glass">
        <div class="sidebar-header">
          <div class="brand-icon">
            <svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="user-info">
            <p class="user-name">{{ userName }}</p>
            <p class="user-role">{{ $t('role_admin') }}</p>
          </div>
        </div>

        <el-menu :default-active="activeMenu" class="sidebar-menu" :router="true">
          <el-menu-item index="/dashboard/overview">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span slot="title">{{ $t('dash_overview') }}</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/users">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span slot="title">{{ $t('dash_users') }}</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/orders">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span slot="title">{{ $t('dash_orders') }}</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/accounts">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span slot="title">{{ $t('dash_accounts') }}</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/partners">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span slot="title">{{ $t('dash_partners') }}</span>
          </el-menu-item>
          <!-- <el-menu-item index="/dashboard/billing">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span slot="title">{{ $t('dash_billing') }}</span>
          </el-menu-item> -->
        </el-menu>

        <div class="sidebar-footer">
          <el-button class="logout-btn" @click="handleLogout">
            <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{{ $t('logout') }}</span>
          </el-button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="dashboard-main custom-scrollbar">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from '@/common/js/api'
export default {
  name: 'DashboardLayout',
  computed: {
    activeMenu() {
      return this.$route.path
    },
    userName() {
      return this.$store.state.userName
    }
  },
  methods: {
    handleLogout() {
      // logout().then(() => {
      this.$store.dispatch('logout')
      this.$router.push('/')
      // })

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
  height: calc(100vh - 64px);
}

.dashboard-sidebar {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid $border-color;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  height: 40px;
  padding: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px;
  background: transparent !important;
  border: none !important;
  color: $text-gray-400 !important;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    color: #fff !important;
  }

  ::v-deep span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}

.dashboard-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>
