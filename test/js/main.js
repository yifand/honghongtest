// PrecisionLocate Main JavaScript

// Language translations
const translations = {
    en: {
        home: 'Home',
        products: 'Products',
        coverage: 'Coverage',
        account: 'Account',
        support: 'Support',
        aiAssistant: 'AI Assistant',
        signIn: 'Sign In',
        language: 'EN'
    },
    zh: {
        home: '首页',
        products: '产品',
        coverage: '覆盖范围',
        account: '账户',
        support: '支持',
        aiAssistant: 'AI助手',
        signIn: '登录',
        language: '中文'
    }
};

// Page view tracking
const pageViews = {
    home: 0,
    products: 0,
    coverage: 0,
    account: 0,
    support: 0,
    ai: 0
};

// Enhanced navigation with tracking
function trackPageView(page) {
    pageViews[page]++;
    console.log(`Page view: ${page} (Total: ${pageViews[page]})`);
}

// Check network connectivity status
function checkNetworkStatus() {
    const isOnline = navigator.onLine;
    console.log(`Network status: ${isOnline ? 'Online' : 'Offline'}`);
    return isOnline;
}

// Performance monitoring
function measurePerformance() {
    const perfData = performance.getEntriesByType("navigation")[0];
    console.log('Page load time:', perfData.duration, 'ms');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('PrecisionLocate Website Loaded');
    measurePerformance();
    checkNetworkStatus();
    
    // Add online/offline listeners
    window.addEventListener('online', () => {
        console.log('Network: Online');
    });
    
    window.addEventListener('offline', () => {
        console.log('Network: Offline');
    });
});

// Export for global access
window.PrecisionLocate = {
    translations,
    pageViews,
    checkNetworkStatus
};
