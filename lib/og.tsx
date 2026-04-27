import { ImageResponse } from 'next/og'
import type { ReactElement } from 'react'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

type OgInput = {
  title: string
  eyebrow?: string
  subtitle?: string
}

export async function renderOg({ title, eyebrow, subtitle }: OgInput): Promise<Response> {
  const node: ReactElement = (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#1E2340',
        backgroundImage:
          'radial-gradient(circle at 80% 20%, rgba(48,172,166,0.18) 0%, transparent 55%), radial-gradient(circle at 20% 90%, rgba(0,255,200,0.12) 0%, transparent 55%)',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {eyebrow && (
          <div
            style={{
              color: '#30ACA6',
              fontSize: 24,
              letterSpacing: 6,
              textTransform: 'uppercase',
              marginBottom: 24,
              fontFamily: 'monospace',
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            color: '#FFFFFF',
            fontSize: title.length > 50 ? 64 : 80,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              color: '#8892B0',
              fontSize: 28,
              marginTop: 28,
              maxWidth: 1040,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: 32,
          borderTop: '2px solid #2E3656',
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontSize: 28,
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
        >
          arkash.jain
        </div>
        <div
          style={{
            color: '#00FFC8',
            fontSize: 22,
            fontFamily: 'monospace',
          }}
        >
          arkashj.com
        </div>
      </div>
    </div>
  )

  return new ImageResponse(node, ogSize)
}
