const core = require('@actions/core')
const github = require('@actions/github')

const {getVersions} = require('./versions.js')

async function mostRecentTag() {
  console.log('Getting list of tags from repository')
  const token = core.getInput('github_token', {required: true})
  const octokit = github.getOctokit(token)

  const {data: refs} = await octokit.git.listMatchingRefs({
    ...github.context.repo,
    namespace: 'tags/',
  })

  const tags = refs.map(({ref}) => ref.replace(/^refs\/tags\//g, ''))
  const versions = getVersions(tags)

  if (versions[0]) {
    return versions[0]
  }

  const includeTagType = core.getInput('include_tag_type', {required: false})

  if (includeTagType === 'true') {
    return `t0.0.0-0`
  }

  return '0.0.0'
}

async function run() {
  try {
    const version = await mostRecentTag()

    core.setOutput('version', version)

    console.log(`Result: "${version}"`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
