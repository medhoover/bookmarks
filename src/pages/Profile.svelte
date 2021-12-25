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

<ProfileHeader {username} />
<main class="flex-1 flex justify-center items-center flex-wrap">
  {#await bookmarksPromise}
    <LoadingIcon />
  {:then bookmarks}
    {#if !!bookmarks}
      {#each bookmarks as { path, url }, i}
        <BookmarkCard {url}>
          <BookmarkCardAction
            _class="text-white"
            onClick={() => navigate(`/${username}/${path}`)}
            slot="action-main"
            Icon={EyeIcon}>Open Bookmark</BookmarkCardAction>
        </BookmarkCard>
      {/each}
    {:else}
      No bookmarks were found
    {/if}
  {/await}
</main>
