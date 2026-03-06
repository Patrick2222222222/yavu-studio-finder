"use client"

import { useEffect, useRef, useState } from 'react'

interface Studio {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  phone?: string
  email?: string
  latitude?: number
  longitude?: number
}

interface StudioMapProps {
  studios: Studio[]
  onStudioSelect?: (studio: Studio) => void
}

export function StudioMap({ studios, onStudioSelect }: StudioMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.crossOrigin = ''
        document.head.appendChild(link)
      }

      if (!(window as any).L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.crossOrigin = ''
          script.onload = () => resolve()
          document.head.appendChild(script)
        })
      }
      setMapReady(true)
    }

    loadLeaflet()
  }, [])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const L = (window as any).L
    if (!L) return

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([51.1657, 10.4515], 6)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current)
    }

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    const goldIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="width:32px;height:32px;background:linear-gradient(135deg,#f59e0b,#d97706);border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><svg width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'white\'><path d=\'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\'/></svg></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })

    const studiosWithCoords = studios.filter(s => s.latitude && s.longitude)

    studiosWithCoords.forEach(studio => {
      const popup = '<div style="min-width:200px;font-family:system-ui,sans-serif;">' +
        '<h3 style="font-size:16px;font-weight:700;margin:0 0 8px 0;color:#1a1a1a;">' + studio.name + '</h3>' +
        '<p style="font-size:13px;color:#666;margin:0 0 4px 0;">' +
        String.fromCodePoint(0x1F4CD) + ' ' + studio.address + '<br/>' +
        studio.postalCode + ' ' + studio.city + '</p>' +
        (studio.phone ? '<p style="font-size:13px;color:#666;margin:4px 0;">' + String.fromCodePoint(0x1F4DE) + ' ' + studio.phone + '</p>' : '') +
        (studio.email ? '<p style="font-size:13px;color:#666;margin:4px 0;">' + String.fromCodePoint(0x2709) + ' ' + studio.email + '</p>' : '') +
        '</div>'

      const marker = L.marker([studio.latitude!, studio.longitude!], { icon: goldIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(popup)

      marker.on('click', () => {
        if (onStudioSelect) onStudioSelect(studio)
      })

      markersRef.current.push(marker)
    })

    if (studiosWithCoords.length > 0) {
      const bounds = L.latLngBounds(studiosWithCoords.map(s => [s.latitude!, s.longitude!]))
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }, [mapReady, studios, onStudioSelect])

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-yellow-200 shadow-lg">
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} className="z-0" />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-50">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500" />
            <p className="text-sm text-muted-foreground">Karte wird geladen...</p>
          </div>
        </div>
      )}
    </div>
  )
}
