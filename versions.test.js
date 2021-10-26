const process = require('process')
const test = require('ava')
const {getVersions} = require('./versions.js')

test('handle single prefix', (t) => {
  process.env.INPUT_PREFIX = 'target@'
  process.env.INPUT_INCLUDE_TAG_TYPE = 'false'
  const inTags = ['target@1.0.0']
  const outTags = getVersions(inTags)
  t.deepEqual(outTags, ['1.0.0'])
})

test('handle multiple prefix - bad input', (t) => {
  process.env.INPUT_PREFIX = 'target@'
  process.env.INPUT_INCLUDE_TAG_TYPE = 'true'
  const inTags = ['target@1.0.0']
  const outTags = getVersions(inTags)
  t.deepEqual(outTags, [])
})

test('handle multiple prefix - test tag input', (t) => {
  process.env.INPUT_PREFIX = 'target@'
  process.env.INPUT_INCLUDE_TAG_TYPE = 'true'
  const inTags = ['target@t1.0.0-1']
  const outTags = getVersions(inTags)
  t.deepEqual(outTags, ['t1.0.0-1'])
})

test('handle multiple prefix - release tag input', (t) => {
  process.env.INPUT_PREFIX = 'target@'
  process.env.INPUT_INCLUDE_TAG_TYPE = 'true'
  const inTags = ['target@v1.0.0']
  const outTags = getVersions(inTags)
  t.deepEqual(outTags, ['v1.0.0'])
})
