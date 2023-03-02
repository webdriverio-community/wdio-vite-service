import type { LogLevel } from 'vite'

export interface ViteServiceOptions {
    /**
     * Path to config file.
     *
     * @default vite.config.ts
     */
    configFile?: string
    /**
     * Root directory of the project.
     *
     * @default `process.cwd()`
     */
    configRoot?: string
    /**
     * Define the mode used to start the server.
     * See also Vite [Modes](https://vitejs.dev/guide/env-and-mode.html#modes).
     *
     * @default `development`
     */
    mode?: string
    /**
     * Adjust console output verbosity.
     *
     * @default 'info'
     */
    logLevel?: LogLevel
}
