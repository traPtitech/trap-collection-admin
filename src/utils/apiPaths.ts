import { env } from 'process'

export const apiPaths = {
  gameImage: (gameId: string, imageId: string) =>
    [
      env['DEV_SERVER_PROXY_HOST'] ?? '',
      'api',
      'games',
      gameId,
      'images',
      imageId
    ].join('/')
}
