import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  mobile: string;
}

interface AuthContextType {
  user: User | null;
  sendOtp: (name: string, mobile: string) => Promise<void>;
  verifyOtp: (name: string, mobile: string, otp: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For demo: store OTP in localStorage (in real app, use backend)
const OTP_KEY = 'otp';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect((): void => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const sendOtp = async (name: string, mobile: string): Promise<void> => {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store OTP and user info in localStorage for demo
    localStorage.setItem(OTP_KEY, JSON.stringify({ name, mobile, otp }));
    // In real app, send OTP via SMS API here
    // For demo, alert the OTP (remove in production)
    alert(`Your OTP is: ${otp}`);
  };

  const verifyOtp = async (name: string, mobile: string, otp: string): Promise<void> => {
    const stored = localStorage.getItem(OTP_KEY);
    if (!stored) throw new Error('No OTP sent');
    const { name: storedName, mobile: storedMobile, otp: storedOtp } = JSON.parse(stored);
    if (
      storedName === name.trim() &&
      storedMobile === mobile.trim() &&
      storedOtp === otp.trim()
    ) {
      const newUser = { name: name.trim(), mobile: mobile.trim() };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.removeItem(OTP_KEY);
    } else {
      throw new Error('Invalid OTP or Name');
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, sendOtp, verifyOtp, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};