// see https://github.com/architect/sandbox
declare module "@architect/sandbox" {
  export type SandboxOptions = { port?: string; quiet?: boolean };

  interface SandboxCallback {
    (): void;
  }

  export function start(options?: SandboxOptions): Promise<unknown>;

  export function start(
    options?: SandboxOptions,
    callback: SandboxCallback
  ): void;

  export function end(options?: SandboxOptions): Promise<unknown>;

  export function start(
    options?: SandboxOptions,
    callback: SandboxCallback
  ): void;
}
