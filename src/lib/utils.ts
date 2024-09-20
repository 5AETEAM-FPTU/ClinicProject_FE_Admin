import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  iat: number;
  nbf: number;
  aud: string;
  iss: string;
  role?: string;
  sub: string;
  jti: string;
}

export function isNeedToRefresh(token: string): boolean {
  try {
    // Giải mã JWT
    const decoded: JwtPayload = jwtDecode(token);

    // Lấy thời gian hiện tại tính bằng giây
    const currentTime = Math.floor(Date.now() / 1000);

    // Kiểm tra nếu thời gian hết hạn còn dưới 2 phút (120 giây)
    const refreshThreshold = 120; // 2 phút = 120 giây
    return decoded.exp - currentTime <= refreshThreshold && decoded.exp - currentTime > 10;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return true; // Nếu có lỗi khi giải mã, giả định rằng cần làm mới
  }
}

export function isJwtExpired(token: string): boolean {
  try {
    // Decode the JWT
    const decoded: JwtPayload = jwtDecode(token);

    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token is expired
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return true; // Return true if there's an error, assuming the token is invalid
  }
}

export function decodeJWT(token: string) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

