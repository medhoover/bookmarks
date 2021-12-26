<script lang="ts">
  import '../utils/theme'
  import { isDarkModeEnabled, themeColor, ThemeColor } from '../utils/theme'
  import ChevronDownIcon from './icons/ChevronDownIcon.svelte'
  import MoonIcon from './icons/MoonIcon.svelte'
  import SunIcon from './icons/SunIcon.svelte'

  let currentMode: ThemeColor

  $: themeColor.subscribe((theme) => {
    currentMode = theme
  })

  $: onChange = (e: any) => {
    themeColor.set(e.target.value)
  }
</script>

<div class="relative container mx-auto mb-3 flex flex-row justify-end">
  <select
    class="peer opacity-0 cursor-pointer z-10"
    name="theme"
    id="theme-select"
    bind:value={currentMode}
    on:change={onChange}>
    <option value="system">System</option>
    <option value="dark">Dark Mode</option>
    <option value="light">Light Mode</option>
  </select>
  <div class="absolute top-3 right-5 w-12 peer-hover:opacity-100 opacity-80">
    <div class="flex flex-row">
      {#if isDarkModeEnabled(currentMode)}
        <MoonIcon height="20" width="20" class="stroke-black dark:stroke-white" />
      {:else}
        <SunIcon height="20" width="20" class="stroke-black dark:stroke-white" />
      {/if}
      <ChevronDownIcon width="16" class="stroke-black dark:stroke-white ml-1" />
    </div>
  </div>
</div>
