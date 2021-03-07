import * as assert from 'assert'
import * as TU from '../src/type'

describe('type', () => {
  it('toNullUnionType', () => {
    assert.strictEqual(TU.toNullUnionType(undefined), null)
    assert.strictEqual(TU.toNullUnionType('test'), 'test')
  })
  it('toOptionalType', () => {
    assert.strictEqual(TU.toOptionalType(null), undefined)
    assert.strictEqual(TU.toOptionalType('test'), 'test')
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
  it('isNonArrayObject', () => {
    assert.strictEqual(TU.isNonArrayObject(''), false)
    assert.strictEqual(TU.isNonArrayObject(1), false)
    assert.strictEqual(TU.isNonArrayObject([]), false)
    assert.strictEqual(TU.isNonArrayObject([1]), false)
    assert.strictEqual(TU.isNonArrayObject({}), true)
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
  it('allFieldsAreFilled', () => {
    const allFieldsAreFilledEmptyStrTrue = TU.allFieldsAreFilled(true)
    const allFieldsAreFilledEmptyStrFalse = TU.allFieldsAreFilled(false)
    assert.strictEqual(allFieldsAreFilledEmptyStrFalse({}), false)
    assert.strictEqual(allFieldsAreFilledEmptyStrTrue({}), false)
    assert.strictEqual(allFieldsAreFilledEmptyStrFalse({ test: undefined }), false)
    assert.strictEqual(allFieldsAreFilledEmptyStrFalse({ test: null }), false)
    assert.strictEqual(allFieldsAreFilledEmptyStrFalse({ test: '' }), true)
    assert.strictEqual(allFieldsAreFilledEmptyStrTrue({ test: '' }), false)
    assert.strictEqual(allFieldsAreFilledEmptyStrFalse({ test: undefined, test2: 'value' }), false)
    assert.strictEqual(allFieldsAreFilledEmptyStrFalse({ test: null, test2: 'value' }), false)
    assert.strictEqual(allFieldsAreFilledEmptyStrFalse({ test: 'value1', test2: 'value2' }), true)
    assert.strictEqual(allFieldsAreFilledEmptyStrFalse({ test: 'value1', test2: '' }), true)
    assert.strictEqual(allFieldsAreFilledEmptyStrTrue({ test: 'value1', test2: '' }), false)
  })
  it('anyFieldIsFilled', () => {
    const anyFieldIsFilledEmptyStrFalse = TU.anyFieldIsFilled(false)
    const anyFieldIsFilledEmptyStrTrue = TU.anyFieldIsFilled(true)
    assert.strictEqual(anyFieldIsFilledEmptyStrFalse({}), false)
    assert.strictEqual(anyFieldIsFilledEmptyStrTrue({}), false)
    assert.strictEqual(anyFieldIsFilledEmptyStrFalse({ test: undefined }), false)
    assert.strictEqual(anyFieldIsFilledEmptyStrFalse({ test: null }), false)
    assert.strictEqual(anyFieldIsFilledEmptyStrFalse({ test: '' }), true)
    assert.strictEqual(anyFieldIsFilledEmptyStrTrue({ test: '' }), false)
    assert.strictEqual(anyFieldIsFilledEmptyStrFalse({ test: undefined, test2: 'value' }), true)
    assert.strictEqual(anyFieldIsFilledEmptyStrFalse({ test: null, test2: 'value' }), true)
    assert.strictEqual(anyFieldIsFilledEmptyStrFalse({ test: 'value1', test2: 'value2' }), true)
    assert.strictEqual(anyFieldIsFilledEmptyStrFalse({ test: 'value1', test2: '' }), true)
    assert.strictEqual(anyFieldIsFilledEmptyStrTrue({ test: 'value1', test2: '' }), true)
  })
  it('anyFieldIsFilledWithException', () => {
    const alwaysFalse = (): boolean => false
    const eqValue = (value: string) => (v: string) => v === value
    const anyFieldIsFilledWithExceptionEmptyStrFalse = TU.anyFieldIsFilledWithException(false)
    const anyFieldIsFilledWithExceptionEmptyStrTrue = TU.anyFieldIsFilledWithException(true)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({}, alwaysFalse), false)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrTrue({}, alwaysFalse), false)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: undefined }, alwaysFalse), false)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: undefined }, eqValue('test')), false)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: null }, alwaysFalse), false)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: null }, eqValue('test')), false)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: '' }, alwaysFalse), true)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrTrue({ test: '' }, alwaysFalse), false)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: '' }, eqValue('test')), false)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrTrue({ test: '' }, eqValue('test')), false)
    assert.strictEqual(
      anyFieldIsFilledWithExceptionEmptyStrFalse({ test: undefined, test2: 'value' }, alwaysFalse),
      true
    )
    assert.strictEqual(
      anyFieldIsFilledWithExceptionEmptyStrFalse({ test: undefined, test2: 'value' }, eqValue('test2')),
      false
    )
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: null, test2: 'value' }, alwaysFalse), true)
    assert.strictEqual(
      anyFieldIsFilledWithExceptionEmptyStrFalse({ test: null, test2: 'value' }, eqValue('test2')),
      false
    )
    assert.strictEqual(
      anyFieldIsFilledWithExceptionEmptyStrFalse({ test: 'value1', test2: 'value2' }, alwaysFalse),
      true
    )
    assert.strictEqual(
      anyFieldIsFilledWithExceptionEmptyStrFalse({ test: 'value1', test2: 'value2' }, eqValue('test2')),
      true
    )
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: 'value1', test2: '' }, alwaysFalse), true)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrTrue({ test: 'value1', test2: '' }, alwaysFalse), true)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrFalse({ test: 'value1', test2: '' }, eqValue('test')), true)
    assert.strictEqual(anyFieldIsFilledWithExceptionEmptyStrTrue({ test: 'value1', test2: '' }, eqValue('test')), false)
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
  it('mapValue', () => {
    const mapper = TU.mapValue<number, string>(String)
    assert.deepStrictEqual(mapper(1), '1')
  })
})
