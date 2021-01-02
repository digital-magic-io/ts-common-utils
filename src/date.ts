export const isSameDay = (d1: Date, d2: Date): boolean =>
  d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()

export const isSameOrAfterDay = (date: Date, baseline: Date = new Date()): boolean =>
  date > baseline || isSameDay(date, baseline)

export const isSameOrBeforeDay = (date: Date, baseline: Date = new Date()): boolean =>
  date < baseline || isSameDay(date, baseline)
