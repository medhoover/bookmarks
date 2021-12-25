<script lang="ts">
  import { onMount } from 'svelte'

  import '../utils/theme'
  import AirplayIcon from './icons/AirplayIcon.svelte'
  import MoonIcon from './icons/MoonIcon.svelte'
  import SunIcon from './icons/SunIcon.svelte'

  type Theme = 'system' | 'dark' | 'light'

  let currentMode: Theme = 'system'

  $: switchTheme = (theme: Theme) => {
    if (theme === 'dark') {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      localStorage.theme = 'dark'
      document.documentElement.classList.remove('dark')
    } else {
      localStorage.removeItem('theme')
      document.documentElement.classList.remove('dark')
    }
    currentMode = theme
  }

  $: onMount(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (localStorage.theme) {
      if (localStorage.theme === 'dark') {
        currentMode = 'dark'
      } else {
        currentMode = 'light'
      }
    }
  })
</script>

<div
  class="absolute group right-2 top-2 z-10 w-fit h-6 flex flex-row items-center space-x-2 opacity-70 hover:opacity-100">
  {#if currentMode === 'system'}
    <span class="group-hover:opacity-100 opacity-0 transition-opacity select-none">Enable Dark mode</span>
    <div class="cursor-pointer" on:click={() => switchTheme('dark')}><MoonIcon width="20" /></div>
  {:else if currentMode === 'dark'}
    <span class="group-hover:opacity-100 opacity-0 transition-opacity select-none">Enable Light mode</span>
    <div class="cursor-pointer" on:click={() => switchTheme('light')}><SunIcon width="20" /></div>
  {:else}
    <span class="group-hover:opacity-100 opacity-0 transition-opacity select-none">Follow System preferences</span>
    <div class="cursor-pointer" on:click={() => switchTheme('system')}><AirplayIcon width="20" /></div>
  {/if}
</div>
