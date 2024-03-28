import { differenceInMonths } from 'date-fns'

const getTenureInMonths = (startDate) => {
  const pastDate = new Date(startDate)

  const currentDate = new Date()
  return differenceInMonths(currentDate, pastDate)
}

const milestones = [6, 12, 18, 24, 36, 60, 100]

export const getBackgroundColor = (traits) => {
  if (traits.isContractor) {
    return palette.grey
  }
  const months = getTenureInMonths(traits.start)
  const milestoneIndex = milestones.findIndex(milestone => months < milestone)
  return clrConfig[milestoneIndex]
}

const palette = {
  grey: '#c3c3c3', // grey (contractor)
  beige: '#e2c4a2'
}
const clrConfig = [
  palette.beige, // beige
  '#9cb5fe', // blue
  '#ff8a27', // orange
  '#ffcf00', // yellow
  '#ff96cd', // pink
  '#ff1167', // red
  '#aa6ae4' // purple
]
