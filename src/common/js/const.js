import i18n from '@/i18n'


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
    value: '1'
  },
  {
    label: i18n.t('inactive'),
    value: '0'
  }
]
//<template slot-scope="scope">
 //  {{ scope.row.status | transText(pilotStatusEnum) }}
// </template>