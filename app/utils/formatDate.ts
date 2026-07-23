import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const BD_TIMEZONE = 'Asia/Dhaka'

export function formatToBD(value: string | Date | null | undefined): string {
  if (!value) return '-'
  return dayjs(value).tz(BD_TIMEZONE).format('DD MMM YYYY, hh:mm A')
}

export function formatToBDDate(value: string | Date | null | undefined): string {
  if (!value) return '-'
  return dayjs(value).tz(BD_TIMEZONE).format('DD MMM YYYY')
}

export function toUTCFromBD(value: string | Date): Date {
  return dayjs(value).tz(BD_TIMEZONE, true).utc().toDate()
}
