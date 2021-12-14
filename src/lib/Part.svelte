<script lang="ts">
  import { render as renderMarkdown } from '../utils/markdown'

  export let markdown: string
</script>

{@html renderMarkdown(markdown)}
