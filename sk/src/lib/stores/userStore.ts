import { writable } from 'svelte/store';

export interface User {
  avatar: string;
  username: string;
  email: string;
}

const createUserStore = () => {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    setUser: (user: User) => set(user),
    clearUser: () => set(null),
  };
};

export const userStore = createUserStore();
