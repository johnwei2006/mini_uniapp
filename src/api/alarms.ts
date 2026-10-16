import request from './request';
import type { ApiResponse, Alarm } from '@/types';

export function listAlarms(status?: string): Promise<ApiResponse<Alarm[]>> {
  return request<Alarm[]>({ url: '/api/alarms', method: 'GET', data: status ? { status } : undefined });
}

export function resolveAlarm(id: string): Promise<ApiResponse<Alarm>> {
  return request<Alarm>({ url: `/api/alarms/${id}/resolve`, method: 'POST' });
}
