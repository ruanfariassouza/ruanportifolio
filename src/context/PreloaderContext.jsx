import { createContext, useMemo, useState } from 'react'

export const PreloaderContext = createContext(null)

export function PreloaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const value = useMemo(() => ({ isLoading, setIsLoading }), [isLoading])
  return <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>
}
