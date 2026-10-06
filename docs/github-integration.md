# Diagnóstico e Integração GitHub — Network Remote

## 1. Status da Verificação do Runtime

Em validação realizada no ambiente de execução do projeto após a conexão da conta do GitHub no painel do Skip:

- **Variáveis de Ambiente / Segredos no Runtime**:
  - `PB_INSTANCE_URL`: Presente (Infraestrutura PocketBase)
  - `PB_SUPERUSER_TOKEN`: Presente (Infraestrutura PocketBase)
  - `SITE_URL`: Presente
  - `SKIP_AI_GATEWAY_API_KEY`: Presente
  - `SKIP_AI_GATEWAY_URL`: Presente
  - _Variáveis de GitHub (`GITHUB_TOKEN`, `GH_TOKEN`, PAT ou SSH keys)_: **Não injetadas no runtime**.

- **Acesso a Linha de Comando / Git Remoto**:
  - O container de execução e a camada de automação do agente não possuem terminal interativo (shell), comando `git` ou remotes configurados localmente.
  - Não há ferramentas de conector de terceiros para push direto via API no runtime.

## 2. Como Funciona a Integração GitHub no Skip

Na arquitetura da plataforma Skip:

1. A autenticação OAuth com o GitHub fica associada à **conta do usuário no painel da plataforma**, mantendo as credenciais seguras e isoladas do ambiente de execução dos projetos.
2. O versionamento, sincronização de branches e push para o repositório remoto são executados pela **plataforma Skip (painel de controle)**, e não por scripts no contêiner do projeto.

## 3. Passo a Passo para Concluir o Push pelo Painel

Com a conta do GitHub conectada:

1. Acesse o **painel do projeto Network Remote** na plataforma Skip.
2. Localize a seção **GitHub / Exportar Repositório** (ou clique no ícone do GitHub no cabeçalho/menu do projeto).
3. Selecione a opção para exportar ou sincronizar com o repositório remoto.
4. Sugestão de nome para o repositório: **`network-remote`** (visibilidade pública ou privada, conforme preferência).
5. O painel da plataforma criará o repositório e enviará todos os arquivos do projeto, incluindo o `README.md` completo e o histórico de commits.
