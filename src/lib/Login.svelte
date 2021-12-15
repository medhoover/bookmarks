<script lang="ts">
  import { useNavigate } from 'svelte-navigator'

  import { login } from '../utils/user'

  const navigate = useNavigate()

  async function handleLogin() {
    const searchParams = new URLSearchParams(window.location.search)
    const accessToken = searchParams.get('accessToken')

    const result = await login(accessToken)
    if (result) {
      navigate('/')
      return
    }
    throw new Error()
  }

  let loginPromise = handleLogin()
</script>

{#await loginPromise}
  ...
{:catch}
  <h1>Oh no...</h1>
  <p>We couldn't log you in, please try again later</p>
{/await}
