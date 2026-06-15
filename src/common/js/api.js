import { _getData, _postData, _uploadFile } from '@/common/js/request'
import config from '../../../config'

function getRootPath () {
  var curWwwPath = window.document.location.href
  var pathName = window.document.location.pathname
  var pos = curWwwPath.indexOf(pathName)
  var localhostPath = curWwwPath.substring(0, pos)
  return localhostPath
}

var PATH_ROOT = config.api_path
if (config.auto) PATH_ROOT = getRootPath()

var PATH_APISERVICE = `${PATH_ROOT}`
if (config.corsmanager.ver !== '') {
  PATH_APISERVICE += `/${config.corsmanager.ver}`
}
if (config.corsmanager.model !== '') {
  PATH_APISERVICE += `/${config.corsmanager.model}`
}
export const ApiHostPath = PATH_APISERVICE;
console.log({PATH_APISERVICE});

// 登录相关
const apiPathLogin = `${PATH_APISERVICE}/login`
const apiPathLogout = `${PATH_APISERVICE}/logout`

// 排障相关
const apiPathGetBasicInfo = `${PATH_APISERVICE}/account/basicInfo`
const apiPathGetLatestInfo = `${PATH_APISERVICE}/account/latestInfo`
const apiPathGetAbnormalInfo = `${PATH_APISERVICE}/account/abnormalInfo`
const apiPathGetServiceCondition = `${PATH_APISERVICE}/account/serviceCondition`
const apiPathGetLogStatistics = `${PATH_APISERVICE}/account/loginStatistics`
const apiPathGetWindowStatistics = `${PATH_APISERVICE}/account/windowStatistics`
const apiPathGetServiceArea = `${PATH_APISERVICE}/account/serviceArea`
const apiPathGetHistoryInfo = `${PATH_APISERVICE}/account/historyInfo`
const apiPathDownloadGGA = `${PATH_APISERVICE}/account/downloadGgaZip`
const apiPathDownloadRTCM = `${PATH_APISERVICE}/account/downloadRtcM`
const apiPathGetAccountCoordInfo = `${PATH_APISERVICE}/account/coordInfo`
const apiPathDownloadAbnormalInfo = `${PATH_APISERVICE}/account/downloadAbnormalInfo`
const apiPathDownloadAccountCoordInfo = `${PATH_APISERVICE}/account/downloadCoordInfo`
const apiPathDownloadHistoryInfo = `${PATH_APISERVICE}/account/downloadGga`
const apiPathGetSearch = `${PATH_APISERVICE}/account/search`
const apiPathGetGGA = `${PATH_APISERVICE}/account/gga`
const apiPathGetCodeList = `${PATH_APISERVICE}/area/codeList`
const apiPathGetService = `${PATH_APISERVICE}/area/service`
const apiPathGetWorld = `${PATH_APISERVICE}/area/world`
const apiPathGetServiceQuery = `${PATH_APISERVICE}/area/serviceQuery`

// 账号管理
const apiPathNtripUserInsert = `${PATH_APISERVICE}/ntripUser/insert`
const apiPathNtripUserUpdate = `${PATH_APISERVICE}/ntripUser/update`
const apiPathNtripUserDelete = `${PATH_APISERVICE}/ntripUser/delete`
const apiPathNtripUserQuery = `${PATH_APISERVICE}/ntripUser/query`
const apiPathNtripUserQueryList = `${PATH_APISERVICE}/ntripUser/queryList`
const apiPathNtripUserGenerate = `${PATH_APISERVICE}/ntripUser/generate`
const apiPathNtripUserDownload = `${PATH_APISERVICE}/ntripUser/download`
const apiPathNtripUserEnable = `${PATH_APISERVICE}/ntripUser/enable`
const apiPathNtripUserDisable = `${PATH_APISERVICE}/ntripUser/disable`
const apiPathNtripUserRenewal = `${PATH_APISERVICE}/ntripUser/renewal`
const apiPathNtripUserUpload = `${PATH_APISERVICE}/ntripUser/upload`
const apiPathAccountCompany = `${PATH_APISERVICE}/account/company`

