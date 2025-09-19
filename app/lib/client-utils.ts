// 客户端安全的工具函数，避免hydration mismatch

/**
 * 安全地获取当前时间戳，避免服务器和客户端不一致
 */
export function getClientTimestamp(): string {
  if (typeof window === 'undefined') {
    // 服务器端返回空字符串
    return '';
  }
  // 客户端返回实际时间
  return new Date().toLocaleTimeString();
}

/**
 * 安全地获取当前ISO时间字符串
 */
export function getClientISOString(): string {
  if (typeof window === 'undefined') {
    // 服务器端返回固定时间
    return '2025-01-01T00:00:00.000Z';
  }
  // 客户端返回实际时间
  return new Date().toISOString();
}

/**
 * 生成客户端安全的唯一ID
 */
export function generateClientId(prefix: string = ''): string {
  if (typeof window === 'undefined') {
    // 服务器端使用固定ID
    return `${prefix}server-${Math.floor(Math.random() * 1000)}`;
  }
  // 客户端使用时间戳
  return `${prefix}${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/**
 * 检查是否在客户端环境
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}
