"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Crown, 
  Sparkles, 
  Shield, 
  Award, 
  Search, 
  MapPin, 
  Phone,
  Clock,
  Star,
  Zap,
  Heart,
  Users
} from 'lucide-react'

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="aspect-video w-full h-full bg-gradient-to-br from-black via-gray-900 to-yellow-900">
            <Image
              src="/Kopie von f5a8823b-b91d-4460-a8a3-bd18382537e3.jpeg"
              alt="YAVU Luxus Kosmetik"
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Crown className="h-16 w-16 text-yellow-500" />
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="yavu-gradient bg-clip-text text-transparent">YAVU</span>
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-light text-white/90 max-w-4xl mx-auto">
              Revolutionäre <span className="text-yellow-500 font-semibold">nadellose</span> Hyaluron-Behandlung
              mit dem innovativen <span className="text-yellow-500 font-semibold">IRI Filler System</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Entdecken Sie die Zukunft der Kosmetik mit unserem preisgekrönten, 
              wissenschaftlich bestätigten System für sichere und effektive Behandlungen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg">
                <Link href="/studios">
                  <Search className="mr-2 h-5 w-5" />
                  Studios finden
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg">
                <Link href="/iri-system">
                  <Sparkles className="mr-2 h-5 w-5" />
                  IRI System entdecken
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Warum <span className="text-yellow-500">YAVU</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Als Marktführer im Bereich der nadellosen Hyaluron-Applikation bieten wir 
              Ihnen höchste Qualität und Sicherheit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "German Innovation Award",
                description: "Ausgezeichnet für Innovation und Qualität"
              },
              {
                icon: Shield,
                title: "Wissenschaftlich bestätigt",
                description: "Deutsche Studien zur Sicherheit und Wirksamkeit"
              },
              {
                icon: Zap,
                title: "Nadellose Technologie",
                description: "Schmerzfreie Behandlung ohne Nadeln"
              },
              {
                icon: Heart,
                title: "CE-zertifiziert",
                description: "Höchste Sicherheitsstandards erfüllt"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <feature.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About IRI System Section */}
      <section ref={aboutRef} className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Das <span className="text-yellow-500">IRI Filler System</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Das IRI Filler System ist eine innovative, nadellose Methode zur Applikation 
                von Hyaluronsäure. Entwickelt 2018 von YAVU, arbeitet das System mit einem 
                kontrollierten Druck von ca. 3,5 Bar und verfügt über eine einzigartige 
                Sperrschutztechnologie.
              </p>
              <div className="space-y-4">
                {[
                  "Nadellose, schmerzarme Anwendung",
                  "Wissenschaftlich bestätigte Sicherheit",
                  "Präzise, einstellbare Dosierung",
                  "CE-zertifiziert und rechtlich sicher"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link href="/iri-system">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Mehr erfahren
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src="/Kopie von d201c5ea-9294-4a7d-b90b-086e9b48102f.jpeg"
                  alt="IRI Filler System"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ihre <span className="text-yellow-500">Vorteile</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Erleben Sie die Zukunft der Kosmetik mit unserem revolutionären System
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Für Kosmetikerinnen",
                description: "Erweitern Sie Ihr Angebot mit der neuesten Technologie",
                image: "/Kopie von e6be435a-2e63-436c-b77a-a700498a1d95.jpeg"
              },
              {
                icon: Heart,
                title: "Für Kunden",
                description: "Schmerzfreie, sichere Behandlungen mit sofortigen Ergebnissen",
                image: "/Kopie von fd918c8b-bbf3-4f06-a309-f042448b61c9.jpeg"
              },
              {
                icon: Crown,
                title: "Luxuriöse Erfahrung",
                description: "Premium-Behandlungen in eleganter Atmosphäre",
                image: "/Kopie von e928c75c-e4dc-48ba-a6bc-8123023441e3.jpeg"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <benefit.icon className="h-8 w-8 text-yellow-500" />
                      <CardTitle>{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 yavu-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Bereit für die Zukunft der Kosmetik?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Finden Sie qualifizierte Studios in Ihrer Nähe oder werden Sie Teil 
              des YAVU-Netzwerks als zertifizierte Kosmetikerin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                <Link href="/studios">
                  <MapPin className="mr-2 h-5 w-5" />
                  Studios in Ihrer Nähe
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                <Link href="/login">
                  <Crown className="mr-2 h-5 w-5" />
                  Als Kosmetikerin registrieren
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}