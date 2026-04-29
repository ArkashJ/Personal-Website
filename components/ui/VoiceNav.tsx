'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mic, MicOff } from 'lucide-react'
import { NAV_LINKS, SECONDARY_LINKS, SITE } from '@/lib/site'

type Item = { label: string; href: string; aliases?: string[] }

const buildItems = (): Item[] => [
  { label: 'Home', href: '/', aliases: ['home', 'main', 'index', 'start'] },
  ...NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
  ...SECONDARY_LINKS.map((l) => ({ label: l.label, href: l.href })),
  {
    label: 'Experience',
    href: '/about#career',
    aliases: ['experience', 'career', 'jobs', 'work history'],
  },
  { label: 'Tools', href: '/about#tools', aliases: ['tools', 'clis', 'cli'] },
  { label: 'GitHub', href: SITE.social.github, aliases: ['github'] },
  { label: 'LinkedIn', href: SITE.social.linkedin, aliases: ['linkedin'] },
  { label: 'Substack', href: SITE.social.substack },
  { label: 'Medium', href: SITE.social.medium },
  { label: 'Twitter', href: SITE.social.twitter, aliases: ['twitter', 'x'] },
]

const PREFIX_RE = /^(go to|open|navigate to|take me to|show me|jump to|visit|please)\s+/i

const matchItem = (transcript: string, items: Item[]): Item | null => {
  const t = transcript
    .toLowerCase()
    .replace(PREFIX_RE, '')
    .replace(/[.!?]+$/, '')
    .trim()
  if (!t) return null
  // Exact label/alias match
  for (const i of items) {
    const labels = [i.label.toLowerCase(), ...(i.aliases || [])]
    if (labels.includes(t)) return i
  }
  // Token-overlap scoring
  const qTokens = t.split(/\s+/).filter(Boolean)
  let best: { item: Item; score: number } | null = null
  for (const i of items) {
    const hay = `${i.label} ${(i.aliases || []).join(' ')}`.toLowerCase()
    let score = 0
    for (const tok of qTokens) {
      if (tok.length < 2) continue
      if (hay.includes(tok)) score += tok.length
    }
    if (score > 0 && (!best || score > best.score)) best = { item: i, score }
  }
  return best && best.score >= 3 ? best.item : null
}

type RecognitionLike = {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: (e: {
    results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }>
  }) => void
  onend: () => void
  onerror: () => void
  start: () => void
  stop: () => void
}

const VoiceNav = () => {
  const router = useRouter()
  const [supported, setSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState('')
  const [status, setStatus] = useState<'idle' | 'listening' | 'matched' | 'no-match' | 'denied'>(
    'idle'
  )
  const recRef = useRef<RecognitionLike | null>(null)
  const items = useMemo(buildItems, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const SR =
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
    setSupported(Boolean(SR))
  }, [])

  const navigate = useCallback(
    (href: string) => {
      if (href.startsWith('http')) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(href)
      }
    },
    [router]
  )

  const stop = useCallback(() => {
    recRef.current?.stop()
    setListening(false)
  }, [])

  const start = useCallback(() => {
    if (typeof window === 'undefined') return
    const SR =
      (window as unknown as { SpeechRecognition?: new () => RecognitionLike }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => RecognitionLike })
        .webkitSpeechRecognition
    if (!SR) return
    if (listening) {
      stop()
      return
    }
    const rec = new SR()
    rec.lang = 'en-US'
    rec.interimResults = true
    rec.continuous = false
    rec.onresult = (e) => {
      const last = e.results[e.results.length - 1]
      const transcript = last[0].transcript
      setHeard(transcript)
      const isFinal = (last as unknown as { isFinal?: boolean }).isFinal
      if (isFinal) {
        const m = matchItem(transcript, items)
        if (m) {
          setStatus('matched')
          rec.stop()
          // Tiny delay so the user sees the "matched" hint flash
          window.setTimeout(() => navigate(m.href), 220)
        } else {
          setStatus('no-match')
          rec.stop()
        }
      }
    }
    rec.onend = () => {
      setListening(false)
      window.setTimeout(() => {
        setHeard('')
        setStatus('idle')
      }, 1800)
    }
    rec.onerror = () => {
      setStatus('denied')
      setListening(false)
    }
    recRef.current = rec
    setStatus('listening')
    setListening(true)
    rec.start()
  }, [listening, items, navigate, stop])

  // Keyboard shortcut: Cmd/Ctrl + Shift + V
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault()
        start()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [start])

  if (!supported) return null

  const statusLabel: Record<typeof status, string> = {
    idle: '',
    listening: 'Listening — try "go to projects"',
    matched: 'Got it →',
    'no-match': "Didn't catch a route",
    denied: 'Mic permission needed',
  }

  return (
    <>
      <button
        type="button"
        onClick={start}
        aria-label={listening ? 'Stop voice navigation' : 'Start voice navigation'}
        aria-pressed={listening}
        title="Voice navigation (⌘⇧V)"
        className={`press inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
          listening
            ? 'border-accent text-accent bg-accent/10 animate-pulse'
            : 'border-border text-muted hover:text-primary hover:border-primary'
        }`}
      >
        {listening ? <MicOff size={14} /> : <Mic size={14} />}
      </button>

      {(listening || heard || status === 'no-match' || status === 'denied') && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] pointer-events-none"
        >
          <div
            className="voice-toast pointer-events-auto bg-surface border border-border-strong shadow-[0_25px_60px_-12px_rgba(0,0,0,0.55)] px-4 py-3 max-w-md min-w-[280px]"
            style={{ borderRadius: 0 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${
                  listening
                    ? 'bg-accent dot-pulse'
                    : status === 'matched'
                      ? 'bg-success'
                      : 'bg-subtle'
                }`}
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                Voice nav
              </span>
              <span className="ml-auto font-mono text-[10px] text-subtle">⌘⇧V</span>
            </div>
            {heard ? (
              <p className="text-sm text-text font-mono leading-snug">&ldquo;{heard}&rdquo;</p>
            ) : (
              <p className="text-sm text-muted font-mono leading-snug">{statusLabel[status]}</p>
            )}
            {!heard && statusLabel[status] && (
              <p className="text-[11px] text-subtle mt-1">
                Try &ldquo;go to research&rdquo; or &ldquo;show writing&rdquo;
              </p>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .voice-toast {
          opacity: 0;
          transform: translateY(8px) scale(0.97);
          animation: voice-toast-in 220ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        @keyframes voice-toast-in {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .voice-toast {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}

export default VoiceNav
