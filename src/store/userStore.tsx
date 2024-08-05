import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  id: string;
  theme_id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  theme: any;
  colors: any[];
  allLinks: any;
  isMobile: boolean;
  updatedLinkId: number;
  addLinkOverlay: boolean;
  isPreviewOverlay: boolean;
  setColors: (colors: any[]) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: '',
      theme_id: '',
      name: '',
      email: '',
      image: '',
      bio: '',
      theme: null,
      colors: [],
      allLinks: null,
      isMobile: false,
      updatedLinkId: 0,
      addLinkOverlay: false,
      isPreviewOverlay: false,
      setColors: (colors: any[]) => set({ colors }),
    }),
    {
      name: 'user-storage',
    }
  )
);
