migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    const sessionsCol = app.findCollectionByNameOrId('remote_support_sessions')

    // 1. Garantir que o usuário técnico exista (idempotente)
    let techUser
    try {
      techUser = app.findAuthRecordByEmail('_pb_users_auth_', 'danilorickes@gmail.com')
    } catch (_) {
      techUser = new Record(users)
      techUser.setEmail('danilorickes@gmail.com')
      techUser.setPassword('Skip@Pass')
      techUser.setVerified(true)
      techUser.set('name', 'Danilo Rickes (Técnico)')
      app.save(techUser)
    }

    // 2. Inserir atendimentos de exemplo idempotentes
    const sampleSessions = [
      {
        remote_id: '847 291 035',
        client_name: 'Contabilidade Alpha — Márcia Santos',
        client_email: 'marcia@contabilidadealpha.com.br',
        is_ad_hoc: false,
        os_number: 'OS-2025-0891',
        technician_id: techUser.id,
        started_at: '2025-05-12 09:15:00.000Z',
        ended_at: '2025-05-12 09:48:00.000Z',
        reason: 'Falha na sincronização do certificado digital A1 com o emissor fiscal.',
        has_file_transfer: true,
        transfer_log:
          '12/05 09:30 - driver_cert_a1_patch.msi (Técnico -> Cliente) por Danilo Rickes',
        observations:
          'Reinstalado gerenciador de certificados criptográficos e reimportado o certificado A1 da matriz. Teste de emissão NFe concluído com sucesso.',
        status: 'concluido',
      },
      {
        remote_id: '619 402 188',
        client_name: 'Dr. Roberto Guimarães (Cliente Avulso)',
        client_email: 'roberto.adv@gmail.com',
        is_ad_hoc: true,
        os_number: 'OS-2025-0894',
        technician_id: techUser.id,
        started_at: '2025-05-13 14:00:00.000Z',
        ended_at: '2025-05-13 14:32:00.000Z',
        reason: 'Configuração de impressora de rede e permissões no sistema de gestão jurídica.',
        has_file_transfer: false,
        transfer_log: '',
        observations:
          'Mapeada porta de spooler TCP/IP 192.168.1.150 e restabelecida a fila de impressão. Acesso concluído e liberado.',
        status: 'concluido',
      },
      {
        remote_id: '305 918 724',
        client_name: 'Logística Express Ltda — Servidor Arquivos',
        client_email: 'ti@logisticaexpress.com.br',
        is_ad_hoc: false,
        os_number: 'OS-2025-0899',
        technician_id: techUser.id,
        started_at: '2025-05-14 10:20:00.000Z',
        ended_at: '2025-05-14 11:05:00.000Z',
        reason: 'Rotina de limpeza de cache de disco e verificação de integridade de backup.',
        has_file_transfer: true,
        transfer_log:
          '14/05 10:45 - relatorio_backup_semanal.txt (Cliente -> Técnico) por Danilo Rickes',
        observations:
          'Executado script de purga de logs antigos. Liberados 45GB no volume compartilhado. Backup validado.',
        status: 'concluido',
      },
    ]

    for (const s of sampleSessions) {
      try {
        app.findFirstRecordByData('remote_support_sessions', 'remote_id', s.remote_id)
      } catch (_) {
        const record = new Record(sessionsCol)
        record.set('remote_id', s.remote_id)
        record.set('client_name', s.client_name)
        record.set('client_email', s.client_email)
        record.set('is_ad_hoc', s.is_ad_hoc)
        record.set('os_number', s.os_number)
        record.set('technician_id', s.technician_id)
        record.set('started_at', s.started_at)
        record.set('ended_at', s.ended_at)
        record.set('reason', s.reason)
        record.set('has_file_transfer', s.has_file_transfer)
        record.set('transfer_log', s.transfer_log)
        record.set('observations', s.observations)
        record.set('status', s.status)
        app.save(record)
      }
    }
  },
  (app) => {
    // down: no-op ou limpar seeds se necessário
  },
)
