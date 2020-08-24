import * as assert from 'assert'
import * as R from '../src/random'

describe('random', () => {
  it('generateStringFromValues', () => {
    assert.strictEqual(R.generateStringFromValues(-1, 'ab'), undefined)
    assert.strictEqual(R.generateStringFromValues(0, 'ab'), undefined)
    assert.strictEqual(R.generateStringFromValues(2, ''), undefined)
    assert.strictEqual(R.generateStringFromValues(2, 'ab')?.length, 2)
    assert.strictEqual(R.generateStringFromValues(4, 'ab12')?.length, 4)
  })
  it('generateString', () => {
    assert.strictEqual(R.generateString(2).length, 2)
    assert.strictEqual(R.generateString(4).length, 4)
  })
  it('generateElementId', () => {
    assert.strictEqual(R.generateElementId().length, 20)
    assert.strictEqual(R.generateElementId().length, 20)
    assert.strictEqual(R.generateElementId().length, 20)
  })
})
