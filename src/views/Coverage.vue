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
              <el-button v-if="false" :class="['mode-btn', { active: searchMode === 'keyword' }]" size="small"
                @click="searchMode = 'keyword'">{{ $t('by_keywords') }}</el-button>
            </div>

            <!-- Format Toggle (for coordinates) -->
            <div v-if="searchMode === 'coord'" class="format-toggle">
              <el-button v-if="false" :class="['format-btn', { active: coordFormat === 'deg' }]" size="mini"
                @click="coordFormat = 'deg'">{{ $t('degrees') }}</el-button>
              <!-- <el-button :class="['format-btn', { active: coordFormat === 'dms' }]" size="mini"
                @click="coordFormat = 'dms'">{{ $t('dms') }}</el-button> -->
            </div>

            <!-- Coordinate Inputs (Decimal Degrees) -->
            <div v-if="searchMode === 'coord' && coordFormat === 'deg'" class="input-group">
              <div class="input-item">
                <label>{{ $t('longitude') }}</label>
                <el-input v-model="longitude" size="small" :placeholder="$t('longitude_placeholder')" />
              </div>
              <div class="input-item">
                <label>{{ $t('latitude') }}</label>
                <el-input v-model="latitude" size="small" :placeholder="$t('latitude_placeholder')" />
              </div>
            </div>

            <!-- Coordinate Inputs (DMS) -->
            <div v-if="searchMode === 'coord' && coordFormat === 'dms'" class="input-group">
              <div class="input-item">
                <label>{{ $t('longitude') }}</label>
                <el-input v-model="longitudeDms" size="small" :placeholder="$t('dms_placeholder')" />
              </div>
              <div class="input-item">
                <label>{{ $t('latitude') }}</label>
                <el-input v-model="latitudeDms" size="small" :placeholder="$t('dms_placeholder')" />
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
import { getCoverage } from '@/common/js/api'

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
      longitudeDms: '',
      latitudeDms: '',
      locationKeyword: '',
      showNRTK: true,
      showPPPRTK: false
    }
  },
  watch: {
    coordFormat(newVal) {
      if (newVal === 'deg') {
        if (this.longitudeDms || this.latitudeDms) {
          const lng = this.dmsToDecimal(this.longitudeDms)
          const lat = this.dmsToDecimal(this.latitudeDms)
          this.longitude = !isNaN(lng) ? lng.toFixed(6) : ''
          this.latitude = !isNaN(lat) ? lat.toFixed(6) : ''
        }
      } else {
        if (this.longitude || this.latitude) {
          const lng = parseFloat(this.longitude)
          const lat = parseFloat(this.latitude)
          this.longitudeDms = !isNaN(lng) ? this.decimalToDms(lng, true) : ''
          this.latitudeDms = !isNaN(lat) ? this.decimalToDms(lat, false) : ''
        }
      }
    }
  },
  methods: {
    async handleSearch() {
      if (this.searchMode === 'coord') {
        let lng, lat
        if (this.coordFormat === 'dms') {
          lng = this.dmsToDecimal(this.longitudeDms)
          lat = this.dmsToDecimal(this.latitudeDms)
          if (isNaN(lng) || isNaN(lat)) {
            this.$message.warning(this.$t('enter_valid_dms'))
            return
          }
        } else {
          lng = parseFloat(this.longitude)
          lat = parseFloat(this.latitude)
          if (isNaN(lat) || isNaN(lng)) {
            this.$message.warning(this.$t('enter_valid_coords'))
            return
          }
        }
        if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
          this.$message.warning(this.$t('coords_out_of_range'))
          return
        }
        try {
          const res = await getCoverage({ lat, lon: lng })
          this.$refs.coverageMap.setCoverageMarker(lat, lng, res)
        } catch (err) {
          this.$message.error(this.$t('req_failed'))
          console.error(err)
        }
      } else if (this.searchMode === 'keyword') {
        const keyword = this.locationKeyword.trim()
        if (!keyword) {
          this.$message.warning(this.$t('enter_location'))
          return
        }
        const result = this.$refs.coverageMap.searchPlace(keyword)
        if (!result) {
          this.$message.warning(this.$t('location_not_found'))
        }
      }
    },
    onLayerChange(layer, checked) {
      if (this.$refs.coverageMap) {
        this.$refs.coverageMap.toggleLayer(layer, checked)
      }
    },
    dmsToDecimal(value) {
      if (value === null || value === undefined || String(value).trim() === '') return NaN
      const text = String(value).trim().replace(/°|′|'|″|"/g, ' ').replace(/\s+/g, ' ')
      const parts = text.split(' ').filter(p => p !== '')
      if (parts.length === 0) return NaN

      let negative = false
      let first = parts[0]
      if (first.startsWith('-')) {
        negative = true
        first = first.replace('-', '')
        parts[0] = first
      } else if (first.endsWith('W') || first.endsWith('w') || first.endsWith('S') || first.endsWith('s')) {
        negative = true
        parts[0] = first.slice(0, -1)
      } else if (first.endsWith('E') || first.endsWith('e') || first.endsWith('N') || first.endsWith('n')) {
        parts[0] = first.slice(0, -1)
      }

      const deg = parseFloat(parts[0])
      const min = parts.length > 1 ? parseFloat(parts[1]) : 0
      const sec = parts.length > 2 ? parseFloat(parts[2]) : 0
      if (isNaN(deg) || isNaN(min) || isNaN(sec)) return NaN
      if (min < 0 || min >= 60 || sec < 0 || sec >= 60) return NaN

      let decimal = Math.abs(deg) + min / 60 + sec / 3600
      return negative ? -decimal : decimal
    },
    decimalToDms(value, isLongitude) {
      const negative = value < 0
      const abs = Math.abs(value)
      const deg = Math.floor(abs)
      const minFloat = (abs - deg) * 60
      const min = Math.floor(minFloat)
      const sec = ((minFloat - min) * 60).toFixed(2)
      const direction = isLongitude ? (negative ? 'W' : 'E') : (negative ? 'S' : 'N')
      return `${deg}°${min}′${sec}″${direction}`
    }
  }
}
</script>

<style lang="scss" scoped>
.coverage-page {
  padding: 9px 0;
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
    // border: 1px solid rgba(249, 115, 18, 1);
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
