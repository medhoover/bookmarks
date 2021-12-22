<script lang="ts">
  export let secondary: boolean = false
  export let bouncing: boolean = false
  export let onClick = undefined
  export let _class = ''
  let buttonProps

  $: ({ secondary, disabled, onClick, _class, ...buttonProps } = $$props)

  $: className = `font-bold text-white py-2 px-8 rounded-lg ${
    secondary ? 'border-2' : 'bg-blue-700 hover:bg-blue-800'
  } ${bouncing ? 'animate-bounce' : ''}`

  $: handleClick = (e: any) => {
    if (disabled) {
      return
    }
    onClick(e)
  }
</script>

<button
  {disabled}
  class={`disabled:opacity-25 ${className} ${_class}`}
  {...buttonProps}
  on:click|stopPropagation={handleClick}><slot /></button>
