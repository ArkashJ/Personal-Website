'use client'

import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'

export default function SkillCopyButton({ slug }: { slug: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')

  async function handleCopy() {
    try {
      const res = await fetch(`/skills/${slug}/raw`)
      if (!res.ok) throw new Error('failed')
      const text = await res.text()
      await navigator.clipboard.writeText(text)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 2000)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono border transition-[color,border-color,background-color] duration-150 ${
        state === 'copied'
          ? 'bg-primary text-bg border-primary'
          : state === 'error'
            ? 'border-red-400 text-red-400'
            : 'border-border text-text hover:border-primary hover:text-primary'
      }`}
    >
      {state === 'copied' ? (
        <>
          <Check className="w-3 h-3" /> Copied for LLM
        </>
      ) : state === 'error' ? (
        <>
          <X className="w-3 h-3" /> Copy failed
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" /> Copy for LLM
        </>
      )}
    </button>
  )
}
