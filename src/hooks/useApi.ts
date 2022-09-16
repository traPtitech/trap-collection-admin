import { AxiosError, AxiosPromise, AxiosResponse } from 'axios'
import { useNotification } from 'naive-ui'
import { shallowRef } from 'vue'

import { apis } from '/@/lib/apis'
import { paths } from '/@/utils/paths'

type DataState<T> =
  | {
      type: 'notRequested'
    }
  | {
      type: 'loading'
    }
  | ({
      type: 'success'
    } & AxiosResponse<T>)
  | {
      type: 'error'
      error: AxiosError
    }

export const useApi = <P extends unknown[], T>(
  fn: (...args: P) => AxiosPromise<T>
) => {
  const data = shallowRef<DataState<T> | undefined>({
    type: 'notRequested'
  })

  const refetch = async (...args: P) => {
    try {
      data.value = { type: 'loading' }
      const res: AxiosResponse<T> = await fn.bind(apis)(...args)
      const newDataState: DataState<T> = { type: 'success', ...res }
      data.value = newDataState
      return newDataState
    } catch (e: unknown) {
      const status = (e as AxiosError).response?.status
      // 401 ならログイン画面に飛ばす
      if (status === 401) {
        sessionStorage.setItem('redirect', window.location.href)
        window.location.href = paths.oauthEntrypointPath
        return
      }
      // 500 番台ならエラーを表示する
      if (status !== undefined && status >= 500) {
        const notification = useNotification()
        notification.error({
          content: 'Request faild',
          meta: (e as AxiosError).message,
          duration: 2500,
          keepAliveOnHover: true
        })
      }
      const newDataState: DataState<T> = {
        type: 'error',
        error: e as AxiosError
      }
      data.value = newDataState
      return newDataState
    }
  }

  return { data, refetch }
}
