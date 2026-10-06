import React, { useState } from 'react'
import NetworkLogo from '@/components/NetworkLogo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Eye,
  EyeOff,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Server,
  UserCheck,
  XCircle,
  CheckCircle2,
  Lock,
  Minus,
  Square,
  X,
  Radio,
} from 'lucide-react'

type PreviewMode = 'pronto' | 'solicitacao' | 'ativo'

export const ClientAppMockup: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mode, setMode] = useState<PreviewMode>('pronto')
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('8k4-v9z2')
  const [copiedId, setCopiedId] = useState(false)
  const [copiedPass, setCopiedPass] = useState(false)
  const [generating, setGenerating] = useState(false)

  const computerId = '489 120 735'

  const handleGeneratePassword = () => {
    setGenerating(true)
    setTimeout(() => {
      const chars = 'abcdefghjkmnpqrstuvwxyz23456789'
      let part1 = ''
      let part2 = ''
      for (let i = 0; i < 3; i++) part1 += chars.charAt(Math.floor(Math.random() * chars.length))
      for (let i = 0; i < 4; i++) part2 += chars.charAt(Math.floor(Math.random() * chars.length))
      setPassword(`${part1}-${part2}`)
      setGenerating(false)
    }, 250)
  }

  const handleCopy = (text: string, type: 'id' | 'pass') => {
    navigator.clipboard?.writeText(text)
    if (type === 'id') {
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 2000)
    } else {
      setCopiedPass(true)
      setTimeout(() => setCopiedPass(false), 2000)
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Controles de visualização da prévia estática */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5">
          <Badge
            variant="outline"
            className="border-[#FFB800]/40 text-[#FFB800] bg-[#FFB800]/10 text-[10px] font-semibold py-0.5"
          >
            Prévia de Alta Fidelidade (Mockup)
          </Badge>
          <span className="text-[11px] text-[#9BA3B0] hidden sm:inline">
            Demonstração visual do aplicativo desktop
          </span>
        </div>

        {/* Seletor de estados para validar todos os critérios visuais */}
        <div className="inline-flex items-center rounded-lg bg-[#14171C] p-1 border border-[#232830]">
          <button
            type="button"
            onClick={() => setMode('pronto')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
              mode === 'pronto'
                ? 'bg-[#FFB800] text-black font-semibold shadow-sm'
                : 'text-[#9BA3B0] hover:text-white'
            }`}
          >
            Pronto
          </button>
          <button
            type="button"
            onClick={() => setMode('solicitacao')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
              mode === 'solicitacao'
                ? 'bg-[#FFB800] text-black font-semibold shadow-sm'
                : 'text-[#9BA3B0] hover:text-white'
            }`}
          >
            Solicitação
          </button>
          <button
            type="button"
            onClick={() => setMode('ativo')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
              mode === 'ativo'
                ? 'bg-[#FFB800] text-black font-semibold shadow-sm'
                : 'text-[#9BA3B0] hover:text-white'
            }`}
          >
            Sessão Ativa
          </button>
        </div>
      </div>

      {/* Janela do Aplicativo Desktop */}
      <div className="relative rounded-2xl bg-[#0F1216] border border-[#232830] shadow-2xl overflow-hidden transition-all duration-300">
        {/* Barra de Título Windows do Aplicativo */}
        <div className="bg-[#14171C] border-b border-[#232830] px-4 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <NetworkLogo size="sm" subtitle="REMOTE" />
            <span className="text-xs text-[#9BA3B0] font-mono pl-2 border-l border-[#232830]">
              v1.0.0 (Cliente)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Status do Servidor Network */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[11px] text-[#22C55E]">
              <Server className="w-3 h-3" />
              <span>Servidor Network conectado</span>
            </div>

            {/* Controles de Janela do Windows */}
            <div className="flex items-center gap-1.5 text-[#9BA3B0] pl-2 border-l border-[#232830]">
              <div className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#232830] transition-colors cursor-default">
                <Minus className="w-3 h-3" />
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#232830] transition-colors cursor-default">
                <Square className="w-2.5 h-2.5" />
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500 hover:text-white transition-colors cursor-default">
                <X className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Corpo do Aplicativo */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Status Principal com Indicador Verde */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#232830]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#22C55E]"></span>
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Pronto para receber suporte
                </h3>
                <p className="text-xs text-[#9BA3B0]">
                  Aguardando solicitação de um técnico autorizado da Network
                </p>
              </div>
            </div>

            <div className="sm:hidden flex items-center gap-1 text-[11px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">
              <Server className="w-3 h-3" />
              <span>Servidor conectado</span>
            </div>
          </div>

          {/* Grid Principal: ID do Computador & Senha Temporária */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bloco ID do Computador */}
            <div className="p-4 rounded-xl bg-[#14171C] border border-[#232830] space-y-2 hover:border-[#FFB800]/30 transition-colors">
              <div className="flex items-center justify-between text-xs text-[#9BA3B0]">
                <span className="font-medium uppercase tracking-wider text-[11px]">
                  ID do Computador
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(computerId, 'id')}
                  className="flex items-center gap-1 text-[#FFB800] hover:text-[#FFC533] text-[11px] transition-colors"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3 h-3" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copiar ID
                    </>
                  )}
                </button>
              </div>

              {/* ID em destaque com fonte mono grande */}
              <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-wider py-1 select-all">
                {computerId}
              </div>

              <p className="text-[11px] text-[#9BA3B0] leading-snug">
                Informe este número ao técnico quando solicitado por telefone ou WhatsApp.
              </p>
            </div>

            {/* Bloco Senha Temporária */}
            <div className="p-4 rounded-xl bg-[#14171C] border border-[#232830] space-y-2 hover:border-[#FFB800]/30 transition-colors">
              <div className="flex items-center justify-between text-xs text-[#9BA3B0]">
                <span className="font-medium uppercase tracking-wider text-[11px]">
                  Senha Temporária
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center gap-1 text-[#9BA3B0] hover:text-white text-[11px] transition-colors"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3 h-3" /> Ocultar
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" /> Mostrar
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    disabled={generating}
                    className="flex items-center gap-1 text-[#FFB800] hover:text-[#FFC533] text-[11px] transition-colors"
                    title="Gerar uma nova senha descartável"
                  >
                    <RefreshCw className={`w-3 h-3 ${generating ? 'animate-spin' : ''}`} />
                    Nova senha
                  </button>
                </div>
              </div>

              {/* Senha Mascarada / Aberta */}
              <div className="flex items-center justify-between py-1">
                <div className="text-2xl sm:text-3xl font-mono font-black text-[#FFB800] tracking-widest select-all">
                  {showPassword ? password : '••••••••'}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(password, 'pass')}
                  className="p-1.5 rounded bg-[#232830] text-[#9BA3B0] hover:text-white transition-colors"
                  title="Copiar senha"
                >
                  {copiedPass ? (
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#9BA3B0] leading-snug">
                Esta senha é descartável e muda automaticamente a cada novo atendimento.
              </p>
            </div>
          </div>

          {/* ESTADO VARIANTE 1: Solicitação de Acesso Recebida */}
          {mode === 'solicitacao' && (
            <div className="rounded-xl p-4 sm:p-5 bg-[#FFB800]/10 border-2 border-[#FFB800] animate-fade-in space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFB800] text-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-extrabold text-[#FFB800] tracking-wider">
                      Solicitação de Acesso Remoto
                    </span>
                    <span className="text-[10px] text-[#9BA3B0] font-mono">Agora</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Técnico Danilo Rickes (Network Soluções) está solicitando acesso
                  </h4>
                  <p className="text-xs text-[#F2F4F8]/80 leading-relaxed">
                    Identificação de segurança: <strong className="text-white">OS-2025-0902</strong>{' '}
                    • Suporte Técnico Autorizado. Deseja permitir que o técnico visualize e opere
                    seu computador?
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-[#FFB800]/20">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setMode('pronto')}
                  className="w-full sm:w-auto border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500 text-xs font-semibold h-9"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1.5" />
                  Recusar Conexão
                </Button>
                <Button
                  size="sm"
                  onClick={() => setMode('ativo')}
                  className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#16a34a] text-black text-xs font-bold h-9 px-5 shadow-lg shadow-[#22C55E]/20"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  Autorizar Acesso
                </Button>
              </div>
            </div>
          )}

          {/* ESTADO VARIANTE 2: Sessão Ativa com Botão "Encerrar Acesso" Sempre Visível */}
          {mode === 'ativo' && (
            <div className="rounded-xl p-4 sm:p-5 bg-[#22C55E]/10 border border-[#22C55E]/40 animate-fade-in space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#22C55E] text-black flex items-center justify-center font-bold">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-extrabold text-[#22C55E] tracking-wider">
                        Sessão de Atendimento em Andamento
                      </span>
                      <span className="text-[10px] text-[#9BA3B0] font-mono">
                        Duração: 00:04:18
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      Conectado com: Técnico Danilo Rickes (Network Soluções)
                    </p>
                  </div>
                </div>

                {/* Botão Encerrar Acesso SEMPRE visível */}
                <Button
                  size="sm"
                  onClick={() => setMode('pronto')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-9 px-4 shadow-md shadow-red-600/30 whitespace-nowrap"
                >
                  <X className="w-4 h-4 mr-1.5" />
                  Encerrar Acesso Imediatamente
                </Button>
              </div>

              <div className="p-3 rounded-lg bg-[#0F1216] border border-[#232830] text-xs text-[#9BA3B0] flex items-center justify-between">
                <span>
                  Controle compartilhado ativo. Você pode fechar a conexão a qualquer segundo.
                </span>
                <span className="text-[11px] text-[#22C55E] font-medium hidden sm:inline">
                  Criptografia AES-256 ativa
                </span>
              </div>
            </div>
          )}

          {/* Aviso de Segurança em Destaque */}
          <div className="rounded-xl p-3.5 bg-[#14171C] border border-[#FFB800]/30 flex items-center gap-3 text-xs text-[#9BA3B0]">
            <ShieldCheck className="w-5 h-5 text-[#FFB800] flex-shrink-0" />
            <div className="leading-snug">
              <strong className="text-white">Aviso de Segurança: </strong>
              Informe o ID e a Senha <span className="text-[#FFB800] font-medium">
                somente
              </span> ao
              técnico autorizado da <strong>Network Soluções</strong>. Nossa equipe nunca solicitará
              acesso fora dos canais homologados.
            </div>
          </div>
        </div>

        {/* Rodapé Interno da Janela */}
        <div className="bg-[#14171C]/60 border-t border-[#232830] px-6 py-2.5 flex items-center justify-between text-[11px] text-[#9BA3B0]">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#22C55E]" />
            Conexão Protegida Ponto a Ponto (TLS / ChaCha20)
          </span>
          <span className="font-mono text-[10px]">Network Remote Desktop Agent</span>
        </div>
      </div>
    </div>
  )
}

export default ClientAppMockup
