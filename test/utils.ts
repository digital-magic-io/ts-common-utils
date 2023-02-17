/* eslint-disable functional/no-return-void */
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
  it('tryOrElse', () => {
    const defFn =
      <T>(v: T): (() => T) =>
      () =>
        v
    const successStrFn = (): string => 'success'
    const successNumFn = (): number => 0
    const successArrFn = (): Array<string> => ['array']
    const failFn = (): Array<number> => {
      // eslint-disable-next-line functional/no-throw-statements
      throw Error('Error')
    }

    assert.deepStrictEqual(TU.tryOrElse(successStrFn, defFn('unsuccess')), 'success')
    assert.deepStrictEqual(TU.tryOrElse(successNumFn, defFn(-1)), 0)
    assert.deepStrictEqual(TU.tryOrElse(successArrFn, defFn(['fail_arr'])), ['array'])
    assert.deepStrictEqual(TU.tryOrElse(failFn, defFn([-1])), [-1])
  })
  it('evaluate', () => {
    //const mapper = TU.mapValue<number, string>(String)
    //assert.deepStrictEqual(mapper(1), '1')
    const v2: () => string = () => '2'
    const vNull: () => null = () => null
    const vUndefined: () => undefined = () => undefined
    const vArr: () => Array<number> = () => [1, 2, 3]
    assert.deepStrictEqual(TU.evaluate('1'), '1')
    assert.deepStrictEqual(TU.evaluate(v2), '2')
    assert.deepStrictEqual(TU.evaluate(null), null)
    assert.deepStrictEqual(TU.evaluate(vNull), null)
    assert.deepStrictEqual(TU.evaluate(undefined), undefined)
    assert.deepStrictEqual(TU.evaluate(vUndefined), undefined)
    assert.deepStrictEqual(TU.evaluate([1, 2, 3]), [1, 2, 3])
    assert.deepStrictEqual(TU.evaluate(vArr), [1, 2, 3])
  })
})
