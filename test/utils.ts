import * as assert from 'assert'
import * as TU from '../src/utils'

describe('utils', () => {
  it('nameOf', () => {
    const obj = {
      value: 'value',
      empty: ''
    }
    assert.deepStrictEqual(TU.nameOf<typeof obj>('value'), 'value')
    assert.deepStrictEqual(TU.nameOf<typeof obj>('empty'), 'empty')
  })
  it('arrayIntRange', () => {
    assert.deepStrictEqual(TU.arrayIntRange(1, 3), [1, 2, 3])
    assert.deepStrictEqual(TU.arrayIntRange(0, 0), [0])
    assert.deepStrictEqual(TU.arrayIntRange(-1, 1), [-1, 0, 1])
    assert.deepStrictEqual(TU.arrayIntRange(1, -1), [])
  })
  /*
  it('mapValue', () => {
    const mapper = TU.mapValue<number, string>(String)
    assert.deepStrictEqual(mapper(1), '1')
  })
  */
})
