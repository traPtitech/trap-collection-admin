import path from 'path'
import { env } from 'process'

export const apiPaths = {
  gameImage: (gameId: string, imageId: string) =>
    path.join(
      env['DEV_SERVER_PROXY_HOST'] ?? '',
      'api',
      'games',
      gameId,
      'images',
      imageId
    )
}
