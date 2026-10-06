import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import NetworkLogo from '@/components/NetworkLogo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorMessage('Nenhum código de validação fornecido no link.')
      return
    }

    let isMounted = true

    pb.collection('users')
      .confirmVerification(token)
      .then(() => {
        if (isMounted) setStatus('success')
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setStatus('error')
          setErrorMessage(
            err instanceof Error ? err.message : 'O link de verificação expirou ou é inválido.',
          )
        }
      })

    return () => {
      isMounted = false
    }
  }, [token])

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <NetworkLogo size="lg" className="mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#9BA3B0] font-semibold">
            Confirmação de Conta • Network Infra
          </p>
        </div>

        <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-white">Verificação de E-mail</CardTitle>
            <CardDescription className="text-[#9BA3B0]">
              Validação de segurança para conta técnica autorizada
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-4">
            {status === 'verifying' && (
              <div className="space-y-4 py-6">
                <Loader2 className="w-10 h-10 animate-spin text-[#FFB800] mx-auto" />
                <p className="text-sm text-[#9BA3B0]">
                  Validando o seu e-mail junto ao servidor...
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4 py-4">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-[#22C55E] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">E-mail verificado com sucesso!</h3>
                <p className="text-xs text-[#9BA3B0]">
                  Sua conta de técnico está confirmada e pronta para emissão de atendimentos
                  remotos.
                </p>
                <div className="pt-2">
                  <Link to="/login">
                    <Button className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-10">
                      Entrar na Área do Técnico
                      <ArrowRight className="w-4 h-4 ml-1.5" />
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
                <h3 className="text-lg font-semibold text-white">Falha na verificação</h3>
                <p className="text-xs text-red-300">{errorMessage}</p>
                <div className="pt-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-[#232830] text-white hover:bg-[#232830]"
                    >
                      Ir para Login
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
