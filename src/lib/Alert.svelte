<script lang="ts">
  export let type: 'info' | 'error' | 'warning' | 'success' = 'info'
  export let _class = ''

  let bgColor = 'bg-sky-900'

  $: if (type === 'error') {
    bgColor = 'bg-red-900'
  } else if (type === 'success') {
    bgColor = 'bg-green-900'
  } else if (type === 'warning') {
    bgColor = 'bg-yellow-900'
  }
</script>

<div {...$$props} class={`rounded-lg p-4 ${_class} ${bgColor} bg-opacity-20 text-white`}>
  <slot />
</div>
