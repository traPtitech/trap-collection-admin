export const paths = {
  index: '/',
  oauthEntrypointPath: '/api/oauth2/generate/code',
  games: {
    index: '/games',
    detail: (id: string) => `/games/${id}`
  },
  editions: {
    index: '/editions',
    detail: (id: string) => `/editions/${id}`
  },
  logout: '/logout',
  callback: '/callback'
}
