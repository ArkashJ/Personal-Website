'use client'

import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'
import { copySkillRawToClipboard } from '@/lib/copy-skill'

export default function SkillCopyButton({ slug }: { slug: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')

  async function handleCopy() {
    try {
      await copySkillRawToClipboard(slug)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    } catch (err) {
      console.error('[skills] copy failed', err)
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
