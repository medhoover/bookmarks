<script lang="ts">
  import { useNavigate } from 'svelte-navigator'

  import BookmarkCard from '../lib/BookmarkCard.svelte'
  import BookmarkAction from '../lib/BookmarkCardAction.svelte'
  import Button from '../lib/Button.svelte'
  import Footer from '../lib/Footer.svelte'
  import MainHeader from '../lib/MainHeader.svelte'
  import PlusIcon from '../lib/icons/PlusIcon.svelte'
  import { login, userSession } from '../utils/user'

  let navigate = useNavigate()
  let isUserLoggedIn = false
  $: userSession.subscribe((us) => {
    isUserLoggedIn = us.logged_in
  })
</script>

<section class="container mx-auto min-h-screen flex flex-col">
  <MainHeader />

  <main class="flex-1 grid md:grid-cols-2 grid-row-2 auto-rows-max place-content-evenly place-items-center gap-4">
    <div class="flex flex-col justify-center items-center text-center space-y-8">
      <h1 class="font-bold text-6xl">Create & share bookmarks for <u>FREE</u></h1>
      <p class="w-3/4">
        Most calendars are designed for teams. Slate is designed for freelancers who want a simple way to plan their
        schedule.
      </p>
      {#if !isUserLoggedIn}
        <Button _class="animate-bounce" onClick={login}>Login with Github</Button>
      {/if}
    </div>
    <div>
      <BookmarkCard
        class="w-fit h-fit"
        url="https://api.github.com/repos/medhoover/_spacemarks/git/blobs/442cf80dd6c9b2e44c1231e38113e4b3f3470242">
        <div slot="action-main">
          {#if isUserLoggedIn}
            <BookmarkAction _class="animate-bounce" Icon={PlusIcon} onClick={() => navigate('/profile')}
              >Create a bookmark</BookmarkAction>
          {/if}
        </div>
      </BookmarkCard>
    </div>
  </main>
  <Footer />
</section>
