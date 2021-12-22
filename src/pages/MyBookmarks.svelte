<script lang="ts">
  import { onMount } from 'svelte'
  import { useNavigate } from 'svelte-navigator'

  import BookmarkCard from '../lib/BookmarkCard.svelte'
  import BookmarkCardAction from '../lib/BookmarkCardAction.svelte'
  import Button from '../lib/Button.svelte'
  import MainHeader from '../lib/MainHeader.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import PlusIcon from '../lib/icons/PlusIcon.svelte'
  import EditIcon from '../lib/icons/editIcon.svelte'
  import { fetchUserBookmarks } from '../utils/github'
  import { userSession } from '../utils/user'

  let navigate = useNavigate()
  let username = null
  let isFirstTime = null
  let bookmarks = null
  let isForkClicked = false

  $: userSession.subscribe((us) => {
    if (us.logged_in) {
      username = us.login
    }
  })

  $: onMount(() => {
    fetchUserBookmarks(username).then((_bookmarks) => {
      isFirstTime = _bookmarks ? false : true
      if (isFirstTime) {
        return
      }
      bookmarks = _bookmarks
      // bookmarks = _bookmarks.filter((bookmark) => bookmark.path !== 'README.md')
    })
  })

  $: onForkClick = () => {
    isForkClicked = true
  }

  $: handleCreateButtonClick = () => {
    if (!isForkClicked) {
      return
    }
    ;() => navigate('/editor')
  }
</script>

<section class="container mx-auto h-full flex flex-col">
  <MainHeader />
  {#if isFirstTime === true}
    <main class="h-full grid md:grid-cols-2 grid-row-2 auto-rows-max place-content-evenly place-items-center gap-4">
      <div class="flex flex-col justify-center items-center text-center space-y-8">
        <h1 class="font-bold text-6xl">One last step...</h1>
        <p class="w-3/4">
          Your bookmarks will be stored on a repository within your <a href="https://github.com" class="underline"
            >Github</a>
          account. So first, you must create the repository by forking the base <strong>Space Marks</strong> repository.
        </p>
      </div>
      <div class="rounded-lg bg-slate-700 p-10 md:w-3/4 flex flex-col items-center text-center space-y-10">
        <a href="https://github.com/spacemarks/_spacemarks/fork" target="_blank"
          ><Button bouncing={!isForkClicked} secondary={isForkClicked} onClick={onForkClick}>1. Fork Repository</Button
          ></a>
        <p>After Forking the repository in your account, come back here and click the “Start Editing” button.</p>
        <Button secondary={!isForkClicked} bouncing={isForkClicked} onClick={handleCreateButtonClick}
          >2. Create First Bookmark</Button>
      </div>
    </main>
  {:else if isFirstTime === false}
    <main class="h-full flex justify-between xl:flex-row items-center flex-col-reverse">
      <div class="grid xl:grid-flow-col xl:grid-cols-none lg:grid-cols-8 md:grid-cols-2 grid-cols-1">
        {#each bookmarks as { path, url }, i}
          <div class="animate-margin-right clicked" style="z-index: {i + 10};">
            <BookmarkCard {url}>
              <BookmarkCardAction onClick={() => navigate(`/editor/${path}`)} slot="action-main" Icon={EditIcon}
                >Edit Bookmark</BookmarkCardAction>
            </BookmarkCard>
          </div>
        {/each}
      </div>
      <div class="">
        <BookmarkCard
          class="group pointer-fine:opacity-10 pointer-fine:hover:opacity-100 pointer-fine:transition-opacity">
          <div slot="content" class="pointer-fine:invisible pointer-fine:group-hover:visible">
            <h1>Click the button below to create a new bookmark</h1>
          </div>
          <BookmarkCardAction
            _class="animate-bounce"
            onClick={() => navigate(`/editor/`)}
            slot="action-main"
            Icon={PlusIcon}>Add Bookmark</BookmarkCardAction>
        </BookmarkCard>
      </div>
    </main>
  {:else}
    <div class="flex h-full justify-center items-center">
      <LoadingIcon />
    </div>
  {/if}
  <footer class="container m-auto text-center text-xs text-neutral-500">
    Built with <a class="underline" target="_blank" href="https://pages.github.com/">Github pages</a> and
    <a class="underline" target="_blank" href="https://docs.github.com/en/developers/apps/building-oauth-apps"
      >Github OAuth</a
    >.
  </footer>
</section>

<style>
  @media (min-width: 1280px) {
    .animate-margin-right:hover {
      margin-right: -40px;
    }
    .animate-margin-right:hover:not(:first-child) {
      margin-left: 20px;
    }

    .animate-margin-right {
      margin-right: -180px;
      transition: margin 0.3s ease-in-out;
    }
  }
</style>
