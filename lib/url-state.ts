'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// Lightweight URL <-> state sync. Reads from useSearchParams; writes via
// router.replace so back/forward isn't polluted on every keystroke.
// Empty / null values clear the param.
export function useUrlState(keys: readonly string[]): {
  values: Record<string, string>
  set: (key: string, value: string | null) => void
  reset: () => void
} {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const values = useMemo(() => {
    const out: Record<string, string> = {}
    for (const k of keys) out[k] = params.get(k) ?? ''
    return out
  }, [keys, params])

  const set = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString())
      if (value === null || value === '') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [params, pathname, router]
  )

  const reset = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  return { values, set, reset }
}
