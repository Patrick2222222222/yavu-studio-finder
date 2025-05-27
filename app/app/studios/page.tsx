"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, MapPin, Phone, Clock, Mail, Globe, Star } from 'lucide-react'

interface Studio {
  id: string
  name: string
  description?: string
  address: string
  city: string
  postalCode: string
  phone?: string
  email?: string
  website?: string
  openingHours?: string | object
}

export default function StudiosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [studios, setStudios] = useState<Studio[]>([])
  const [loading, setLoading] = useState(false)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    fetchStudios()
  }, [])

  const fetchStudios = async (search = '') => {
    setLoading(true)
    try {
      const response = await fetch(`/api/studios?search=${encodeURIComponent(search)}`)
      const data = await response.json()
      setStudios(data)
    } catch (error) {
      console.error('Error fetching studios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchStudios(searchTerm)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <section ref={headerRef} className="pt-24 pb-12 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-yellow-600">Studios</span> finden
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Entdecken Sie qualifizierte Kosmetikerinnen in Ihrer Nähe, die mit dem 
              innovativen IRI Filler System arbeiten.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Stadt oder Postleitzahl eingeben..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8"
                  disabled={loading}
                >
                  <Search className="mr-2 h-5 w-5" />
                  {loading ? 'Suche...' : 'Suchen'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Studios List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {studios.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Keine Studios gefunden</h3>
              <p className="text-muted-foreground">
                Versuchen Sie eine andere Stadt oder Postleitzahl.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studios.map((studio: Studio, index: number) => (
                <motion.div
                  key={studio.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{studio.name}</CardTitle>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{studio.city}, {studio.postalCode}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">YAVU</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{studio.description}</CardDescription>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{studio.address}</span>
                        </div>
                        
                        {studio.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{studio.phone}</span>
                          </div>
                        )}
                        
                        {studio.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{studio.email}</span>
                          </div>
                        )}
                        
                        {studio.website && (
                          <div className="flex items-center text-sm">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{studio.website}</span>
                          </div>
                        )}
                        
                        {studio.openingHours && (
                          <div className="flex items-start text-sm">
                            <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Öffnungszeiten:</p>
                              <p className="text-muted-foreground">
                                {typeof studio.openingHours === 'string' 
                                  ? studio.openingHours 
                                  : 'Nach Vereinbarung'
                                }
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                          <Phone className="mr-2 h-4 w-4" />
                          Termin vereinbaren
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}