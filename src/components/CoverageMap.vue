<template>
  <div class="coverage-map-wrapper">
    <div id="coverage-map" ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
/* global L */
import config from '../../config'
import { geo_getAreaList, geo_ppprtkAreaList } from '@/common/js/api'
import { RES_SUCCESS } from '@/common/js/const.js'

export default {
  name: 'CoverageMap',
  data() {
    return {
      map: null,
      nrtkLayer: null,
      pppRTKLayer: null,
      searchMarker: null,
      osm: null,
      amap: null,
      currentMarker: null,
      pointsGroup: [],
      polygonList: [],
      polygonpppRTKList: [],
      pppRTKPointsGroup: []
    }
  },
  watch: {
    pointsGroup(val) {
      if (val) {
        this.updateNtrpLayer()
        this.updatepppRTKLayer()
        this.polygonpppRTKList.forEach(p => {
          if (this.map.hasLayer(p)) this.map.removeLayer(p);
        })
      }
    }
  },
  mounted() {
    this.initMap()
    this.getGeoList()
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
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
      });
      this.map = L.map(this.$refs.mapContainer, {
        center: [30, 110],
        zoom: 2,          // 初始看到整个世界
        minZoom: 1,       // 允许缩到最小（整个世界）
        maxZoom: 18,
        noWrap: true,     // 禁止世界左右重复/
        maxBounds: L.latLngBounds(L.latLng(-85, -180), L.latLng(85, 180)),
        maxBoundsViscosity: 1.0,
        zoomControl: false
      });
      L.control.zoom({ position: 'topright' }).addTo(this.map);

      // 2. 备用底图（zoom 0–2 用，能显示完整世界）
      this.osm = L.tileLayer(`https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${config.token}`, {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        attribution: '© 天地图',
        maxZoom: 18,
      }).addTo(this.map);
      // OSM（WGS84，全球详细）
      // this.osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   maxZoom: 19,
      //   attribution: '© OpenStreetMap contributors'
      // }).addTo(this.map);
      // 3. 高德底图（zoom≥3 用，国内细节好）
      // this.amap = L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      //   subdomains: ['1', '2', '3', '4'],
      //   minZoom: 3,
      //   maxZoom: 18,
      //   attribution: '© 高德地图'
      // }).addTo(this.map);
      L.tileLayer(`https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${config.token}`, {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
      }).addTo(this.map);

      // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      //   subdomains: ['a', 'b', 'c', 'd'],
      //   attribution: '© CARTO | © OpenStreetMap contributors'
      // }).addTo(this.map);

      // PPP-RTK global sparse layer
      this.pppRTKLayer = L.layerGroup([
        L.rectangle([[-60, -180], [70, 180]], {
          color: '#ea580c', weight: 0, fillColor: '#ea580c', fillOpacity: 0.05
        }).bindPopup(this.$t('global_ppp_rtk_coverage'))
      ])

      // City marker dots
      // const dotPositions = [
      //   { lat: -33, lng: 151, label: 'Sydney' },
      //   { lat: -37, lng: 144, label: 'Melbourne' },
      //   { lat: -27, lng: 153, label: 'Brisbane' },
      //   { lat: -31, lng: 115, label: 'Perth' },
      //   { lat: -34, lng: 138, label: 'Adelaide' },
      //   { lat: 1, lng: 103, label: 'Singapore' },
      //   { lat: 13, lng: 100, label: 'Bangkok' },
      //   { lat: 14, lng: 121, label: 'Manila' },
      //   { lat: 3, lng: 101, label: 'Kuala Lumpur' },
      //   { lat: 31, lng: 121, label: 'Shanghai' },
      //   { lat: 39, lng: 116, label: 'Beijing' },
      //   { lat: 23, lng: 113, label: 'Guangzhou' },
      //   { lat: 30, lng: 114, label: 'Wuhan' },
      //   { lat: 35, lng: 139, label: 'Tokyo' },
      //   { lat: 37, lng: 127, label: 'Seoul' },
      //   { lat: 34, lng: 135, label: 'Osaka' },
      //   { lat: 48, lng: 2, label: 'Paris' },
      //   { lat: 51, lng: 0, label: 'London' },
      //   { lat: 52, lng: 13, label: 'Berlin' },
      //   { lat: 41, lng: 2, label: 'Barcelona' },
      //   { lat: 45, lng: 9, label: 'Milan' }
      // ]

      // dotPositions.forEach(pos => {
      //   const marker = L.circleMarker([pos.lat, pos.lng], {
      //     radius: 4,
      //     fillColor: '#f97316',
      //     color: '#f97316',
      //     weight: 1,
      //     opacity: 0.8,
      //     fillOpacity: 0.6
      //   }).bindPopup(pos.label + ' - NRTK Station')
      // this.nrtkLayer.addLayer(marker)
      // })
    },
    // getGeoList() {
    //   geo_getAreaList({ code: 'World' }).then(res => {
    getGeoList(type = 'nrtk') {
      const api = type === 'ppp-rtk' ? geo_ppprtkAreaList : geo_getAreaList
      api({ code: 'World' }).then(res => {
        if (res.code === RES_SUCCESS || res.code === 200) {
          const data = res.result.geoAreaResultInfoList
          const pointsGroup = []
          data.forEach(item => {
            const points = []
            item.areaPointList.forEach(i => {
              points.push([i.lat, i.lon]);
            })
            if (!this._.isEmpty(points)) {
              // this.pointsGroup.push(points);
              pointsGroup.push(points);
            }
          })
          if (type === 'ppp-rtk') {
            this.pppRTKPointsGroup = pointsGroup
            // 获取PPP-RTK数据后立即更新图层
            this.updatepppRTKLayer()
          } else {
            this.pointsGroup = pointsGroup
          }
        }

      })
    },
    updateNtrpLayer() {
      // 移除旧面
      this.polygonList.forEach(poly => this.map.removeLayer(poly));
      this.polygonList = [];
      this.pointsGroup.forEach(item => {
        // 绘制多边形（封闭面）
        const polygon = L.polygon(item, {
          color: '#f97316',     // 边框颜色
          weight: 2,            // 边框粗细
          opacity: 0.8,         // 边框透明度
          fillColor: '#f97316', // 填充颜色
          fillOpacity: 0.2      // 填充透明度
        }).addTo(this.map);
        this.polygonList.push(polygon);
      })
      // 所有面自适应铺满视口
      if (this.polygonList.length) this.map.fitBounds(L.featureGroup(this.polygonList).getBounds());

    },
    updatepppRTKLayer() {
      // 移除旧面
      this.polygonpppRTKList.forEach(poly => this.map.removeLayer(poly));
      this.polygonpppRTKList = [];
      // this.pointsGroup.forEach(item => {
      const points = this.pppRTKPointsGroup.length ? this.pppRTKPointsGroup : this.pointsGroup
      points.forEach(item => {
        // 绘制多边形（封闭面）
        const polygon = L.polygon(item, {
          color: '#4ade80',     // 边框颜色
          weight: 2,            // 边框粗细
          opacity: 0.8,         // 边框透明度
          fillColor: '#4ade80', // 填充颜色
          fillOpacity: 0.2      // 填充透明度
        }).addTo(this.map);
        this.polygonpppRTKList.push(polygon);
      })
      // 所有面自适应铺满视口
      if (this.polygonpppRTKList.length) this.map.fitBounds(L.featureGroup(this.polygonpppRTKList).getBounds());

    },
    toggleLayer(layer, checked) {
      if (!this.map) return
      if (layer === 'nrtk') {
        if (checked) {
          this.polygonList.forEach(p => {
            if (!this.map.hasLayer(p)) p.addTo(this.map);
          })
        } else {
          this.polygonList.forEach(p => {
            if (this.map.hasLayer(p)) this.map.removeLayer(p);
          })
        }
      } else if (layer === 'ppp-rtk') {
        if (checked) {
          // if (this.polygonpppRTKList.length === 0) {
          //   if (!this.pppRTKPointsGroup.length) {
          //     this.getGeoList('ppp-rtk')
          //   } else {
          //     this.updatepppRTKLayer()
          //   }
          // }
          // this.polygonpppRTKList.forEach(p => {
          //   if (!this.map.hasLayer(p)) p.addTo(this.map);
          // })
          // 检查是否已获取 PPP-RTK 数据
          if (!this.pppRTKPointsGroup.length) {
            this.getGeoList('ppp-rtk')
          } else {
            this.updatepppRTKLayer()
            // this.polygonpppRTKList.forEach(p => {
            //   if (!this.map.hasLayer(p)) p.addTo(this.map);
            // })
          }
        } else {
          this.polygonpppRTKList.forEach(p => {
            if (this.map.hasLayer(p)) this.map.removeLayer(p);
          })
        }
        // checked ? this.map.addLayer(this.pppRTKLayer) : this.map.removeLayer(this.pppRTKLayer)
      }
    },
    isInChina(lng, lat) {
      // 中国大致范围：经度73.66~135.05，纬度3.86~53.55
      return lng >= 73.66 && lng <= 135.05 && lat >= 3.86 && lat <= 53.55;
    },
    updateBaseLayer() {
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();
      const inChina = this.isInChina(center.lng, center.lat);

      // 规则：
      // 1. 缩放 ≤ 2：强制显示 OSM（全球视图）
      // 2. 国内 + zoom > 2：显示高德
      // 3. 国外 + zoom > 2：显示 OSM
      if (zoom <= 2) {
        if (this.map.hasLayer(this.amap)) this.map.removeLayer(this.amap);
        if (!this.map.hasLayer(this.osm)) this.map.addLayer(this.osm);
      } else if (inChina) {
        if (this.map.hasLayer(this.osm)) this.map.removeLayer(this.osm);
        if (!this.map.hasLayer(this.amap)) this.map.addLayer(this.amap);
      } else {
        if (this.map.hasLayer(this.amap)) this.map.removeLayer(this.amap);
        if (!this.map.hasLayer(this.osm)) this.map.addLayer(this.osm);
      }
    },
    setView(lat, lng, zoom = 10) {
      if (this.map) {
        // Remove previous search marker
        if (this.searchMarker) {
          this.map.removeLayer(this.searchMarker)
        }
        // Add new marker
        this.searchMarker = L.marker([lat, lng]).addTo(this.map)
        this.searchMarker.bindPopup(`<b>${lat}, ${lng}</b>`).openPopup()
        // Pan and zoom to location
        this.map.setView([lat, lng], zoom)
      }
    },
    setCoverageMarker(lat, lng, info) {
      if (this.map) {
        if (this.searchMarker) {
          this.map.removeLayer(this.searchMarker)
        }
        // const content = info !== undefined
          // ? `<b>${lat}, ${lng}</b><br/><pre style="color:${info.result ? '#22c55e' : '#ef4444'};font-weight:600;">${info.result ? "在服务范围" : "不在服务范围"}</pre>`
          // : `<b>${lat}, ${lng}</b>`
          const content = `<b>${lat}, ${lng}</b>`
        this.searchMarker = L.marker([lat, lng]).addTo(this.map)
        this.searchMarker.bindPopup(content).openPopup()
        this.map.setView([lat, lng], 10)
      }
    },
    async searchPlace(keyword) {
      keyword = keyword.trim();
      if (!keyword) return alert(this.$t('please_enter_city'));

      // 判断是否包含中文 → 国内，用天地图
      // const isChinese = /[\u4e00-\u9fa5]/.test(keyword);

      try {
        let lat, lon, displayName;

        // if (isChinese) {
        // --------------------
        // 国内搜索：天地图
        // --------------------
        const url = `https://api.tianditu.gov.cn/geocoder?ds=${encodeURIComponent(JSON.stringify({ keyWord: keyword }))}&tk=${config.token}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.location) {
          lon = data.location.lon;
          lat = data.location.lat;
          displayName = keyword;
        }

        // } else {
        //   // --------------------
        //   // 国外搜索：OpenStreetMap 全球（免费无密钥）
        //   // --------------------
        //   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(keyword)}&limit=1`;
        //   const res = await fetch(url);
        //   const arr = await res.json();
        //   if (!arr || arr.length === 0) throw new Error("未找到");
        //   lat = arr[0].lat;
        //   lon = arr[0].lon;
        //   displayName = arr[0].display_name || keyword;
        // }

        // 移动地图
        this.map.setView([lat, lon], 10);

        // 添加标记
        // if (this.currentMarker) this.map.removeLayer(this.currentMarker);
        // this.currentMarker = L.marker([lat, lon])
        //   .addTo(this.map)
        //   .bindPopup(`${displayName}<br>经纬度：${lon}, ${lat}`)
        //   .openPopup();

      } catch (e) {
        alert(this.$t('search_failed_not_found'));
        console.error(e);
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
