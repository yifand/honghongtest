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
          <el-input v-model="searchQuery" :placeholder="$t('search_placeholder')" size="large" class="search-input" />
          <el-button type="primary" class="search-btn" @click="changeQuetion">{{ $t('search') }}</el-button>
        </div>
      </div>

      <!-- Popular Articles -->
      <div class="articles-grid" v-if="isShowCard">
        <div class="article-card glass card-hover" v-for="(article, idx) in articles" :key="idx">
          <h3 class="article-title">{{ $t(article.titleKey) }}</h3>
          <p class="article-desc">{{ $t(article.descKey) }}</p>
          <!-- <span class="article-link">{{ $t('read_more') }}</span> -->
        </div>
      </div>
      <div class="md-box glass card-hover" ref="chatWrap" v-else>
        <div v-if="loading">思考中 <span class="point"></span></div>
        <markdown-it-vue :content="answerText" :highlight="true" show-copy />
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
import { streamGetRequest } from '@/common/js/request.js'
import { apiPathRagQuery } from '@/common/js/api.js'
import { fixWaveLine } from '@/common/js/utils.js'
export default {
  name: 'KnowledgePage',
  components: {
    FaqAccordion
  },
  data() {
    return {
      searchQuery: '',
      abortController: null,
      answerText: "",
      streamCancel: null,
      loading: false,
      isShowCard: true,
      articles: [
        { titleKey: 'kb1_title', descKey: 'kb1_desc' },
        { titleKey: 'kb2_title', descKey: 'kb2_desc' },
        { titleKey: 'kb3_title', descKey: 'kb3_desc' },
        { titleKey: 'kb4_title', descKey: 'kb4_desc' }
      ]
    }
  },
  watch: {
    answerText: function (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollToBottom()
          }, 400);
        })
      }
    }
  },
  computed: {

  },
  beforeDestroy() {
    if (this.streamCancel) {
      this.streamCancel.abort();
      this.streamCancel = null;
    }
  },
  methods: {
    sendStreamQuery() {
      this.answerText = '';
      this.loading = true;
      // 如果有正在运行的流，先终止
      if (this.streamCancel) {
        this.streamCancel.abort();
        this.streamCancel = null;
      }
      this.streamCancel = streamGetRequest({
        url: apiPathRagQuery,
        params: {
          question: this.searchQuery
        },
        // 每收到一段分片实时渲染
        onMessage: (chunk, fullText) => {
          const content = fullText.replace(/^data:\s*/gm, '')
          this.answerText = fixWaveLine(content);
          // console.log({ fullText });
          this.loading = false;

        },
        // 流全部接收完成
        onEnd: (full) => {
          console.log('流式接收完毕', full);
          this.streamCancel = null;
        },
        // 错误捕获
        onError: (err) => {
          console.error('流式请求异常', err);
          this.$message.error(`请求出错：${err.message}`);
          this.streamCancel = null;
          this.loading = false;
        }
      });
    },
    scrollToBottom() {
      // 获取滚动容器DOM
      const wrap = this.$refs.chatWrap
      if (wrap) {
        // 平滑滚动版本
        wrap.scrollTo({ top: wrap.scrollHeight, behavior: 'smooth' })
      }
    },
    changeQuetion() {
      if (!this._.isEmpty(this.searchQuery)) {
        this.isShowCard = false
        this.sendStreamQuery()
      } else {
        this.isShowCard = true
      }
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.knowledge-page {
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

/* 简单美化markdown样式 */
.md-box {
  height: 500px;
  padding: 24px;
  overflow-y: auto;
  line-height: 1.8;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 24px;
}

.markdown-body {
  color: #FFF !important;
}

.el-icon-loading-dark {
  .circular {
    stroke: #2c3e50;
  }

  .path {
    stroke: #2c3e50;
  }
}

.md-box>>>h1,
.md-box>>>h2,
.md-box>>>h3 {
  margin: 1em 0 0.5em;
  font-weight: 600;
}

.md-box>>>ul {
  padding-left: 20px;
}

.md-box>>>strong {
  color: #2c3e50;
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

.point {
  height: 4px;
  width: 4px;
  margin-left: 3px;
  background-color: transparent;
  display: inline-block;
  border-radius: 50%;
  animation: dotting 1.2s infinite step-start;
}

@keyframes dotting {
  25% {
    box-shadow: 8px 0 0 #ccc;
  }

  50% {
    box-shadow: 8px 0 0 #ccc, 20px 0 0 #ccc;
  }

  75% {
    box-shadow: 8px 0 0 #ccc, 20px 0 0 #ccc, 32px 0 0 #ccc;
  }
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
