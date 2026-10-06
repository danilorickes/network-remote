migrate(
  (app) => {
    const usersCollection = app.findCollectionByNameOrId('_pb_users_auth_')

    const collection = new Collection({
      name: 'remote_support_sessions',
      type: 'base',
      listRule: "@request.auth.id != '' && technician_id = @request.auth.id",
      viewRule: "@request.auth.id != '' && technician_id = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != '' && technician_id = @request.auth.id",
      deleteRule: null,
      fields: [
        { name: 'remote_id', type: 'text', required: true },
        { name: 'client_name', type: 'text' },
        { name: 'client_email', type: 'text' },
        { name: 'client_id', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'is_ad_hoc', type: 'bool' },
        { name: 'os_number', type: 'text' },
        {
          name: 'technician_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        },
        { name: 'started_at', type: 'date', required: true },
        { name: 'ended_at', type: 'date' },
        { name: 'reason', type: 'text', required: true },
        { name: 'has_file_transfer', type: 'bool' },
        { name: 'transfer_log', type: 'text' },
        { name: 'observations', type: 'text' },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['em_andamento', 'concluido'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_remote_status ON remote_support_sessions (status)',
        'CREATE INDEX idx_remote_technician ON remote_support_sessions (technician_id)',
        'CREATE INDEX idx_remote_started ON remote_support_sessions (started_at)',
        'CREATE INDEX idx_remote_id ON remote_support_sessions (remote_id)',
      ],
    })

    app.save(collection)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('remote_support_sessions')
      app.delete(collection)
    } catch (_) {}
  },
)
