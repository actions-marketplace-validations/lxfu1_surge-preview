# Surge PR Preview

[![CI status][github-action-image]][github-action-url] [![david deps][david-image]][david-url] [![david devDeps][david-dev-image]][david-dev-url]

[github-action-image]: https://github.com/lxfu1/surge-preview/workflows/build-test/badge.svg

A GitHub action that preview website in [surge.sh](https://surge.sh/) for your pull requests.

<img width="800" alt="image" src="https://user-images.githubusercontent.com/507615/90243810-2230b480-de62-11ea-9a2c-9e869a2067dd.png">

<img width="800" alt="image" src="https://user-images.githubusercontent.com/507615/91127543-0be3ed80-e6d9-11ea-897f-977c346bbc77.png">

### Pros

Compare to Netlify/Vercel?

- It is **free**.
- It supports multiple preview jobs.

### Usage

Add a workflow (`.github/workflows/preview.yml`):

```yaml
name: 🔂 Surge PR Preview

on: [pull_request]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Get branch name (pull request)
        run: echo "BRANCH_NAME=$(echo ${GITHUB_HEAD_REF})" >> $GITHUB_ENV
      - uses: lxfu1/surge-preview@v1
        id: preview_step
        with:
          surge_token: ${{ secrets.SURGE_TOKEN }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
          project_branch: ${{ env.BRANCH_NAME }}
          build: |
            npm install
      - name: Get the preview_url
        run: echo "url => ${{ steps.preview_step.outputs.preview_url }}"
```

The preview website url will be `https://{{repository.owner}}-{{repository.name}}-{{job.name}}-pr-{{pr.number}}.surge.sh`.

### Teardown

When a pull request is closed and teardown is set to 'true', then the surge instance will be destroyed.

```yaml
name: 🔂 Surge PR Preview

on:
  pull_request:
    # when using teardown: 'true', add default event types + closed event type
    types: [opened, synchronize, reopened, closed]
  push:

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Get branch name (pull request)
        run: echo "BRANCH_NAME=$(echo ${GITHUB_HEAD_REF})" >> $GITHUB_ENV
      - uses: lxfu1/surge-preview@v1
        with:
          surge_token: ${{ secrets.SURGE_TOKEN }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
          project_branch: ${{ env.BRANCH_NAME }}
          teardown: 'true'
          build: |
            npm install
```

### Inputs

- `surge_token`: [Getting your Surge token](https://surge.sh/help/integrating-with-circleci).
- `github_token`: `secrets.GITHUB_TOKEN`.
- `failOnError`: Set `failed` if a deployment throws error, defaults to `false`.
- `teardown`: Determines if the preview instance will be torn down on PR close, defaults to `false`.

### Outputs

- `preview_url`: The url for the related PR preview

### Thanks to

- https://github.com/jwalton/gh-find-current-pr
- https://github.com/marocchino/sticky-pull-request-comment
