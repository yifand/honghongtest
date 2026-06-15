import Vue from 'vue'

// Shared reactive dashboard data store
export const DB = Vue.observable({
  users: [],
  orders: [],
  accounts: [],
  partners: [],
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
  const now = new Date().toISOString().slice(0, 10)
  if (data.id) {
    const idx = DB.users.findIndex(u => u.id === data.id)
    if (idx !== -1) {
      data.updated = now
      Vue.set(DB.users, idx, data)
    }
  } else {
    data.id = DB.nextUserId++
    data.created = now
    data.updated = now
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
        activationTime: '',
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
  const header = 'Account,Password,Enterprise,Type,Mode,Spec,Stack,Device,Status,ActivationTime,Partner,Created,Expires'
  const rows = DB.accounts.map(a => [a.name, a.password, a.enterprise, a.svcType, a.mode, a.spec, a.stack, a.device, a.activated, a.activationTime, a.partner, a.created, a.expires].join(',')).join('\n')
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
