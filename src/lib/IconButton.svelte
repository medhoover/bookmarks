<script lang="ts">
  export let _class = ''
  export let onClick = undefined
</script>

<button
  class="w-10 h-10 mx-auto rounded-full flex justify-center items-center {_class}"
  {...$$props}
  on:click={onClick}>
  <slot />
</button>
