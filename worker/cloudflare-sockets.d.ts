// Types voor de TCP-sockets van Cloudflare Workers (alleen wat smtp.ts gebruikt).
// https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/
declare module "cloudflare:sockets" {
  export interface Socket {
    readonly readable: ReadableStream<Uint8Array>;
    readonly writable: WritableStream<Uint8Array>;
    readonly opened: Promise<unknown>;
    readonly closed: Promise<void>;
    close(): Promise<void>;
    startTls(): Socket;
  }

  export function connect(
    address: string | { hostname: string; port: number },
    options?: {
      secureTransport?: "off" | "on" | "starttls";
      allowHalfOpen?: boolean;
    },
  ): Socket;
}
