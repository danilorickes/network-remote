import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import NetworkLogo from '@/components/NetworkLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Lock, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!token) {
      setError('Token de recuperação inválido ou expirado.')
      return
    }

    if (password !== passwordConfirm) {
      setError('As senhas digitadas não coincidem.')
      return
    }

    if (password.length < 8) {
      setError('A nova senha deve ter no mínimo 8 caracteres.')
      return
    }

    setIsLoading(true)

    try {
      await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm)
      setSuccess(true)
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Não foi possível redefinir a senha. O link pode ter expirado.'
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
            Criar Nova Senha • Network Infra
          </p>
        </div>

        <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Nova Senha de Acesso
            </CardTitle>
            <CardDescription className="text-[#9BA3B0]">
              Defina sua nova credencial de segurança para o painel de atendimento técnico.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 bg-red-950/40 border-red-800/60 text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            {success ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-[#22C55E] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Senha alterada com sucesso!</h3>
                <p className="text-xs text-[#9BA3B0]">
                  Sua nova senha já está ativa. Você pode acessar sua conta técnica agora mesmo.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-10"
                >
                  Entrar com a nova senha
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {!token && (
                  <Alert className="mb-2 bg-yellow-950/40 border-yellow-800/60 text-yellow-300">
                    <AlertCircle className="w-4 h-4 text-[#FFB800]" />
                    <AlertDescription className="text-xs">
                      Nenhum token detectado na URL. Se você copiou o link manualmente,
                      certifique-se de incluir o parâmetro ?token=...
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs text-[#9BA3B0]">
                    Nova senha (mínimo 8 caracteres)
                  </Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#9BA3B0] absolute left-3 top-3 pointer-events-none" />
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 bg-[#0B0D10] border-[#232830] text-white focus-visible:ring-[#FFB800]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="passwordConfirm" className="text-xs text-[#9BA3B0]">
                    Confirmar nova senha
                  </Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#9BA3B0] absolute left-3 top-3 pointer-events-none" />
                    <Input
                      id="passwordConfirm"
                      type="password"
                      required
                      minLength={8}
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 bg-[#0B0D10] border-[#232830] text-white focus-visible:ring-[#FFB800]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !token}
                  className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-11"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Gravando nova senha...
                    </>
                  ) : (
                    'Salvar Nova Senha'
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
                Voltar para o Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
