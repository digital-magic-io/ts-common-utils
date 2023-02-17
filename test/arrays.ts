/* eslint-disable functional/no-return-void */
import * as assert from 'assert'
import { hasDuplicates, isNonArrayObject, reorderArray, sameArrayValues } from '../src'
import { arrayIncludes, splitArrayToChunks } from '../lib'

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
  it('sameArrayValues', () => {
    // TODO: Is it correct behaviour if we have only 1 value? Logically there is no multiple values to compare!
    assert.strictEqual(sameArrayValues([1]), true)
    assert.strictEqual(sameArrayValues([1, 1]), true)
    assert.strictEqual(sameArrayValues([]), false)
    assert.strictEqual(sameArrayValues([1, 1, 1, 1]), true)
    assert.strictEqual(sameArrayValues([1, 1, 2]), false)
    assert.strictEqual(sameArrayValues([1, 2, 3, 1]), false)
    assert.strictEqual(sameArrayValues([1, 2, 2, 1]), false)
  })
  it('arrayIncludes', () => {
    assert.strictEqual(arrayIncludes([1, 2, 3], 1), true)
    assert.strictEqual(arrayIncludes([1, 2, 3, 1], 1), true)
    assert.strictEqual(arrayIncludes([1, 2, 3], 4), false)
    assert.strictEqual(arrayIncludes([], 1), false)
  })
  it('splitArrayToChunks', () => {
    assert.deepEqual(splitArrayToChunks([], 2), [])
    assert.deepEqual(splitArrayToChunks([1], 2), [[1]])
    assert.deepEqual(splitArrayToChunks([1, 2], 2), [[1, 2]])
    assert.deepEqual(splitArrayToChunks([1, 2, 3], 2), [[1, 2], [3]])
    assert.deepEqual(splitArrayToChunks([1, 2, 3, 4], 2), [
      [1, 2],
      [3, 4]
    ])
    assert.deepEqual(splitArrayToChunks([1, 2, 3, 4], 3), [[1, 2, 3], [4]])
    assert.deepEqual(splitArrayToChunks([1, 2, 3, 4, 5], 3), [
      [1, 2, 3],
      [4, 5]
    ])
    assert.deepEqual(splitArrayToChunks([1, 2, 3, 4, 5, 6], 3), [
      [1, 2, 3],
      [4, 5, 6]
    ])
  })
  it('reorderArray', () => {
    assert.deepEqual(reorderArray([1, 2, 3], 1, 2), [1, 3, 2])
    assert.deepEqual(reorderArray([3, 2, 1], 1, 3), [3, 1, 2])
    assert.deepEqual(reorderArray([2, 1, 3], 0, 0), [2, 1, 3])
    assert.deepEqual(reorderArray([4, 5, 6], 0, 4), [5, 6, 4])
  })
})
