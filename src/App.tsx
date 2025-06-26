import { useEffect, useState, useCallback } from 'react'
import Compass from './components/Compass.tsx'
import InfoCards from './components/InfoCards.tsx'
import './index.css'

// Utopia Lüneburg coordinates
const UTOPIA_LAT = 53.2464
const UTOPIA_LON = 10.4115

function App() {
  const [distance, setDistance] = useState<string>('Warte auf GPS...')
  const [bearing, setBearing] = useState<string>('Kalibriere...')
  const [compassRotation, setCompassRotation] = useState<number>(0)
  const [status, setStatus] = useState<string>('Initialisiere...')

  useEffect(() => {
    // Check for iOS and request permission
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      requestIOSPermission()
    }

    initGeolocation()
    initOrientation()
  }, [])

  const requestIOSPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission()
        if (response !== 'granted') {
          setStatus('Kompass-Zugriff verweigert')
        }
      } catch (error) {
        console.error('iOS permission error:', error)
        setStatus('Fehler beim Zugriff auf Kompass')
      }
    }
  }

  const initGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        updatePosition,
        handleError,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    } else {
      setStatus('GPS nicht verfügbar')
    }
  }

  const initOrientation = () => {
    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation)
    } else {
      setStatus('Kompass nicht verfügbar')
    }
  }

  const updatePosition = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords
    
    // Calculate distance and bearing
    const dist = calculateDistance(latitude, longitude, UTOPIA_LAT, UTOPIA_LON)
    const bear = calculateBearing(latitude, longitude, UTOPIA_LAT, UTOPIA_LON)
    
    setDistance(formatDistance(dist))
    setBearing(`${Math.round(bear)}° ${getCompassDirection(bear)}`)
    setStatus('GPS aktiv')
  }, [])

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      const deviceHeading = 360 - event.alpha
      // You'll need to combine this with the bearing to Utopia
      setCompassRotation(deviceHeading)
    }
  }, [])

  const handleError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setStatus('GPS-Zugriff verweigert')
        break
      case error.POSITION_UNAVAILABLE:
        setStatus('Position nicht verfügbar')
        break
      case error.TIMEOUT:
        setStatus('GPS-Timeout')
        break
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1 px-6 py-8 flex flex-col items-center justify-center relative">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200 rounded-full opacity-30 blur-2xl" />

        {/* Title Section */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-utopia-dark mb-4">
            Finde deinen Weg zum Utopia
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="tag-style">Co-Working-Space</span>
            <span className="tag-style">Community</span>
          </div>
        </div>

        {/* Compass */}
        <Compass rotation={compassRotation} />

        {/* Info Cards */}
        <InfoCards distance={distance} bearing={bearing} />

        {/* Address */}
        <div className="mt-6 text-center">
          <p className="text-sm text-utopia-dark font-medium">
            📍 Katzenstraße 1A · 21335 Lüneburg
          </p>
        </div>

        {/* Status */}
        <div className="mt-4 px-4 py-2 bg-white/80 rounded-full text-xs text-gray-600 text-center">
          {status}
        </div>
      </main>
    </div>
  )
}

// Helper functions
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI)
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth radius in km
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = toRadians(lon2 - lon1)
  const y = Math.sin(dLon) * Math.cos(toRadians(lat2))
  const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon)
  const bearing = toDegrees(Math.atan2(y, x))
  return (bearing + 360) % 360
}

function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`
  }
  return `${km.toFixed(1)} km`
}

function getCompassDirection(degrees: number): string {
  const directions = ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export default App