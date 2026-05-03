'use client'

import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'
import { copyRawToClipboard } from '@/lib/copy-for-llm'

type Props = {
  /** URL of the raw plaintext endpoint (e.g. `/writing/foo/raw`). */
  rawUrl: string
  /** Optional label override. Defaults to "Copy for LLM". */
  label?: string
  className?: string
}

export default function CopyForLlm({ rawUrl, label = 'Copy for LLM', className }: Props) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')

  async function handleCopy() {
    try {
      await copyRawToClipboard(rawUrl)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    } catch (err) {
      console.error('[copy-for-llm] copy failed', err)
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
      } ${className ?? ''}`}
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
          <Copy className="w-3 h-3" /> {label}
        </>
      )}
    </button>
  )
}
