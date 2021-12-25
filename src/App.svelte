<script lang="ts">
  import { setContext } from 'svelte'
  import { Router, Route } from 'svelte-navigator'

  import PrivateRoute from './lib/PrivateRoute.svelte'
  import ThemeSwitcher from './lib/ThemeSwitcher.svelte'
  import Bookmark from './pages/Bookmark.svelte'
  import Editor from './pages/Editor.svelte'
  import Home from './pages/Landing.svelte'
  import MyBookmarks from './pages/MyBookmarks.svelte'
  import Profile from './pages/Profile.svelte'
  import { userSession } from './utils/user'

  setContext('user', userSession)
</script>

<div
  class="antialiased bg-slate-0 dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen flex flex-col lg:text-base md:text-sm">
  <ThemeSwitcher />
  <div class="lg:p-8 lg:pt-0 p-4 pt-0 flex-1 flex h-full">
    <Router>
      <Route path="/" primary={false}><Home /></Route>
      <Route path="/oauth/callback" primary={false}>Redirecting you to the main page...</Route>
      <PrivateRoute path="/profile"><MyBookmarks /></PrivateRoute>
      <PrivateRoute path="/editor"><Editor /></PrivateRoute>
      <Route path="/editor/:path" primary={false} let:params><Editor path={params.path} /></Route>
      <Route path="/:username/" primary={false} let:params><Profile username={params.username} /></Route>
      <Route path="/:username/:path" primary={false} let:params
        ><Bookmark path={params.path} username={params.username} /></Route>
    </Router>
  </div>
</div>

<style>
  :root {
    font-family: 'Open Sans', sans-serif;
  }
</style>
