// Typing env variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly DB_URL: string;
  }
}
