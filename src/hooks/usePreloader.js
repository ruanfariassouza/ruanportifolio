import { useContext } from 'react'
import { PreloaderContext } from '../context/PreloaderContext'

export default function usePreloader() {
  const context = useContext(PreloaderContext)
  if (!context) throw new Error('usePreloader deve ser usado dentro de PreloaderProvider')
  return context
}