// geo
const apiPath_AdjustCodeList = `${PATH_APISERVICE}/geo/adjustCodeList`
export const apiPath_GeoAdjust = `${PATH_ROOT}/geo/adjust`
const apiPath_Geo_CodeList = `${PATH_APISERVICE}/geo/codeList`
const apiPath_Geo_getAreaList = `${PATH_APISERVICE}/geo/getAreaList`
// AI助手
export const apiPathQAChat = `${PATH_ROOT}/llm/question`

//合作伙伴
const apiPathPartnerCreate = `${PATH_APISERVICE}/partner/create`
const apiPathPartnerDetail = `${PATH_APISERVICE}/partner/detail`
const apiPathPartnerSearch = `${PATH_APISERVICE}/partner/search`
const apiPathPartnerEdit = `${PATH_APISERVICE}/partner/edit`

//用户管理
const apiPathUserInfoCreate= `${PATH_APISERVICE}/userInfo/create`
const apiPathUserInfoSearch= `${PATH_APISERVICE}/userInfo/search`
const apiPathUserInfoEdit= `${PATH_APISERVICE}/userInfo/edit`
const apiPathUserInfoRemove= `${PATH_APISERVICE}/userInfo/remove`

//订单管理
const apiPathNtripOrderCreate= `${PATH_APISERVICE}/ntripOrder/create`
const apiPathNtripOrderSearch= `${PATH_APISERVICE}/ntripOrder/search`
const apiPathNtripOrderEdit= `${PATH_APISERVICE}/ntripOrder/edit`
const apiPathNtripOrderPush= `${PATH_APISERVICE}/ntripOrder/push`

//账号管理
const apiPathNtripAccountListByOrderNo= `${PATH_APISERVICE}/ntripAccount/listByOrderNo`
const apiPathNtripAccountSearch= `${PATH_APISERVICE}/ntripAccount/search`
const apiPathNtripAccountChgpwd= `${PATH_APISERVICE}/ntripAccount/chgpwd`
const apiPathNtripAccountDownload= `${PATH_APISERVICE}/ntripAccount/download`

//知识库
 export const apiPathRagQuery= `${PATH_APISERVICE}/rag/query`


export function ntripAccountListByOrderNo (params) {
  return _postData(apiPathNtripAccountListByOrderNo, params)
}
export function ntripAccountSearch (params) {
  return _postData(apiPathNtripAccountSearch, params)
}
export function ntripAccountChgpwd (params) {
  return _postData(apiPathNtripAccountChgpwd, params)
}
export function ntripAccountDownload (params) {
  return _postData(apiPathNtripAccountDownload,  params, true, true)
}

export function ntripOrderCreate (params) {
  return _postData(apiPathNtripOrderCreate, params)
}
export function ntripOrderEdit (params) {
  return _postData(apiPathNtripOrderEdit, params)
}
export function ntripOrderSearch (params) {
  return _postData(apiPathNtripOrderSearch, params)
}
export function ntripOrderPush (params) {
  return _getData(apiPathNtripOrderPush, params)
}
export function userInfoCreate (params) {
  return _postData(apiPathUserInfoCreate,params)
}
export function getUserInfoSearch (params) {
  return _postData(apiPathUserInfoSearch,params)
}
export function userInfoEdit (params) {
  return _getData(apiPathUserInfoEdit,params)
}
export function userInfoRemove (params) {
  return _getData(apiPathUserInfoRemove,params)
}


export function partnerCreate (params) {
  return _postData(apiPathPartnerCreate,params)
}
export function getPartnerSearch (params) {
  return _postData(apiPathPartnerSearch,params)
}

export function partnerDetail (params) {
  return _getData(apiPathPartnerDetail,params)
}

