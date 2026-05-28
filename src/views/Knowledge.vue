<template>
  <div class="knowledge-page">
    <div class="container section-py">
      <div class="section-header">
        <h1>{{ $t('kb_title') }}</h1>
        <p class="section-subtitle">{{ $t('kb_subtitle') }}</p>
      </div>

      <!-- Search Bar -->
      <div class="search-bar glass">
        <div class="search-row">
          <el-input
            v-model="searchQuery"
            :placeholder="$t('search_placeholder')"
            size="large"
            class="search-input"
          />
          <el-button type="primary" class="search-btn">{{ $t('search') }}</el-button>
        </div>
      </div>

      <!-- Popular Articles -->
      <div class="articles-grid">
        <div class="article-card glass card-hover" v-for="(article, idx) in articles" :key="idx">
          <h3 class="article-title">{{ $t(article.titleKey) }}</h3>
          <p class="article-desc">{{ $t(article.descKey) }}</p>
          <span class="article-link">{{ $t('read_more') }}</span>
        </div>
      </div>

      <!-- FAQ -->
      <div class="faq-section glass">
        <h2 class="faq-title">{{ $t('faq_title') }}</h2>
        <FaqAccordion />
      </div>
    </div>
  </div>
</template>

<script>
import FaqAccordion from '@/components/FaqAccordion.vue'

export default {
  name: 'KnowledgePage',
  components: {
    FaqAccordion
  },
  data() {
    return {
      searchQuery: '',
      articles: [
        { titleKey: 'kb1_title', descKey: 'kb1_desc' },
        { titleKey: 'kb2_title', descKey: 'kb2_desc' },
        { titleKey: 'kb3_title', descKey: 'kb3_desc' },
        { titleKey: 'kb4_title', descKey: 'kb4_desc' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledge-page {
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

.search-bar {
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 48px;
}

.search-row {
  display: flex;
  gap: 16px;
}

.search-input {
  flex: 1;
}

.search-btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  background: $blue-500 !important;
  border: none !important;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.article-card {
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
}

.article-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.article-desc {
  font-size: 14px;
  color: $text-gray-400;
  margin-bottom: 16px;
  line-height: 1.6;
}

.article-link {
  font-size: 14px;
  color: $blue-500;
}

.faq-section {
  border-radius: 16px;
  padding: 48px;
}

.faq-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}
</style>
