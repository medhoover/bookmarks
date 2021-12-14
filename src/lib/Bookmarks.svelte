<script lang="ts">
  import { DEFAULT_BOOKMARK_PATH } from '../constants'
  import { fetchFileContent } from '../utils/github'
  import { render as _render } from '../utils/markdown'
  import Part from './Part.svelte'

  export let username: string
  export let path: string = DEFAULT_BOOKMARK_PATH

  $: contentPromise = fetchFileContent(username, path)
</script>

{#await contentPromise}
  <h2>...loading user bookmarks</h2>
{:then markdown}
  <Part {markdown} />
{/await}
