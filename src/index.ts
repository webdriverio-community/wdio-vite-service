import type { Options } from '@wdio/types'

import { ViteServiceLauncher } from './launcher.js'

export const launcher = ViteServiceLauncher
export default class ViteService {
    beforeSession (config: Options.Testrunner) {
        config.baseUrl = process.env.WDIO_BASE_URL
    }
}
