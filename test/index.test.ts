import t from 'tap'
import { clone, removeEmptyProps, slugify } from '../lib'

t.plan(3)
t.test('removeEmptyProps', function (t) {
  t.plan(15)
  t.test('{}', function (t) {
    t.plan(2)
    const o = removeEmptyProps({})
    t.same(o, {})
    t.equal(typeof o, 'object')
  })

  t.test('[]', function (t) {
    t.plan(3)
    const o = removeEmptyProps([])
    t.same(o, [])
    t.equal(typeof o, 'object')
    t.equal(Array.isArray(o), true)
  })

  t.test('{ foo: bar }', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: 'bar' })
    t.same(o, { foo: 'bar' })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: "" }', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: '' })
    t.same(o, {})
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: "" }, true', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: '' }, true)
    t.same(o, { foo: '' })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: 1 }', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: 1 })
    t.same(o, { foo: 1 })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: true }', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: true })
    t.same(o, { foo: true })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: undefined }', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: undefined })
    t.same(o, { })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: null }', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: null })
    t.same(o, { })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: {} }', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: {} })
    t.same(o, { })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: {} }, true', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: {} }, true)
    t.same(o, { foo: {} })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: [] }', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: [] })
    t.same(o, { })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: [] }, true', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: [] }, true)
    t.same(o, { foo: [] })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: [""] }, true', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: [''] }, true)
    t.same(o, { foo: [] })
    t.equal(typeof o, 'object')
  })

  t.test('{ foo: { bar: "" } }, true', function (t) {
    t.plan(2)
    const o = removeEmptyProps({ foo: { bar: '' } }, true)
    t.same(o, { foo: { bar: '' } })
    t.equal(typeof o, 'object')
  })
})

t.test('slugify', function (t) {
  t.plan(7)

  t.test('HelloWorld', function (t) {
    t.plan(1)
    const o = slugify('HelloWorld')
    t.equal(o, 'helloworld')
  })

  t.test('Hello World', function (t) {
    t.plan(1)
    const o = slugify('Hello World')
    t.equal(o, 'hello-world')
  })

  t.test('Exceed Limit', function (t) {
    t.plan(1)
    const o = slugify('I am a super long string that will exceed the limit hahahahahahahahahahahahahahahahahahahahahahahahahahaahhaha')
    t.equal(o, 'i-am-a-super-long-string-that-will-exceed-the-limit-hahahahahahahahahaha')
  })

  t.test('Exceed Limit and End with Dash', function (t) {
    t.plan(1)
    const o = slugify('I am a super long string that will exceed the limit hahahahahahahahahaa a')
    t.equal(o, 'i-am-a-super-long-string-that-will-exceed-the-limit-hahahahahahahahahaa')
  })

  t.test('Include Unicode Character', function (t) {
    t.plan(1)
    const o = slugify('訂閱計劃 Subscription Plan 1 Month')
    t.equal(o, '訂閱計劃-subscription-plan-1-month')
  })

  t.test('Exclude Unicode Character', function (t) {
    t.plan(1)
    const o = slugify('訂閱計劃 Subscription Plan 1 Month', { unicode: false })
    t.equal(o, 'subscription-plan-1-month')
  })

  t.test('Limit to 1', function (t) {
    t.plan(1)
    const o = slugify('I am a super long string that will exceed the limit hahahahahahahahahaa a', { limit: 1 })
    t.equal(o, 'i')
  })
})

t.test('clone', function (t) {
  t.plan(3)

  t.test('{ foo: string }', function (t) {
    t.plan(1)
    const o = clone({ foo: 'bar' })
    t.same(o, { foo: 'bar' })
  })

  t.test('[string]', function (t) {
    t.plan(1)
    const o = clone(['foo', 'bar'])
    t.same(o, ['foo', 'bar'])
  })

  t.test('string', function (t) {
    t.plan(1)
    const o = clone('foo')
    t.equal(o, 'foo')
  })
})
