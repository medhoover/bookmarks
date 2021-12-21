import Cookies from 'js-cookie'
import { writable } from 'svelte/store'

import { fetchCurrentUser } from './github'
import { PopupWindow } from './loginWithGithub'

export type UserSession =
  | { logged_in: false }
  | {
      logged_in: true
      avatar_url: string
      html_url: string
      name: string
      login: string
    }

const initialSession = getUser()
export const userSession = writable<UserSession>(
  initialSession ? { logged_in: true, ...initialSession } : { logged_in: false }
)

async function _login(accessToken: string) {
  Cookies.set('at', accessToken, { expires: 14 })

  const result = await fetchCurrentUser()

  if (!result) {
    logout()
    return false
  }

  Cookies.set('u', JSON.stringify(result), { expires: 14 })
  Cookies.set('at', accessToken, { expires: 14 })
  userSession.set({ logged_in: true, ...result })

  return true
}

export const login = () =>
  PopupWindow.open()
    .then((response: any) => _login(response.accessToken))
    .catch(console.error)

export function logout() {
  Cookies.remove('u')
  Cookies.remove('at')
  userSession.set({ logged_in: false })
}

export function getAccessToken() {
  return Cookies.get('at')
}

function getUser() {
  const userPayload = Cookies.get('u')
  return userPayload ? JSON.parse(userPayload) : null
}
