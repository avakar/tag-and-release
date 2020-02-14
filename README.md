# GitHub Action &ndash; Tag and Release

Automatically create tags and corresponding releases.

## Usage

This action is meant to be invoked in response to a branch push to create
a tag and a corresponding release, under the assumption that you can derive
the tag name automatically.
In contrast,
[`actions/create-release`](https://github.com/actions/create-release)
is generally run on a tag push, expects the tag to already exist
and only creates the release.

The only mandatory input parameter is the tag name.

    on: push
    jobs:
      release:
        runs-on: ubuntu-latest
        steps:
          - uses: avakar/tag-and-release@v1
            with:
              tag_name: ${{ ... }}
            env:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

### Inputs

* `tag_name`: the name of the tag to be created
* `release_name`: the name of the new release; if omitted, defaults to `tag_name`
* `commit`: the commit to which the new tag should point, defaults to `${{ GITHUB_SHA }}`
* `body`: optional text of the release body
* `draft`: set to `true` to create an unpublished (draft) release; defaults to `false`
* `prerelease`: whether the release should be marked as a prerelease.

### Outputs

* `id`: the ID of the release
* `html_url`: the human-readable web-page of the release, e.g. `https://github.com/avakar/tag-and-release/releases/v1.0.0`
* `upload_url`: the URL you can give to `@actions/upload-release-asset`
