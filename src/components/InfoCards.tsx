interface InfoCardsProps {
  distance: string
  bearing: string
}

export default function InfoCards({ distance, bearing }: InfoCardsProps) {
  return (
    <div className="w-full max-w-md space-y-3 relative z-10">
      {/* Distance Card */}
      <div className="glass-card rounded-2xl p-4 flex items-center justify-between transform hover:scale-105 transition-transform">
        <div>
          <p className="text-xs text-gray-600 uppercase tracking-wider">Entfernung</p>
          <p className="text-2xl font-bold text-utopia-dark">{distance}</p>
        </div>
        <div className="w-12 h-12 bg-utopia-yellow rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-utopia-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        </div>
      </div>

      {/* Direction Card */}
      <div className="glass-card rounded-2xl p-4 flex items-center justify-between transform hover:scale-105 transition-transform">
        <div>
          <p className="text-xs text-gray-600 uppercase tracking-wider">Richtung</p>
          <p className="text-2xl font-bold text-utopia-dark">{bearing}</p>
        </div>
        <div className="w-12 h-12 bg-utopia-orange rounded-xl flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M9 3.028L2.243 1.338C1.611 1.181 1 1.658 1 2.309V22.192C1 22.676 1.346 23.090 1.822 23.176L9 24.472
                 M9 3.028L17 1.028
                 M9 3.028V24.472
                 M17 1.028L24.243 2.838C24.688 2.950 25 3.350 25 3.809V23.276C25 23.899 24.436 24.370 23.822 24.260L17 23.028
                 M17 1.028V23.028
                 M17 23.028L9 24.472"
              stroke="#1E3A52"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}