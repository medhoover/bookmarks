<script lang="ts">
  import { DEFAULT_BOOKMARK_PATH } from '../constants'
  import Footer from '../lib/Footer.svelte'
  import Part from '../lib/Part.svelte'
  import ProfileHeader from '../lib/ProfileHeader.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import { fetchFileContent } from '../utils/github'
  import { render as _render } from '../utils/markdown'

  export let username: string
  export let path: string = DEFAULT_BOOKMARK_PATH

  $: contentPromise = fetchFileContent(username, path)
</script>

<section class="container mx-auto flex flex-col">
  <ProfileHeader {username} />
  <main class="flex-1 flex justify-center">
    {#await contentPromise}
      <div class="flex-1 flex justify-center items-center">
        <LoadingIcon />
      </div>
    {:then markdown}
      <div class="2xl:w-2/3 xl:w-3/4 lg:w-4/5 w-5/6 md:mt-40 mt-20">
        <Part {markdown} />
      </div>
    {/await}
  </main>
  <Footer />
</section>
