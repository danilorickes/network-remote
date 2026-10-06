import React from 'react'
import { Link } from 'react-router-dom'
import NetworkLogo from '@/components/NetworkLogo'
import { NETWORK_REMOTE_CONFIG } from '@/config/networkRemote'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Server,
  Shield,
  Headphones,
  Cpu,
  Lock,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  Zap,
  HardDrive,
  Users,
} from 'lucide-react'

export default function Index() {
  return (
    <div className="flex-1 space-y-16 py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14171C] border border-[#232830] text-xs font-semibold text-[#FFB800]">
          <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
          Infraestrutura e Gestão de TI de Alta Performance
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          Gestão de TI Segura e <span className="text-[#FFB800]">Assistência Remota</span> Dedicada
        </h1>

        <p className="text-base sm:text-lg text-[#9BA3B0] max-w-2xl mx-auto leading-relaxed">
          A <strong>Network Soluções</strong> entrega infraestrutura robusta, servidores dedicados e
          a ferramenta oficial <strong>Network Remote</strong> para suporte técnico instantâneo aos
          seus colaboradores.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/suporte" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#FFB800] hover:bg-[#FFC533] text-black font-bold h-12 px-8 shadow-xl shadow-[#FFB800]/20"
            >
              <Headphones className="w-4 h-4 mr-2" />
              Acessar Suporte Remoto
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-[#232830] bg-[#14171C] text-white hover:border-[#FFB800] hover:text-[#FFB800] h-12 px-6"
            >
              Área do Técnico
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Destaque Especial: Network Remote */}
      <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#14171C] via-[#101317] to-[#0B0D10] border border-[#232830] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB800]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FFB800]/10 border border-[#FFB800]/30 text-xs font-bold text-[#FFB800]">
              Ferramenta Oficial
            </div>
            <div className="pt-1">
              <NetworkLogo size="md" subtitle="REMOTE" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Conexões remotas corporativas sem burocracia
            </h2>
            <p className="text-sm text-[#9BA3B0] leading-relaxed">
              O <strong>Network Remote</strong> é o canal direto entre seu computador e nossa equipe
              especializada. Sem configurações complexas de portas ou roteadores: basta abrir o
              aplicativo, informar seu ID temporário e autorizar o técnico.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Senhas rotativas descartáveis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Servidor Network dedicado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Encerramento de sessão com 1 clique</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Conformidade com a LGPD</span>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/suporte">
                <Button className="bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold text-xs h-10 px-5">
                  Conhecer a Assistência Remota
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B0D10] border border-[#232830] space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#232830]">
              <span className="text-xs uppercase font-extrabold text-[#FFB800] tracking-wider">
                Status da Infraestrutura
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-[#22C55E]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                Operacional
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#14171C]">
                <span className="text-[#9BA3B0]">Servidor de Sinalização (HBBS)</span>
                <span className="font-mono text-white text-[11px]">
                  {NETWORK_REMOTE_CONFIG.serverHost}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#14171C]">
                <span className="text-[#9BA3B0]">Relay Criptografado (HBBR)</span>
                <span className="font-mono text-white text-[11px]">
                  {NETWORK_REMOTE_CONFIG.relayHost}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#14171C]">
                <span className="text-[#9BA3B0]">Algoritmo de Troca de Chaves</span>
                <span className="font-mono text-[#22C55E] text-[11px]">ECDH / ChaCha20</span>
              </div>
            </div>

            <div className="text-[11px] text-[#9BA3B0] text-center pt-1">
              Todos os fluxos passam por nossos servidores dedicados.
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Soluções Network Infra */}
      <section id="solucoes" className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#FFB800]">
            Soluções Corporativas
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Tecnologia Completa para o seu Negócio
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] hover:border-[#FFB800]/50 transition-colors">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Servidores & Nuvem Privada</h4>
              <p className="text-xs text-[#9BA3B0] leading-relaxed">
                Armazenamento centralizado, backups automáticos com versionamento e virtualização
                corporativa de alta disponibilidade.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] hover:border-[#FFB800]/50 transition-colors">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Segurança de Rede & Firewall</h4>
              <p className="text-xs text-[#9BA3B0] leading-relaxed">
                Defesa ativa contra ameaças externas, filtragem de tráfego nocivo e links VPN
                dedicados com criptografia de ponta.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#14171C] border-[#232830] text-[#F2F4F8] hover:border-[#FFB800]/50 transition-colors">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Suporte Remoto Imediato</h4>
              <p className="text-xs text-[#9BA3B0] leading-relaxed">
                Atendimento remoto prioritário via <strong>Network Remote</strong> com logs
                auditáveis e técnicos certificados.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contato & Chamada Final */}
      <section
        id="contato"
        className="rounded-2xl bg-[#14171C] border border-[#232830] p-8 text-center space-y-4"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Precisa de atendimento técnico agora?
        </h3>
        <p className="text-xs sm:text-sm text-[#9BA3B0] max-w-xl mx-auto">
          Nossa central de suporte está pronta para atender sua empresa. Confirme os dados do
          chamado ou inicie sua sessão remota.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/suporte">
            <Button className="bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold text-xs h-10 px-6">
              Abrir Assistência Remota
            </Button>
          </Link>
          <a
            href={`https://wa.me/${NETWORK_REMOTE_CONFIG.contactWhatsApp}?text=Olá,%20preciso%20de%20suporte%20técnico%20da%20Network.`}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              className="border-[#232830] text-white hover:bg-[#232830] text-xs h-10 px-6"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#22C55E]" />
              WhatsApp Oficial
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
