import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 90,
        background: 'linear-gradient(135deg, #0a1628 0%, #0e1b30 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#5eead4',
        fontWeight: 'bold',
        fontFamily: '"Geist Sans", sans-serif',
      }}
    >
      AJ
    </div>,
    { ...size }
  )
}
