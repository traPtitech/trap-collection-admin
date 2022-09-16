export const paths = {
  index: '/',
  oauthEntrypointPath: '/api/oauth2/generate/code',
  games: {
    index: (all = true, limit?: number, offset?: number) => {
      const query = new URLSearchParams()
      if (!all) {
        query.append('all', 'false')
      }
      if (limit) {
        query.append('limit', limit.toString())
      }
      if (offset) {
        query.append('offset', offset.toString())
      }
      return `/games${query.toString() ? '?' + query.toString() : ''}`
    },
    detail: (id: string) => `/games/${id}`
  },
  editions: {
    index: () => `/editions`,
    detail: (id: string) => `/editions/${id}`
  },
  logout: '/logout',
  callback: '/callback'
}
