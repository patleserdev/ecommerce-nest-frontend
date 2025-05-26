'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MdLightMode,MdDarkMode } from "react-icons/md";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // évite les erreurs d’hydratation

  return (
    <div className='flex items-center justify-center p-2' title="Changer le thème de couleurs">
      {theme == "dark" && <button className='cursor-pointer' onClick={() => setTheme('light')}><MdLightMode size={30}/></button>}
      {theme == "light" && <button className='cursor-pointer' onClick={() => setTheme('dark')}><MdDarkMode  size={30}/></button>}
      {/* <button onClick={() => setTheme('system')}>🖥 System</button> */}
    </div>
  )
}
