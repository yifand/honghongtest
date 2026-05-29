<template>
  <div class="not-found-page">
    <el-button size="small" class="lang-btn" @click="toggleLang">
      {{ langLabel }}
    </el-button>
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">{{ $t('not_found_title') }}</h1>
      <p class="error-desc">{{ $t('not_found_desc') }}</p>
      <el-button type="primary" class="back-btn" @click="$router.push('/')">
        {{ $t('back_home') }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  computed: {
    langLabel() {
      return this.$i18n.locale === 'en' ? 'EN' : '中文'
    }
  },
  methods: {
    toggleLang() {
      const newLang = this.$i18n.locale === 'en' ? 'zh' : 'en'
      this.$i18n.locale = newLang
      this.$store.commit('SET_LANG', newLang)
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.lang-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  color: #d1d5db;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px;
  font-size: 13px;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #fff;
  }
}

.not-found-content {
  text-align: center;
  padding: 48px;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, $blue-500, $cyan-400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
}

.error-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
}

.error-desc {
  font-size: 14px;
  color: $text-gray-400;
  margin-bottom: 32px;
}

.back-btn {
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, $blue-500, $cyan-500) !important;
  border: none !important;
}
</style>
