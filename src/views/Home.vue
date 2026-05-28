<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero hero-gradient">
      <div class="hero-bg">
        <div class="hero-blob blob-1 float-animation"></div>
        <div class="hero-blob blob-2 float-animation" style="animation-delay: 2s;"></div>
        <div class="hero-blob blob-3 float-animation" style="animation-delay: 4s;"></div>
      </div>

      <div class="container hero-content">
        <div class="hero-grid">
          <div class="hero-text">
            <div class="hero-badge glass">
              <span class="badge-dot animate-pulse"></span>
              <span class="badge-text">{{ $t('home_subtitle') }}</span>
            </div>

            <h1 class="hero-title">
              {{ $t('home_title_prefix') }} <span class="text-gradient">{{ $t('home_title_highlight') }}</span>
            </h1>
            <p class="hero-desc">{{ $t('home_desc') }}</p>

            <div class="hero-actions">
              <el-button class="hero-btn btn-outline" @click="$router.push('/coverage')">
                {{ $t('view_coverage') }}
              </el-button>
              <el-button type="primary" class="hero-btn btn-primary glow-blue" @click="$router.push('/products')">
                {{ $t('get_sdk') }}
              </el-button>
            </div>
          </div>

          <div class="hero-visual">
            <div class="visual-card glass">
              <svg viewBox="0 0 400 400" class="visual-svg">
                <defs>
                  <radialGradient id="earthGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#020617;stop-opacity:0" />
                  </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="180" fill="url(#earthGrad)" class="satellite-pulse" />
                <g fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="0.5">
                  <ellipse cx="200" cy="200" rx="160" ry="40" />
                  <ellipse cx="200" cy="200" rx="160" ry="40" transform="rotate(30 200 200)" />
                  <ellipse cx="200" cy="200" rx="160" ry="40" transform="rotate(60 200 200)" />
                  <ellipse cx="200" cy="200" rx="160" ry="40" transform="rotate(90 200 200)" />
                  <ellipse cx="200" cy="200" rx="40" ry="160" />
                  <ellipse cx="200" cy="200" rx="40" ry="160" transform="rotate(30 200 200)" />
                  <ellipse cx="200" cy="200" rx="40" ry="160" transform="rotate(60 200 200)" />
                </g>
                <circle cx="200" cy="200" r="20" fill="#3b82f6" class="satellite-pulse" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Services -->
    <FeaturedServices />

    <!-- Industry Solutions -->
    <IndustrySolutions />
  </div>
</template>

<script>
import FeaturedServices from '@/components/FeaturedServices.vue'
import IndustrySolutions from '@/components/IndustrySolutions.vue'

export default {
  name: 'HomePage',
  components: {
    FeaturedServices,
    IndustrySolutions
  }
}
</script>

<style lang="scss" scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  .hero-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .hero-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.1;

    &.blob-1 {
      top: 80px;
      left: 40px;
      width: 288px;
      height: 288px;
      background: $blue-500;
    }

    &.blob-2 {
      top: 160px;
      right: 80px;
      width: 384px;
      height: 384px;
      background: $cyan-500;
    }

    &.blob-3 {
      bottom: 80px;
      left: 33%;
      width: 320px;
      height: 320px;
      background: $purple-500;
    }
  }
}

.hero-content {
  position: relative;
  z-index: 10;
  padding: 80px 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  margin-bottom: 24px;

  .badge-dot {
    width: 12px;
    height: 12px;
    background: $green-400;
    border-radius: 50%;
    margin-right: 8px;
  }

  .badge-text {
    font-size: 14px;
    color: $text-gray-300;
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.15;

  @media (max-width: 768px) {
    font-size: 36px;
  }
}

.hero-desc {
  font-size: 18px;
  color: $text-gray-300;
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.hero-btn {
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;

  &.btn-outline {
    @include glass;
    color: #fff;
    border-color: $border-color;

    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }

  &.btn-primary {
    background: linear-gradient(135deg, $blue-500, $cyan-500) !important;
    border: none !important;
  }
}

.hero-visual {
  display: flex;
  justify-content: center;

  @media (max-width: 1024px) {
    display: none;
  }
}

.visual-card {
  width: 100%;
  height: 384px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 280px;
  }

  .visual-svg {
    width: 100%;
    height: 100%;
  }
}
</style>
