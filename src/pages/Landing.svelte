<script lang="ts">
  import Bookmark from '../lib/Bookmark.svelte'
  import BookmarkAction from '../lib/BookmarkAction.svelte'
  import Button from '../lib/Button.svelte'
  import MainHeader from '../lib/MainHeader.svelte'
  import PlusIcon from '../lib/icons/PlusIcon.svelte'
  import { login, userSession } from '../utils/user'

  let isUserLoggedIn = false
  $: userSession.subscribe((us) => (isUserLoggedIn = us.logged_in))
</script>

<section class="container mx-auto h-full flex flex-col">
  <MainHeader />

  <main class="flex-1 grid md:grid-cols-2 grid-row-2 auto-rows-max place-content-evenly place-items-center gap-4">
    {#if isUserLoggedIn}
      logged in
    {:else}
      <div class="flex flex-col justify-center items-center text-center space-y-8">
        <h1 class="font-bold text-6xl">Create & share bookmarks for <u>FREE</u></h1>
        <p class="w-3/4">
          Most calendars are designed for teams. Slate is designed for freelancers who want a simple way to plan their
          schedule.
        </p>
        <Button _class="animate-bounce" onClick={login}>Login with Github</Button>
      </div>
      <div>
        <Bookmark class="w-fit h-fit">
          <div slot="content">
            <h2>The Greatest Books of All Time</h2>
            <p>
              This list is generated from 130 "best of" book lists from a variety of great sources. An algorithm is used
              to create a master list based on how many lists a particular book appears on. Some lists count more than
              others. I generally trust "best of all time" lists voted by authors and experts over user-generated lists.
              On the lists that are actually ranked, the book that is 1st counts a lot more than the book that's 100th.
              If you're interested in the details about how the rankings are generated and which lists are the most
              important(in my eyes) please check
            </p>
          </div>
          <BookmarkAction Icon={PlusIcon} slot="action-main" onClick={login}>Create a bookmark</BookmarkAction>
        </Bookmark>
      </div>
    {/if}
  </main>
  <footer class="m-auto text-xs text-neutral-500">
    Built with <a class="underline" href="https://pages.github.com/">Github pages</a> and
    <a class="underline" href="https://docs.github.com/en/developers/apps/building-oauth-apps">Github OAuth</a>.
  </footer>
</section>
