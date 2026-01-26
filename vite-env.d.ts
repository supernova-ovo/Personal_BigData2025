/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MODE: string;
    readonly GEMINI_API_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
