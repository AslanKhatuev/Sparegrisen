import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSparekalkStore = create(
  persist(
    (set) => ({
      maanedligBelop: 2000,
      rente: 4.5,
      antallAar: 10,
      setMaanedligBelop: (v) => set({ maanedligBelop: v }),
      setRente: (v) => set({ rente: v }),
      setAntallAar: (v) => set({ antallAar: v }),
    }),
    { name: "sparekalkulator-storage" }
  )
);

export const useVaneStore = create(
  persist(
    (set) => ({
      vaner: [
        { id: 1, navn: "Snus (1 boks/dag)", kostnadPerDag: 35 },
        { id: 2, navn: "Kaffe ute", kostnadPerDag: 50 },
      ],
      rente: 4.5,
      antallAar: 5,
      setVaner: (vaner) => set({ vaner }),
      leggTilVane: (vane) =>
        set((state) => ({ vaner: [...state.vaner, vane] })),
      fjernVane: (id) =>
        set((state) => ({ vaner: state.vaner.filter((v) => v.id !== id) })),
      oppdaterVane: (id, felt, verdi) =>
        set((state) => ({
          vaner: state.vaner.map((v) =>
            v.id === id ? { ...v, [felt]: verdi } : v
          ),
        })),
      setRente: (v) => set({ rente: v }),
      setAntallAar: (v) => set({ antallAar: v }),
    }),
    { name: "vane-storage" }
  )
);
