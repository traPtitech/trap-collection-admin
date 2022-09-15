export const paths = {
  oauthEntrypointPath: '/api/oauth2/generate/code',
  games: '/games',
  game: (id: string) => `/games/${id}`,
  editions: '/editions',
  edition: (id: string) => `/editions/${id}`
}
