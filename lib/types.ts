export interface CliParams {
  files: string[]
  pkg: Record<string, unknown>
  port?: number
}

export interface ConfigOptions {
}

export interface RenderConfig {
  name: string
  version: string
  matching: {
    paths?: string[]
    types?: string[]
  }
}

export interface RenderOptions {
  path: string
  type?: string
  contents: Buffer
}

export interface RenderResult {
  html: string
}

export type RenderFn = (options: RenderOptions) => Promise<RenderResult>;
export type ConfigFn = (options: ConfigOptions) => RenderConfig;

export interface Renderer {
  config: RenderConfig
  render: RenderFn
}

