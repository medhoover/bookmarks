<script lang="ts">
  import Cookies from 'js-cookie'
  import ReactEditor from 'rich-markdown-editor'
  import { onMount } from 'svelte'
  import { useNavigate } from 'svelte-navigator'

  import Button from '../lib/Button.svelte'
  import Footer from '../lib/Footer.svelte'
  import Link from '../lib/Link.svelte'
  import MainHeader from '../lib/MainHeader.svelte'
  import ReactAdapter from '../lib/ReactAdapter.svelte'
  import LoadingIcon from '../lib/icons/LoadingIcon.svelte'
  import * as editorConfig from '../utils/editor'
  import { fetchFile, fetchUserBookmarks, saveFile } from '../utils/github'
  import { userSession } from '../utils/user'

  export let path: string = null

  let markdown = ''
  let previous_sha = ''
  let username: string
  let changed = false
  let saving = false
  let success = null
  let loading = true
  let navigate = useNavigate()
  let revervedNames = []
  let id = undefined
  let viewLink = '#'

  $: userSession.subscribe((us) => {
    if (us.logged_in) {
      username = us.login
    }
  })

  let getChangedMarkdown: () => string

  $: onSave = async () => {
    const content = getChangedMarkdown()
    if (!content || content === markdown) {
      return
    }

    saving = true
    try {
      let title = path
      if (title === null) {
        title =
          content
            .split('\n')[0]
            .replace(/[\W_]+/g, ' ')
            .trim()
            .replaceAll(' ', '_')
            .toLowerCase() + '.md'
        if (revervedNames.includes(title)) {
          title = '2_' + title
        }
      }
      const result = await saveFile(username, title, content, previous_sha)
      if (!path) {
        viewLink = `/${username}/${title}`
        const inOneMinute = new Date(new Date().getTime() + 60 * 1000)
        Cookies.set(path, 'newSpcemarkRecentlyAdded', { expires: inOneMinute })
      }
      success = result !== null ? true : false
    } finally {
      saving = false
    }
  }

  $: onChane = (callback) => {
    getChangedMarkdown = callback
    changed = true
    success = null
  }

  $: onCancel = () => {
    markdown = markdown.trim()
    changed = false
  }

  $: onMount(() => {
    ;(async function () {
      let repoTree = await fetchUserBookmarks(username)
      if (!repoTree) {
        navigate('/profile')
        return
      }

      revervedNames = repoTree.map((item: any) => item.path)

      if (path === null) {
        return
      }
      let file = await fetchFile(username, path)
      if (file === null) {
        return
      }
      viewLink = `/${username}/${path}`
      markdown = atob(file.content)
      previous_sha = file.sha
    })().finally(() => {
      loading = false
    })
  })
</script>

<section class="container mx-auto flex flex-col">
  <MainHeader />
  <main class="flex-1 mx-auto 2xl:w-2/3 xl:w-3/4 lg:w-4/5 w-5/6 md:mt-30 mt-20">
    {#if loading}
      <LoadingIcon />
    {:else}
      <!-- https://github.com/outline/rich-markdown-editor -->
      <ReactAdapter
        {id}
        el={ReactEditor}
        value={markdown}
        autoFocus
        readOnly={false}
        onChange={onChane}
        theme={editorConfig.dark} />
    {/if}
  </main>
  <div class="my-4 w-full flex flex-row justify-end space-x-8 items-center">
    {#if success === true}
      <span class="text-neutral-400">
        Spacemark was successfully {path === null ? 'Create' : 'Updated'}!
      </span>
      <Link blank _class="underline" to={viewLink}>View the result here</Link>
    {:else if success === false}
      <span class="text-red-800"> Could not save spacemark. Please try again. </span>
    {/if}
    {#if saving}
      <LoadingIcon width="20" />
    {/if}
    {#if changed}
      <Button secondary onClick={onCancel}>Cancel</Button>
    {/if}
    <Button disabled={!changed || saving} onClick={onSave}>Publish</Button>
  </div>
  <Footer />
</section>
