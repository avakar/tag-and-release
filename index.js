const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function main() {
  const commit = core.getInput('commit') || context.sha;
  const tagName = core.getInput('tag_name', { required: true });
  const releaseName = core.getInput('release_name') || tagName;
  const body = core.getInput('body');
  const draft = core.getInput('draft') === 'true';
  const prerelease = core.getInput('prerelease') === 'true';

  const github = new GitHub(process.env.GITHUB_TOKEN);
  const r = await github.repos.createRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: tagName,
    target_commitish: commit,
    name: releaseName,
    body,
    draft,
    prerelease
  });

  core.setOutput('id', r.data.id.toString());
  core.setOutput('html_url', r.data.html_url);
  core.setOutput('upload_url', r.data.upload_url);
}

main().catch(function(error) {
  core.setFailed(error.message);
});
