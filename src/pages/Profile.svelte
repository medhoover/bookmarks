<script lang="ts">
  import { useNavigate } from 'svelte-navigator'

  import BookmarkCard from '../lib/BookmarkCard.svelte'
  import BookmarkCardAction from '../lib/BookmarkCardAction.svelte'
  import Footer from '../lib/Footer.svelte'
  import ProfileHeader from '../lib/ProfileHeader.svelte'
  import EyeIcon from '../lib/icons/EyeIcon.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import { fetchUserBookmarks } from '../utils/github'

  export let username: string
  let navigate = useNavigate()
  $: bookmarksPromise = fetchUserBookmarks(username)
</script>

<section class="container mx-auto min-h-screen flex flex-col">
  <ProfileHeader {username} />

  <main class="flex-1 flex justify-center items-center">
    {#await bookmarksPromise}
      <LoadingIcon />
    {:then bookmarks}
      {#if !!bookmarks}
        <div
          class="grid place-content-center 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-0">
          {#each bookmarks as { path, url }, i}
            <BookmarkCard {url}>
              <BookmarkCardAction onClick={() => navigate(`/${username}/${path}`)} slot="action-main" Icon={EyeIcon}
                >Open Bookmark</BookmarkCardAction>
            </BookmarkCard>
          {/each}
        </div>
      {:else}
        No bookmarks were found
      {/if}
    {/await}
  </main>

  <Footer />
</section>
