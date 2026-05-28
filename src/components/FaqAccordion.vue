<template>
  <div class="faq-accordion">
    <div class="faq-list">
      <div
        v-for="(item, idx) in faqItems"
        :key="idx"
        class="faq-item"
        :class="{ active: activeIdxs.includes(idx) }"
      >
        <button class="faq-question" @click="toggle(idx)">
          <span class="faq-text">{{ $t(item.qKey) }}</span>
          <svg
            class="faq-icon"
            :class="{ rotated: activeIdxs.includes(idx) }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <transition name="faq">
          <div v-show="activeIdxs.includes(idx)" class="faq-answer-wrapper">
            <p class="faq-answer">{{ $t(item.aKey) }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqAccordion',
  data() {
    return {
      activeIdxs: [],
      faqItems: [
        { qKey: 'faq1_q', aKey: 'faq1_a' },
        { qKey: 'faq2_q', aKey: 'faq2_a' },
        { qKey: 'faq3_q', aKey: 'faq3_a' }
      ]
    }
  },
  methods: {
    toggle(idx) {
      const pos = this.activeIdxs.indexOf(idx)
      if (pos > -1) {
        this.activeIdxs.splice(pos, 1)
      } else {
        this.activeIdxs.push(idx)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;

  &.active {
    border-color: rgba(255, 255, 255, 0.15);
  }
}

.faq-question {
  width: 100%;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
}

.faq-text {
  font-size: 15px;
  font-weight: 500;
}

.faq-icon {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  &.rotated {
    transform: rotate(180deg);
  }
}

.faq-answer-wrapper {
  padding: 0 24px 16px;
}

.faq-answer {
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.6;
}

.faq-enter-active,
.faq-leave-active {
  transition: all 0.25s ease;
}

.faq-enter,
.faq-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
