import logger from '@wdio/logger'
import getPort from 'get-port'
import {
    createServer, loadConfigFromFile, type ViteDevServer, type ConfigEnv
} from 'vite'
import { SevereServiceError } from 'webdriverio'
import type { Options } from '@wdio/types'

import { pkg } from './constants.js'
import type { ViteServiceOptions } from './types'

const log = logger('wdio-vite-service')

export class ViteServiceLauncher {
    #options: Required<ViteServiceOptions>
    #config: Options.Testrunner
    #server?: ViteDevServer

    constructor (options: ViteServiceOptions, _: never, config: Options.Testrunner) {
        log.info(`Initiate Vite Service (v${pkg.version})`)
        this.#config = config
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

        if (!viteConf?.config.server?.port) {
            viteConf.config.server = {
                port,
                ...viteConf.config.server
            }
        }

        this.#server = await createServer({
            configFile: viteConf?.path,
            root: this.#options.configRoot,
            ...viteConf?.config
        })

        const hostname = `${this.#server.config.server.host}:${this.#server.config.server.port}`
        process.env.WDIO_BASE_URL = `http://${hostname}`
        await this.#server.listen()
        log.info(`Vite server started on ${hostname}`)
    }

    public async onComplete () {
        if (this.#server) {
            await this.#server.close()
        }
    }
}
