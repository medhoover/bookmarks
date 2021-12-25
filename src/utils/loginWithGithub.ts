const toParams = (query) => {
  const q = query.replace(/^\??\//, '')

  return q.split('&').reduce((values, param) => {
    const [key, value] = param.split('=')

    values[key] = value

    return values
  }, {})
}

const toQuery = (params, delimiter = '&') => {
  const keys = Object.keys(params)

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`

    if (index < keys.length - 1) {
      query += delimiter
    }

    return query
  }, '')
}

export class PopupWindow {
  window: Window
  promise: Promise<any>

  private _iid: number

  constructor(
    public options = { height: 1000, width: 600 },
    public url = `https://spacemarks.herokuapp.com/login`,
    public id = 'github-oauth-authorize'
  ) {}

  open() {
    const { url, id, options } = this

    this.window = window.open(url, id, toQuery(options, ','))
  }

  close() {
    this.cancel()
    this.window.close()
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window

          if (!popup || popup.closed !== false) {
            this.close()

            reject(new Error('The popup was closed'))

            return
          }

          if (
            popup.location.href.startsWith('https://bookmarks-wiki.herokuapp.com') ||
            popup.location.href.startsWith('https://github.com') ||
            popup.location.pathname === 'blank'
          ) {
            return
          }

          const params = toParams(popup.location.search.replace(/^\?/, ''))

          resolve(params)

          this.close()
        } catch {}
      }, 500)
    })
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid)
      this._iid = null
    }
  }

  then(...args) {
    return this.promise.then(...args)
  }

  catch(...args) {
    return this.promise.then(...args)
  }

  static open(...args) {
    const popup = new this(...args)

    popup.open()
    popup.poll()

    return popup
  }
}
