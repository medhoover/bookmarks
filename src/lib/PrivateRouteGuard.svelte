<script>
  import { userSession } from '../utils/user'

  import { useNavigate, useFocus } from 'svelte-navigator'
  import LoadingIcon from './icons/LoadingIcon.svelte'

  let isChecking = true

  const navigate = useNavigate()
  const registerFocus = useFocus()

  let isLoaggedIn = null

  const navigateToLogin = () => {
    navigate('/', {
      replace: true,
    })
  }

  $: userSession.subscribe((us) => {
    isLoaggedIn = us.logged_in
    isChecking = false

    if (!isLoaggedIn) {
      navigateToLogin()
    }
  })
</script>

{#if isLoaggedIn && !isChecking}
  <slot {registerFocus} />
{/if}

{#if isChecking}
  <div class="flex h-full justify-center items-center">
    <LoadingIcon />
  </div>
{/if}
