import type { ApiResponse } from '@/types';
import { storage } from '@/utils/storage';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  url: string;
  method?: RequestMethod;
  data?: object;
  header?: Record<string, string>;
}

/**
 * 后端基础地址：通过 .env 的 VITE_API_BASE 配置。
 * - H5：可设为相对地址 '' 并配合 vite.config 的 devServer 代理到 platform_java(8081)
 * - 微信小程序：必须设为可访问的绝对地址（如 http://192.168.x.x:8081），
 *   并在 manifest 关闭 urlCheck（开发期）。
 */
const BASE_URL = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:8081';

function authHeader(): Record<string, string> {
  const token = storage.get<string>('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** uni.request Promise 化封装，统一解包 ApiResponse 与错误提示 */
export function request<T = unknown>(options: RequestOptions): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data as Record<string, unknown> | string | ArrayBuffer | undefined,
      header: {
        'Content-Type': 'application/json',
        ...authHeader(),
        ...options.header,
      },
      success: (res) => {
        const data = res.data as ApiResponse<T>;
        if (data && (data.code === 0 || data.code === 200)) {
          resolve(data);
        } else {
          uni.showToast({ title: data?.message || '请求失败', icon: 'none' });
          reject(data);
        }
      },
      fail: () => {
        uni.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
        reject(new Error('network error'));
      },
    });
  });
}

/** 便捷方法：直接返回响应体中的 data 字段 */
export const http = {
  get<T = unknown>(url: string, data?: Record<string, unknown>) {
    return request<T>({ url, method: 'GET', data }).then((r) => r.data);
  },
  post<T = unknown>(url: string, data?: Record<string, unknown>) {
    return request<T>({ url, method: 'POST', data }).then((r) => r.data);
  },
  put<T = unknown>(url: string, data?: Record<string, unknown>) {
    return request<T>({ url, method: 'PUT', data }).then((r) => r.data);
  },
  delete<T = unknown>(url: string) {
    return request<T>({ url, method: 'DELETE' }).then((r) => r.data);
  },
};

export default request;
