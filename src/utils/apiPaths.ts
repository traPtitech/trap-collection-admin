export const apiPaths = {
  gameImage: (gameId: string, imageId: string) =>
    `/api/games/${gameId}/images/${imageId}`,
  gameVideo: (gameId: string, videoId: string) =>
    `/api/games/${gameId}/videos/${videoId}`
}
