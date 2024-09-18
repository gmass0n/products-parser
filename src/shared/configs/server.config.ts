import { registerAs } from '@nestjs/config';

export type ServerConfig = {
  host: string;
  port: number;
};

export const parseServerConfig = registerAs('server', (): ServerConfig => {
  const { HOST: envHost = '0.0.0.0', PORT: envPort = '3000' } = process.env;

  return {
    host: envHost === '127.0.0.1' ? '0.0.0.0' : envHost,
    port: Number(envPort),
  };
});
