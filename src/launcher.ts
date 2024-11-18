import logger from '@wdio/logger'
import getPort from 'get-port'
import {
    createServer, loadConfigFromFile, type ViteDevServer, type ConfigEnv
} from 'vite'
import { SevereServiceError } from 'webdriverio'

import { pkg } from './constants.js'
import type { ViteServiceOptions } from './types'

const log = logger('wdio-vite-service')

export class ViteServiceLauncher {
    #options: Required<ViteServiceOptions>
    #server?: ViteDevServer

    constructor (options: ViteServiceOptions) {
        log.info(`Initiate Vite Service (v${pkg.version})`)
        this.#options = <Required<ViteServiceOptions>>{
            configFile: 'vite.config.ts',
            configRoot: process.cwd(),
            mode: 'development',
            logLevel: 'info',
            ...options
        }
    }

    public async onPrepare () {
        const port = await getPort()
        const configEnv: ConfigEnv = {
            command: 'serve',
            mode: this.#options.mode
        }
        const viteConf = await loadConfigFromFile(
            configEnv,
            this.#options.configFile,
            this.#options.configRoot,
            this.#options.logLevel
        )

        if (!viteConf) {
            throw new SevereServiceError(`Failed to load Vite config at ${this.#options.configFile}`)
        }

        const server = viteConf.config.server || {}
        server.port = server?.port || port
        server.host = server?.host || 'localhost'
        this.#server = await createServer({
            configFile: viteConf?.path,
            root: this.#options.configRoot,
            server
        })

        const hostname = this.#server.config.server.host || 'localhost'
        const host = `${hostname}:${this.#server.config.server.port}`
        process.env.WDIO_BASE_URL = `http://${host}`
        await this.#server.listen()
        log.info(`Vite server started on ${host}`)
    }

    public async onComplete () {
        if (this.#server) {
            await this.#server.close()
        }
    }
}
