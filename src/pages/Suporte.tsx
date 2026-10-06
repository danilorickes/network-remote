import React, { useState } from 'react'
import { NETWORK_REMOTE_CONFIG } from '@/config/networkRemote'
import NetworkLogo from '@/components/NetworkLogo'
import ClientAppMockup from '@/components/ClientAppMockup'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import {
  Download,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Laptop,
  Key,
  Check,
  FileCheck2,
} from 'lucide-react'

export default function Suporte() {
  const { toast } = useToast()
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  // Verifica se o executável oficial já possui URL fornecida por Cláudio
  const isDownloadReady = Boolean(NETWORK_REMOTE_CONFIG.appDownloadUrl.trim())

  const handleDownloadClick = () => {
    if (!isDownloadReady) {
      toast({
        title: 'Aplicativo em preparação',
        description:
          'O executável oficial customizado do Network Remote está sendo compilado com a infraestrutura dedicada. Fale com nosso suporte para instruções imediatas.',
      })
      setDownloadModalOpen(true)
      return
    }

    // Quando Cláudio entregar o link, o redirecionamento ocorre direto
    window.location.href = NETWORK_REMOTE_CONFIG.appDownloadUrl
  }

  return (
    <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14171C] border border-[#232830] text-xs font-medium text-[#FFB800]">
          <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
          Módulo Oficial de Assistência Técnica
        </div>

        <div className="flex justify-center pt-1">
          <NetworkLogo size="lg" subtitle="REMOTE" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Assistência Remota <span className="text-[#FFB800]">Network</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9BA3B0] max-w-2xl mx-auto leading-relaxed">
          Atendimento ágil, transparente e seguro diretamente no seu computador. Solucione
          incidentes técnicos, dúvidas e manutenções com um técnico autorizado da{' '}
          <strong>Network Soluções</strong> em poucos cliques.
        </p>

        {/* Bloco de Download com Estado de Preparação */}
        <div className="pt-2 flex flex-col items-center justify-center gap-2.5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              size="lg"
              onClick={handleDownloadClick}
              disabled={!isDownloadReady}
              className={`h-13 px-8 text-sm sm:text-base font-bold transition-all shadow-xl ${
                isDownloadReady
                  ? 'bg-[#FFB800] hover:bg-[#FFC533] text-black shadow-[#FFB800]/20'
                  : 'bg-[#1C2027] text-[#9BA3B0] border border-[#2B313D] cursor-not-allowed opacity-90'
              }`}
            >
              <Download className="w-5 h-5 mr-2.5" />
              {isDownloadReady ? (
                'Baixar Network Remote para Windows'
              ) : (
                <span className="flex items-center gap-2">
                  <span>Baixar Network Remote para Windows</span>
                  <Badge
                    variant="outline"
                    className="border-[#FFB800]/50 text-[#FFB800] bg-[#FFB800]/10 text-[10px] ml-1"
                  >
                    Em preparação
                  </Badge>
                </span>
              )}
            </Button>
          </div>

          {/* Texto Informativo: Versão e Tamanho (sem fingir operacionalidade) */}
          <div className="text-xs text-[#9BA3B0] flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>
              Versão prevista:{' '}
              <strong className="text-white">{NETWORK_REMOTE_CONFIG.appVersion}</strong>
            </span>
            <span>•</span>
            <span>
              Tamanho: <strong className="text-white">{NETWORK_REMOTE_CONFIG.appFileSize}</strong>
            </span>
            <span>•</span>
            <span className="text-[#FFB800] font-medium">Não requer instalação complexa</span>
          </div>

          {!isDownloadReady && (
            <p className="text-[11px] text-[#9BA3B0] max-w-md text-center italic">
              * O executável oficial está em fase final de homologação técnica. Se você precisa de
              suporte neste instante, entre em contato via WhatsApp abaixo.
            </p>
          )}
        </div>
      </div>

      {/* Caixa de Aviso de Segurança Destacado (Amarelo / Alerta) */}
      <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#FFB800]/10 via-[#14171C] to-[#14171C] border-2 border-[#FFB800]/70 shadow-lg shadow-black/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FFB800] text-black flex items-center justify-center flex-shrink-0 shadow-md">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Aviso de Segurança e Confidencialidade
            </h3>
            <p className="text-xs sm:text-sm text-[#F2F4F8] leading-relaxed">
              <strong className="text-[#FFB800]">
                Informe os dados somente ao técnico autorizado da Network Soluções.
              </strong>{' '}
              A senha temporária é rotativa e <em>muda automaticamente a cada nova sessão</em>. O
              acesso é visualmente supervisionado e você pode cancelar a conexão a qualquer segundo.
            </p>
          </div>
          <div className="pt-1 sm:pt-0">
            <a
              href={`https://wa.me/${NETWORK_REMOTE_CONFIG.contactWhatsApp}?text=Olá,%20gostaria%20de%20confirmar%20a%20identidade%20do%20técnico%20da%20Network.`}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-black font-semibold text-xs h-9 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Confirmar Técnico
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Grid Principal: 3 Passos Numerados (Esquerda) e Referência Visual do App (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Instruções em 3 Passos (5 Colunas em Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#FFB800] mb-1">
              Como funciona o atendimento
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              3 passos simples para receber o suporte
            </h2>
            <p className="text-xs text-[#9BA3B0] mt-1.5 leading-relaxed">
              Desenvolvido para máxima simplicidade: qualquer usuário consegue receber assistência
              técnica apenas seguindo orientações por telefone.
            </p>
          </div>

          <div className="space-y-4">
            {/* Passo 1 */}
            <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] hover:border-[#FFB800]/40 transition-colors">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FFB800] text-black font-black text-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  1
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Laptop className="w-4 h-4 text-[#FFB800]" />
                    Baixe e abra o Network Remote
                  </h3>
                  <p className="text-xs text-[#9BA3B0] leading-relaxed">
                    Clique no botão de download acima ou execute o aplicativo oficial já
                    disponibilizado pelo seu suporte de TI. O programa é leve e inicia
                    instantaneamente.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Passo 2 */}
            <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] hover:border-[#FFB800]/40 transition-colors">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FFB800] text-black font-black text-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  2
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-[#FFB800]" />
                    Informe ao técnico o ID e a senha temporária
                  </h3>
                  <p className="text-xs text-[#9BA3B0] leading-relaxed">
                    Com a janela aberta, leia para o atendente o número de{' '}
                    <strong className="text-white">ID do computador</strong> e a{' '}
                    <strong className="text-white">senha descartável</strong> exibida na tela.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Passo 3 */}
            <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] hover:border-[#FFB800]/40 transition-colors">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FFB800] text-black font-black text-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  3
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    Autorize a conexão quando a solicitação aparecer
                  </h3>
                  <p className="text-xs text-[#9BA3B0] leading-relaxed">
                    Uma caixa de confirmação surgirá identificando o nome do técnico da Network.
                    Clique em <strong className="text-[#22C55E]">"Autorizar"</strong> para iniciar o
                    atendimento.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Destaque de Garantias de Segurança */}
          <div className="p-4 rounded-xl bg-[#0F1216] border border-[#232830] space-y-2.5 text-xs text-[#9BA3B0]">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              Garantias de Privacidade e Controle
            </div>
            <ul className="space-y-1.5 pl-6 list-disc">
              <li>Você acompanha visualmente tudo o que o técnico realiza em seu monitor.</li>
              <li>A senha temporária é descartada logo após o encerramento do chamado.</li>
              <li>Nenhum acesso permanece aberto após você fechar a janela do programa.</li>
            </ul>
          </div>
        </div>

        {/* Coluna Direita: Referência Visual Desktop (7 Colunas em Desktop) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#FFB800]" />
              Referência Visual do Aplicativo do Cliente
            </span>
            <span className="text-[11px] text-[#9BA3B0]">
              O que você verá na tela do seu computador
            </span>
          </div>

          {/* Componente Mockup de Alta Fidelidade (Prévia Estática) */}
          <ClientAppMockup />
        </div>
      </div>

      {/* Bloco de Contato Oficial para Validação de Identidade */}
      <div className="rounded-2xl bg-[#14171C] border border-[#232830] p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1 md:col-span-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#FFB800]" />
              Em dúvida sobre quem está atendendo?
            </h3>
            <p className="text-xs sm:text-sm text-[#9BA3B0] leading-relaxed">
              Para sua total tranquilidade, confirme a identidade do profissional antes de informar
              qualquer dado. Nossa central responderá imediatamente se o técnico faz parte do time
              oficial da <strong>Network Soluções</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
            <a
              href={`https://wa.me/${NETWORK_REMOTE_CONFIG.contactWhatsApp}?text=Olá,%20gostaria%20de%20confirmar%20se%20o%20técnico%20que%20está%20me%20atendendo%20é%20da%20Network.`}
              target="_blank"
              rel="noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-black font-semibold text-xs h-10">
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Oficial ({NETWORK_REMOTE_CONFIG.contactWhatsAppFormatted})
              </Button>
            </a>
            <a
              href={`tel:${NETWORK_REMOTE_CONFIG.contactPhone.replace(/\D/g, '')}`}
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full border-[#232830] text-white hover:bg-[#232830] text-xs h-10"
              >
                <Phone className="w-4 h-4 mr-2 text-[#FFB800]" />
                Ligar {NETWORK_REMOTE_CONFIG.contactPhone}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
