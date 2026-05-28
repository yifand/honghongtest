<template>
  <div class="industry-solutions section-py">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ $t('industry_title') }}</h2>
        <p class="section-subtitle">{{ $t('industry_subtitle') }}</p>
      </div>

      <el-tabs v-model="activeTab" class="industry-tabs">
        <el-tab-pane name="auto">
          <span slot="label">{{ $t('tab_auto') }}</span>
          <div class="industry-content">
            <div class="content-grid">
              <div class="content-text">
                <h3 class="content-title text-gradient">{{ $t('auto_title') }}</h3>
                <div class="content-items">
                  <div class="content-item">
                    <div class="item-icon icon-challenge">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="item-label">{{ $t('challenge') }}</h4>
                      <p class="item-desc">{{ $t('auto_challenge_desc') }}</p>
                    </div>
                  </div>
                  <div class="content-item">
                    <div class="item-icon icon-solution">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="item-label">{{ $t('solution') }}</h4>
                      <p class="item-desc">{{ $t('auto_solution_desc') }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-illustration">
                <div class="illustration-box ill-blue">
                  <svg class="ill-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="agri">
          <span slot="label">{{ $t('tab_agri') }}</span>
          <div class="industry-content">
            <div class="content-grid">
              <div class="content-text">
                <h3 class="content-title text-gradient">{{ $t('agri_title') }}</h3>
                <div class="content-items">
                  <div class="content-item">
                    <div class="item-icon icon-challenge">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 1.5 1.5 0 01-1.072-1.484M21 13a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="item-label">{{ $t('challenge') }}</h4>
                      <p class="item-desc">{{ $t('agri_challenge_desc') }}</p>
                    </div>
                  </div>
                  <div class="content-item">
                    <div class="item-icon icon-solution">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="item-label">{{ $t('solution') }}</h4>
                      <p class="item-desc">{{ $t('agri_solution_desc') }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-illustration">
                <div class="illustration-box ill-green">
                  <svg class="ill-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="drone">
          <span slot="label">{{ $t('tab_drone') }}</span>
          <div class="industry-content">
            <div class="content-grid">
              <div class="content-text">
                <h3 class="content-title text-gradient">{{ $t('drone_title') }}</h3>
                <div class="content-items">
                  <div class="content-item">
                    <div class="item-icon icon-challenge">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="item-label">{{ $t('challenge') }}</h4>
                      <p class="item-desc">{{ $t('drone_challenge_desc') }}</p>
                    </div>
                  </div>
                  <div class="content-item">
                    <div class="item-icon icon-solution">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="item-label">{{ $t('solution') }}</h4>
                      <p class="item-desc">{{ $t('drone_solution_desc') }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-illustration">
                <div class="illustration-box ill-cyan">
                  <svg class="ill-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="survey">
          <span slot="label">{{ $t('tab_survey') }}</span>
          <div class="industry-content">
            <div class="content-grid">
              <div class="content-text">
                <h3 class="content-title text-gradient">{{ $t('survey_title') }}</h3>
                <div class="content-items">
                  <div class="content-item">
                    <div class="item-icon icon-challenge">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="item-label">{{ $t('challenge') }}</h4>
                      <p class="item-desc">{{ $t('survey_challenge_desc') }}</p>
                    </div>
                  </div>
                  <div class="content-item">
                    <div class="item-icon icon-solution">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="item-label">{{ $t('solution') }}</h4>
                      <p class="item-desc">{{ $t('survey_solution_desc') }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-illustration">
                <div class="illustration-box ill-teal">
                  <svg class="ill-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndustrySolutions',
  data() {
    return {
      activeTab: 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
.industry-solutions {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
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

.industry-tabs {
  ::v-deep .el-tabs__header {
    margin-bottom: 32px;
  }

  ::v-deep .el-tabs__nav-wrap {
    display: flex;
    justify-content: center;

    &::after {
      display: none;
    }
  }

  ::v-deep .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }

  ::v-deep .el-tabs__nav {
    display: flex;
    justify-content: center;
    float: none !important;
  }

  ::v-deep .el-tabs__item {
    font-size: 15px;
    font-weight: 500;
    height: 48px;
    line-height: 48px;
    border-radius: 12px;
    margin: 0 24px;
    transition: all 0.2s;

    &.is-active {
      background: rgba(59, 130, 246, 0.1);
      color: $blue-500 !important;
    }

    &:hover:not(.is-active) {
      background: rgba(255, 255, 255, 0.05);
    }

    &.is-top {
      padding-right: 24px !important;
      padding-left: 24px !important;
    }
  }

  ::v-deep .el-tabs__active-bar {
    display: none;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.content-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 32px;
}

.content-items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;

  .item-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 24px;
      height: 24px;
    }

    &.icon-challenge {
      background: rgba(59, 130, 246, 0.2);
      color: $blue-500;
    }

    &.icon-solution {
      background: rgba(74, 222, 128, 0.2);
      color: $green-400;
    }
  }

  .item-label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .item-desc {
    font-size: 14px;
    color: $text-gray-400;
    line-height: 1.6;
  }
}

.content-illustration {
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
}

.illustration-box {
  width: 320px;
  height: 256px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .ill-svg {
    width: 128px;
    height: 128px;
    opacity: 0.5;
  }

  &.ill-blue {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
    color: $blue-500;
  }

  &.ill-green {
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(16, 185, 129, 0.2));
    color: $green-400;
  }

  &.ill-cyan {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2));
    color: $cyan-400;
  }

  &.ill-teal {
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(74, 222, 128, 0.2));
    color: #14b8a6;
  }
}
</style>
