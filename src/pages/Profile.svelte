<script lang="ts">
  import { useNavigate, link } from 'svelte-navigator'

  import BookmarkCard from '../lib/BookmarkCard.svelte'
  import BookmarkCardAction from '../lib/BookmarkCardAction.svelte'
  import Footer from '../lib/Footer.svelte'
  import ProfileHeader from '../lib/ProfileHeader.svelte'
  import EyeIcon from '../lib/icons/EyeIcon.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import { fetchUserBookmarks } from '../utils/github'
  import { sanitizeMarkdownPath } from '../utils/markdown'

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
        <a use:link href={`/@${username}/${sanitizeMarkdownPath(path)}`} class="group">
          <BookmarkCard {url}>
            <BookmarkCardAction _class="text-white" slot="action-main" Icon={EyeIcon}>Open Bookmark</BookmarkCardAction>
          </BookmarkCard>
        </a>
      {/each}
    {:else}
      No bookmarks were found
    {/if}
  {/await}
</main>
