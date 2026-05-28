<template>
  <div class="products-page">
    <div class="container section-py">
      <div class="section-header">
        <h1>{{ $t('products_title') }}</h1>
        <p class="section-subtitle">{{ $t('products_subtitle') }}</p>
      </div>

      <!-- Product Cards -->
      <div class="products-grid">
        <!-- NRTK -->
        <el-card class="product-card glass card-hover">
          <div class="product-header">
            <div class="product-icon icon-blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
            </div>
            <div>
              <h2 class="product-name">NRTK</h2>
              <p class="product-desc">{{ $t('nrtk_desc') }}</p>
            </div>
          </div>

          <div class="product-specs">
            <div class="spec-row">
              <span class="spec-label">{{ $t('accuracy_h') }}</span>
              <span class="spec-value text-gradient">2.5 cm</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('accuracy_v') }}</span>
              <span class="spec-value text-gradient">5 cm</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('convergence') }}</span>
              <span class="spec-value">{{ $t('instant') }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('coverage') }}</span>
              <span class="spec-value">{{ $t('europe_asia_mena_na') }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('latency') }}</span>
              <span class="spec-value">&lt; 1 second</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('protocol') }}</span>
              <span class="spec-value">NTRIP v1/v2, RTCM 3.x</span>
            </div>
          </div>

          <el-button type="primary" class="product-btn btn-blue" @click="$router.push('/login')">
            {{ $t('get_started') }}
          </el-button>
        </el-card>

        <!-- PPP-RTK -->
        <el-card class="product-card glass card-hover">
          <div class="product-header">
            <div class="product-icon icon-cyan">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 1.5 1.5 0 01-1.072-1.484M21 13a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h2 class="product-name">PPP-RTK</h2>
              <p class="product-desc">{{ $t('ppp_desc') }}</p>
            </div>
          </div>

          <div class="product-specs">
            <div class="spec-row">
              <span class="spec-label">{{ $t('accuracy_h') }}</span>
              <span class="spec-value text-gradient">2.5 cm</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('accuracy_v') }}</span>
              <span class="spec-value text-gradient">6 cm</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('convergence') }}</span>
              <span class="spec-value">{{ $t('convergence_time') }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('coverage') }}</span>
              <span class="spec-value green-text">{{ $t('europe_sa') }}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('latency') }}</span>
              <span class="spec-value">&lt; 1 second</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">{{ $t('protocol') }}</span>
              <span class="spec-value">SSR, RTCM</span>
            </div>
          </div>

          <el-button type="primary" class="product-btn btn-cyan" @click="$router.push('/login')">
            {{ $t('get_started') }}
          </el-button>
        </el-card>
      </div>

      <!-- SDK Section -->
      <div class="sdk-section glass">
        <h2 class="sdk-title">{{ $t('sdk_title') }}</h2>
        <div class="sdk-grid">
          <div class="sdk-item">
            <div class="sdk-icon icon-yellow">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
              </svg>
            </div>
            <h3 class="sdk-name">Linux SDK</h3>
            <p class="sdk-desc">{{ $t('linux_sdk_desc') }}</p>
          </div>
          <div class="sdk-item">
            <div class="sdk-icon icon-green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="sdk-name">Android SDK</h3>
            <p class="sdk-desc">{{ $t('android_sdk_desc') }}</p>
          </div>
          <div class="sdk-item">
            <div class="sdk-icon icon-orange">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
              </svg>
            </div>
            <h3 class="sdk-name">FreeRTOS SDK</h3>
            <p class="sdk-desc">{{ $t('freertos_sdk_desc') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsPage'
}
</script>

<style lang="scss" scoped>
.products-page {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;

  h1 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 16px;
  }
}

.section-subtitle {
  font-size: 18px;
  color: $text-gray-400;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 32px;
  margin-bottom: 64px;
  justify-content: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.product-card {
  border-radius: 16px;
  padding: 8px;
}

.product-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  .product-icon {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

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

  .product-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .product-desc {
    font-size: 14px;
    color: $text-gray-400;
  }
}

.product-specs {
  margin-bottom: 24px;

  .spec-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid $border-color;

    &:last-child {
      border-bottom: none;
    }
  }

  .spec-label {
    font-size: 14px;
    color: $text-gray-400;
  }

  .spec-value {
    font-size: 14px;
    font-weight: 600;
    color: #fff;

    &.green-text {
      color: $green-400;
    }
  }
}

.product-btn {
  width: 100%;
  padding: 16px 0;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;

  &.btn-blue {
    background: linear-gradient(135deg, $blue-500, darken($blue-500, 10%)) !important;
    border: none !important;
  }
  &.btn-cyan {
    background: linear-gradient(135deg, $cyan-500, darken($cyan-500, 10%)) !important;
    border: none !important;
  }
}

// SDK Section
.sdk-section {
  border-radius: 16px;
  padding: 48px;
  text-align: center;
}

.sdk-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 40px;
}

.sdk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.sdk-item {
  padding: 24px;
}

.sdk-icon {
  width: 64px;
  height: 64px;
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

  &.icon-yellow {
    background: linear-gradient(135deg, #eab308, #ca8a04);
  }
  &.icon-green {
    background: linear-gradient(135deg, #22c55e, #16a34a);
  }
  &.icon-orange {
    background: linear-gradient(135deg, #f97316, #ea580c);
  }
}

.sdk-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.sdk-desc {
  font-size: 14px;
  color: $text-gray-400;
}
</style>
