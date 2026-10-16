const PREFIX = 'app_';

/** 基于 uni 存储 API 的封装（同步接口，带命名空间） */
export const storage = {
  get<T = unknown>(key: string): T | null {
    const value = uni.getStorageSync(PREFIX + key);
    if (value === '' || value === null || value === undefined) return null;
    return value as T;
  },
  set(key: string, value: unknown): void {
    uni.setStorageSync(PREFIX + key, value);
  },
  remove(key: string): void {
    uni.removeStorageSync(PREFIX + key);
  },
  clear(): void {
    uni.clearStorageSync();
  },
};
