export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function geocodeAddress(address, city, postalCode) {
  try {
    const query = encodeURIComponent(address + ', ' + postalCode + ' ' + city + ', Germany')
    const response = await fetch(
      'https://nominatim.openstreetmap.org/search?q=' + query + '&format=json&limit=1',
      { headers: { 'User-Agent': 'YAVU-Studiofinder/1.0 (info@yavu.de)' } }
    )
    const data = await response.json()
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
    }
    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studios = await prisma.studio.findMany({
      where: { OR: [{ latitude: null }, { longitude: null }] }
    })

    const results = []
    for (const studio of studios) {
      const coords = await geocodeAddress(studio.address, studio.city, studio.postalCode)
      if (coords) {
        await prisma.studio.update({
          where: { id: studio.id },
          data: { latitude: coords.lat, longitude: coords.lon }
        })
        results.push({ id: studio.id, name: studio.name, status: 'geocoded', ...coords })
      } else {
        results.push({ id: studio.id, name: studio.name, status: 'not_found' })
      }
      await new Promise(resolve => setTimeout(resolve, 1100))
    }

    return NextResponse.json({
      message: results.filter(r => r.status === 'geocoded').length + ' von ' + studios.length + ' Studios geocodiert',
      results
    })
  } catch (error) {
    console.error('Geocoding error:', error)
    return NextResponse.json({ error: 'Fehler beim Geocoding' }, { status: 500 })
  }
}
