<script lang="ts">
  import { Router, Route } from 'svelte-navigator'

  import Home from './lib/Home.svelte'
  import Part from './lib/Part.svelte'
</script>

<main>
  <Router>
    <Route path="/bookmarks"><Home /></Route>
    <Route path="/bookmarks/:username" let:params><Part username={params.username} /></Route>
  </Router>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }
</style>
