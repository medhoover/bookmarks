<script lang="ts">
  import { onMount } from 'svelte'
  import { useNavigate } from 'svelte-navigator'
  import { link } from 'svelte-navigator'

  import Button from '../lib/Button.svelte'
  import Footer from '../lib/Footer.svelte'
  import MainHeader from '../lib/MainHeader.svelte'
  import Part from '../lib/Part.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import { deleteFile, fetchFileBlob, fetchUserBookmarks } from '../utils/github'
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
    spacemarks = result.filter((spacemark: any) => spacemark.path !== 'README.md')
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

    setTimeout(() => loadBookmarks(), 2000)
  }

  $: onMount(() => {
    loadBookmarks()
  })
</script>

<section class="container mx-auto flex flex-col">
  <MainHeader />
  {#if isFirstTime === true}
    <main class="flex-1 grid md:grid-cols-2 grid-row-2 auto-rows-max place-content-evenly place-items-center gap-4">
      <div class="flex flex-col justify-center items-center text-center space-y-8">
        <h1 class="font-bold text-6xl">One last step...</h1>
        <p class="w-3/4">
          Your spacemarks will be stored on a repository within your <a href="https://github.com" class="underline"
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
          >2. Create First Spacemark</Button>
      </div>
    </main>
  {:else if isFirstTime === false}
    <main class="flex-1 flex flex-col space-y-4 lg:mt-30 lg:mb-20 my-10">
      <div class="mb-4"><h1>Your spacemarks</h1></div>
      <div class="p-4 bg-slate-800 rounded-md flex flex-row justify-between items-center">
        {#if spacemarks.length === 0}
          <span>You have not created any spacemarks yet</span>
        {:else}
          <span>You have {spacemarks.length} spacemarks</span>
        {/if}
        <Button onClick={() => navigate('/editor')}>Add new Spacemark</Button>
      </div>
      {#each spacemarks as { path, url, sha } (sha)}
        {#await fetchFileBlob(url) then file}
          <div
            class="group p-4 hover:bg-slate-800 rounded-md cursor-pointer"
            on:click|stopPropagation={() => navigate(`/editor/${path}`)}>
            <div class="spacemark-card">
              <Part markdown={atob(file.content.slice(0, 500)) + ' ...'} />
            </div>
            <div class="flex flex-row justify-end space-x-4 mx-4">
              <a
                class="group-hover:visible invisible font-bold hover:underline underline-offset-2"
                use:link
                target="_blank"
                href={`/${username}/${path}`}
                on:click|stopPropagation>
                View
              </a>
              <span class="group-hover:visible invisible font-bold hover:underline underline-offset-2">Edit</span>

              <span
                class="group-hover:visible invisible font-bold hover:underline underline-offset-2"
                on:click|stopPropagation={() => handleFileDelete(path, sha)}>Remove</span>
            </div>
          </div>
        {/await}
      {/each}
    </main>
  {:else}
    <div class="flex flex-1 justify-center items-center">
      <LoadingIcon />
    </div>
  {/if}
  <Footer />
</section>
