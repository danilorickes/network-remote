import pb from '@/lib/pocketbase/client'
import type { RecordModel } from 'pocketbase'

export interface RemoteSupportSessionRecord extends RecordModel {
  remote_id: string
  client_name?: string
  client_email?: string
  client_id?: string
  is_ad_hoc: boolean
  os_number?: string
  technician_id: string
  started_at: string
  ended_at?: string
  reason: string
  has_file_transfer: boolean
  transfer_log?: string
  observations?: string
  status: 'em_andamento' | 'concluido'
  created: string
  updated: string
  expand?: {
    technician_id?: RecordModel
    client_id?: RecordModel
  }
}

export type CreateSessionInput = {
  remote_id: string
  client_name?: string
  client_email?: string
  client_id?: string
  is_ad_hoc: boolean
  os_number?: string
  technician_id: string
  started_at: string
  ended_at?: string
  reason: string
  has_file_transfer: boolean
  transfer_log?: string
  observations?: string
  status: 'em_andamento' | 'concluido'
}

export type UpdateSessionInput = Partial<CreateSessionInput>

export const remoteSessionsService = {
  /**
   * Lista atendimentos com filtros e ordenação decrescente por data
   */
  async list(params?: {
    status?: 'em_andamento' | 'concluido' | 'todos'
    search?: string
    page?: number
    perPage?: number
  }) {
    const page = params?.page || 1
    const perPage = params?.perPage || 50
    const filters: string[] = []

    if (params?.status && params.status !== 'todos') {
      filters.push(`status = "${params.status}"`)
    }

    if (params?.search && params.search.trim() !== '') {
      const q = params.search.trim().replace(/"/g, '\\"')
      filters.push(
        `(remote_id ~ "${q}" || client_name ~ "${q}" || os_number ~ "${q}" || reason ~ "${q}")`,
      )
    }

    const filterString = filters.join(' && ')

    return await pb
      .collection('remote_support_sessions')
      .getList<RemoteSupportSessionRecord>(page, perPage, {
        filter: filterString || undefined,
        sort: '-started_at',
        expand: 'technician_id,client_id',
      })
  },

  async getById(id: string) {
    return await pb.collection('remote_support_sessions').getOne<RemoteSupportSessionRecord>(id, {
      expand: 'technician_id,client_id',
    })
  },

  async create(data: CreateSessionInput) {
    return await pb.collection('remote_support_sessions').create<RemoteSupportSessionRecord>(data)
  },

  async update(id: string, data: UpdateSessionInput) {
    return await pb
      .collection('remote_support_sessions')
      .update<RemoteSupportSessionRecord>(id, data)
  },

  async delete(id: string) {
    return await pb.collection('remote_support_sessions').delete(id)
  },
}
