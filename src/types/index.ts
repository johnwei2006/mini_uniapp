/** 后端统一响应结构（platform_java 约定：code=200 成功） */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** 登录返回结果 */
export interface LoginResult {
  token: string;
  username: string;
  role: string;
}

export interface UserInfo {
  nickname: string;
  roles: string[];
  username?: string;
  role?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

/** 设备 */
export interface Device {
  id?: string;
  deviceId: string;
  nodeId?: string;
  name?: string;
  identifierType?: string;
  status?: string;
  lastSeen?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** 告警 */
export interface Alarm {
  id?: string;
  deviceId: string;
  rule?: string;
  level?: string;
  message?: string;
  status?: string;
  createdAt?: string;
  resolvedAt?: string;
}
