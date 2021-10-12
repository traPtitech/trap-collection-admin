import { reactive, provide, inject, InjectionKey } from '@vue/runtime-core'

import { Game } from '/@/lib/apis'

type Games = Map<string, Game>
const gameStatesSymbol: InjectionKey<Games> = Symbol()

const createGameStates = () => {
  return reactive<Games>(new Map())
}

export const provideGameStates = () => {
  return provide(gameStatesSymbol, createGameStates())
}

export const useGameStates = () => {
  const state = inject(gameStatesSymbol)
  if (!state) {
    throw new Error('useGameStates() was called without provider.')
  }

  return { state }
}
