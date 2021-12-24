import * as fetchIntercept from 'fetch-intercept'

import { BOOKMARK_REPO } from '../constants'
import { getAccessToken, logout } from './user'

fetchIntercept.register({
  request(url, config?: RequestInit) {
    const accessToken = getAccessToken()
    if (accessToken && url && url.startsWith('https://api.github.com')) {
      if (config === undefined) {
        config = {}
      }
      if (!config.headers) {
        config.headers = {}
      }
      config.headers = { ...config.headers, Authorization: `token ${accessToken}` }
    }
    return [url, config]
  },
  response(response) {
    if (!response.ok && response.statusText === '401') {
      setTimeout(() => logout())
    }
    return response
  },
})

export async function fetchFileContent(username: string, filePath: string) {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${username}/${BOOKMARK_REPO}/master/${filePath}`)

    const text = await response.text()
    if (!response.ok) {
      throw new Error(text)
    }
    return text
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchFile(username: string, filePath: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${BOOKMARK_REPO}/contents/${filePath}`)

    const text = await response.json()
    if (!response.ok) {
      throw new Error(text)
    }
    return text
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchFileBlob(url: string) {
  try {
    const response = await fetch(url)

    const text = await response.json()
    if (!response.ok) {
      throw new Error(text)
    }
    return text
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function saveFile(username: string, filePath: string, content: string, sha?: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${BOOKMARK_REPO}/contents/${filePath}`, {
      method: 'PUT',
      body: JSON.stringify({ content: btoa(content), sha, message: 'changed by spacemarks.co' }),
    })

    const text = await response.text()
    if (!response.ok) {
      throw new Error(text)
    }
    return text
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchCurrentUser() {
  try {
    const response = await fetch(`https://api.github.com/user`)
    if (!response.ok) {
      throw new Error('Invalid response')
    }
    const user = await response.json()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchUser(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) {
      throw new Error('Invalid response')
    }
    const user = await response.json()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchUserBookmarks(username: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${BOOKMARK_REPO}/git/trees/main`)
    if (!response.ok) {
      throw new Error('Invalid response')
    }
    const tree = (await response.json())?.tree?.filter((item) => item.type === 'blob')
    return tree
  } catch (error) {
    console.error(error)
    return null
  }
}
