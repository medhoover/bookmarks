<script lang="ts">
  import Cookies from 'js-cookie'
  import { onMount } from 'svelte'
  import { useNavigate } from 'svelte-navigator'
  import { link } from 'svelte-navigator'

  import Alert from '../lib/Alert.svelte'
  import Button from '../lib/Button.svelte'
  import MainHeader from '../lib/MainHeader.svelte'
  import Part from '../lib/Part.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import { deleteFile, fetchFileBlob, fetchUserBookmarks } from '../utils/github'
  import { sanitizeMarkdownPath } from '../utils/markdown'
  import { userSession } from '../utils/user'

  let navigate = useNavigate()
  let username = null
  let isFirstTime = null
  let spacemarks = null
  let isForkClicked = false

  $: userSession.subscribe((us) => {
    if (us.logged_in) {
      username = us.login
    }
  })

  $: loadBookmarks = async () => {
    const result = await fetchUserBookmarks(username)
    isFirstTime = result ? false : true
    if (isFirstTime) {
      return
    }
    spacemarks = result
  }

  $: onForkClick = () => {
    isForkClicked = true
  }

  $: handleCreateButtonClick = () => {
    if (!isForkClicked) {
      return
    }
    navigate('/editor')
  }

  $: handleFileDelete = async (path: string, sha: string) => {
    if (!window.confirm('Do you realy like to remove this bookmark?')) {
      return
    }
    await deleteFile(username, path, sha)

    const inTwoMinutes = new Date(new Date().getTime() + 2 * 60 * 1000)
    Cookies.set(path, 'removed', { expires: inTwoMinutes })

    setTimeout(loadBookmarks)
  }

  $: onMount(() => {
    loadBookmarks()
  })
</script>

<MainHeader />
{#if isFirstTime === true}
  <section class="flex-1 flex flex-col justify-center">
    <main class="flex-1 grid md:grid-cols-2 grid-row-2 auto-rows-max place-content-evenly place-items-center gap-4">
      <div class="flex flex-col justify-center items-center text-center space-y-8">
        <h1 class="font-bold text-6xl">One last step...</h1>
        <p class="w-3/4">
          Your spacemarks will be stored on a repository within your <a href="https://github.com" class="underline"
            >Github</a>
          account. So first, you must create the repository by forking the base <strong>Space Marks</strong> repository.
        </p>
      </div>
      <div
        class="rounded-lg dark:bg-slate-700 bg-slate-100 text-center p-10 md:w-3/4 flex flex-col items-center space-y-10">
        <a href="https://github.com/spacemarks/_spacemarks/fork" target="_blank"
          ><Button bouncing={!isForkClicked} secondary={isForkClicked} onClick={onForkClick}>1. Fork Repository</Button
          ></a>
        <p>After Forking the repository in your account, come back here and click the “Start Editing” button.</p>
        <Button secondary={!isForkClicked} bouncing={isForkClicked} onClick={handleCreateButtonClick}
          >2. Create First Spacemark</Button>
      </div>
    </main>
  </section>
{:else if isFirstTime === false}
  <main class="flex-1 flex flex-col space-y-4 lg:mt-28">
    {#if Cookies.get('newSpcemarkRecentlyAdded')}
      <Alert _class="font-bold"
        ><span class="animate-ping">☕️</span> &nbsp;&nbsp; New spacemarks might take a minute to be listed.</Alert>
    {/if}
    <div class="p-4 dark:bg-slate-800 bg-slate-100 rounded-md flex flex-row justify-between items-center">
      {#if spacemarks.length === 0}
        <span>You have not created any spacemarks yet</span>
      {:else}
        <span>You have {spacemarks.length} spacemarks</span>
      {/if}
      <Button onClick={() => navigate('/editor')}>Add new Spacemark</Button>
    </div>
    {#each spacemarks as { path, url, sha } (sha)}
      {#await fetchFileBlob(url) then file}
        {#if !Cookies.get(path)}
          <div
            class="group p-4 dark:hover:bg-slate-800 hover:bg-slate-100 rounded-md cursor-pointer"
            on:click|stopPropagation={() => navigate(`/editor/${sanitizeMarkdownPath(path)}`)}>
            <div class="spacemark-card">
              <Part markdown={atob(file.content.slice(0, 500)) + ' ...'} />
            </div>
            <div class="flex flex-row justify-end space-x-4 mx-4">
              <a
                class="group-hover:visible invisible font-bold hover:underline underline-offset-2"
                use:link
                target="_blank"
                href={`/@${username}/${sanitizeMarkdownPath(path)}`}
                on:click|stopPropagation>
                View
              </a>
              <span class="group-hover:visible invisible font-bold hover:underline underline-offset-2">Edit</span>
              <span
                class="group-hover:visible invisible font-bold hover:underline underline-offset-2"
                on:click|stopPropagation={() => handleFileDelete(path, sha)}>Remove</span>
            </div>
          </div>
        {/if}
      {/await}
    {/each}
  </main>
{:else}
  <div class="flex-1 flex flex-col justify-center">
    <LoadingIcon />
  </div>
{/if}
