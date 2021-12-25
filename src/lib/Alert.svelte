<script lang="ts">
  export let type: 'info' | 'error' | 'warning' | 'success' = 'info'
  export let _class = ''

  let bgColor = 'bg-blue-700'

  $: if (type === 'error') {
    bgColor = 'bg-red-700'
  } else if (type === 'success') {
    bgColor = 'bg-green-700'
  } else if (type === 'warning') {
    bgColor = 'bg-yellow-700'
  }
</script>

<div {...$$props} class={`rounded-lg p-4 ${_class} ${bgColor} bg-opacity-80 text-white`}>
  <slot />
</div>
