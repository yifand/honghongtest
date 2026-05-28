import Vue from 'vue'

// Shared reactive dashboard data store
export const DB = Vue.observable({
  users: [
    { id: 1, enterprise: 'SenseTime', account: 'sensetime@gs.com', password: 'Abc12345', code: 'ZNJS001', phone: '+86-755-86189999', email: 'contact@sensetime.com', instance: 'SRV-SZX-001', poolName: 'Pool-ST-01', poolNo: 'RP-20260501-001', created: '2026-05-01' },
    { id: 2, enterprise: 'DJI', account: 'dji@gs.com', password: 'Xyz67890', code: 'CH003', phone: '+86-755-26656818', email: 'dev@dji.com', instance: 'SRV-SZX-002', poolName: 'Pool-DJI-01', poolNo: 'RP-20260502-001', created: '2026-05-03' },
    { id: 3, enterprise: 'XAG', account: 'xag@gs.com', password: 'Pwd11111', code: 'CH005', phone: '+86-20-83936333', email: 'api@xag.cn', instance: 'SRV-CAN-001', poolName: 'Pool-XAG-01', poolNo: 'RP-20260503-001', created: '2026-05-05' },
    { id: 4, enterprise: 'AutoX', account: 'autox@gs.com', password: 'Qwe22222', code: 'ZNJS003', phone: '+86-21-61133333', email: 'rd@autox.ai', instance: 'SRV-SH-001', poolName: 'Pool-AX-01', poolNo: 'RP-20260504-001', created: '2026-05-08' },
    { id: 5, enterprise: 'DeepRoute', account: 'deeproute@gs.com', password: 'Asd33333', code: 'ZNJS005', phone: '+86-755-86368888', email: 'info@deeproute.ai', instance: 'SRV-SZX-003', poolName: 'Pool-DR-01', poolNo: 'RP-20260505-001', created: '2026-05-10' }
  ],
  orders: [
    { id: 1, enterprise: 'SenseTime', title: 'ZNJS001_Ntrip_Year', orderNo: 'ORD-20260501', svcType: 'NRTK', acctMode: 'Ntrip', spec: 'year', stack: 3, qty: 20, device: 'GNSS-Receiver-V3', accountList: 'ntrip_st001~ntrip_st020', notes: '', status: 'pushed', partner: 'ZNJS', created: '2026-05-02' },
    { id: 2, enterprise: 'DJI', title: 'CH003_SDK_Month', orderNo: 'ORD-20260502', svcType: 'PPP-RTK', acctMode: 'SDK', spec: 'month', stack: 6, qty: 10, device: 'Drone-M300-RTK', accountList: 'DID_dji001~DID_dji010', notes: 'Drone fleet', status: 'unpushed', partner: 'CH', created: '2026-05-06' },
    { id: 3, enterprise: 'XAG', title: 'CH005_Ntrip_Day', orderNo: 'ORD-20260503', svcType: 'NRTK', acctMode: 'Ntrip', spec: 'day', stack: 7, qty: 50, device: 'Agri-Drone-P100', accountList: 'ntrip_xag001~ntrip_xag050', notes: 'Trial batch', status: 'pushed', partner: 'CH', created: '2026-05-07' },
    { id: 4, enterprise: 'AutoX', title: 'ZNJS003_SDK_Year', orderNo: 'ORD-20260504', svcType: 'NRTK', acctMode: 'SDK', spec: 'year', stack: 5, qty: 15, device: 'RoboTaxi-Gen5', accountList: 'DID_ax001~DID_ax015', notes: '', status: 'unpushed', partner: 'ZNJS', created: '2026-05-09' }
  ],
  accounts: [
    { id: 1, name: 'ntrip_st001', password: 'aB3xK9mQ', enterprise: 'SenseTime', svcType: 'NRTK', mode: 'Ntrip', spec: 'year', stack: 3, device: 'GNSS-Receiver-V3', activated: 'activated', created: '2026-05-02', expires: '2027-05-02', partner: 'ZNJS' },
    { id: 2, name: 'ntrip_st002', password: 'pQ7rT2wN', enterprise: 'SenseTime', svcType: 'NRTK', mode: 'Ntrip', spec: 'year', stack: 3, device: 'GNSS-Receiver-V3', activated: 'activated', created: '2026-05-02', expires: '2027-05-02', partner: 'ZNJS' },
    { id: 3, name: 'DID_dji001', password: 'xM4kL8jH', enterprise: 'DJI', svcType: 'PPP-RTK', mode: 'SDK', spec: 'month', stack: 6, device: 'Drone-M300-RTK', activated: 'inactive', created: '2026-05-06', expires: '2026-11-06', partner: 'CH' },
    { id: 4, name: 'DID_dji002', password: 'cV2nB5fG', enterprise: 'DJI', svcType: 'PPP-RTK', mode: 'SDK', spec: 'month', stack: 6, device: 'Drone-M300-RTK', activated: 'activated', created: '2026-05-06', expires: '2026-11-06', partner: 'CH' },
    { id: 5, name: 'ntrip_xag001', password: 'zA9sD4eR', enterprise: 'XAG', svcType: 'NRTK', mode: 'Ntrip', spec: 'day', stack: 7, device: 'Agri-Drone-P100', activated: 'activated', created: '2026-05-07', expires: '2026-05-14', partner: 'CH' },
    { id: 6, name: 'DID_ax001', password: 'yU6hJ3kN', enterprise: 'AutoX', svcType: 'NRTK', mode: 'SDK', spec: 'year', stack: 5, device: 'RoboTaxi-Gen5', activated: 'inactive', created: '2026-05-09', expires: '2027-05-09', partner: 'ZNJS' }
  ],
  partners: [
    { id: 1, name: 'SenseTime', code: 'ZNJS', enterprise: 'SenseTime Group Ltd.', notes: 'Strategic partner' },
    { id: 2, name: 'China Mobile IoT', code: 'CH', enterprise: 'China Mobile IoT Co.', notes: 'Channel partner' },
    { id: 3, name: 'AutoX Partner', code: 'ZNJS', enterprise: 'AutoX Inc.', notes: '' }
  ],
  nextUserId: 6,
  nextOrderId: 5,
  nextAccountId: 7,
  nextPartnerId: 4
})

