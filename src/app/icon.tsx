import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="400" height="400" viewBox="0 0 100 100" style={{ marginTop: '20px' }}>
          <path d="M10 8 L52 8 L52 18 L20 18 L20 78 L10 78 Z" fill="#960647"/>
          
          <path d="M20 18 L47 18 L47 28 L30 28 L30 68 L20 68 Z" fill="#639100"/>
          
          <path d="M90 8 L90 78 L48 78 L48 68 L80 68 L80 8 Z" fill="#D97503"/>
          
          <path d="M80 18 L80 68 L53 68 L53 58 L70 58 L70 18 Z" fill="#0263A8"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}