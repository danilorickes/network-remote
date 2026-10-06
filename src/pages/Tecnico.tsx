import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  remoteSessionsService,
  RemoteSupportSessionRecord,
  CreateSessionInput,
} from '@/services/remoteSessions'
import { NETWORK_REMOTE_CONFIG } from '@/config/networkRemote'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'
import NetworkLogo from '@/components/NetworkLogo'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Headphones,
  Play,
  CheckCircle2,
  Save,
  Search,
  ExternalLink,
  Copy,
  Check,
  Clock,
  User,
  FileText,
  FolderSync,
  Lock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Shield,
  Loader2,
  Calendar,
  History,
  FileCode,
} from 'lucide-react'

// Clientes cadastrados para sugestão/busca rápida
const REGISTERED_CLIENTS = [
  { name: 'Contabilidade Alpha Ltda', email: 'contato@contabilidadealpha.com.br' },
  { name: 'Logística Express do Brasil', email: 'ti@logisticaexpress.com.br' },
  { name: 'Hospital Santa Helena TI', email: 'suporte@santahelena.med.br' },
  { name: 'Distribuidora Vale do Sol', email: 'financeiro@valedosol.com.br' },
  { name: 'Construtora Horizonte', email: 'obras@horizonteengenharia.com.br' },
]

