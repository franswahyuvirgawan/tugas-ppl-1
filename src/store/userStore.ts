import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  newNim: string;
  updateNewNim: (newNim: string) => void;
  newPassword: string;
  updatenewPassword: (newPassword: string) => void;
  userToken: string;
  updateUserToken: (userToken: string) => void;
}

const useUserStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        newNim: "",
        updateNewNim: (newNim: string) => set({ newNim }),
        newPassword: "",
        updatenewPassword: (newPassword: string) => set({ newPassword }),
        userToken: "",
        updateUserToken: (userToken: string) => set({ userToken }),
      }),
      { name: "useUserStore" }
    )
  )
);

export default useUserStore;
