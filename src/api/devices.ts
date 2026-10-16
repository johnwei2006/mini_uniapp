import request from './request';
import type { ApiResponse, Device } from '@/types';

export function listDevices(): Promise<ApiResponse<Device[]>> {
  return request<Device[]>({ url: '/api/devices', method: 'GET' });
}

export function getDevice(id: string): Promise<ApiResponse<Device>> {
  return request<Device>({ url: `/api/devices/${id}`, method: 'GET' });
}

export function latestData(deviceId: string): Promise<ApiResponse<unknown>> {
  return request<unknown>({ url: '/api/data/latest', method: 'GET', data: { deviceId } });
}
