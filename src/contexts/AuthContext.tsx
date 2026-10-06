import React, { createContext, useContext, useEffect, useState } from 'react'
import type { RecordModel } from 'pocketbase'
import pb from '@/lib/pocketbase/client'

export interface UserProfile extends RecordModel {
  email: string
  name?: string
  avatar?: string
  verified?: boolean
}

interface AuthContextType {
  user: UserProfile | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, pass: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(
    (pb.authStore.record as unknown as UserProfile) || null,
  )
  const [token, setToken] = useState<string | null>(pb.authStore.token || null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Sincroniza estado com pb.authStore
    setUser((pb.authStore.record as unknown as UserProfile) || null)
    setToken(pb.authStore.token || null)
    setIsLoading(false)

    const unsubscribe = pb.authStore.onChange((newToken, model) => {
      setToken(newToken)
      setUser((model as unknown as UserProfile) || null)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const login = async (email: string, pass: string) => {
    const authData = await pb.collection('users').authWithPassword(email, pass)
    setUser(authData.record as unknown as UserProfile)
    setToken(authData.token)
  }

  const logout = () => {
    pb.authStore.clear()
    setUser(null)
    setToken(null)
  }

  const refreshUser = async () => {
    if (pb.authStore.isValid) {
      try {
        const refreshed = await pb.collection('users').authRefresh()
        setUser(refreshed.record as unknown as UserProfile)
        setToken(refreshed.token)
      } catch (_) {
        pb.authStore.clear()
        setUser(null)
        setToken(null)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider')
  }
  return context
}
