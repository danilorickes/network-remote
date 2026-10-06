import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import NetworkLogo from '@/components/NetworkLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, User, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== passwordConfirm) {
      setError('As senhas digitadas não coincidem.')
      return
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    setIsLoading(true)

    try {
      await pb.collection('users').create({
        name,
        email,
        password,
        passwordConfirm,
      })

      // Envia verificação de e-mail conforme especificação de autenticação
      try {
        await pb.collection('users').requestVerification(email)
      } catch (_) {
        // Ignora erro se envio local não configurado
      }

      setSuccess(true)
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Não foi possível cadastrar o usuário. Tente outro e-mail.'
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
            Cadastro de Técnico • Network Infra
          </p>
        </div>

        <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Criar Conta de Técnico
            </CardTitle>
            <CardDescription className="text-[#9BA3B0]">
              Cadastre seu perfil corporativo para registrar sessões de assistência remota.
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
                <h3 className="text-lg font-semibold text-white">Conta criada com sucesso!</h3>
                <p className="text-xs text-[#9BA3B0] leading-relaxed">
                  Foi enviado um e-mail de confirmação para <strong>{email}</strong>. Você já pode
                  fazer login na Área do Técnico.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-10"
                >
                  Ir para Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs text-[#9BA3B0]">
                    Nome completo do técnico
                  </Label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#9BA3B0] absolute left-3 top-3 pointer-events-none" />
                    <Input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo"
                      className="pl-9 bg-[#0B0D10] border-[#232830] text-white focus-visible:ring-[#FFB800]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-[#9BA3B0]">
                    E-mail profissional
                  </Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#9BA3B0] absolute left-3 top-3 pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="carlos@networksolucoes.com.br"
                      className="pl-9 bg-[#0B0D10] border-[#232830] text-white focus-visible:ring-[#FFB800]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs text-[#9BA3B0]">
                    Senha de acesso (mínimo 8 caracteres)
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
                    Confirmar senha
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
                  disabled={isLoading}
                  className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-11"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registrando técnico...
                    </>
                  ) : (
                    'Criar Cadastro Técnico'
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
                Já possui conta? Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
