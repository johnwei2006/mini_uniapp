/** 后端统一响应结构（按实际后端约定调整 code 取值） */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface UserInfo {
  id: number;
  nickname: string;
  avatar?: string;
  roles: string[];
}

export interface LoginPayload {
  username: string;
  password: string;
}
