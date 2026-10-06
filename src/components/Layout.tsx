import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import NetworkLogo from '@/components/NetworkLogo'
import { NETWORK_REMOTE_CONFIG } from '@/config/networkRemote'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Menu,
  X,
  Headphones,
  Shield,
  Phone,
  MessageSquare,
  User,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  // Adiciona backdrop-blur e sombra ao scrollar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fecha o menu móvel ao trocar de rota
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Assistência Remota', path: '/suporte', badge: 'Novo' },
    { label: 'Infra & Soluções', path: '/#solucoes' },
    { label: 'Contato & Segurança', path: '/#contato' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0D10] text-[#F2F4F8] antialiased selection:bg-[#FFB800] selection:text-black">
      {/* Barra de Notificação Superior com Status do Suporte */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#0B0D10]/90 backdrop-blur-md border-[#232830] shadow-lg shadow-black/40'
            : 'bg-[#0B0D10] border-[#232830]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo Oficial Network Remote / Infra */}
            <Link to="/" className="flex items-center gap-3 group">
              <NetworkLogo size="md" subtitle="REMOTE" />
            </Link>

            {/* Links Desktop */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                      active
                        ? 'text-[#FFB800] bg-[#14171C]'
                        : 'text-[#9BA3B0] hover:text-white hover:bg-[#14171C]/50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Ações Desktop: Área do Técnico & Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link to="/tecnico">
                    <Button
                      variant="outline"
                      className="border-[#FFB800]/50 text-[#FFB800] hover:bg-[#FFB800]/10 hover:border-[#FFB800] font-medium text-xs h-9"
                    >
                      <User className="w-3.5 h-3.5 mr-1.5" />
                      Painel Técnico
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    title="Encerrar sessão"
                    className="text-[#9BA3B0] hover:text-red-400 hover:bg-[#14171C] h-9 w-9"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-[#232830] bg-[#14171C] text-white hover:border-[#FFB800] hover:text-[#FFB800] text-xs h-9 font-medium transition-all"
                  >
                    <Headphones className="w-3.5 h-3.5 mr-1.5 text-[#FFB800]" />
                    Área do Técnico
                  </Button>
                </Link>
              )}

              <Link to="/suporte">
                <Button className="bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold text-xs h-9 px-4 transition-all shadow-md shadow-[#FFB800]/10">
                  Acesso Remoto
                </Button>
              </Link>
            </div>

            {/* Botão Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <Link to="/suporte">
                <Button
                  size="sm"
                  className="bg-[#FFB800] text-black text-xs h-8 px-2.5 font-semibold"
                >
                  Suporte
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#9BA3B0] hover:text-white rounded-md hover:bg-[#14171C] focus:outline-none"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-in Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#232830] bg-[#0B0D10]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fade-in-down">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-[#14171C] text-[#FFB800]'
                      : 'text-[#9BA3B0] hover:text-white hover:bg-[#14171C]/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge ? (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#FFB800]/20 text-[#FFB800]">
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#9BA3B0]/60" />
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#232830] space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 bg-[#14171C] rounded-lg text-xs text-[#9BA3B0]">
                    Logado como <strong className="text-white">{user?.name || user?.email}</strong>
                  </div>
                  <Link to="/tecnico" className="block">
                    <Button className="w-full bg-[#FFB800] hover:bg-[#FFC533] text-black font-semibold h-10">
                      Acessar Painel Técnico
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="w-full border-[#232830] text-red-400 hover:bg-[#14171C] h-10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Encerrar Sessão
                  </Button>
                </>
              ) : (
                <Link to="/login" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-[#232830] bg-[#14171C] text-white hover:border-[#FFB800] hover:text-[#FFB800] h-10"
                  >
                    <Headphones className="w-4 h-4 mr-2 text-[#FFB800]" />
                    Entrar na Área do Técnico
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Rodapé Corporativo Network Soluções */}
      <footer className="border-t border-[#232830] bg-[#07090C] text-[#9BA3B0] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Coluna 1: Marca & Propósito */}
            <div className="space-y-4 md:col-span-1">
              <NetworkLogo size="md" subtitle="REMOTE" />
              <p className="text-xs text-[#9BA3B0] leading-relaxed">
                Ferramenta corporativa oficial de suporte e assistência técnica remota da Network
                Soluções. Conexões criptografadas ponto a ponto em infraestrutura dedicada de alta
                performance.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#22C55E]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                Servidores Network Operacionais
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Acesso & Navegação
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/" className="hover:text-[#FFB800] transition-colors">
                    Página Inicial
                  </Link>
                </li>
                <li>
                  <Link to="/suporte" className="hover:text-[#FFB800] transition-colors">
                    Assistência Remota (Público)
                  </Link>
                </li>
                <li>
                  <Link to="/tecnico" className="hover:text-[#FFB800] transition-colors">
                    Painel do Técnico (Restrito)
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-[#FFB800] transition-colors">
                    Login Corporativo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Segurança e Confiança */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#FFB800]" />
                Segurança do Cliente
              </h4>
              <p className="text-xs text-[#9BA3B0] leading-relaxed mb-2">
                Nunca forneça seu ID ou senha temporária a pessoas não autorizadas. Nossos técnicos
                atendem somente através dos canais homologados.
              </p>
              <div className="p-2.5 rounded-lg bg-[#14171C] border border-[#232830] text-[11px] text-[#F2F4F8]">
                Senha rotativa: renovada automaticamente a cada nova sessão.
              </div>
            </div>

            {/* Coluna 4: Contato Oficial */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Central de Atendimento
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>{NETWORK_REMOTE_CONFIG.contactPhone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#22C55E]" />
                  <a
                    href={`https://wa.me/${NETWORK_REMOTE_CONFIG.contactWhatsApp}?text=Olá,%20gostaria%20de%20confirmar%20a%20identidade%20de%20um%20técnico%20da%20Network.`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors underline flex items-center gap-1"
                  >
                    {NETWORK_REMOTE_CONFIG.contactWhatsAppFormatted}
                    <ExternalLink className="w-3 h-3 text-[#9BA3B0]" />
                  </a>
                </li>
                <li className="text-[11px] text-[#9BA3B0] pt-1">
                  Horário: {NETWORK_REMOTE_CONFIG.supportHours}
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#232830] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9BA3B0] gap-4">
            <p>
              © {new Date().getFullYear()} <strong>Network Soluções</strong>. Todos os direitos
              reservados.
            </p>
            <p className="text-center sm:text-right">
              Módulo Network Remote • Tecnologia de Conexão Criptografada Network Infra
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
