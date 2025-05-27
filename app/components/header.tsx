"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Search, User, LogOut, Settings, Menu, X, Crown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold yavu-gradient bg-clip-text text-transparent">
              YAVU
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-yellow-500 transition-colors">
              Startseite
            </Link>
            <Link href="/studios" className="text-foreground hover:text-yellow-500 transition-colors">
              Studios finden
            </Link>
            <Link href="/iri-system" className="text-foreground hover:text-yellow-500 transition-colors">
              IRI System
            </Link>
            {session?.user.role === 'ADMIN' && (
              <Link href="/admin" className="text-foreground hover:text-yellow-500 transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {session ? (
              <div className="flex items-center space-x-2">
                {session.user.role === 'COSMETICIAN' && (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/dashboard">
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                )}
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  size="sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            ) : (
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Anmelden
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-yellow-500 transition-colors">
                Startseite
              </Link>
              <Link href="/studios" className="text-foreground hover:text-yellow-500 transition-colors">
                Studios finden
              </Link>
              <Link href="/iri-system" className="text-foreground hover:text-yellow-500 transition-colors">
                IRI System
              </Link>
              {session?.user.role === 'ADMIN' && (
                <Link href="/admin" className="text-foreground hover:text-yellow-500 transition-colors">
                  Admin
                </Link>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <ThemeToggle />
                {session ? (
                  <div className="flex flex-col space-y-2">
                    {session.user.role === 'COSMETICIAN' && (
                      <Button asChild variant="outline" size="sm">
                        <Link href="/dashboard">
                          <Settings className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </Button>
                    )}
                    <Button
                      onClick={() => signOut()}
                      variant="outline"
                      size="sm"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Abmelden
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Link href="/login">
                      <User className="h-4 w-4 mr-2" />
                      Anmelden
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}