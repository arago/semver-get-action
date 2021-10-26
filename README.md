# Semantic Get Release Action

This action gets the current tag, and returns it. Supports prefix for mono-repo and t/v based tags.

## Inputs

### `prefix`

**Optional**. Version prefix used to create tag. Usually empty or `v` or `=`. Prefix is _removed_ from output version

### `include_tag_type`

**Optional**. Include `t` and `v` in prefix. Will return tag _with_ the `t` and `v`.

## Outputs

### `version`

The full version number produced by incrementing the semantic version number of the latest tag according to the `bump` input. For instance, given `12.4.1` and `bump: minor`, `12.5.0`.

## Example usage

### Simple

Get a version

```yaml
- id: version
  uses: arago/semver-release-action@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
- run: echo "${{ steps.version.outputs.version }}"
```

### Mono-repo and tag type

Get version with prefix and tag types (`t` and `v`)

```yaml
- id: version
  uses: arago/semver-release-action@v1
  with:
    prefix: component@
    include_tag_type: true
    github_token: ${{ secrets.GITHUB_TOKEN }}
- run: echo "${{ steps.version.outputs.version }}" # Gets component@t* or component@v*. Returns t* or v*
```
