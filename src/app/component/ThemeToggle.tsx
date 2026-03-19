"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full 
      bg-white dark:bg-black 
      transition-all duration-300 
      hover:scale-110"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500 transition-transform rotate-0" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800 transition-transform" />
      )}
    </button>
  )
}