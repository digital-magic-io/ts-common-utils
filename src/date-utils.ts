import { isEmpty } from './type-utils'
import moment from 'moment'

export function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDay() === d2.getDay()
}

export function isSameOrAfterDay(date: Date, baseline: Date = new Date()): boolean {
  return date > baseline || isSameDay(date, baseline)
}

export function isSameOrBeforeDay(date: Date, baseline: Date = new Date()): boolean {
  return date < baseline || isSameDay(date, baseline)
}

export const formatDateValue = (format: string) => (value: Date | undefined): string => {
  if (isEmpty(value)) {
    return '-'
  }
  return moment(value).format(format)
}
