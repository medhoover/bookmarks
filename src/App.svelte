<script lang="ts">
  import { setContext } from 'svelte'
  import { Router, Route } from 'svelte-navigator'

  import Footer from './lib/Footer.svelte'
  import Link from './lib/Link.svelte'
  import PrivateRoute from './lib/PrivateRoute.svelte'
  import ThemeSwitcher from './lib/ThemeSwitcher.svelte'
  import Bookmark from './pages/Bookmark.svelte'
  import Editor from './pages/Editor.svelte'
  import Help from './pages/Help.svelte'
  import Home from './pages/Landing.svelte'
  import MyBookmarks from './pages/MyBookmarks.svelte'
  import Profile from './pages/Profile.svelte'
  import { userSession } from './utils/user'

  setContext('user', userSession)
</script>

<div
  class="antialiased bg-slate-0 dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen flex flex-col lg:text-base md:text-sm ">
  <ThemeSwitcher />
  <div class="container mx-auto flex-1 flex flex-col lg:p-8 lg:pt-0 p-4 pt-0">
    <Router>
      <Route path="/" primary={false}><Home /></Route>
      <Route path="/oauth/callback" primary={false}>Redirecting you to the main page...</Route>
      <Route path="/help" primary={false}><Help /></Route>
      <PrivateRoute path="/profile"><MyBookmarks /></PrivateRoute>
      <PrivateRoute path="/editor"><Editor /></PrivateRoute>
      <Route path="/editor/:path" primary={false} let:params><Editor path={params.path} /></Route>
      <Route path="/*username" primary={false} let:params>
        {#if params.username.startsWith('@')}
          <Route path="/:username/" primary={false} let:params
            ><Profile username={params.username.substring(1)} /></Route>
          <Route path="/:username/:path" primary={false} let:params
            ><Bookmark path={params.path} username={params.username.substring(1)} /></Route>
        {:else}
          <h1>The page you are looking for is not found.</h1>
          <Link to="/">Go to Landing page</Link>
        {/if}
      </Route>
    </Router>
  </div>
  <Footer />
</div>

<style>
  :root {
    font-family: 'Open Sans', sans-serif;
  }
</style>
