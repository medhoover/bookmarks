<script lang="ts">
  export let _class = ''
  export let onClick = undefined
  export let primary = false
  export let secondary = false

  $: if (primary) {
    _class += ' bg-blue-600 hover:bg-blue-700'
  }

  $: if (secondary) {
    _class += ' bg-slate-600 hover:bg-slate-500'
  }
</script>

<button class="w-8 h-8 mx-auto rounded-full flex justify-center items-center {_class}" {...$$props} on:click={onClick}>
  <slot />
</button>
