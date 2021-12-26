<script lang="ts">
  import MainHeader from '../lib/MainHeader.svelte'
  import Part from '../lib/Part.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import { decodeContent, fetchFile } from '../utils/github'

  export let path = 'index'

  $: filePromise = fetchFile('spacemarks', path, 'docs')
</script>

<MainHeader />
{#await filePromise}
  <main class="flex-1 flex flex-col justify-center">
    <LoadingIcon />
  </main>
{:then file}
  {#if file}
    <div class="mx-auto mt-20">
      <Part markdown={decodeContent(file.content)} />
    </div>
  {:else}
    Something went wrong...
  {/if}
{/await}
