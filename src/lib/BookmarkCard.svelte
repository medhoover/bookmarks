<script lang="ts">
  import { onMount } from 'svelte'

  import { fetchFileBlob } from '../utils/github'
  import Part from './Part.svelte'

  export let url: string | null = null

  let markdown: string | null = null

  $: onMount(async () => {
    let file = await fetchFileBlob(url)
    if (file === null) {
      return
    }
    markdown = atob(file.content)
  })
</script>

<div {...$$props}>
  <div class="relative">
    <div class="absolute w-full h-full p-11 flex flex-col">
      <div class="bookmark-card flex-1 text-gray-900 overflow-hidden overflow-ellipsis bottom-transparent">
        {#if markdown}
          <Part {markdown} />
        {/if}
        <slot name="content" />
      </div>
      <slot class="w-fit mx-auto" name="action-main" />
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 372 777" class="w-full h-full">
      <g filter="url(#a)">
        <path
          fill="#fff"
          d="M31 51a24 24 0 0 1 24-24h262a24 24 0 0 1 24 24v602.95a24 24 0 0 1-13.55 21.6l-131 63.4a24 24 0 0 1-20.9 0l-131-63.4A24 24 0 0 1 31 653.95V51Z" /></g>
      <defs>
        <filter
          id="a"
          width="372"
          height="776.34"
          x="0"
          y="0"
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="15.5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_574_274" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_574_274" result="shape" />
        </filter>
      </defs>
    </svg>
  </div>
</div>

<style>
  .bottom-transparent {
    mask-image: linear-gradient(to bottom, black 70%, transparent 95%);
  }
</style>
