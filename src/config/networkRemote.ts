/**
 * CONFIGURAÇÕES CENTRAIS DE INTEGRAÇÃO — NETWORK REMOTE
 *
 * Atenção: Este arquivo reúne as variáveis e constantes de integração do
 * RustDesk self-hosted mantido por Cláudio para a Network Soluções.
 *
 * CRITÉRIO DE ACEITE: Nenhuma função inexistente deve ser apresentada como operacional.
 * Quando o executável oficial e as chaves estiverem prontos, somente este arquivo precisa ser atualizado.
 */

export interface RemoteConfig {
  /**
   * Link definitivo para download do executável oficial Network Remote para Windows.
   * Em v1: Vazio ("") — o botão de download exibe estado "Em preparação" (desabilitado).
   * TODO (Cláudio): Preencher com a URL direta do executável (ex: https://infra.networksolucoes.com.br/downloads/NetworkRemote-x64.exe)
   */
  appDownloadUrl: string

  /**
   * Versão nominal do executável Network Remote.
   * Informativo para exibição na página de suporte.
   */
  appVersion: string

  /**
   * Tamanho estimado do pacote do instalador/executável cliente.
   */
  appFileSize: string

  /**
   * Nome oficial da aplicação client-side.
   */
  appName: string

  /**
   * Caminho ou protocolo registrado do aplicativo do técnico no ambiente de trabalho.
   * Ex: "network-remote://" ou "C:\\Program Files\\Network Remote\\technician.exe"
   * TODO (Cláudio): Definir esquema de URI ou caminho do launcher desktop para abertura automática.
   */
  technicianAppScheme: string

  /**
   * Servidor de sinalização e ID do RustDesk self-hosted (HBBS).
   * TODO (Cláudio): Configurar hostname/IP definitivo da VPS Network Soluções.
   */
  serverHost: string

  /**
   * Servidor de relay de dados do RustDesk self-hosted (HBBR).
   * TODO (Cláudio): Configurar hostname/IP definitivo da VPS Network Soluções.
   */
  relayHost: string

  /**
   * Chave pública de criptografia do servidor Network (RustDesk pub key).
   * TODO (Cláudio): Adicionar a chave pública após a compilação do cliente customizado.
   */
  serverPublicKey: string

  /**
   * Telefone e WhatsApp oficial da Network Soluções para confirmação da identidade do técnico.
   */
  contactPhone: string
  contactWhatsApp: string
  contactWhatsAppFormatted: string
  supportHours: string
}

export const NETWORK_REMOTE_CONFIG: RemoteConfig = {
  // ATENÇÃO: Link vazio em v1 conforme especificação. O botão de download deve ficar "Em preparação".
  // TODO (Cláudio): Inserir URL final do executável compilado com a marca Network Soluções.
  appDownloadUrl: '',

  appVersion: '1.0.0 (Windows 64-bit)',
  appFileSize: '~16 MB',
  appName: 'Network Remote',

  // TODO (Cláudio): Definir protocolo URI (ex: networkremote://connect/{id}) ou script local para inicialização.
  technicianAppScheme: 'rustdesk://',

  // TODO (Cláudio): Preencher após provisionamento da VPS Network Infra (HBBS / HBBR).
  serverHost: 'remote.networksolucoes.com.br',
  relayHost: 'relay.networksolucoes.com.br',
  serverPublicKey: 'TODO_CHAVE_PUBLICA_RUSTDESK_CLAUDIO',

  // Contato oficial de atendimento e segurança
  contactPhone: '(53) 98431-0395',
  contactWhatsApp: '5553984310395',
  contactWhatsAppFormatted: '(53) 98431-0395',
  supportHours: 'Segunda a Sexta, das 08h às 18h',
}
