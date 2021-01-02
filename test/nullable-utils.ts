import * as assert from 'assert'
import { getOrElse, mapNotNullable, mapNotNullablePair } from '../src/nullable-utils'

describe('utils', () => {
  it('getOrElse', () => {
    assert.strictEqual(
      getOrElse(null, () => 'test'),
      'test'
    )
    assert.strictEqual(
      getOrElse(undefined, () => 999),
      999
    )
    assert.strictEqual(
      getOrElse('value', () => 'test'),
      'value'
    )
  })
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
})
