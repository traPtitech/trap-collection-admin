import { paths } from './paths'

export const withAuth =
  <P extends unknown[], T>(fn: (...args: P) => Promise<T>) =>
  async (...args: P) => {
    try {
      return fn(...args)
    } catch (e) {
      // 401 ならログイン画面に飛ばす
      window.location.href = paths.oauthEntrypointPath
    }
  }
