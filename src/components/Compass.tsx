import { useState, useEffect } from 'react'
interface CompassProps {
  rotation: number
  deviceHeading: number
}

export default function Compass({ rotation, deviceHeading }: CompassProps) {
  // Smooth heading and rotation to avoid jitter
  const [smoothDeviceHeading, setSmoothDeviceHeading] = useState(deviceHeading)
  const [smoothRotation, setSmoothRotation] = useState(rotation)
  useEffect(() => {
    let rafId: number
    const smoothingFactor = 0.12
    function animate() {
      setSmoothDeviceHeading(prev => {
        const delta = ((deviceHeading - prev + 540) % 360) - 180
        return prev + delta * smoothingFactor
      })
      setSmoothRotation(prev => {
        const delta = ((rotation - prev + 540) % 360) - 180
        return prev + delta * smoothingFactor
      })
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [deviceHeading, rotation])
  return (
    <div className="relative mb-8">
      <div className="compass-container w-64 h-64 md:w-80 md:h-80 relative">
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full border-2 border-utopia-yellow pulse-ring" />

        {/* Compass Face - This rotates with device */}
        <div 
          className="absolute inset-4 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-inner"
          style={{ transform: `rotate(${-smoothDeviceHeading}deg)` }}
        >
          {/* Direction Markers */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            {/* Cardinal directions */}
            <text x="100" y="20" textAnchor="middle" fill="#1E3A52" className="text-sm font-bold">N</text>
            <text x="180" y="105" textAnchor="middle" fill="#1E3A52" className="text-sm font-bold">O</text>
            <text x="100" y="190" textAnchor="middle" fill="#1E3A52" className="text-sm font-bold">S</text>
            <text x="20" y="105" textAnchor="middle" fill="#1E3A52" className="text-sm font-bold">W</text>

            {/* Intermediate directions */}
            <text x="150" y="50" textAnchor="middle" fill="#1E3A52" className="text-xs opacity-60">NO</text>
            <text x="150" y="160" textAnchor="middle" fill="#1E3A52" className="text-xs opacity-60">SO</text>
            <text x="50" y="160" textAnchor="middle" fill="#1E3A52" className="text-xs opacity-60">SW</text>
            <text x="50" y="50" textAnchor="middle" fill="#1E3A52" className="text-xs opacity-60">NW</text>

            {/* Degree marks around the edge */}
            <g stroke="#1E3A52" strokeWidth="1" opacity="0.3">
              {/* Major marks every 30 degrees */}
              {[...Array(12)].map((_, i) => {
                const angle = i * 30
                const radian = (angle - 90) * Math.PI / 180
                const x1 = 100 + 85 * Math.cos(radian)
                const y1 = 100 + 85 * Math.sin(radian)
                const x2 = 100 + 95 * Math.cos(radian)
                const y2 = 100 + 95 * Math.sin(radian)
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2" />
                )
              })}
              
              {/* Minor marks every 10 degrees */}
              {[...Array(36)].map((_, i) => {
                if (i % 3 !== 0) { // Skip major marks
                  const angle = i * 10
                  const radian = (angle - 90) * Math.PI / 180
                  const x1 = 100 + 90 * Math.cos(radian)
                  const y1 = 100 + 90 * Math.sin(radian)
                  const x2 = 100 + 95 * Math.cos(radian)
                  const y2 = 100 + 95 * Math.sin(radian)
                  return (
                    <line key={`minor-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                  )
                }
                return null
              })}
            </g>

            {/* Degree numbers */}
            <g fill="#1E3A52" className="text-xs" opacity="0.5">
              <text x="100" y="40" textAnchor="middle">0°</text>
              <text x="160" y="105" textAnchor="middle">90°</text>
              <text x="100" y="170" textAnchor="middle">180°</text>
              <text x="45" y="105" textAnchor="middle">270°</text>
            </g>
          </svg>
        </div>

        {/* Compass Needle - Points to Utopia */}
        <div 
          className="absolute inset-4 flex items-center justify-center pointer-events-none"
          style={{ 
            transform: `rotate(${smoothRotation}deg)`
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
              {/* Shadow for depth */}
              <ellipse cx="0" cy="2" rx="8" ry="4" fill="black" opacity="0.2" />
              
              {/* Main needle body */}
              <g filter="url(#needleShadow)">
                {/* North half - pointing to Utopia */}
                <path d="M 0,-65 L -8,-10 L 0,0 Z" fill="#1E3A52" />
                <path d="M 0,-65 L 8,-10 L 0,0 Z" fill="#2B4C68" />
                
                {/* South half */}
                <path d="M 0,0 L -8,10 L 0,50 Z" fill="#8B9DC3" />
                <path d="M 0,0 L 8,10 L 0,50 Z" fill="#A5B3CC" />
              </g>

              {/* Utopia marker - yellow ring */}
              <circle cy="-40" r="8" fill="none" stroke="#E8DE74" strokeWidth="3" />
              <circle cy="-40" r="4" fill="#E8DE74" />

              {/* Center cap */}
              <circle r="10" fill="#1E3A52" />
              <circle r="8" fill="#E8DE74" />
              <circle r="5" fill="#1E3A52" />
            </g>

            {/* Filter for needle shadow */}
            <defs>
              <filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
              </filter>
            </defs>
          </svg>
          {/* Utopia label anchored to needle */}
          <div className="absolute -top-8 bg-utopia-yellow text-utopia-dark text-xs px-3 py-1 rounded-full font-bold shadow-lg">
            UTOPIA
          </div>
        </div>
      </div>
    </div>
  )
}