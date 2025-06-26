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
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7" />
          </svg>
        </div>
      </div>
    </div>
  )
}