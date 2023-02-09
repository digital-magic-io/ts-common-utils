import * as assert from 'assert'
import { hasDuplicates, isNonArrayObject } from '../src/array'

describe('utils', () => {
  it('hasDuplicates', () => {
    assert.strictEqual(hasDuplicates([]), false)
    assert.strictEqual(hasDuplicates(['1']), false)
    assert.strictEqual(hasDuplicates([1]), false)
    assert.strictEqual(hasDuplicates(['1', '2', '3']), false)
    assert.strictEqual(hasDuplicates(['1', 1, '3']), false)
    assert.strictEqual(hasDuplicates(['1', '1', '3']), true)
    assert.strictEqual(hasDuplicates(['1', '1', '1']), true)
    assert.strictEqual(hasDuplicates([1, 1, '3']), true)
    assert.strictEqual(hasDuplicates([1, 1, '1']), true)
    assert.strictEqual(hasDuplicates([1, 1, 1]), true)
  })
  it('isNonArrayObject', () => {
    assert.strictEqual(isNonArrayObject(''), false)
    assert.strictEqual(isNonArrayObject(1), false)
    assert.strictEqual(isNonArrayObject([]), false)
    assert.strictEqual(isNonArrayObject([1]), false)
    assert.strictEqual(isNonArrayObject({}), true)
  })
})
