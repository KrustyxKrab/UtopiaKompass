interface CompassProps {
  rotation: number
}

export default function Compass({ rotation }: CompassProps) {
  return (
    <div className="relative mb-8">
      <div className="compass-container w-64 h-64 md:w-80 md:h-80 relative">
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full border-2 border-utopia-yellow pulse-ring" />

        {/* Compass Face */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-inner">
          {/* Direction Markers */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <text x="100" y="20" textAnchor="middle" fill="#1E3A52" className="text-sm font-bold">N</text>
            <text x="180" y="105" textAnchor="middle" fill="#1E3A52" className="text-sm font-bold">O</text>
            <text x="100" y="190" textAnchor="middle" fill="#1E3A52" className="text-sm font-bold">S</text>
            <text x="20" y="105" textAnchor="middle" fill="#1E3A52" className="text-sm font-bold">W</text>

            {/* Degree Marks */}
            <g stroke="#E8DE74" strokeWidth="2" opacity="0.5">
              <line x1="100" y1="10" x2="100" y2="20" />
              <line x1="100" y1="180" x2="100" y2="190" />
              <line x1="10" y1="100" x2="20" y2="100" />
              <line x1="180" y1="100" x2="190" y2="100" />
            </g>
          </svg>

          {/* Compass Needle */}
          <div 
            className="absolute inset-0 flex items-center justify-center compass-needle"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <g transform="translate(100,100)">
                {/* Main needle - minimalist */}
                <path d="M 0,-55 L 0,40" stroke="#1E3A52" strokeWidth="4" strokeLinecap="round" />

                {/* Arrow tip - triangle */}
                <path d="M -12,-40 L 0,-55 L 12,-40" fill="none" stroke="#1E3A52" strokeWidth="4"
                  strokeLinejoin="round" strokeLinecap="round" />

                {/* Utopia accent - yellow dot */}
                <circle cy="-25" r="3" fill="#E8DE74" />

                {/* Center point */}
                <circle r="6" fill="#E8DE74" stroke="#1E3A52" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}