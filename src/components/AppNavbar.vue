<template>
  <nav class="app-navbar glass">
    <div class="navbar-container container">
      <!-- Logo -->
      <div class="navbar-brand" @click="$router.push('/')">
        <div class="brand-icon">
          <svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 1.5 1.5 0 01-1.072-1.484M21 13a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="brand-text text-gradient">GlobalService</span>
      </div>

      <!-- Desktop Menu -->
      <div class="desktop-menu">
        <el-menu :default-active="activeMenu" mode="horizontal" :router="true" text-color="#d1d5db"
          active-text-color="#3b82f6" class="nav-menu">
          <el-menu-item index="/">{{ $t('nav_home') }}</el-menu-item>
          <el-menu-item index="/products">{{ $t('nav_products') }}</el-menu-item>
          <el-menu-item index="/coverage">{{ $t('nav_coverage') }}</el-menu-item>
          <el-menu-item index="/knowledge">{{ $t('nav_knowledge') }}</el-menu-item>
        </el-menu>
      </div>

      <!-- Right Actions -->
      <div class="navbar-actions">
        <el-button size="small" class="lang-btn glass-light" @click="toggleLang">
          {{ langLabel }}
        </el-button>
        <template v-if="!isLoggedIn">
          <el-button size="small" type="primary" class="signin-btn glow-blue" @click="$router.push('/login')">
            {{ $t('signin') }}
          </el-button>
        </template>
        <template v-else>
          <el-button size="small" type="primary" class="signin-btn glow-blue" @click="$router.push('/dashboard/overview')">
            {{ $t('my_account') }}
          </el-button>
        </template>
        <el-button class="mobile-toggle" @click="mobileOpen = !mobileOpen">
          <svg class="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </el-button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileOpen" class="mobile-menu">
      <router-link class="mobile-link" to="/" @click.native="mobileOpen = false">{{ $t('nav_home') }}</router-link>
      <router-link class="mobile-link" to="/products" @click.native="mobileOpen = false">{{ $t('nav_products')
        }}</router-link>
      <router-link class="mobile-link" to="/coverage" @click.native="mobileOpen = false">{{ $t('nav_coverage')
        }}</router-link>
      <router-link class="mobile-link" to="/knowledge" @click.native="mobileOpen = false">{{ $t('nav_knowledge')
        }}</router-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppNavbar',
  data() {
    return {
      mobileOpen: false
    }
  },
  computed: {
    ...mapState(['lang', 'isLoggedIn']),
    activeMenu() {
      return this.$route.path
    },
    langLabel() {
      return this.lang === 'en' ? 'EN' : '中文'
    }
  },
  watch: {
    '$route'() {
      this.mobileOpen = false
    }
  },
  methods: {
    toggleLang() {
      const newLang = this.lang === 'en' ? 'zh' : 'en'
      this.$store.commit('SET_LANG', newLang)
      this.$i18n.locale = newLang
      this.mobileOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;

  .brand-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon-svg {
      width: 24px;
      height: 24px;
      color: #fff;
    }
  }

  .brand-text {
    font-size: 20px;
    font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
  }
}

.desktop-menu {
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-menu {
  background: transparent !important;
  border-bottom: none !important;

  ::v-deep .el-menu-item {
    font-size: 14px;
    font-weight: 500;
    height: 64px;
    line-height: 64px;
    border-bottom: 2px solid transparent;
    padding: 0 16px;
    margin: 0 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.05) !important;
    }

    &.is-active {
      border-bottom-color: #3b82f6;
      background: transparent !important;
    }
  }
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lang-btn {
  color: #d1d5db;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px;
  font-size: 13px;
  padding: 10px 12px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}

.signin-btn {
  border-radius: 6px;
  font-size: 13px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4) !important;
  border: none !important;
}

.mobile-toggle {
  display: none;
  background: transparent !important;
  border: none !important;
  padding: 8px;

  @media (max-width: 768px) {
    display: inline-flex;
  }

  .hamburger-icon {
    width: 24px;
    height: 24px;
    color: #d1d5db;
  }
}

.mobile-menu {
  padding: 8px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .mobile-link {
    padding: 10px 16px;
    color: #d1d5db;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
    }
  }
}
</style>
