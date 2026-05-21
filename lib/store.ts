'use client'

import { create } from 'zustand'

type UiState = {
  paletteOpen: boolean
  setPaletteOpen: (_open: boolean) => void
  togglePalette: () => void

  mobileNavOpen: boolean
  setMobileNavOpen: (_open: boolean) => void
  toggleMobileNav: () => void

  modalId: string | null
  modalPayload: unknown
  openModal: (_id: string, _payload?: unknown) => void
  closeModal: () => void
}

export const useUiStore = create<UiState>((set) => ({
  paletteOpen: false,
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  togglePalette: () => set((s) => ({ paletteOpen: !s.paletteOpen })),

  mobileNavOpen: false,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),

  modalId: null,
  modalPayload: null,
  openModal: (id, payload = null) => set({ modalId: id, modalPayload: payload }),
  closeModal: () => set({ modalId: null, modalPayload: null }),
}))
