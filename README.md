# Network Remote — NetworK Infra

Módulo de suporte e assistência técnica remota integrado ao ecossistema NetworK Soluções / NetworK Infra.

## 🚀 Sobre o Projeto

O **Network Remote** é uma solução completa para gestão de atendimentos remotos, emissão de códigos de sessão (Remote ID) para clientes, e console operacional em tempo real para a equipe de técnicos e especialistas de TI.

### Principais Funcionalidades

- **Portal do Cliente (`/suporte`)**:
  - Geração de Remote ID com código numérico seguro de 9 dígitos.
  - Interface estilo cliente desktop com status de conexão em tempo real.
  - Transferência de arquivos e registro de histórico de sessão.
  - Acesso direto ao canal de atendimento técnico e solicitação de suporte.

- **Console do Técnico (`/tecnico`)**:
  - Painel operacional protegido por autenticação.
  - Monitoramento de sessões ativas e fila de espera.
  - Vinculação de Ordens de Serviço (O.S.) e registro de observações técnicas.
  - Sincronização em tempo real via PocketBase Realtime subscriptions.
  - Histórico completo de sessões com status `em_andamento` e `concluido`.

- **Autenticação e Segurança**:
  - Fluxo completo de autenticação (Login, Registro, Recuperação de Senha e Validação de E-mail).
  - Rotas protegidas com contexto de usuário (`AuthContext`).

## 🛠️ Stack Tecnológica

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Componentes**: Radix UI / Shadcn UI, Lucide Icons
- **Roteamento**: React Router v7
- **Backend / BaaS**: PocketBase (Skip Cloud)
- **Tempo Real**: PocketBase Realtime Subscriptions
- **Validação de Formulários**: React Hook Form + Zod

## 📁 Estrutura de Diretórios

```
.
├── pocketbase/
│   └── migrations/             # Migrações do banco PocketBase
├── public/                     # Ativos estáticos e logos
├── src/
│   ├── assets/                 # Símbolo oficial da marca NetworK
│   ├── components/             # Componentes modulares (Layout, Logo, Mockups)
│   ├── config/                 # Configurações do Network Remote
│   ├── contexts/               # Provedor de autenticação (AuthContext)
│   ├── hooks/                  # Hooks customizados (useRealtime, useToast)
│   ├── lib/                    # Clientes de API e utilitários
│   ├── pages/                  # Páginas da aplicação (Index, Suporte, Técnico, etc.)
│   └── services/               # Serviços de dados (remoteSessionsService)
└── package.json
```

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
# ou
npm run dev

# Executar linting e validação
npm run lint

# Gerar build de produção
npm run build
```

---
*Desenvolvido para NetworK Soluções — Módulo Network Remote.*
