import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/contexts/AuthContext'
import NetworkLogo from '@/components/NetworkLogo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle2, AlertCircle, LogIn } from 'lucide-react'

export default function ConfirmEmailChange() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { logout } = useAuth()
  const [status, setStatus] = useState<'confirming' | 'success' | 'error'>('confirming')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorMessage('Nenhum código de alteração de e-mail fornecido.')
      return
    }

    let isMounted = true

    pb.collection('users')
      .confirmEmailChange(token, '')
      .then(() => {
        if (isMounted) {
          // Desconecta o usuário para novo login seguro com o novo e-mail
          logout()
          setStatus('success')
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setStatus('error')
          setErrorMessage(
            err instanceof Error ? err.message : 'O token de alteração é inválido ou já expirou.',
          )
        }
      })

    return () => {
      isMounted = false
    }
  }, [token, logout])

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <NetworkLogo size="lg" className="mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#9BA3B0] font-semibold">
            Alteração de E-mail • Network Infra
          </p>
        </div>

        <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-white">
              Confirmação de Novo E-mail
            </CardTitle>
            <CardDescription className="text-[#9BA3B0]">
              Segurança e integridade de credenciais técnicas
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-4">
            {status === 'confirming' && (
              <div className="space-y-4 py-6">
                <Loader2 className="w-10 h-10 animate-spin text-[#FFB800] mx-auto" />
                <p className="text-sm text-[#9BA3B0]">
                  Processando alteração do seu e-mail corporativo...
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4 py-4">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-[#22C55E] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">E-mail alterado com sucesso!</h3>
                <p className="text-xs text-[#9BA3B0]">
                  Por motivos de conformidade e segurança, você foi desconectado. Por favor, faça
                  login com seu novo endereço.
                </p>
                <div className="pt-2">
                  <Link to="/login">
                    <Button className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-10">
                      <LogIn className="w-4 h-4 mr-1.5" />
                      Fazer Login Novamente
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4 py-4">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Falha ao confirmar</h3>
                <p className="text-xs text-red-300">{errorMessage}</p>
                <div className="pt-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-[#232830] text-white hover:bg-[#232830]"
                    >
                      Voltar ao Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
