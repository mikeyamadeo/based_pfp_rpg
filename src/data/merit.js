import { MODIFIER_TYPES } from './_enums'

const MONTH_MILESTONES = [
  6,
  12,
  18,
  24,
  30,
  36,
  60
]

// const miltestoneToBadge = {

// }

const badges = {
  SIX_MONTHS: {
    name: '6 Months',
    description: 'Made it 6 months',
    img: { url: '/badges/tenure/6' },
    powers: [
      { type: MODIFIER_TYPES.rolls, value: 1 }
    ]
  },
  TWELVE_MONTHS: {
    name: '12 Months',
    description: 'Made it 12 months',
    img: { url: '/badges/tenure/12' },
    powers: [
      { type: MODIFIER_TYPES.rolls, value: 1 },
      { type: MODIFIER_TYPES.mf, value: 3 }
    ]
  }
}
