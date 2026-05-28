<template>
  <div class="coverage-map-wrapper">
    <div id="coverage-map" ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
/* global L */

export default {
  name: 'CoverageMap',
  data() {
    return {
      map: null,
      nrtkLayer: null,
      pppRTKLayer: null,
      searchMarker: null
    }
  },
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  },
  methods: {
    initMap() {
      if (this.map) return

      // this.map = L.map(this.$refs.mapContainer, {

      // }).setView([30, 100], 3)


      this.map = L.map(this.$refs.mapContainer, {
        center: [30, 110],
        zoom: 2,          // 初始看到整个世界
        minZoom: 1,       // 允许缩到最小（整个世界）
        maxZoom: 18,
        // noWrap: true,     // 禁止世界左右重复
        // maxBounds: L.latLngBounds(L.latLng(-85, -180), L.latLng(85, 180)),
        // maxBoundsViscosity: 1.0
      });

      // 2. 备用底图（zoom 0–2 用，能显示完整世界）
      const baseWorld = L.tileLayer('https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=52d70a60159979d4fe3bbf996a005a1a', {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        attribution: '© 天地图',
        minZoom: 1,
        maxZoom: 2,
      }).addTo(this.map);

      // 3. 高德底图（zoom≥3 用，国内细节好）
      const amap = L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: ['1', '2', '3', '4'],
        minZoom: 3,
        maxZoom: 18,
        attribution: '© 高德地图'
      }).addTo(this.map);

      // L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      //   subdomains: ['1', '2', '3', '4'],
      //   minZoom: 3,
      //   maxZoom: 22,
      //   noWrap: true,
      //   attribution: '© 高德地图',
      //   maxBoundsViscosity: 1.0 // 拖到边界回弹

      // }).addTo(this.map)
      // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      //   subdomains: ['a', 'b', 'c', 'd'],
      //   attribution: '© CARTO | © OpenStreetMap contributors'
      // }).addTo(this.map);
      // NRTK coverage areas
      const nrtkAreas = []

      // Japan
      nrtkAreas.push(L.rectangle([[30, 128], [45, 149]], {
        color: '#f97316', weight: 2, fillColor: '#f97316', fillOpacity: 0.25
      }).bindPopup('Japan - Full NRTK Coverage'))

      // Korea
      nrtkAreas.push(L.rectangle([[33, 124], [39, 131]], {
        color: '#f97316', weight: 2, fillColor: '#f97316', fillOpacity: 0.25
      }).bindPopup('Korea - Full NRTK Coverage'))

      // East China
      nrtkAreas.push(L.rectangle([[20, 105], [40, 125]], {
        color: '#f97316', weight: 2, fillColor: '#f97316', fillOpacity: 0.25
      }).bindPopup('China East - Full NRTK Coverage'))

      // Southeast Asia
      nrtkAreas.push(L.rectangle([[5, 100], [23, 110]], {
        color: '#f97316', weight: 2, fillColor: '#f97316', fillOpacity: 0.25
      }).bindPopup('Southeast Asia - Full NRTK Coverage'))

      // Western Europe
      nrtkAreas.push(L.rectangle([[41, -5], [51, 10]], {
        color: '#f97316', weight: 2, fillColor: '#f97316', fillOpacity: 0.25
      }).bindPopup('Western Europe - Full NRTK Coverage'))

      // Australia
      nrtkAreas.push(L.rectangle([[-44, 112], [-10, 155]], {
        color: '#f97316', weight: 2, fillColor: '#f97316', fillOpacity: 0.15
      }).bindPopup('Australia - NRTK Coverage'))

      this.nrtkLayer = L.layerGroup(nrtkAreas)
      this.map.addLayer(this.nrtkLayer)

      // PPP-RTK global sparse layer
      this.pppRTKLayer = L.layerGroup([
        L.rectangle([[-60, -180], [70, 180]], {
          color: '#ea580c', weight: 0, fillColor: '#ea580c', fillOpacity: 0.05
        }).bindPopup('Global PPP-RTK Coverage')
      ])

      // City marker dots
      const dotPositions = [
        { lat: -33, lng: 151, label: 'Sydney' },
        { lat: -37, lng: 144, label: 'Melbourne' },
        { lat: -27, lng: 153, label: 'Brisbane' },
        { lat: -31, lng: 115, label: 'Perth' },
        { lat: -34, lng: 138, label: 'Adelaide' },
        { lat: 1, lng: 103, label: 'Singapore' },
        { lat: 13, lng: 100, label: 'Bangkok' },
        { lat: 14, lng: 121, label: 'Manila' },
        { lat: 3, lng: 101, label: 'Kuala Lumpur' },
        { lat: 31, lng: 121, label: 'Shanghai' },
        { lat: 39, lng: 116, label: 'Beijing' },
        { lat: 23, lng: 113, label: 'Guangzhou' },
        { lat: 30, lng: 114, label: 'Wuhan' },
        { lat: 35, lng: 139, label: 'Tokyo' },
        { lat: 37, lng: 127, label: 'Seoul' },
        { lat: 34, lng: 135, label: 'Osaka' },
        { lat: 48, lng: 2, label: 'Paris' },
        { lat: 51, lng: 0, label: 'London' },
        { lat: 52, lng: 13, label: 'Berlin' },
        { lat: 41, lng: 2, label: 'Barcelona' },
        { lat: 45, lng: 9, label: 'Milan' }
      ]

      dotPositions.forEach(pos => {
        const marker = L.circleMarker([pos.lat, pos.lng], {
          radius: 4,
          fillColor: '#f97316',
          color: '#f97316',
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.6
        }).bindPopup(pos.label + ' - NRTK Station')
        this.nrtkLayer.addLayer(marker)
      })
    },

    toggleLayer(layer, checked) {
      if (!this.map) return
      if (layer === 'nrtk') {
        checked ? this.map.addLayer(this.nrtkLayer) : this.map.removeLayer(this.nrtkLayer)
      } else if (layer === 'ppp-rtk') {
        checked ? this.map.addLayer(this.pppRTKLayer) : this.map.removeLayer(this.pppRTKLayer)
      }
    },

    setView(lat, lng, zoom = 8) {
      if (this.map) {
        this.map.setView([lat, lng], zoom)
      }
    },

    invalidateSize() {
      if (this.map) {
        this.map.invalidateSize()
      }
    },

    searchByKeyword(keyword) {
      if (!this.map || !keyword) return false

      // Predefined city coordinates for keyword search
      const cityDB = {
        '上海': [31.23, 121.47],
        'shanghai china': [31.23, 121.47],
        'beijing': [39.90, 116.41],
        'beijing china': [39.90, 116.41],
        'guangzhou': [23.13, 113.26],
        'guangzhou china': [23.13, 113.26],
        'wuhan': [30.59, 114.31],
        'wuhan china': [30.59, 114.31],
        'shenzhen': [22.54, 114.06],
        'shenzhen china': [22.54, 114.06],
        'chengdu': [30.57, 104.07],
        'chengdu china': [30.57, 104.07],
        'hangzhou': [30.27, 120.15],
        'hangzhou china': [30.27, 120.15],
        'nanjing': [32.06, 118.78],
        'nanjing china': [32.06, 118.78],
        'tokyo': [35.68, 139.69],
        'tokyo japan': [35.68, 139.69],
        'osaka': [34.69, 135.50],
        'osaka japan': [34.69, 135.50],
        'seoul': [37.57, 126.98],
        'seoul korea': [37.57, 126.98],
        'singapore': [1.35, 103.82],
        'bangkok': [13.76, 100.50],
        'kuala lumpur': [3.14, 101.69],
        'manila': [14.60, 120.98],
        'sydney': [-33.87, 151.21],
        'sydney australia': [-33.87, 151.21],
        'melbourne': [-37.81, 144.96],
        'melbourne australia': [-37.81, 144.96],
        'brisbane': [-27.47, 153.03],
        'brisbane australia': [-27.47, 153.03],
        'perth': [-31.95, 115.86],
        'perth australia': [-31.95, 115.86],
        'adelaide': [-34.93, 138.60],
        'adelaide australia': [-34.93, 138.60],
        'london': [51.51, -0.13],
        'london uk': [51.51, -0.13],
        'paris': [48.86, 2.35],
        'paris france': [48.86, 2.35],
        'berlin': [52.52, 13.41],
        'berlin germany': [52.52, 13.41],
        'milan': [45.46, 9.19],
        'milan italy': [45.46, 9.19],
        'barcelona': [41.38, 2.17],
        'barcelona spain': [41.38, 2.17],
        'new york': [40.71, -74.01],
        'los angeles': [34.05, -118.24],
        'san francisco': [37.77, -122.42],
        'dubai': [25.20, 55.27],
        'moscow': [55.76, 37.62],
        'mumbai': [19.08, 72.88],
        'delhi': [28.61, 77.21],
        'jakarta': [-6.21, 106.85],
        'ho chi minh': [10.82, 106.63],
        'taipei': [25.03, 121.56],
        'hong kong': [22.32, 114.17],
        'macao': [22.20, 113.55]
      }

      const kw = keyword.toLowerCase().trim()
      let coords = cityDB[kw]

      // Fallback: partial match
      if (!coords) {
        const keys = Object.keys(cityDB)
        const match = keys.find(k => k.includes(kw) || kw.includes(k))
        if (match) coords = cityDB[match]
      }

      if (coords) {
        const [lat, lng] = coords

        // Remove previous search marker
        if (this.searchMarker) {
          this.map.removeLayer(this.searchMarker)
        }

        // Add new marker
        this.searchMarker = L.marker([lat, lng]).addTo(this.map)
        this.searchMarker.bindPopup(`<b>${keyword}</b>`).openPopup()

        // Pan and zoom to location
        this.map.setView([lat, lng], 10)
        return true
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.coverage-map-wrapper {
  width: 100%;
  height: 100%;
}

.map-container {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
}
</style>
