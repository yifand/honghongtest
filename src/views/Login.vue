<template>
  <div class="login-page">
    <div class="container section-py">
      <div class="login-card glass">
        <div class="login-header">
          <div class="login-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 1.5 1.5 0 01-1.072-1.484M21 13a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1>{{ $t('welcome') }}</h1>
          <p class="login-subtitle">{{ $t('signin_desc') }}</p>
        </div>

        <el-form ref="loginForm" :model="form" :rules="rules" class="login-form" @submit.native.prevent>
          <el-form-item prop="username">
            <el-input v-model="form.username" :placeholder="$t('username')" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" :placeholder="$t('password')" prefix-icon="el-icon-lock"
              show-password />
          </el-form-item>

          <div class="form-options">
            <el-checkbox v-model="form.remember">{{ $t('remember') }}</el-checkbox>
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
import { login } from '@/common/js/api'
import { AESEncryptPassword, Encrypt, Decrypt } from '@/common/js/crypto.js'
import { RES_SUCCESS } from '@/common/js/const.js'
import { validatePasswordComplexity, validateAccountNoChineseAndSpace } from '@/common/js/utils.js'

const REMEMBER_KEY = 'login_remember'
const USERNAME_KEY = 'login_username'
const PASSWORD_KEY = 'login_password'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: false
      }
    }
  },
  computed: {
    rules() {
      return {
        username: [
          { required: true, message: this.$t('username_required'), trigger: 'blur' },
          { validator: (rule, value, callback) => validateAccountNoChineseAndSpace(value, callback), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('password_required'), trigger: 'blur' },
          { validator: this.validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadRememberedCredentials()
  },
  methods: {
    validatePassword(rule, value, callback) {
      validatePasswordComplexity(value, callback, this.$t)
    },
    loadRememberedCredentials() {
      const remember = localStorage.getItem(REMEMBER_KEY) === 'true'
      if (!remember) return
      const username = localStorage.getItem(USERNAME_KEY)
      const encryptedPassword = localStorage.getItem(PASSWORD_KEY)
      if (username) {
        this.form.username = username
      }
      if (encryptedPassword) {
        try {
          this.form.password = Decrypt(encryptedPassword)
        } catch (e) {
          this.clearRememberedCredentials()
        }
      }
      this.form.remember = true
    },
    saveRememberedCredentials() {
      if (this.form.remember) {
        localStorage.setItem(REMEMBER_KEY, 'true')
        localStorage.setItem(USERNAME_KEY, this.form.username)
        localStorage.setItem(PASSWORD_KEY, Encrypt(this.form.password))
      } else {
        this.clearRememberedCredentials()
      }
    },
    clearRememberedCredentials() {
      localStorage.removeItem(REMEMBER_KEY)
      localStorage.removeItem(USERNAME_KEY)
      localStorage.removeItem(PASSWORD_KEY)
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return

        // 接入真实后端时，取消下面注释并传入实际参数
        login({
          username: this.form.username,
          password: AESEncryptPassword(this.form.password)
        }).then(res => {
          if (res.code === RES_SUCCESS) {
            this.saveRememberedCredentials()
            this.$store.commit('SET_USERNAME', this.form.username)
            const isAdmin = this.$store.state.role && this.$store.state.role.includes('9')
            const defaultPath = isAdmin ? '/dashboard/overview' : '/dashboard/accounts'
            const redirect = this.$route.query.redirect || defaultPath
            this.$router.push(redirect)
            this.$message.success(this.$t('login_success'))
          } else {
            this.$message.error(res.message || this.$t('login_failed'))
          }
        }).catch(error => {
          this.$message.error((error && error.message) || this.$t('login_failed'))
        })
      })
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
