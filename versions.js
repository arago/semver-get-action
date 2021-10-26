const core = require('@actions/core')
const semver = require('semver')

const getVersions = (tags) => {
  const prefix = core.getInput('prefix', {required: false}) || ''
  const includeTagType = core.getInput('include_tag_type', {required: false})
  const regex = new RegExp(`^${prefix}`, 'g')
  const regexT = new RegExp(`^${prefix}t`, 'g')
  const regexV = new RegExp(`^${prefix}v`, 'g')
  const hasPrefix = Boolean(prefix)

  console.log(`Using tag prefix "${prefix}"`)
  if (includeTagType === 'true') {
    console.log(`Using tag types t and v`)
  }

  return tags
    .filter((tag) => {
      if (!hasPrefix) {
        return true
      }

      if (includeTagType === 'true') {
        return tag.startsWith(`${prefix}t`) || tag.startsWith(`${prefix}v`)
      }

      return tag.startsWith(prefix)
    })
    .map((tag) => {
      if (!hasPrefix) {
        return {
          value: tag,
        }
      }

      if (includeTagType === 'true') {
        if (tag.startsWith(`${prefix}t`)) {
          return {
            value: tag.replace(regexT, ''),
            type: 'test',
          }
        }

        if (tag.startsWith(`${prefix}v`)) {
          return {
            value: tag.replace(regexV, ''),
            type: 'release',
          }
        }
      }

      return {
        value: tag.replace(regex, ''),
      }
    })
    .map((tag) => ({
      value: semver.parse(tag.value, {loose: true}),
      ...tag,
    }))
    .filter(({value}) => value !== null)
    .sort(({value}) => semver.rcompare(value))
    .map(({value, type}) => {
      if (type === 'test') {
        return `t${value}`
      }

      if (type === 'release') {
        return `v${value}`
      }

      return value
    })
}

module.exports = {getVersions}
