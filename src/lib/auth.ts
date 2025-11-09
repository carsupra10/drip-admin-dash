import { totp, authenticator } from 'otplib';
import QRCode from 'qrcode';

export interface User {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  role: 'superadmin' | 'partner_owner' | 'partner_staff' | 'user';
  partnerId?: string;
  partnerName?: string;
  totpEnabled: boolean;
}

// Mock users database
const mockUsers: Record<string, User & { totpSecret?: string }> = {
  'admin': {
    id: 'usr_001',
    username: 'admin',
    email: 'admin@dripxplore.com',
    name: 'Super Administrator',
    role: 'superadmin',
    totpEnabled: true,
    totpSecret: 'JBSWY3DPEHPK3PXP' // Mock secret for testing
  },
  'sarah@urbanfashion.com': {
    id: 'usr_002',
    email: 'sarah@urbanfashion.com',
    name: 'Sarah Wilson',
    role: 'partner_owner',
    partnerId: 'ptr_001',
    partnerName: 'Urban Fashion Store',
    totpEnabled: false
  }
};

export const detectAuthMethod = (identifier: string): 'superadmin' | 'oauth' => {
  if (!identifier.includes('@')) {
    return mockUsers[identifier]?.role === 'superadmin' ? 'superadmin' : 'oauth';
  }
  return 'oauth';
};

export const verifyTOTP = (identifier: string, code: string): boolean => {
  const user = mockUsers[identifier];
  if (!user?.totpSecret) return false;
  
  // For demo purposes, accept "123456" or valid TOTP
  if (code === '123456') return true;
  
  return totp.check(code, user.totpSecret);
};

export const generateTOTPSecret = async (username: string): Promise<{ secret: string; qrCode: string }> => {
  const secret = authenticator.generateSecret();
  const uri = authenticator.keyuri(username, 'DripXplore Admin', secret);
  const qrCode = await QRCode.toDataURL(uri);
  
  return { secret, qrCode };
};

export const loginUser = (identifier: string, totpCode?: string): User | null => {
  const user = mockUsers[identifier];
  if (!user) return null;
  
  if (user.role === 'superadmin' && user.totpEnabled) {
    if (!totpCode || !verifyTOTP(identifier, totpCode)) {
      return null;
    }
  }
  
  const { totpSecret, ...userWithoutSecret } = user;
  return userWithoutSecret;
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

export const logout = () => {
  setCurrentUser(null);
};
