# PrecisionLocate - High-Precision GNSS Positioning Services

A modern, professional website for a global high-precision positioning service provider.

## Features

### 1. Home Page (`#page-home`)
- Hero section with animated satellite visualization
- Key features showcase (Ultra-Low Latency, 99.99% Uptime, Global Coverage, etc.)
- Industry solutions (Autonomous Vehicles, Drones, Surveying, Construction, etc.)
- Statistics (150+ Countries, 5K+ Reference Stations, 0.5cm RMS Accuracy)

### 2. Products Page (`#page-products`)
- NRTK Network Service details
- PPP Global Service information
- Developer tools (Android SDK, iOS SDK, REST API)
- Feature highlights and specifications

### 3. Coverage Page (`#page-coverage`)
- Interactive Leaflet map showing global coverage
- Search functionality for locations/coordinates
- Coverage status breakdown (Full, Partial, PPP Global)
- Statistics display

### 4. Account Page (`#page-account`)
- Login/Register forms with tab switching
- User dashboard with statistics
- NTRIP credentials management
- Subscription plan information

### 5. Support Page (`#page-support`)
- FAQ section with collapsible answers
- Connection diagnostic tool
- Support ticket submission form

### 6. AI Assistant Page (`#page-ai`)
- Interactive chat interface
- Quick question buttons
- Simulated AI responses about GNSS/NTRIP topics

## Design System

### Colors
- Primary: Deep Blue (#3b82f6)
- Secondary: Cyan (#06b6d4)
- Accent: Purple (#8b5cf6)
- Background: Dark gradient (#020617 → #0f172a → #1e3a5f)
- Success: Green (#22c55e)
- Warning: Yellow (#eab308)

### Typography
- Headings: Space Grotesk (bold)
- Body: DM Sans (regular/medium)
- Responsive font sizes (mobile-first)

### Visual Effects
- Glassmorphism cards (backdrop-blur)
- Glowing borders for interactive elements
- Smooth animations and transitions
- Satellite pulse animations
- Floating background elements

## Technical Stack

- HTML5 Semantic Markup
- Tailwind CSS 3 (CDN)
- Vanilla JavaScript (ES6+)
- Leaflet Maps (for coverage visualization)
- Google Fonts (Space Grotesk + DM Sans)

## File Structure

```
高精度定位官网/
├── index.html          # Main HTML file (all pages in one file)
├── css/                # Additional CSS files
├── js/                 # Additional JavaScript files
├── images/             # Image assets
└── README.md           # This file
```

## Usage

1. Open `index.html` in a modern web browser
2. Use the navigation bar to switch between pages
3. Test interactive features:
   - Click FAQ items to expand
   - Use the chat interface on AI Assistant page
   - View the interactive map on Coverage page
   - Test login -> dashboard flow

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

(Note: backdrop-filter works best in WebKit-based browsers)

## Responsive Breakpoints

- Mobile: < 768px (md)
- Tablet: 768px - 1024px (lg)
- Desktop: > 1024px

## Future Enhancements

1. Real backend integration for authentication
2. Live map data streaming
3. Multi-language support (Chinese/English)
4. Dark/Light theme toggle
5. Real AI assistant integration
6. User profile management
7. Billing and payment system
8. API key generation and management
