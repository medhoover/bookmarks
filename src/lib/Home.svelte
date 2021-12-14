<script lang="ts">
  import { userSession } from '../utils/user'

  let isUserLoggedIn = false
  userSession.subscribe((us) => (isUserLoggedIn = us.logged_in))
  const logout = () => userSession.set({ logged_in: false })
</script>

<main>
  <h1>Hello User!</h1>
  <p>This project is getting made at the moment.</p>
  {#if isUserLoggedIn}
    <button on:click={logout}>Log out</button>
  {:else}
    <a href="https://bookmarks-wiki.herokuapp.com/login">Log in</a>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
