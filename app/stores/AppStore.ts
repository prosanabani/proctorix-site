import { getInitialTheme } from '@/utils/functions/GlobalFunctions';
import { type User } from 'firebase/auth';
import { type ToastMessage } from 'primereact/toast';
import { create } from 'zustand';

type TAppStore = {
  actions: {
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    setUser: (user: User | null) => void;
    showToast: (ToastMessage: ToastMessage | null) => void;
  };
  theme: 'light' | 'dark' | 'system';
  toast: ToastMessage | null;
  user: User | null;
};

const useAppStore = create<TAppStore>((set) => ({
  actions: {
    setTheme: (theme) => set({ theme }),
    setUser: (user) => set({ user }),
    showToast: (toast) => set({ toast }),
  },
  theme: getInitialTheme(), // Default theme
  toast: null,
  user: null,
}));

export default useAppStore;

export const { showToast, setUser, setTheme } = useAppStore.getState().actions;
