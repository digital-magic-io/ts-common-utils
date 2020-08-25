import * as assert from 'assert'
import * as TU from '../src/type-utils'

describe('type-utils', () => {
  it('asNullable', () => {
    assert.strictEqual(TU.asNullable(undefined), null)
    assert.strictEqual(TU.asNullable('test'), 'test')
  })
  it('fromNullable', () => {
    assert.strictEqual(TU.fromNullable(null), undefined)
    assert.strictEqual(TU.fromNullable('test'), 'test')
  })
  it('isEmptyString', () => {
    assert.strictEqual(TU.isEmptyString(''), true)
    assert.strictEqual(TU.isEmptyString(undefined), true)
    assert.strictEqual(TU.isEmptyString(null), true)
    assert.strictEqual(TU.isEmptyString(' '), false)
  })
  it('isBlankString', () => {
    assert.strictEqual(TU.isBlankString(''), true)
    assert.strictEqual(TU.isBlankString(' '), true)
    assert.strictEqual(TU.isBlankString('   '), true)
    assert.strictEqual(TU.isBlankString(undefined), true)
    assert.strictEqual(TU.isBlankString(null), true)
    assert.strictEqual(TU.isBlankString('test'), false)
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
    assert.strictEqual(TU.allFieldsAreFilled({}, false), false)
    assert.strictEqual(TU.allFieldsAreFilled({}, true), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: undefined }, false), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: null }, false), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: '' }, false), true)
    assert.strictEqual(TU.allFieldsAreFilled({ test: '' }, true), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: undefined, test2: 'value' }, false), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: null, test2: 'value' }, false), false)
    assert.strictEqual(TU.allFieldsAreFilled({ test: 'value1', test2: 'value2' }, false), true)
    assert.strictEqual(TU.allFieldsAreFilled({ test: 'value1', test2: '' }, false), true)
    assert.strictEqual(TU.allFieldsAreFilled({ test: 'value1', test2: '' }, true), false)
  })
  it('anyFieldIsFilled', () => {
    assert.strictEqual(TU.anyFieldIsFilled({}, false), false)
    assert.strictEqual(TU.anyFieldIsFilled({}, true), false)
    assert.strictEqual(TU.anyFieldIsFilled({ test: undefined }, false), false)
    assert.strictEqual(TU.anyFieldIsFilled({ test: null }, false), false)
    assert.strictEqual(TU.anyFieldIsFilled({ test: '' }, false), true)
    assert.strictEqual(TU.anyFieldIsFilled({ test: '' }, true), false)
    assert.strictEqual(TU.anyFieldIsFilled({ test: undefined, test2: 'value' }, false), true)
    assert.strictEqual(TU.anyFieldIsFilled({ test: null, test2: 'value' }, false), true)
    assert.strictEqual(TU.anyFieldIsFilled({ test: 'value1', test2: 'value2' }, false), true)
    assert.strictEqual(TU.anyFieldIsFilled({ test: 'value1', test2: '' }, false), true)
    assert.strictEqual(TU.anyFieldIsFilled({ test: 'value1', test2: '' }, true), true)
  })
  it('anyFieldIsFilledWithException', () => {
    const alwaysFalse = <T>(_: T) => false
    const eqValue = (value: string) => (v: string) => v === value
    assert.strictEqual(TU.anyFieldIsFilledWithException({}, false, alwaysFalse), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({}, true, alwaysFalse), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: undefined }, false, alwaysFalse), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: undefined }, false, eqValue('test')), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: null }, false, alwaysFalse), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: null }, false, eqValue('test')), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: '' }, false, alwaysFalse), true)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: '' }, true, alwaysFalse), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: '' }, false, eqValue('test')), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: '' }, true, eqValue('test')), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: undefined, test2: 'value' }, false, alwaysFalse), true)
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: undefined, test2: 'value' }, false, eqValue('test2')),
      false
    )
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: null, test2: 'value' }, false, alwaysFalse), true)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: null, test2: 'value' }, false, eqValue('test2')), false)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: 'value1', test2: 'value2' }, false, alwaysFalse), true)
    assert.strictEqual(
      TU.anyFieldIsFilledWithException({ test: 'value1', test2: 'value2' }, false, eqValue('test2')),
      true
    )
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: 'value1', test2: '' }, false, alwaysFalse), true)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: 'value1', test2: '' }, true, alwaysFalse), true)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: 'value1', test2: '' }, false, eqValue('test')), true)
    assert.strictEqual(TU.anyFieldIsFilledWithException({ test: 'value1', test2: '' }, true, eqValue('test')), false)
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
