'use client'

import dynamic from 'next/dynamic'

// ClerkAuthGate is loaded client-only (ssr:false) so useAuth never runs on the server.
// This prevents prerender failures when Clerk keys are absent at build time.
const ClerkAuthGate = dynamic(() => import('./ClerkAuthGate'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center text-muted font-mono text-sm">
      loading...
    </div>
  ),
})

export default function AdminWeeklyPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

  if (!hasClerk) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="border border-border bg-surface p-8 max-w-md text-center space-y-3">
          <p className="font-mono text-sm text-muted">clerk not configured</p>
          <p className="text-text text-sm">
            Add your Clerk keys to <code className="font-mono text-primary">.env.local</code> to use
            the editor.
          </p>
          <p className="text-muted text-xs">See .env.local.example for required vars.</p>
        </div>
      </div>
    )
  }

  // ClerkAuthGate loaded with ssr:false — useAuth only runs in the browser
  return <ClerkAuthGate />
}
