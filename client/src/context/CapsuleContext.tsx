// context/CapsuleContext.tsx
import { createContext, useContext, useState } from 'react';
import { Media } from '../types';

interface Capsule {
  id: string;
  title: string;
  description: string;
  unlockDate: Date;
  isPublic: boolean;
  mediaItems: Media[];
}

interface CapsuleContextType {
  capsules: Capsule[];
  addCapsule: (capsule: Capsule) => void;
}

const CapsuleContext = createContext<CapsuleContextType>({
  capsules: [],
  addCapsule: () => {},
});

export const CapsuleProvider = ({ children }: { children: React.ReactNode }) => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);

  const addCapsule = (capsule: Capsule) => {
    setCapsules(prev => [...prev, capsule]);
  };

  return (
    <CapsuleContext.Provider value={{ capsules, addCapsule }}>
      {children}
    </CapsuleContext.Provider>
  );
};

export const useCapsules = () => useContext(CapsuleContext);