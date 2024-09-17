declare namespace NodeJS {
  export interface ProcessEnv {
    HOST?: string;
    PORT?: number;
    DB_TYPE?: 'mongodb';
    MONGODB_URI?: string;
  }
}