export default function Tecnico() {
  const { user } = useAuth()
  const { toast } = useToast()

  // Lista de sessões e estado de carregamento
  const [sessions, setSessions] = useState<RemoteSupportSessionRecord[]>([])
  const [loadingSessions, setLoadingSessions] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'todos' | 'em_andamento' | 'concluido'>('todos')
  const [searchQuery, setSearchQuery] = useState('')

  // Sessão ativa em edição / atendimento atual
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

  // Campos do formulário
  const [remoteId, setRemoteId] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [isAdHoc, setIsAdHoc] = useState(false)
  const [osNumber, setOsNumber] = useState('')
  const [technicianName, setTechnicianName] = useState(
    user?.name || user?.email || 'Técnico Autorizado',
  )
  const [startedAt, setStartedAt] = useState<string>('')
  const [endedAt, setEndedAt] = useState<string>('')
  const [reason, setReason] = useState('')
  const [hasFileTransfer, setHasFileTransfer] = useState(false)
  const [transferLog, setTransferLog] = useState('')
  const [observations, setObservations] = useState('')
  const [sessionStatus, setSessionStatus] = useState<'em_andamento' | 'concluido'>('em_andamento')

  // Feedback de cópia e ações
  const [copiedId, setCopiedId] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'supervisionado' | 'nao_supervisionado'>(
    'supervisionado',
  )
  const [viewDetailsModal, setViewDetailsModal] = useState<RemoteSupportSessionRecord | null>(null)

  // Sugestões de clientes filtradas
  const [showClientSuggestions, setShowClientSuggestions] = useState(false)
  const filteredSuggestions = REGISTERED_CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(clientName.toLowerCase()) ||
      c.email.toLowerCase().includes(clientName.toLowerCase()),
  )

  // Carrega histórico inicial de atendimentos
  const loadSessions = useCallback(async () => {
    try {
      setLoadingSessions(true)
      const res = await remoteSessionsService.list({
        status: statusFilter,
        search: searchQuery,
      })
      setSessions(res.items)
    } catch (err) {
      console.error('Falha ao carregar atendimentos:', err)
    } finally {
      setLoadingSessions(false)
    }
  }, [statusFilter, searchQuery])

  useEffect(() => {
    loadSessions()
  }, [loadSessions])

  // Inscrição em tempo real com useRealtime
  useRealtime<RemoteSupportSessionRecord>('remote_support_sessions', () => {
    loadSessions()
  })

  // Preenche nome do técnico quando user carregar
  useEffect(() => {
    if (user?.name || user?.email) {
      setTechnicianName(user.name || user.email)
    }
  }, [user])

  // Reseta formulário para novo chamado
  const handleResetForm = () => {
    setCurrentSessionId(null)
    setRemoteId('')
    setClientName('')
    setClientEmail('')
    setIsAdHoc(false)
    setOsNumber('')
    setStartedAt('')
    setEndedAt('')
    setReason('')
    setHasFileTransfer(false)
    setTransferLog('')
    setObservations('')
    setSessionStatus('em_andamento')
  }

  // Ação: Iniciar Atendimento
  const handleStartSession = async () => {
    if (!remoteId.trim()) {
      toast({
        variant: 'destructive',
        title: 'ID remoto obrigatório',
        description: 'Informe o ID fornecido pelo cliente antes de iniciar.',
      })
      return
    }

    if (!reason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Motivo obrigatório',
        description: 'Informe o motivo do acesso ou problema relatado.',
      })
      return
    }

    setSubmitting(true)
    const nowIso = new Date().toISOString()
    const autoOs =
      osNumber.trim() || `OS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    try {
      const payload: CreateSessionInput = {
        remote_id: remoteId.trim(),
        client_name: isAdHoc ? `${clientName.trim() || 'Cliente'} (Avulso)` : clientName.trim(),
        client_email: clientEmail.trim(),
        is_ad_hoc: isAdHoc,
        os_number: autoOs,
        technician_id: user?.id || '',
        started_at: nowIso,
        reason: reason.trim(),
        has_file_transfer: hasFileTransfer,
        transfer_log: hasFileTransfer ? transferLog.trim() : '',
        observations: observations.trim(),
        status: 'em_andamento',
      }

      const created = await remoteSessionsService.create(payload)
      setCurrentSessionId(created.id)
      setStartedAt(nowIso)
      setOsNumber(autoOs)
      setSessionStatus('em_andamento')

      toast({
        title: 'Atendimento iniciado',
        description: `Sessão gravada com sucesso. OS gerada: ${autoOs}.`,
      })
      loadSessions()
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Erro ao iniciar atendimento',
        description: err instanceof Error ? err.message : 'Falha na comunicação com o banco.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Ação: Finalizar Atendimento
  const handleFinalizeSession = async () => {
    if (!currentSessionId) {
      toast({
        variant: 'destructive',
        title: 'Nenhum atendimento em curso',
        description: 'Inicie ou selecione um atendimento antes de finalizar.',
      })
      return
    }

    setSubmitting(true)
    const endIso = new Date().toISOString()

    try {
      await remoteSessionsService.update(currentSessionId, {
        ended_at: endIso,
        status: 'concluido',
        observations:
          observations.trim() || 'Atendimento concluído com êxito pelo técnico responsável.',
        has_file_transfer: hasFileTransfer,
        transfer_log: hasFileTransfer ? transferLog.trim() : '',
      })

      setEndedAt(endIso)
      setSessionStatus('concluido')

      toast({
        title: 'Atendimento concluído',
        description: 'Término registrado e chamado finalizado com sucesso.',
      })
      loadSessions()
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Erro ao finalizar atendimento',
        description: err instanceof Error ? err.message : 'Falha na atualização do registro.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Ação: Salvar Rascunho / Atualização Parcial
  const handleSaveDraft = async () => {
    if (!currentSessionId) {
      // Cria registro em andamento se ainda não existir
      handleStartSession()
      return
    }

    setSubmitting(true)
    try {
      await remoteSessionsService.update(currentSessionId, {
        client_name: clientName.trim(),
        client_email: clientEmail.trim(),
        os_number: osNumber.trim(),
        reason: reason.trim(),
        has_file_transfer: hasFileTransfer,
        transfer_log: transferLog.trim(),
        observations: observations.trim(),
      })

      toast({
        title: 'Rascunho atualizado',
        description: 'As alterações deste chamado foram salvas.',
      })
      loadSessions()
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar rascunho',
        description: err instanceof Error ? err.message : 'Não foi possível gravar os dados.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Ação: Abrir no Aplicativo do Técnico (integração RustDesk preparada para Cláudio)
  const handleOpenTechnicianApp = () => {
    if (!remoteId.trim()) {
      toast({
        variant: 'destructive',
        title: 'ID necessário',
        description: 'Preencha o ID remoto antes de abrir a conexão.',
      })
      return
    }

    // Copia o ID para a área de transferência para agilizar o trabalho do técnico
    navigator.clipboard?.writeText(remoteId.replace(/\s+/g, ''))
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)

    toast({
      title: 'ID copiado para a área de transferência',
      description: `Tentando abrir o aplicativo técnico da Network (${NETWORK_REMOTE_CONFIG.technicianAppScheme}). Cole o ID se solicitado.`,
    })

    // TODO (Cláudio): Quando o instalador do técnico registrar o protocolo URI oficial (ex: networkremote://connect/{id}),
    // este comando disparará a janela diretamente com a VPS e as chaves pré-configuradas.
    try {
      window.location.href = `${NETWORK_REMOTE_CONFIG.technicianAppScheme}${remoteId.replace(/\s+/g, '')}`
    } catch (_) {
      // Ignora se o protocolo não estiver associado no SO do técnico ainda
    }
  }

  // Carrega chamado existente no formulário para edição/visualização
  const handleSelectSession = (s: RemoteSupportSessionRecord) => {
    setCurrentSessionId(s.id)
    setRemoteId(s.remote_id)
    setClientName(s.client_name || '')
    setClientEmail(s.client_email || '')
    setIsAdHoc(Boolean(s.is_ad_hoc))
    setOsNumber(s.os_number || '')
    setStartedAt(s.started_at)
    setEndedAt(s.ended_at || '')
    setReason(s.reason)
    setHasFileTransfer(Boolean(s.has_file_transfer))
    setTransferLog(s.transfer_log || '')
    setObservations(s.observations || '')
    setSessionStatus(s.status)

    window.scrollTo({ top: 0, behavior: 'smooth' })
    toast({
      title: 'Chamado carregado no formulário',
      description: `OS: ${s.os_number || s.remote_id} (${s.status === 'concluido' ? 'Concluído' : 'Em andamento'})`,
    })
  }

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8 animate-fade-in">
      {/* Cabeçalho da Área Restrita do Técnico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232830]">
        <div>
          <div className="flex items-center gap-2">
            <NetworkLogo size="sm" subtitle="REMOTE" />
            <Badge className="bg-[#FFB800] text-black font-bold text-[11px] hover:bg-[#FFB800]">
              Área do Técnico
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Painel de Assistência Remota
          </h1>
          <p className="text-xs sm:text-sm text-[#9BA3B0] mt-0.5">
            Registro, controle e auditoria de conexões de suporte da{' '}
            <strong>Network Soluções</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#14171C] border border-[#232830] text-right hidden sm:block">
            <div className="text-xs font-semibold text-white">{user?.name || user?.email}</div>
            <div className="text-[10px] text-[#22C55E] flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Técnico Conectado
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleResetForm}
            className="border-[#232830] text-white hover:bg-[#14171C] text-xs h-9"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-[#FFB800]" />
            Novo Registro
          </Button>
        </div>
      </div>

      {/* Tabs Principais: Acesso Supervisionado vs Acesso Não Supervisionado */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as 'supervisionado' | 'nao_supervisionado')}
        className="w-full"
      >
        <TabsList className="bg-[#14171C] border border-[#232830] p-1 h-auto grid grid-cols-2 max-w-md">
          <TabsTrigger
            value="supervisionado"
            className="data-[state=active]:bg-[#FFB800] data-[state=active]:text-black font-semibold text-xs py-2"
          >
            <Headphones className="w-3.5 h-3.5 mr-1.5" />
            Atendimento Supervisionado
          </TabsTrigger>
          <TabsTrigger
            value="nao_supervisionado"
            className="data-[state=active]:bg-[#FFB800] data-[state=active]:text-black font-semibold text-xs py-2 relative"
          >
            <Lock className="w-3.5 h-3.5 mr-1.5" />
            Acesso Não Supervisionado
            <span className="ml-1 px-1 py-0.2 text-[9px] rounded bg-yellow-500/20 text-[#FFB800] border border-[#FFB800]/40">
              Em breve
            </span>
          </TabsTrigger>
        </TabsList>

        {/* CONTEÚDO TAB 1: Atendimento Supervisionado (Fluxo Principal) */}
        <TabsContent value="supervisionado" className="space-y-8 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Formulário de Registro de Atendimento (7 Colunas em Desktop) */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] shadow-xl">
                <CardHeader className="pb-4 border-b border-[#232830]">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#FFB800]" />
                        {currentSessionId
                          ? 'Detalhes do Atendimento'
                          : 'Novo Registro de Atendimento'}
                      </CardTitle>
                      <CardDescription className="text-xs text-[#9BA3B0]">
                        Preencha os dados do cliente e motivo para emissão do relatório de
                        assistência
                      </CardDescription>
                    </div>

                    {currentSessionId && (
                      <Badge
                        className={`${
                          sessionStatus === 'concluido'
                            ? 'bg-green-500/20 text-[#22C55E] border-green-500/30'
                            : 'bg-yellow-500/20 text-[#FFB800] border-yellow-500/30'
                        } text-xs uppercase font-bold`}
                      >
                        {sessionStatus === 'concluido' ? 'Concluído' : 'Em andamento'}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-5 space-y-5">
                  {/* Linha 1: ID Remoto do Computador + Botão de Conexão Externa */}
                  <div className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#232830] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label htmlFor="remoteId" className="text-xs font-semibold text-white">
                        ID Remoto do Cliente *
                      </Label>
                      <span className="text-[11px] text-[#9BA3B0]">
                        Solicite o código na tela do cliente
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="remoteId"
                          value={remoteId}
                          onChange={(e) => setRemoteId(e.target.value)}
                          placeholder="Ex: 489 120 735"
                          className="bg-[#14171C] border-[#232830] text-white font-mono text-base font-bold pl-3 tracking-wider focus-visible:ring-[#FFB800]"
                        />
                      </div>

                      {/* Botão Integrado para Disparar RustDesk do Técnico */}
                      <Button
                        type="button"
                        onClick={handleOpenTechnicianApp}
                        className="bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold text-xs h-10 px-4 whitespace-nowrap shadow-md shadow-[#FFB800]/10"
                        title="Copia o ID e tenta abrir o executável do técnico"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1.5" /> ID Copiado
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Abrir no Aplicativo do
                            Técnico
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="text-[11px] text-[#9BA3B0] flex items-center justify-between pt-0.5">
                      <span>
                        A conexão abre pelo aplicativo dedicado compilado com a marca Network.
                      </span>
                      <span className="text-[#FFB800] font-mono text-[10px]">RustDesk Core</span>
                    </div>
                  </div>

                  {/* Linha 2: Identificação do Cliente (Busca / Cliente Avulso) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="clientName" className="text-xs font-semibold text-[#9BA3B0]">
                        Cliente / Razão Social
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#9BA3B0]">
                          Cliente avulso (não cadastrado)?
                        </span>
                        <Switch
                          checked={isAdHoc}
                          onCheckedChange={(checked) => {
                            setIsAdHoc(checked)
                            if (checked) {
                              setShowClientSuggestions(false)
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Input
                        id="clientName"
                        value={clientName}
                        onChange={(e) => {
                          setClientName(e.target.value)
                          setShowClientSuggestions(!isAdHoc && e.target.value.length > 1)
                        }}
                        onFocus={() => {
                          if (!isAdHoc && clientName.length > 1) setShowClientSuggestions(true)
                        }}
                        placeholder={
                          isAdHoc
                            ? 'Nome da pessoa ou empresa avulsa'
                            : 'Digite para buscar empresa cadastrada...'
                        }
                        className="bg-[#0B0D10] border-[#232830] text-white focus-visible:ring-[#FFB800]"
                      />

                      {/* Menu dropdown de clientes cadastrados */}
                      {showClientSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute z-20 left-0 right-0 mt-1 bg-[#14171C] border border-[#232830] rounded-lg shadow-2xl overflow-hidden divide-y divide-[#232830]">
                          {filteredSuggestions.map((c) => (
                            <button
                              key={c.email}
                              type="button"
                              onClick={() => {
                                setClientName(c.name)
                                setClientEmail(c.email)
                                setShowClientSuggestions(false)
                              }}
                              className="w-full p-2.5 text-left text-xs hover:bg-[#232830] flex items-center justify-between text-white"
                            >
                              <span className="font-medium">{c.name}</span>
                              <span className="text-[#9BA3B0] text-[11px] font-mono">
                                {c.email}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="clientEmail" className="text-[11px] text-[#9BA3B0]">
                          E-mail para cópia do comprovante (opcional)
                        </Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="cliente@empresa.com.br"
                          className="bg-[#0B0D10] border-[#232830] text-white text-xs h-9 mt-1 focus-visible:ring-[#FFB800]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="osNumber" className="text-[11px] text-[#9BA3B0]">
                          Número da Ordem de Serviço (OS)
                        </Label>
                        <Input
                          id="osNumber"
                          value={osNumber}
                          onChange={(e) => setOsNumber(e.target.value)}
                          placeholder="Ex: OS-2025-0905 (ou auto-gerado)"
                          className="bg-[#0B0D10] border-[#232830] text-white text-xs h-9 mt-1 focus-visible:ring-[#FFB800]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Linha 3: Técnico Responsável e Timestamps */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-[#0B0D10]/50 border border-[#232830]">
                    <div>
                      <Label htmlFor="tech" className="text-[11px] text-[#9BA3B0]">
                        Técnico Responsável
                      </Label>
                      <Input
                        id="tech"
                        value={technicianName}
                        onChange={(e) => setTechnicianName(e.target.value)}
                        className="bg-[#14171C] border-[#232830] text-white text-xs h-8 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] text-[#9BA3B0]">Início do Atendimento</Label>
                      <div className="text-xs text-white font-mono mt-2 bg-[#14171C] px-2.5 py-1.5 rounded border border-[#232830]">
                        {startedAt
                          ? new Date(startedAt).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })
                          : 'Ao iniciar'}
                      </div>
                    </div>
                    <div>
                      <Label className="text-[11px] text-[#9BA3B0]">Término do Atendimento</Label>
                      <div className="text-xs text-white font-mono mt-2 bg-[#14171C] px-2.5 py-1.5 rounded border border-[#232830]">
                        {endedAt
                          ? new Date(endedAt).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })
                          : 'Pendente'}
                      </div>
                    </div>
                  </div>

                  {/* Linha 4: Motivo do Acesso */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reason" className="text-xs font-semibold text-white">
                      Motivo do Acesso / Sintoma Relatado *
                    </Label>
                    <Textarea
                      id="reason"
                      rows={2}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Ex: Configuração de certificado A1, instalação de driver de impressora, lentidão no ERP..."
                      className="bg-[#0B0D10] border-[#232830] text-white text-xs focus-visible:ring-[#FFB800]"
                    />
                  </div>

                  {/* Linha 5: Transferência de Arquivos (Sim/Não + Log manual de auditoria) */}
                  <div className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#232830] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-xs font-semibold text-white flex items-center gap-1.5">
                          <FolderSync className="w-3.5 h-3.5 text-[#FFB800]" />
                          Houve transferência de arquivos?
                        </Label>
                        <p className="text-[11px] text-[#9BA3B0]">
                          O envio é realizado nativamente pelo RustDesk; registre aqui o log para
                          conformidade.
                        </p>
                      </div>
                      <Switch checked={hasFileTransfer} onCheckedChange={setHasFileTransfer} />
                    </div>

                    {hasFileTransfer && (
                      <div className="space-y-1.5 pt-2 border-t border-[#232830] animate-fade-in">
                        <Label htmlFor="transferLog" className="text-[11px] text-[#9BA3B0]">
                          Registro de Arquivos Transferidos (Nome, Direção, Técnico e Horário)
                        </Label>
                        <Textarea
                          id="transferLog"
                          rows={2}
                          value={transferLog}
                          onChange={(e) => setTransferLog(e.target.value)}
                          placeholder="Ex: patch_fiscal_v2.exe (Técnico -> Cliente) às 14:22 por Carlos Silva"
                          className="bg-[#14171C] border-[#232830] text-white text-xs font-mono focus-visible:ring-[#FFB800]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Linha 6: Observações do Serviço Executado */}
                  <div className="space-y-1.5">
                    <Label htmlFor="obs" className="text-xs font-semibold text-white">
                      Observações do Serviço Executado
                    </Label>
                    <Textarea
                      id="obs"
                      rows={3}
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      placeholder="Descreva as soluções aplicadas, testes realizados e orientações passadas ao cliente..."
                      className="bg-[#0B0D10] border-[#232830] text-white text-xs focus-visible:ring-[#FFB800]"
                    />
                  </div>

                  {/* Barra de Ações do Formulário */}
                  <div className="pt-3 border-t border-[#232830] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSaveDraft}
                        disabled={submitting}
                        className="border-[#232830] text-white hover:bg-[#232830] text-xs h-9"
                      >
                        <Save className="w-3.5 h-3.5 mr-1.5 text-[#9BA3B0]" />
                        Salvar Rascunho
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      {!currentSessionId || sessionStatus !== 'concluido' ? (
                        <>
                          {!currentSessionId && (
                            <Button
                              type="button"
                              onClick={handleStartSession}
                              disabled={submitting}
                              className="bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold text-xs h-9 px-4"
                            >
                              {submitting ? (
                                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                              ) : (
                                <Play className="w-3.5 h-3.5 mr-1.5" />
                              )}
                              Iniciar Atendimento
                            </Button>
                          )}

                          {currentSessionId && (
                            <Button
                              type="button"
                              onClick={handleFinalizeSession}
                              disabled={submitting}
                              className="bg-[#22C55E] hover:bg-[#16a34a] text-black font-bold text-xs h-9 px-5 shadow-lg shadow-[#22C55E]/10"
                            >
                              {submitting ? (
                                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                              )}
                              Finalizar Atendimento
                            </Button>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-[#22C55E] font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Atendimento Concluído e Arquivado
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Painel Lateral: Histórico e Filtros em Tempo Real (5 Colunas em Desktop) */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8]">
                <CardHeader className="pb-3 border-b border-[#232830]">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <History className="w-4 h-4 text-[#FFB800]" />
                      Atendimentos Registrados
                    </CardTitle>
                    <span className="text-[11px] text-[#9BA3B0] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                      Tempo Real
                    </span>
                  </div>

                  {/* Filtros: Status e Busca */}
                  <div className="pt-2 space-y-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#9BA3B0] absolute left-3 top-2.5 pointer-events-none" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por ID, OS, cliente ou motivo..."
                        className="pl-8 bg-[#0B0D10] border-[#232830] text-xs h-8 text-white focus-visible:ring-[#FFB800]"
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-1">
                      {(['todos', 'em_andamento', 'concluido'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setStatusFilter(st)}
                          className={`px-2.5 py-1 text-[11px] rounded font-medium transition-colors ${
                            statusFilter === st
                              ? 'bg-[#FFB800] text-black font-semibold'
                              : 'bg-[#0B0D10] text-[#9BA3B0] hover:text-white'
                          }`}
                        >
                          {st === 'todos'
                            ? 'Todos'
                            : st === 'em_andamento'
                              ? 'Em andamento'
                              : 'Concluídos'}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-3 p-0">
                  {loadingSessions ? (
                    <div className="p-8 text-center text-xs text-[#9BA3B0] space-y-2">
                      <Loader2 className="w-5 h-5 animate-spin text-[#FFB800] mx-auto" />
                      <p>Sincronizando atendimentos...</p>
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#9BA3B0] space-y-2">
                      <AlertTriangle className="w-6 h-6 text-[#FFB800] mx-auto opacity-60" />
                      <p className="font-medium text-white">Nenhum chamado encontrado</p>
                      <p>Inicie um novo atendimento no formulário ao lado.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#232830] max-h-[580px] overflow-y-auto">
                      {sessions.map((s) => {
                        const isCurrent = currentSessionId === s.id
                        return (
                          <div
                            key={s.id}
                            onClick={() => handleSelectSession(s)}
                            className={`p-3.5 hover:bg-[#1E232B] transition-colors cursor-pointer space-y-2 ${
                              isCurrent ? 'bg-[#FFB800]/10 border-l-2 border-[#FFB800]' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-white tracking-wider">
                                {s.remote_id}
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-[10px] font-semibold py-0 ${
                                  s.status === 'concluido'
                                    ? 'border-green-500/40 text-[#22C55E] bg-green-500/10'
                                    : 'border-yellow-500/40 text-[#FFB800] bg-yellow-500/10'
                                }`}
                              >
                                {s.status === 'concluido' ? 'Concluído' : 'Em andamento'}
                              </Badge>
                            </div>

                            <div className="text-xs font-medium text-[#F2F4F8] truncate">
                              {s.client_name || 'Cliente Avulso'}
                            </div>

                            <div className="text-[11px] text-[#9BA3B0] line-clamp-2 leading-relaxed">
                              {s.reason}
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-[#9BA3B0] pt-1">
                              <span className="font-mono">{s.os_number || 'Sem OS'}</span>
                              <span>
                                {new Date(s.started_at).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Box de Informações de Integração (RustDesk / Cláudio) */}
              <div className="p-4 rounded-xl bg-[#0F1216] border border-[#232830] space-y-2 text-xs text-[#9BA3B0]">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Shield className="w-4 h-4 text-[#FFB800]" />
                  Pontos de Integração da Infraestrutura
                </div>
                <p className="text-[11px] leading-relaxed">
                  Os atendimentos remotos operam sobre servidores dedicados HBBS/HBBR. Ao clicar em{' '}
                  <em>"Abrir no Aplicativo do Técnico"</em>, o ID é copiado automaticamente para
                  colar no console local.
                </p>
                <div className="pt-1 font-mono text-[10px] text-[#9BA3B0]">
                  Servidor configurado:{' '}
                  <span className="text-[#FFB800]">{NETWORK_REMOTE_CONFIG.serverHost}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* CONTEÚDO TAB 2: Acesso Não Supervisionado (Placeholder Futuro Exigido) */}
        <TabsContent value="nao_supervisionado" className="mt-6">
          <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] max-w-3xl mx-auto shadow-2xl">
            <CardHeader className="text-center py-8">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center mx-auto mb-3">
                <Lock className="w-7 h-7" />
              </div>
              <Badge className="bg-[#FFB800] text-black font-bold text-xs uppercase mx-auto mb-2">
                Recurso em Desenvolvimento • Em Breve
              </Badge>
              <CardTitle className="text-2xl font-black text-white">
                Acesso Não Supervisionado (Clientes com Contrato)
              </CardTitle>
              <CardDescription className="text-sm text-[#9BA3B0] max-w-lg mx-auto leading-relaxed mt-2">
                O gerenciamento de computadores corporativos sem presença física do usuário estará
                disponível na próxima versão para empresas com contrato formal de manutenção
                preventiva.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#232830] space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#FFB800]" />
                  Requisitos Obrigatórios de Segurança (LGPD e Compliance)
                </h4>
                <ul className="space-y-2 text-xs text-[#9BA3B0] list-disc pl-5 leading-relaxed">
                  <li>
                    Exige <strong>termo de autorização formal</strong> assinado pelo gestor de TI da
                    empresa contratante.
                  </li>
                  <li>
                    Criptografia assimétrica de chave pública dedicada por dispositivo na VPS da
                    Network.
                  </li>
                  <li>
                    Gravação de log de auditoria com IP, operador, horário de início e término
                    inviolável.
                  </li>
                  <li>
                    <strong>Nenhum acesso permanente é ativado automaticamente</strong> sem
                    consentimento explícito.
                  </li>
                </ul>
              </div>

              <div className="opacity-50 pointer-events-none space-y-3 filter blur-[0.3px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-[#9BA3B0]">Empresa com Contrato</Label>
                    <Input
                      disabled
                      value="Selecione o cliente..."
                      className="bg-[#0B0D10] text-xs h-9 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-[#9BA3B0]">Dispositivo Alvo</Label>
                    <Input
                      disabled
                      value="Hostname / Endereço MAC"
                      className="bg-[#0B0D10] text-xs h-9 mt-1"
                    />
                  </div>
                </div>
                <Button
                  disabled
                  className="w-full bg-[#232830] text-[#9BA3B0] font-semibold text-xs h-10"
                >
                  Solicitar Token de Acesso Permanente (Desabilitado em v1)
                </Button>
              </div>

              <div className="text-center pt-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('supervisionado')}
                  className="border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-black text-xs h-9"
                >
                  Voltar para Atendimento Supervisionado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
