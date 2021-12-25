<script lang="ts">
  import { useNavigate } from 'svelte-navigator'

  import { fetchUser } from '../utils/github'
  import Link from './Link.svelte'
  import LoadingIcon from './icons/LoadingIcon.svelte'

  export let username: string
  export let showLogo = true

  $: userProfilePromise = fetchUser(username)
  let navigate = useNavigate()
</script>

<nav class="w-full md:mx-auto mx-4 flex flex-row justify-center md:justify-between items-center">
  {#if showLogo}
    <Link to="/"
      ><div
        tabindex="0"
        class="bg-[url('/img/spacemarks_logo_dark.svg')] dark:bg-[url('/img/spacemarks_logo_light.svg')] bg-no-repeat bg-contain md:w-60 md:h-16 w-40 h-20" />
    </Link>
  {:else}
    <div class="md:w-60 md:h-16 w-40 h-20" />
  {/if}

  {#await userProfilePromise}
    <LoadingIcon />
  {:then userProfile}
    <div class="space-x-6 cursor-pointer" on:click={() => navigate(`/${username}`)}>
      <span class="font-bold">{userProfile.name}</span>
      <img class="inline-block h-12 w-12 rounded-full" src={userProfile.avatar_url} alt={userProfile.login} />
    </div>
  {/await}
</nav>
