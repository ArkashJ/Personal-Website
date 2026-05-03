'use client'

import { Show, UserButton } from '@clerk/nextjs'
import Editor from './Editor'

export default function ClerkAuthGate() {
  return (
    <>
      <Show when="signed-out">
        <div className="min-h-screen flex items-center justify-center">
          <div className="border border-border bg-surface p-8 max-w-md text-center space-y-4">
            <p className="font-mono text-sm text-muted uppercase tracking-widest">restricted</p>
            <p className="text-text">Sign in to access the markdown editor.</p>
            <a
              href="/sign-in"
              className="inline-block mt-2 px-4 py-2 bg-primary text-bg text-sm font-mono hover:opacity-80 transition-opacity"
            >
              sign in →
            </a>
          </div>
        </div>
      </Show>

      <Show when="signed-in">
        <div className="relative">
          <div className="absolute top-3 right-4 z-10">
            <UserButton />
          </div>
          <Editor />
        </div>
      </Show>
    </>
  )
}
