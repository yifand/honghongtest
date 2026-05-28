<template>
  <div class="featured-services section-py">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ $t('services_title') }}</h2>
        <p class="section-subtitle">{{ $t('services_subtitle') }}</p>
      </div>

      <div class="services-grid">
        <!-- NRTK Card -->
        <div class="glass service-card card-hover">
          <div class="service-icon icon-blue">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
          </div>
          <h3 class="service-name">NRTK</h3>
          <p class="service-area">{{ $t('nrtk_area') }}</p>
          <p class="service-accuracy text-gradient">2.5cm</p>
          <p class="service-label">{{ $t('accuracy') }}</p>
          <el-button class="service-btn btn-blue" @click="$router.push('/products')">
            {{ $t('learn_more') }}
          </el-button>
        </div>

        <!-- PPP-RTK Card -->
        <div class="glass service-card card-hover">
          <div class="service-icon icon-cyan">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 1.5 1.5 0 01-1.072-1.484M21 13a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="service-name">PPP-RTK</h3>
          <p class="service-area">{{ $t('ppp_area') }}</p>
          <p class="service-accuracy text-gradient">2.5cm</p>
          <p class="service-label">{{ $t('accuracy') }}</p>
          <el-button class="service-btn btn-cyan" @click="$router.push('/products')">
            {{ $t('learn_more') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedServices'
}
</script>

<style lang="scss" scoped>
.featured-services {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: $text-gray-400;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
  justify-content: center;
}

.service-card {
  border-radius: 16px;
  padding: 32px;
  text-align: center;
}

.service-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 32px;
    height: 32px;
    color: #fff;
  }

  &.icon-blue {
    background: linear-gradient(135deg, $blue-500, darken($blue-500, 10%));
  }
  &.icon-cyan {
    background: linear-gradient(135deg, $cyan-500, darken($cyan-500, 10%));
  }
}

.service-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}

.service-area {
  font-size: 14px;
  color: $text-gray-400;
  margin-bottom: 16px;
}

.service-accuracy {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 4px;
}

.service-label {
  font-size: 14px;
  color: $text-gray-400;
  margin-bottom: 24px;
}

.service-btn {
  width: 100%;
  padding: 12px 0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  background: transparent !important;

  &.btn-blue {
    color: $blue-500;
    background: rgba(59, 130, 246, 0.2) !important;
    border: 1px solid rgba(59, 130, 246, 0.3) !important;
    &:hover {
      background: rgba(59, 130, 246, 0.3) !important;
    }
  }
  &.btn-cyan {
    color: $cyan-400;
    background: rgba(6, 182, 212, 0.2) !important;
    border: 1px solid rgba(6, 182, 212, 0.3) !important;
    &:hover {
      background: rgba(6, 182, 212, 0.3) !important;
    }
  }
}
</style>
