<script lang="ts">
  import ReactEditor from 'rich-markdown-editor'
  import { onMount } from 'svelte'

  import { DEFAULT_BOOKMARK_PATH } from '../constants'
  import ReactAdapter from '../lib/ReactAdapter.svelte'
  import { fetchFile, updateFile } from '../utils/github'
  import { userSession } from '../utils/user'

  export let path: string = DEFAULT_BOOKMARK_PATH

  let markdown = ''
  let previous_sha = ''
  let username: string | null = null

  userSession.subscribe((us) => {
    if (us.logged_in) {
      username = us.login
    }
  })

  let getChangedMarkdown: () => string
  let onSave = async ({ done }: { done: boolean }) => {
    const content = getChangedMarkdown()
    if (!content || content === markdown) {
      return
    }
    await updateFile(username, path, content, previous_sha)
  }

  $: onMount(async function () {
    if (username === null) {
      return
    }
    let file = await fetchFile(username, path)
    if (file === null) {
      return
    }
    markdown = atob(file.content)
    previous_sha = file.sha
  })
</script>

<!-- https://github.com/outline/rich-markdown-editor -->
<section>
  <ReactAdapter el={ReactEditor} value={markdown} onChange={(callback) => (getChangedMarkdown = callback)} {onSave} />
</section>

<style>
  section {
    margin: 2rem;
  }
</style>
