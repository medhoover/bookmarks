<script lang="ts">
  import { fetchBookmarks } from '../utils/github'
  import { render as _render } from '../utils/markdown'

  export let username: string

  $: contentPromise = fetchBookmarks(username).then(function (content) {
    return _render(content)
  })
</script>

{#await contentPromise}
  <h2>...loading user bookmarks</h2>
{:then content}
  {@html content}
{/await}
