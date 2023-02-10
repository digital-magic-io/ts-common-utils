// TODO: Change to date-fns
import moment from 'moment'
import * as assert from 'assert'
import * as D from '../src/dates'

describe('date-utils', () => {
  it('isSameDay', () => {
    const dayStart: Date = moment(new Date()).startOf('day').toDate()
    const dayEnd: Date = moment(new Date()).endOf('day').toDate()
    const prevDayEnd: Date = moment(new Date()).subtract(1, 'day').endOf('day').toDate()
    const nextDayStart: Date = moment(new Date()).add(1, 'day').startOf('day').toDate()
    assert.strictEqual(D.isSameDay(new Date(), new Date()), true)
    assert.strictEqual(D.isSameDay(dayStart, new Date()), true)
    assert.strictEqual(D.isSameDay(dayEnd, new Date()), true)
    assert.strictEqual(D.isSameDay(dayEnd, dayEnd), true)
    assert.strictEqual(D.isSameDay(prevDayEnd, dayEnd), false)
    assert.strictEqual(D.isSameDay(prevDayEnd, new Date()), false)
    assert.strictEqual(D.isSameDay(nextDayStart, dayStart), false)
    assert.strictEqual(D.isSameDay(nextDayStart, new Date()), false)
    assert.strictEqual(D.isSameDay(prevDayEnd, nextDayStart), false)
    assert.strictEqual(D.isSameDay(nextDayStart, prevDayEnd), false)
  })
  it('isSameOrAfterDay', () => {
    const dayStart: Date = moment(new Date()).startOf('day').toDate()
    const dayEnd: Date = moment(new Date()).endOf('day').toDate()
    const prevDayEnd: Date = moment(new Date()).subtract(1, 'day').endOf('day').toDate()
    const nextDayStart: Date = moment(new Date()).add(1, 'day').startOf('day').toDate()
    assert.strictEqual(D.isSameOrAfterDay(new Date(), new Date()), true)
    assert.strictEqual(D.isSameOrAfterDay(dayStart, new Date()), true)
    assert.strictEqual(D.isSameOrAfterDay(dayStart), true)
    assert.strictEqual(D.isSameOrAfterDay(dayEnd, new Date()), true)
    assert.strictEqual(D.isSameOrAfterDay(dayEnd), true)
    assert.strictEqual(D.isSameOrAfterDay(dayEnd, dayEnd), true)
    assert.strictEqual(D.isSameOrAfterDay(prevDayEnd, dayEnd), false)
    assert.strictEqual(D.isSameOrAfterDay(dayEnd, prevDayEnd), true)
    assert.strictEqual(D.isSameOrAfterDay(prevDayEnd, new Date()), false)
    assert.strictEqual(D.isSameOrAfterDay(nextDayStart, dayStart), true)
    assert.strictEqual(D.isSameOrAfterDay(dayStart, nextDayStart), false)
    assert.strictEqual(D.isSameOrAfterDay(nextDayStart, new Date()), true)
    assert.strictEqual(D.isSameOrAfterDay(prevDayEnd, nextDayStart), false)
    assert.strictEqual(D.isSameOrAfterDay(nextDayStart, prevDayEnd), true)
  })
  it('isSameOrBeforeDay', () => {
    const dayStart: Date = moment(new Date()).startOf('day').toDate()
    const dayEnd: Date = moment(new Date()).endOf('day').toDate()
    const prevDayEnd: Date = moment(new Date()).subtract(1, 'day').endOf('day').toDate()
    const nextDayStart: Date = moment(new Date()).add(1, 'day').startOf('day').toDate()
    assert.strictEqual(D.isSameOrBeforeDay(new Date(), new Date()), true)
    assert.strictEqual(D.isSameOrBeforeDay(dayStart, new Date()), true)
    assert.strictEqual(D.isSameOrBeforeDay(dayStart), true)
    assert.strictEqual(D.isSameOrBeforeDay(dayEnd, new Date()), true)
    assert.strictEqual(D.isSameOrBeforeDay(dayEnd), true)
    assert.strictEqual(D.isSameOrBeforeDay(dayEnd, dayEnd), true)
    assert.strictEqual(D.isSameOrBeforeDay(prevDayEnd, dayEnd), true)
    assert.strictEqual(D.isSameOrBeforeDay(dayEnd, prevDayEnd), false)
    assert.strictEqual(D.isSameOrBeforeDay(prevDayEnd, new Date()), true)
    assert.strictEqual(D.isSameOrBeforeDay(nextDayStart, dayStart), false)
    assert.strictEqual(D.isSameOrBeforeDay(dayStart, nextDayStart), true)
    assert.strictEqual(D.isSameOrBeforeDay(nextDayStart, new Date()), false)
    assert.strictEqual(D.isSameOrBeforeDay(prevDayEnd, nextDayStart), true)
    assert.strictEqual(D.isSameOrBeforeDay(nextDayStart, prevDayEnd), false)
  })
})