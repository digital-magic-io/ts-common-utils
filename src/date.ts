import { isEmpty } from './type'
import moment from 'moment'

export const isSameDay = (d1: Date, d2: Date): boolean =>
  d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDay() === d2.getDay()

export const isSameOrAfterDay = (date: Date, baseline: Date = new Date()): boolean =>
  date > baseline || isSameDay(date, baseline)

export const isSameOrBeforeDay = (date: Date, baseline: Date = new Date()): boolean =>
  date < baseline || isSameDay(date, baseline)

export const formatDateValue = (format: string) => (value: Date | undefined): string => {
  if (isEmpty(value)) {
    return '-'
  }
  return moment(value).format(format)
}
