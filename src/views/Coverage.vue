<template>
  <div class="coverage-page">
    <div class="container section-py">
      <div class="section-header">
        <h1>{{ $t('coverage_title') }}</h1>
        <p class="section-subtitle">{{ $t('coverage_subtitle') }}</p>
      </div>

      <!-- Map Container -->
      <div class="map-wrapper">
        <div class="map-inner">
          <CoverageMap ref="coverageMap" />

          <!-- Left Panel - Search -->
          <div class="coverage-panel search-panel glass">
            <!-- Mode Toggle -->
            <div class="mode-toggle">
              <el-button :class="['mode-btn', { active: searchMode === 'coord' }]" size="small"
                @click="searchMode = 'coord'">{{ $t('by_coords') }}</el-button>
              <el-button :class="['mode-btn', { active: searchMode === 'keyword' }]" size="small"
                @click="searchMode = 'keyword'">{{ $t('by_keywords') }}</el-button>
            </div>

            <!-- Format Toggle (for coordinates) -->
            <div v-if="searchMode === 'coord'" class="format-toggle">
              <el-button :class="['format-btn', { active: coordFormat === 'deg' }]" size="mini"
                @click="coordFormat = 'deg'">{{ $t('degrees') }}</el-button>
              <el-button :class="['format-btn', { active: coordFormat === 'dms' }]" size="mini"
                @click="coordFormat = 'dms'">{{ $t('dms') }}</el-button>
            </div>

            <!-- Coordinate Inputs -->
            <div v-if="searchMode === 'coord'" class="input-group">
              <div class="input-item">
                <label>{{ $t('longitude') }}</label>
                <el-input v-model="longitude" size="small" :placeholder="$t('longitude_placeholder')" />
              </div>
              <div class="input-item">
                <label>{{ $t('latitude') }}</label>
                <el-input v-model="latitude" size="small" :placeholder="$t('latitude_placeholder')" />
              </div>
            </div>

            <!-- Keyword Input -->
            <div v-if="searchMode === 'keyword'" class="input-group">
              <div class="input-item">
                <label>{{ $t('search_location') }}</label>
                <el-input v-model="locationKeyword" size="small" :placeholder="$t('search_placeholder')" />
              </div>
            </div>

            <el-button class="confirm-btn" @click="handleSearch">
              {{ $t('confirm') }}
            </el-button>

            <div class="current-coords">
              <div>{{ $t('current_lng') }}</div>
              <div>{{ $t('current_lat') }}</div>
            </div>
          </div>

          <!-- Bottom Left - Layer Legend -->
          <div class="coverage-panel layer-panel glass">
            <div class="layer-title">{{ $t('layers') }}</div>
            <div class="layer-list">
              <el-checkbox v-model="showNRTK" @change="onLayerChange('nrtk', $event)">
                <span class="layer-tag nrtk-tag">NRTK</span>
              </el-checkbox>
              <el-checkbox v-model="showPPPRTK" @change="onLayerChange('ppp-rtk', $event)">
                <span class="layer-tag ppp-tag">PPP-RTK</span>
              </el-checkbox>
            </div>
          </div>

          <!-- Bottom Right - Links -->
          <div class="coverage-panel link-panel glass">
            <a href="#" class="panel-link">{{ $t('about_us') }}</a>
            <a href="#" class="panel-link">{{ $t('user_agreement') }}</a>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="glass stat-card">
          <div class="stat-number text-gradient">40+</div>
          <div class="stat-label">{{ $t('countries') }}</div>
        </div>
        <div class="glass stat-card">
          <div class="stat-number text-gradient">8,000+</div>
          <div class="stat-label">{{ $t('stations') }}</div>
        </div>
        <div class="glass stat-card">
          <div class="stat-number text-gradient">99.99%</div>
          <div class="stat-label">{{ $t('uptime') }}</div>
        </div>
        <div class="glass stat-card">
          <div class="stat-number text-gradient">24/7</div>
          <div class="stat-label">{{ $t('operations') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoverageMap from '@/components/CoverageMap.vue'

export default {
  name: 'CoveragePage',
  components: {
    CoverageMap
  },
  data() {
    return {
      searchMode: 'coord',
      coordFormat: 'deg',
      longitude: '',
      latitude: '',
      locationKeyword: '',
      showNRTK: true,
      showPPPRTK: false
    }
  },
  methods: {
    handleSearch() {
      if (this.searchMode === 'coord') {
        const lng = parseFloat(this.longitude)
        const lat = parseFloat(this.latitude)
        if (!isNaN(lat) && !isNaN(lng)) {
          this.$refs.coverageMap.setView(lat, lng)
        } else {
          this.$message.warning('Please enter valid coordinates')
        }
      } else if (this.searchMode === 'keyword') {
        const keyword = this.locationKeyword.trim()
        if (!keyword) {
          this.$message.warning('Please enter a location keyword')
          return
        }
        const result = this.$refs.coverageMap.searchByKeyword(keyword)
        if (!result) {
          this.$message.warning('Location not found')
        }
      }
    },
    onLayerChange(layer, checked) {
      if (this.$refs.coverageMap) {
        this.$refs.coverageMap.toggleLayer(layer, checked)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.coverage-page {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;

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

.map-wrapper {
  margin-bottom: 48px;
}

.map-inner {
  position: relative;
  width: 100%;
  height: 600px;

  ::v-deep .coverage-map-wrapper {
    position: absolute;
    inset: 0;
  }
}

// Panels
.coverage-panel {
  position: absolute;
  z-index: 1000;
  border-radius: 12px;
  padding: 16px;
  @include glass;

  &.search-panel {
    top: 16px;
    left: 16px;
    width: 280px;
  }

  &.layer-panel {
    bottom: 16px;
    left: 16px;
  }

  &.link-panel {
    bottom: 16px;
    right: 16px;
    padding: 8px 16px;
    display: flex;
    gap: 16px;
  }
}

// Search Panel
.mode-toggle,
.format-toggle {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.mode-btn {
  flex: 1;
  font-size: 12px;
  border-radius: 8px;
  background: transparent !important;
  color: $text-gray-400 !important;
  border: 1px solid transparent !important;

  &.active {
    background: rgba(249, 115, 22, 0.2) !important;
    color: $orange-500 !important;
    border-color: rgba(249, 115, 22, 0.3) !important;
  }
}

.format-btn {
  font-size: 11px;
  border-radius: 6px;
  background: transparent !important;
  color: $text-gray-400 !important;
  border: 1px solid transparent !important;

  &.active {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
  }
}

.input-group {
  margin-bottom: 12px;
}

.input-item {
  margin-bottom: 8px;

  label {
    display: block;
    font-size: 13px;
    color: $text-gray-400;
    margin-bottom: 4px;
  }
}

.confirm-btn {
  width: 100%;
  margin-top: 16px;
  margin-bottom: 12px;
  padding: 10px 0;
  background: linear-gradient(135deg, #f97316, #ea580c) !important;
  border: none !important;
  border-radius: 8px;
  color: #fff !important;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #ea580c, #c2410c) !important;
    color: #fff !important;
  }
}

.current-coords {
  padding-top: 12px;
  border-top: 1px solid $border-color;
  font-size: 12px;
  color: $text-gray-500;
  line-height: 1.6;
}

// Layer Panel
.layer-panel {
  .layer-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
  }
}

.layer-list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  ::v-deep .el-checkbox {
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #f97316;
      border-color: #f97316;
    }

    .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #f97316;
    }

    .el-checkbox__label {
      color: $text-gray-400;
      padding-left: 8px;
    }
  }
}

.layer-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.2s;
  opacity: 1;

  &.nrtk-tag {
    background: transparent;
    // border: 1px solid rgba(249, 115, 22, 1);
  }

  &.ppp-tag {
    background: transparent;
  }
}

::v-deep .el-checkbox.is-checked {
  .layer-tag {
    background: rgba(234, 88, 12, 0.2);
    border: 1px solid rgba(234, 88, 12, 1);
  }
}

// Link Panel
.panel-link {
  font-size: 13px;
  color: $text-gray-400;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
}

// Stats
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: $text-gray-400;
}
</style>
