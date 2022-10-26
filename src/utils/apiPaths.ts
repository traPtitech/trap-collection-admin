export const apiPaths = {
  gameImage: (gameId: string, imageId: string) =>
    `/api/v2/games/${gameId}/images/${imageId}`,
  gameVideo: (gameId: string, videoId: string) =>
    `/api/v2/games/${gameId}/videos/${videoId}`,
  gameFile: (gameId: string, fileId: string) =>
    `/api/v2/games/${gameId}/files/${fileId}`
}
