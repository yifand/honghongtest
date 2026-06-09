import i18n from '@/i18n'
export const RES_SUCCESS = '1000_001'
export const RES_PILOT_SUCCESS = '0000_0'
export const RES_NEEDS_MSG = '1000_007'
export const EXPIRED_TOKEN = '0002_001'
export const APPROVE_EXCEPTION = '0012_11'
export const PAGINATION_PAGESIZES = [10, 20, 30, 40, 50, 100]
export const PAGINATION_DEFAULT_PAGESIZE = 10

export const TIMEOUT_NORMAL = 30 * 1000
export const TIMEOUT_LONG = 90 * 1000

export const SPECENUM = [
  {
    label: i18n.t('year_msg'),
    value: '1'
  },
  {
    label: i18n.t('month_msg'),
    value: '2'
  },
  {
    label: i18n.t('day_msg'),
    value: '3'
  }
]

export const MODELENUM = [
  {
    label: "Ntrip",
    value: 'Ntrip'
  },
  {
    label: "SDK",
    value: 'SDK'
  }
]
export const STATUSENUM = [
  {
    label: i18n.t('active'),
    value: 1
  },
  {
    label: i18n.t('inactive'),
    value: 0
  }
]
export const PECTYPEENUM = [
  {
    label: i18n.t('year'),
    value: 1
  },
  {
    label: i18n.t('month'),
    value: 2
  },
  {
    label: i18n.t('day'),
    value: 3
  }
]
export const PUSHTYPEENUM = [
  {
    label: i18n.t('unpushed'),
    value: 0
  },
  {
    label: i18n.t('pushed'),
    value: 1
  }
]
//<template slot-scope="scope">
 //  {{ scope.row.status | transText(pilotStatusEnum) }}
// </template>