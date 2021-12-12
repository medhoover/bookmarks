export async function fetchBookmarks(username: string) {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${username}/_bookmarks/master/README.md`)

    const text = await response.text()
    if (!response.ok) {
      throw new Error(text)
    }
    return text
  } catch (error) {
    console.error(error)
    return `
## User bookmarks can't be found
Make sure you have entered the right username and that the user has a valid bookmarks repository
`
  }
}
