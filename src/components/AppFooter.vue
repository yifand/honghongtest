<template>
  <footer class="app-footer glass">
    <div class="container footer-grid">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="footer-brand-header">
          <div class="brand-icon">
            <svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 1.5 1.5 0 01-1.072-1.484M21 13a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <span class="brand-text text-gradient">GlobalService</span>
        </div>
        <p class="footer-desc">{{ $t('footer_desc') }}</p>
      </div>

      <!-- Products -->
      <div class="footer-links">
        <h4 class="footer-title">{{ $t('products') }}</h4>
        <ul>
          <li><router-link to="/products">NRTK</router-link></li>
          <li><router-link to="/products">PPP-RTK</router-link></li>
          <li><router-link to="/products">SDK & API</router-link></li>
          <li><router-link to="/coverage">{{ $t('coverage_map') }}</router-link></li>
        </ul>
      </div>

      <!-- Support -->
      <div class="footer-links">
        <h4 class="footer-title">{{ $t('support') }}</h4>
        <ul>
          <li><router-link to="/knowledge">{{ $t('documentation') }}</router-link></li>
          <li><router-link to="/knowledge">{{ $t('faqs') }}</router-link></li>
          <li v-if="false"><a href="#">{{ $t('status') }}</a></li>
          <li v-if="false"><a href="#">{{ $t('contact') }}</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom container">
      {{ $t('copyright') }}
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
.app-footer {
  padding: 48px 0 0;
  margin-top: 80px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.footer-brand-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  .brand-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon-svg {
      width: 24px;
      height: 24px;
      color: #fff;
    }
  }

  .brand-text {
    font-size: 20px;
    font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
  }
}

.footer-desc {
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.6;
}

.footer-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
}

.footer-links ul {
  list-style: none;

  li {
    margin-bottom: 8px;

    a {
      font-size: 14px;
      color: #9ca3af;
      transition: color 0.2s;

      &:hover {
        color: #fff;
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}
</style>
