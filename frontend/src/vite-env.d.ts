/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORKSHEET_ID_CLOTH: number;
  readonly VITE_WORKSHEET_ID_BAG: number;
  readonly VITE_WORKSHEET_ID_SHOES: number;
  readonly VITE_WORKSHEET_ID_WALLET: number;
  readonly VITE_WORKSHEET_ID_ACC: number;
  readonly VITE_WORKSHEET_ID_SCARF: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}