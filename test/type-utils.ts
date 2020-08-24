import * as assert from 'assert'
import * as TU from '../src/type-utils'

describe('type-utils', () => {
  it('isEmptyString', () => {
    assert.strictEqual(TU.isEmptyString(''), true)
    assert.strictEqual(TU.isEmptyString(undefined), true)
    assert.strictEqual(TU.isEmptyString(null), true)
    assert.strictEqual(TU.isEmptyString(' '), false)
  })
  it('isNotEmptyString', () => {
    assert.strictEqual(TU.isNotEmptyString(''), false)
    assert.strictEqual(TU.isNotEmptyString(undefined), false)
    assert.strictEqual(TU.isNotEmptyString(null), false)
    assert.strictEqual(TU.isNotEmptyString(' '), true)
  })
  it('isEmpty', () => {
    assert.strictEqual(TU.isEmpty(''), false)
    assert.strictEqual(TU.isEmpty(undefined), true)
    assert.strictEqual(TU.isEmpty(null), true)
    assert.strictEqual(TU.isEmpty(' '), false)
  })
  it('hasValue', () => {
    assert.strictEqual(TU.hasValue(''), true)
    assert.strictEqual(TU.hasValue(undefined), false)
    assert.strictEqual(TU.hasValue(null), false)
    assert.strictEqual(TU.hasValue(' '), true)
  })
  it('getOrElse', () => {
    assert.strictEqual(
      TU.getOrElse(null, () => 'test'),
      'test'
    )
    assert.strictEqual(
      TU.getOrElse(undefined, () => 999),
      999
    )
    assert.strictEqual(
      TU.getOrElse('value', () => 'test'),
      'value'
    )
  })
  it('allFieldsAreFilled', () => {
    assert.strictEqual(TU.allFieldsAreFilled({}), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: undefined }), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: null }), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: '' }), true)
    assert.strictEqual(TU.allFieldsAreFilled({ test: undefined, test2: 'value' }), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: null, test2: 'value' }), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: 'value1', test2: 'value2' }), true)
  })
  it('anyFieldIsFilled', () => {
    assert.strictEqual(TU.anyFieldIsFilled({}), false)
    assert.strictEqual(TU.anyFieldIsFilled({ test: undefined }), false)
    assert.strictEqual(TU.anyFieldIsFilled({ test: null }), false)
    assert.strictEqual(TU.anyFieldIsFilled({ test: '' }), true)
    assert.strictEqual(TU.anyFieldIsFilled({ test: undefined, test2: 'value' }), true)
    assert.strictEqual(TU.anyFieldIsFilled({ test: null, test2: 'value' }), true)
    assert.strictEqual(TU.anyFieldIsFilled({ test: 'value1', test2: 'value2' }), true)
  })
  it('anyFieldIsFilledWithException', () => {
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({}, (_) => false),
      false
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: undefined }, (_) => false),
      false
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: undefined }, (v) => v === 'test'),
      false
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: null }, (_) => false),
      false
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: null }, (v) => v === 'test'),
      false
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: '' }, (_) => false),
      true
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: '' }, (v) => v === 'test'),
      false
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: undefined, test2: 'value' }, (_) => false),
      true
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: undefined, test2: 'value' }, (v) => v === 'test2'),
      false
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: null, test2: 'value' }, (_) => false),
      true
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: null, test2: 'value' }, (v) => v === 'test2'),
      false
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: 'value1', test2: 'value2' }, (_) => false),
      true
    )
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: 'value1', test2: 'value2' }, (v) => v === 'test2'),
      true
    )
  })
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
})
