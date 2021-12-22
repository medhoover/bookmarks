<script lang="ts">
  import { useNavigate } from 'svelte-navigator'

  import { login, logout, userSession } from '../utils/user'
  import Button from './Button.svelte'
  import Link from './Link.svelte'

  let navigate = useNavigate()
  let isUserLoggedIn = false
  $: userSession.subscribe((us) => (isUserLoggedIn = us.logged_in))
  let handleLogin = () => login().then(() => navigate('/profile'))
</script>

<nav class="w-full md:m-auto m-4 flex flex-row justify-center md:justify-between items-center">
  <Link to="/"
    ><div tabindex="0" class="bg-[url('/img/spacemarks_logo.svg')] bg-no-repeat bg-contain md:w-60 md:h-16 w-40 h-20" />
  </Link>

  <div class="flex hidden md:block flex-row xxl:space-x-24 xl:space-x-16 lg:space-x-8 space-x-4">
    {#if isUserLoggedIn}
      <Link to="/profile">My Spacemarks</Link>
    {/if}
    <Link to="/spacemarks/how_it_works">How it works</Link>
    <a class="font-semibold underline-offset-8 hover:underline" href="https://github.com/spacemarks" target="_blank"
      >Open source</a>
  </div>

  {#if isUserLoggedIn}
    <Button _class="hidden md:block" secondary onClick={logout}>Logout</Button>
  {:else}
    <Button _class="hidden md:block" secondary onClick={handleLogin}>Login with Github</Button>
  {/if}
</nav>
