<script lang="ts">
  import { getContext, onMount, setContext } from 'svelte'
  import { Router, Route } from 'svelte-navigator'

  import Bookmarks from './lib/Bookmarks.svelte'
  import Editor from './lib/Editor.svelte'
  import Home from './lib/Home.svelte'
  import Login from './lib/Login.svelte'
  import { userSession } from './utils/user'

  setContext('user', userSession)
</script>

<main>
  <Router>
    <Route path="/bookmarks"><Home /></Route>
    <Route path="/bookmarks/oauth/callback" primary={false}><Login /></Route>
    <Route path="/bookmarks/editor" primary={false}><Editor /></Route>
    <Route path="/bookmarks/editor/:path" primary={false} let:params><Editor path={params.path} /></Route>
    <Route path="/bookmarks/:username" let:params><Bookmarks username={params.username} /></Route>
  </Router>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }
</style>
