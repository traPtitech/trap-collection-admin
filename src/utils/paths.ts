export const paths = {
  index: '/',
  oauthEntrypointPath: '/api/oauth2/code',
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
    detail: (id: string) => ({
      index: `/games/${id}`,
      versions: `/games/${id}/versions`,
      images: `/games/${id}/images`,
      videos: `/games/${id}/videos`,
      files: `/games/${id}/files`
    })
  },
  editions: {
    index: () => `/editions`,
    detail: (id: string) => ({
      index: `/editions/${id}`,
      productKeys: `/editions/${id}/productKeys`
    })
  },
  logout: '/logout',
  callback: '/callback'
}
