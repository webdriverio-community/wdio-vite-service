exports.launcher = class CJSViteServiceLauncher {
    private instance?: any

    constructor (options: any, _: never, config: any) {
        this.instance = import('../index.js').then((ViteServiceLauncher) => (
            new ViteServiceLauncher.launcher(options, _, config)
        ))
    }

    async onPrepare () {
        const instance = await this.instance
        return instance.beforeSession()
    }
}
