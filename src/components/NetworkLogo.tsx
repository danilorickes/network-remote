import React from 'react'
import networkSymbolSvg from '@/assets/network-symbol.svg'

interface NetworkLogoProps {
  /**
   * Variante de tamanho:
   * 'sm': header compacto (símbolo 32px)
   * 'md': padrão (símbolo 40px)
   * 'lg': hero / tela de login (símbolo 52px)
   * 'xl': destaque máximo (símbolo 64px)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Subtítulo / segmento da marca:
   * 'REMOTE' (padrão do módulo Network Remote)
   * 'SOLUCOES' ("Soluções")
   * 'INFRA' ("INFRA")
   */
  subtitle?: string
  /**
   * Se true, oculta o subtítulo e renderiza apenas "NetworK"
   */
  hideSubtitle?: boolean
  className?: string
  onClick?: () => void
}

/**
 * Componente NetworkLogo Oficial da Network Soluções.
 *
 * REGRAS DE IDENTIDADE VISUAL:
 * - O usuário possui o arquivo oficial da marca: NÃO redesenhar nem substituir o símbolo por outra arte.
 * - NUNCA usar apenas uma letra "N" como símbolo.
 * - O símbolo é carregado de `src/assets/network-symbol.svg` (placeholder claramente marcado para substituição com TODO).
 * - Composição tipográfica obrigatória:
 *     - "NetworK" como nome principal (com N e K maiúsculos característicos).
 *     - Subtítulo ("REMOTE") menor, abaixo e alinhado à direita, seguindo a mesma composição usada no logo "NetworK Soluções".
 */
export const NetworkLogo: React.FC<NetworkLogoProps> = ({
  size = 'md',
  subtitle = 'REMOTE',
  hideSubtitle = false,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: { symbol: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]', tracking: 'tracking-[0.22em]' },
    md: { symbol: 'w-9 h-9', text: 'text-2xl', sub: 'text-[11px]', tracking: 'tracking-[0.26em]' },
    lg: { symbol: 'w-12 h-12', text: 'text-3xl', sub: 'text-xs', tracking: 'tracking-[0.28em]' },
    xl: { symbol: 'w-16 h-16', text: 'text-4xl', sub: 'text-sm', tracking: 'tracking-[0.32em]' },
  }

  const currentSize = sizeMap[size]

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      aria-label="NetworK Remote - Logo Oficial"
    >
      {/* Símbolo Oficial da Marca Network Soluções */}
      {/* TODO: Substituir src/assets/network-symbol.svg pelo arquivo SVG oficial definitivo da marca */}
      <div className="relative flex-shrink-0">
        <img
          src={networkSymbolSvg}
          alt="Símbolo Network"
          className={`${currentSize.symbol} object-contain transition-transform duration-200 hover:scale-105`}
        />
        <div className="absolute inset-0 bg-[#FFB800]/15 blur-md rounded-full pointer-events-none -z-10" />
      </div>

      {/* Composição Tipográfica: NetworK + Subtítulo Alinhado à Direita */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black text-white ${currentSize.text} tracking-tight font-sans`}
          style={{ letterSpacing: '-0.03em' }}
        >
          Networ<span className="text-[#FFB800]">K</span>
        </span>
        {!hideSubtitle && (
          <span
            className={`font-extrabold text-[#FFB800] text-right uppercase ${currentSize.sub} ${currentSize.tracking} -mt-0.5`}
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}

export default NetworkLogo
