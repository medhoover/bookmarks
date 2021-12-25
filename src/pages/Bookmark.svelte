<script lang="ts">
  import Part from '../lib/Part.svelte'
  import ProfileHeader from '../lib/ProfileHeader.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import { fetchFileContent } from '../utils/github'
  import { render as _render } from '../utils/markdown'

  export let username: string
  export let path

  $: contentPromise = fetchFileContent(username, path)
</script>

<ProfileHeader {username} showLogo={false} />
{#await contentPromise}
  <main class="flex-1 flex flex-col justify-center">
    <LoadingIcon />
  </main>
{:then markdown}
  <div class="mx-auto 2xl:w-3/4 xl:w-4/5 mt-20">
    <Part {markdown} />
  </div>
{/await}
