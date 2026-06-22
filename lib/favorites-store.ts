'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Persisted set of favorited skill slugs. Survives reloads via localStorage.
// Mirrors the lib/store.ts convention: 'use client', named use<Name>Store export,
// underscore-prefixed type params for the no-unused-vars argsIgnorePattern rule.
type FavoritesState = {
  favorites: string[]
  toggle: (_slug: string) => void
  isFavorite: (_slug: string) => boolean
  clear: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggle: (slug) =>
        set((s) => ({
          favorites: s.favorites.includes(slug)
            ? s.favorites.filter((x) => x !== slug)
            : [...s.favorites, slug],
        })),
      isFavorite: (slug) => get().favorites.includes(slug),
      clear: () => set({ favorites: [] }),
    }),
    {
      name: 'arkashj-skill-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