export function partnerEdit (params) {
  return _postData(apiPathPartnerEdit,params)
}

export function genCodeList () {
  return _getData(apiPathGetCodeList)
}

export function genAreaService (params) {
  return _getData(apiPathGetService, params)
}

export function getnAreaWorld () {
  return _getData(apiPathGetWorld)
}

export function getnAreaServiceQuery (params) {
  return _getData(apiPathGetServiceQuery, params)
}

export function getPilotSearch (params) {
  return _postData(apiPathGetSearch, params, true)
}

export function getPilotGGA (params) {
  return _postData(apiPathGetGGA, params, true)
}

export function downloadHistoryInfo (params) {
  return _postData(apiPathDownloadHistoryInfo, params, false, true)
}

export function downloadAccountCoordInfo (params) {
  return _postData(apiPathDownloadAccountCoordInfo, params, false, true)
}

export function downloadAbnormalInfo (params) {
  return _postData(apiPathDownloadAbnormalInfo, params, false, true)
}

export function getAccountCoordInfo (params) {
  return _postData(apiPathGetAccountCoordInfo, params, false)
}

export function downloadRTCM (params) {
  return _postData(apiPathDownloadRTCM, params, false, true)
}

export function downloadGGA (params) {
  return _postData(apiPathDownloadGGA, params, false, true)
}

export function getServiceCondition (params) {
  return _postData(apiPathGetServiceCondition, params, false)
}

export function getLogStatistics (params) {
  return _postData(apiPathGetLogStatistics, params, false)
}

export function getWindowStatistics (params) {
  return _postData(apiPathGetWindowStatistics, params, false)
}

export function getHistoryInfo (params) {
  return _postData(apiPathGetHistoryInfo, params, false)
}

export function getServiceArea (params) {
  return _postData(apiPathGetServiceArea, params, false)
}
export function getAbnormalInfo (params) {
  return _postData(apiPathGetAbnormalInfo, params, false)
}

export function getLatestInfo (params) {
  return _postData(apiPathGetLatestInfo, params, false)
}

export function getBasicInfo (params) {
  return _postData(apiPathGetBasicInfo, params, false)
}

export function login (params) {
  return _postData(apiPathLogin, params, true)
}

export function logout (params) {
  return _postData(apiPathLogout, params, true)
}

// 账号管理相关接口
export function getAccountCompany () {
  return _getData(apiPathAccountCompany, true)
}

export function getNtripUserEnable (params) {
  return _postData(apiPathNtripUserEnable, params, true)
}

export function getNtripUserRenewal (params) {
  return _postData(apiPathNtripUserRenewal, params, true)
}

export function getNtripUserDisable (params) {
  return _postData(apiPathNtripUserDisable, params, true)
}

export function getNtripUserDownload (params) {
  return _postData(apiPathNtripUserDownload, params, true, true)
}

export function getNtripUserGenerate (params) {
  return _postData(apiPathNtripUserGenerate, params, true)
}

export function getNtripUserInsert (params) {
  return _postData(apiPathNtripUserInsert, params, true)
}

export function getNtripUserUpdate (params) {
  return _postData(apiPathNtripUserUpdate, params, true)
}
export function getNtripUserDelete (params) {
  return _postData(apiPathNtripUserDelete, params, true)
}

export function getNtripUserQuery (params) {
  return _postData(apiPathNtripUserQuery, params, true)
}

export function getNtripUserQueryList (params, __isLoading = false) {
  return _postData(apiPathNtripUserQueryList, params, __isLoading)
}

export function getNtripUserUpload (file) {
  return _uploadFile(apiPathNtripUserUpload, file, true)
}

// geo
export function geoAdjustCodeList () {
  return _getData(apiPath_AdjustCodeList)
}

export function geo_CodeList () {
  return _getData(apiPath_Geo_CodeList)
}

export function geo_getAreaList (params) {
  return _getData(apiPath_Geo_getAreaList, params,true)
}