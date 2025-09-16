import { ImageResponse } from 'next/og'

// Required for static export
export const dynamic = 'force-static'

// Image metadata - Apple Touch Icon standard size
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
        }}
      >
        <svg width="140" height="140" viewBox="0 0 100 100">
          {/* L izquierda - Vinotinto (magenta) externa */}
          <path d="M10 8 L52 8 L52 18 L20 18 L20 78 L10 78 Z" fill="#960647"/>
          
          {/* L izquierda - Verde interna */}
          <path d="M20 18 L47 18 L47 28 L30 28 L30 68 L20 68 Z" fill="#639100"/>
          
          {/* L derecha - Naranja externa (casi tocando) */}
          <path d="M90 8 L90 78 L48 78 L48 68 L80 68 L80 8 Z" fill="#D97503"/>
          
          {/* L derecha - Azul interna (casi tocando) */}
          <path d="M80 18 L80 68 L53 68 L53 58 L70 58 L70 18 Z" fill="#0263A8"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}