// Computed helpers
export const activeAccountsCount = () => DB.accounts.filter(a => a.activated === 'activated').length
export const pendingOrdersCount = () => DB.orders.filter(o => o.status === 'unpushed').length

// User operations
export function saveUser(form) {
  const data = { ...form }
  if (!data.enterprise || !data.account || !data.password) {
    return { success: false, message: 'Enterprise, Account, and Password are required' }
  }
  if (data.id) {
    const idx = DB.users.findIndex(u => u.id === data.id)
    if (idx !== -1) Vue.set(DB.users, idx, data)
  } else {
    data.id = DB.nextUserId++
    data.created = new Date().toISOString().slice(0, 10)
    DB.users.push(data)
  }
  return { success: true }
}

export function deleteUser(id) {
  DB.users = DB.users.filter(u => u.id !== id)
}

// Order operations
export function saveOrder(form) {
  const data = { ...form }
  if (!data.title) {
    return { success: false, message: 'Order title is required' }
  }
  const user = DB.users.find(u => u.enterprise === data.enterprise)
  const code = user ? user.code : 'XXX'
  const prefix = data.acctMode === 'Ntrip' ? 'ntrip_' : 'DID_'
  data.accountList = prefix + code.toLowerCase() + '001~' + prefix + code.toLowerCase() + String(data.qty).padStart(3, '0')
  if (data.id) {
    const idx = DB.orders.findIndex(o => o.id === data.id)
    if (idx !== -1) Vue.set(DB.orders, idx, { ...DB.orders[idx], ...data })
  } else {
    data.id = DB.nextOrderId++
    data.orderNo = 'ORD-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + String(data.id).padStart(2, '0')
    data.status = 'unpushed'
    data.partner = (DB.partners.find(p => p.enterprise && p.enterprise.includes(data.enterprise)) || {}).code || code
    data.created = new Date().toISOString().slice(0, 10)
    DB.orders.push(data)
  }
  return { success: true }
}

export function pushOrder(id) {
  const o = DB.orders.find(x => x.id === id)
  if (!o) return false
  o.status = 'pushed'
  const existing = DB.accounts.filter(a => a.enterprise === o.enterprise && a.orderNo === o.orderNo)
  if (existing.length === 0) {
    const prefix = o.acctMode === 'Ntrip' ? 'ntrip_' : 'DID_'
    const user = DB.users.find(u => u.enterprise === o.enterprise)
    const code = user ? user.code.toLowerCase() : 'xxx'
    for (let i = 1; i <= o.qty; i++) {
      const randStr = () => Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
      DB.accounts.push({
        id: DB.nextAccountId++,
        name: prefix + code + String(i).padStart(3, '0'),
        password: randStr(),
        enterprise: o.enterprise,
        svcType: o.svcType,
        mode: o.acctMode,
        spec: o.spec,
        stack: o.stack,
        device: o.device,
        activated: 'inactive',
        created: new Date().toISOString().slice(0, 10),
        expires: new Date(Date.now() + (o.spec === 'year' ? 365 : o.spec === 'month' ? 30 : 7) * 86400000).toISOString().slice(0, 10),
        partner: o.partner,
        orderNo: o.orderNo
      })
    }
  }
  return true
}

// Account operations
export function updatePassword(id, newPassword) {
  const a = DB.accounts.find(x => x.id === id)
  if (a && newPassword) {
    a.password = newPassword
  }
}

export function exportAccountsCSV() {
  const header = 'Account,Password,Enterprise,Type,Mode,Spec,Stack,Device,Status,Created,Expires'
  const rows = DB.accounts.map(a => [a.name, a.password, a.enterprise, a.svcType, a.mode, a.spec, a.stack, a.device, a.activated, a.created, a.expires].join(',')).join('\n')
  const blob = new Blob([header + '\n' + rows], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'accounts_export_' + new Date().toISOString().slice(0, 10) + '.csv'
  a.click()
  URL.revokeObjectURL(url)
}

// Partner operations
export function savePartner(form) {
  const data = { ...form }
  if (!data.name || !data.enterprise) {
    return { success: false, message: 'Partner name and enterprise are required' }
  }
  if (data.id) {
    const idx = DB.partners.findIndex(p => p.id === data.id)
    if (idx !== -1) Vue.set(DB.partners, idx, data)
  } else {
    data.id = DB.nextPartnerId++
    DB.partners.push(data)
  }
  return { success: true }
}

export function deletePartner(id) {
  DB.partners = DB.partners.filter(p => p.id !== id)
}
