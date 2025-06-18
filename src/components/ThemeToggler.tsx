'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // éviter les erreurs d’hydratation

  // ajouter aussi en localstorage 
  return (
    <div
      className="flex items-center justify-center p-2"
      title="Changer le thème de couleurs"
      aria-label="Changer le thème de couleurs"
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.button
            key="light"
            onClick={() => setTheme('light')}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
          >
            <MdLightMode size={30} />
          </motion.button>
        ) : (
          <motion.button
            key="dark"
            onClick={() => setTheme('dark')}
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
          >
            <MdDarkMode size={30} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
