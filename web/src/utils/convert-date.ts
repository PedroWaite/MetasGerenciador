import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(weekOfYear)

const currentTimezone = dayjs.tz.guess()

function getWeek(weekOfYear: number) {
  const year = dayjs().startOf('year')

  const firstDayOfWeek = year.add(weekOfYear, 'week').startOf('week').format('D MMM')
  const lastDayOfWeek = year.add(weekOfYear, 'week').endOf('week').format('D MMM')

  return `${firstDayOfWeek} - ${lastDayOfWeek}`
}

function getWeekDay(date: string) {
  const weekDay = dayjs.utc(date).tz(currentTimezone).format('dddd')

  return weekDay
}

function getFormattedDate(date: string) {
  const formattedDate = dayjs.utc(date).tz(currentTimezone).format('D[ de ]MMMM')

  return formattedDate
}

function getFormattedTime(date: string) {
  const time = dayjs.utc(date).tz(currentTimezone).format('HH:mm')

  return time
}

function getOldestWeekWithGoals(date: Date) {
  const week = dayjs.utc(date).tz(currentTimezone).week()

  return week - 1
}

export { getWeek, getWeekDay, getFormattedDate, getFormattedTime, getOldestWeekWithGoals }
