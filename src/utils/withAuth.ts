import { AxiosError } from 'axios'

import { apis } from '../lib/apis'
import { paths } from './paths'

export const withAuth =
  <P extends unknown[], T>(fn: (...args: P) => Promise<T>) =>
  async (...args: P) => {
    try {
      return await fn.bind(apis)(...args)
    } catch (e: unknown) {
      // 401 ならログイン画面に飛ばす
      if ((e as AxiosError).response?.status === 401) {
        sessionStorage.setItem('redirect', window.location.href)
        window.location.href = paths.oauthEntrypointPath
        return
      }
      throw e
    }
  }
