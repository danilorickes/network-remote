import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import NetworkLogo from '@/components/NetworkLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('danilorickes@gmail.com')
  const [password, setPassword] = useState('Skip@Pass')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Redireciona para o destino pretendido ou /tecnico
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/tecnico'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Credenciais inválidas. Verifique seu e-mail e senha.'
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
            Área Restrita do Técnico • Network Infra
          </p>
        </div>

        <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#FFB800]" />
              Acesso Técnico
            </CardTitle>
            <CardDescription className="text-[#9BA3B0]">
              Entre com suas credenciais autorizadas para gerenciar e registrar atendimentos
              remotos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 bg-red-950/40 border-red-800/60 text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-[#9BA3B0]">
                  E-mail corporativo
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

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs text-[#9BA3B0]">
                    Senha
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#FFB800] hover:text-[#FFC533] transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#9BA3B0] absolute left-3 top-3 pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 bg-[#0B0D10] border-[#232830] text-white focus-visible:ring-[#FFB800]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-11 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  <>
                    Entrar na Área do Técnico
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#232830] text-center space-y-2">
              <div className="p-2.5 rounded-lg bg-[#0B0D10] border border-[#232830] text-[11px] text-[#9BA3B0] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                Usuário seed de demonstração disponível:
                <strong className="text-white">danilorickes@gmail.com</strong>
              </div>
              <p className="text-xs text-[#9BA3B0]">
                Novo membro na equipe de suporte?{' '}
                <Link to="/registro" className="text-[#FFB800] hover:underline font-medium">
                  Solicitar registro técnico
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
