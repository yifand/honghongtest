<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">{{ $t('not_found_title') || '页面不存在' }}</h1>
      <p class="error-desc">{{ $t('not_found_desc') || '您访问的页面可能已被移除或地址输入有误' }}</p>
      <el-button type="primary" class="back-btn" @click="$router.push('/')">
        {{ $t('back_home') || '返回首页' }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
