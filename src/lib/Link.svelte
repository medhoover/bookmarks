<script lang="ts">
  import { Link } from 'svelte-navigator'

  export let to: string
  export let underline = false
  export let _class = ''

  let isCurrent: boolean = false

  $: getProps = (props: any) => (isCurrent = props.isCurrent)

  $: className = `font-semibold underline-offset-8 hover:underline ${
    isCurrent || underline ? 'underline' : ''
  } ${_class}`
</script>

<Link {to} {getProps} class={className}><slot /></Link>
