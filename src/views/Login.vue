<template>
  <div class="login-page">
    <div class="container section-py">
      <div class="login-card glass">
        <div class="login-header">
          <div class="login-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 1.5 1.5 0 01-1.072-1.484M21 13a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h1>{{ $t('welcome') }}</h1>
          <p class="login-subtitle">{{ $t('signin_desc') }}</p>
        </div>

        <el-form :model="form" class="login-form">
          <el-form-item>
            <el-input
              v-model="form.email"
              :placeholder="$t('email')"
              prefix-icon="el-icon-message"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              type="password"
              :placeholder="$t('password')"
              prefix-icon="el-icon-lock"
              show-password
            />
          </el-form-item>

          <div class="form-options">
            <el-checkbox v-model="form.remember">{{ $t('remember') }}</el-checkbox>
            <a href="#" class="forgot-link">{{ $t('forgot') }}</a>
          </div>

          <el-button type="primary" class="login-btn" @click="handleLogin">
            {{ $t('signin_btn') }}
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('login')
      this.$router.push('/dashboard/overview')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.login-card {
  max-width: 480px;
  margin: 0 auto;
  border-radius: 16px;
  padding: 48px;
  width: 100%;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, $blue-500, $cyan-400);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;

  svg {
    width: 32px;
    height: 32px;
    color: #fff;
  }
}

.login-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.login-subtitle {
  color: $text-gray-400;
  font-size: 14px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.forgot-link {
  font-size: 14px;
  color: $blue-500;
  &:hover {
    color: lighten($blue-500, 10%);
  }
}

.login-btn {
  width: 100%;
  padding: 16px 0;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, $blue-500, $cyan-500) !important;
  border: none !important;
}
</style>
