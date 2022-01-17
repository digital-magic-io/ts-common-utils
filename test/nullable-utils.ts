import * as assert from 'assert'
import {
  asNonEmptyString,
  mapNotNullable,
  mapNotNullablePair,
  parseIntNanSafe,
  parseOptionalInt,
  parseOptionalIntNanSafe,
  undefinedIf
} from '../src/nullable-utils'
import { isEmptyString } from '../src/type'

describe('utils', () => {
  it('mapNotNullable', () => {
    const mapFn = (v: string): number => v.length
    const mapper = mapNotNullable(mapFn)
    assert.strictEqual(mapper('one'), 3)
    assert.strictEqual(mapper('four'), 4)
    assert.strictEqual(mapper(''), 0)
    assert.strictEqual(mapper(null), undefined)
    assert.strictEqual(mapper(undefined), undefined)
  })
  it('mapNotNullablePair', () => {
    const mapFn = (a: string, b: number): string => a + String(b)
    const mapper = mapNotNullablePair(mapFn)
    assert.strictEqual(mapper('', 0), '0')
    assert.strictEqual(mapper('one', 1), 'one1')
    assert.strictEqual(mapper('one', null), undefined)
    assert.strictEqual(mapper(null, 1), undefined)
    assert.strictEqual(mapper(null, null), undefined)
    assert.strictEqual(mapper('one', undefined), undefined)
    assert.strictEqual(mapper(undefined, 1), undefined)
    assert.strictEqual(mapper(undefined, undefined), undefined)
  })
  it('undefinedIf', () => {
    const filter = undefinedIf(isEmptyString)
    assert.strictEqual(filter('test'), 'test')
    assert.strictEqual(filter(''), undefined)
  })
  it('parseIntNanSafe', () => {
    assert.strictEqual(parseIntNanSafe('1'), 1)
    assert.strictEqual(parseIntNanSafe('a'), undefined)
  })
  it('parseOptionalInt', () => {
    assert.strictEqual(parseOptionalInt('1'), 1)
    assert.strictEqual(mapNotNullable(isNaN)(parseOptionalInt('a')), true)
    assert.strictEqual(parseOptionalInt(undefined), undefined)
  })
  it('parseOptionalIntNanSafe', () => {
    assert.strictEqual(parseOptionalIntNanSafe('1'), 1)
    assert.strictEqual(parseOptionalIntNanSafe('a'), undefined)
    assert.strictEqual(parseOptionalIntNanSafe(undefined), undefined)
  })
  it('asNonEmptyString', () => {
    assert.strictEqual(asNonEmptyString(undefined), undefined)
    assert.strictEqual(asNonEmptyString(''), undefined)
    assert.strictEqual(asNonEmptyString('1'), '1')
    assert.strictEqual(asNonEmptyString('a'), 'a')
  })
})
