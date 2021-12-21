<script lang="ts">
  import { setContext } from 'svelte'
  import { Router, Route } from 'svelte-navigator'

  import PrivateRoute from './lib/PrivateRoute.svelte'
  import Bookmarks from './pages/Bookmark.svelte'
  import Editor from './pages/Editor.svelte'
  import Home from './pages/Landing.svelte'
  import MyBookmarks from './pages/MyBookmarks.svelte'
  import { userSession } from './utils/user'

  setContext('user', userSession)
</script>

<div class="antialiased bg-slate-900 text-white md:h-screen h-full lg:p-8 sm:p-4 lg:text-base md:text-sm">
  <Router>
    <Route path="/"><Home /></Route>
    <Route path="/oauth/callback" primary={false}>Redirecting you to the main page...</Route>
    <PrivateRoute path="/profile"><MyBookmarks /></PrivateRoute>
    <PrivateRoute path="/editor"><Editor /></PrivateRoute>
    <Route path="/editor/:path" primary={false} let:params><Editor path={params.path} /></Route>
    <Route path="/:username/*" let:params><Bookmarks username={params.username} /></Route>
  </Router>
</div>

<style>
  :root {
    font-family: 'Open Sans', sans-serif;
  }
</style>
