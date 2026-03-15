import { create } from 'zustand'

/** @type {import('zustand').UseBoundStore} */
export const useGameStore = create((set) => ({
  /** @type {import('../types/index').GameState | null} */
  gameState: null,
  /** @type {string | null} */
  selectedCardId: null,

  setGameState: (state) => set({ gameState: state }),
  selectCard: (cardId) => set({ selectedCardId: cardId }),
  clearSelection: () => set({ selectedCardId: null }),
  reset: () => set({ gameState: null, selectedCardId: null }),
}))
