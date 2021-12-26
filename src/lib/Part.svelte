<script lang="ts">
  import { render as renderMarkdown } from '../utils/markdown'

  export let markdown: string
  export let small = false
  export let light = false
  export let _class = ''

  $: sizeClass = small ? 'prose-sm' : 'lg:prose-xl'
  $: colorClass = light ? '' : 'dark:prose-invert'
</script>

<article class={`max-w-none prose ${sizeClass} ${colorClass} ${_class}`}>
  {@html renderMarkdown(markdown)}
</article>
