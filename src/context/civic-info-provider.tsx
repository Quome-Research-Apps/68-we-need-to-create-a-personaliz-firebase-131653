'use client';

import type { CivicInfo } from '@/types';
import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'mygovhome-civic-info';

interface CivicInfoContextType {
  civicInfo: CivicInfo | null;
  loading: boolean;
  setCivicInfo: (data: CivicInfo | null) => void;
  clearCivicInfo: () => void;
}

const CivicInfoContext = createContext<CivicInfoContextType | undefined>(undefined);

export function CivicInfoProvider({ children }: { children: React.ReactNode }) {
  const [civicInfo, setCivicInfoState] = useState<CivicInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        setCivicInfoState(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to parse civic info from localStorage', error);
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const setCivicInfo = (data: CivicInfo | null) => {
    try {
      if (data) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setCivicInfoState(data);
    } catch (error) {
      console.error('Failed to save civic info to localStorage', error);
    }
  };
  
  const clearCivicInfo = () => {
    setCivicInfo(null);
  }

  return (
    <CivicInfoContext.Provider value={{ civicInfo, loading, setCivicInfo, clearCivicInfo }}>
      {children}
    </CivicInfoContext.Provider>
  );
}

export function useCivicInfo() {
  const context = useContext(CivicInfoContext);
  if (context === undefined) {
    throw new Error('useCivicInfo must be used within a CivicInfoProvider');
  }
  return context;
}
