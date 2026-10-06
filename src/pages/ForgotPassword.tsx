import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import NetworkLogo from '@/components/NetworkLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, AlertCircle, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await pb.collection('users').requestPasswordReset(email)
      setSent(true)
    } catch (err: unknown) {
      // Por segurança, ou informamos envio ou tratamos erro amigável
      const msg = err instanceof Error ? err.message : 'Não foi possível processar a solicitação.'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <NetworkLogo size="lg" className="mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#9BA3B0] font-semibold">
            Recuperação de Acesso • Network Infra
          </p>
        </div>

        <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#FFB800]" />
              Redefinir Senha
            </CardTitle>
            <CardDescription className="text-[#9BA3B0]">
              Informe o e-mail cadastrado para receber instruções de recuperação de senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 bg-red-950/40 border-red-800/60 text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            {sent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-[#22C55E] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">E-mail de recuperação enviado!</h3>
                <p className="text-xs text-[#9BA3B0] leading-relaxed">
                  Se o endereço <strong>{email}</strong> estiver cadastrado em nossa base, você
                  receberá um link com instruções para criar uma nova senha.
                </p>
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
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-[#9BA3B0]">
                    E-mail do técnico
                  </Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#9BA3B0] absolute left-3 top-3 pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tecnico@networksolucoes.com.br"
                      className="pl-9 bg-[#0B0D10] border-[#232830] text-white focus-visible:ring-[#FFB800]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-11"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando instruções...
                    </>
                  ) : (
                    'Enviar Link de Redefinição'
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-[#232830] text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-xs text-[#9BA3B0] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Lembrou da senha? Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
