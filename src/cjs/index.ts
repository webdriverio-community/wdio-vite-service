exports.launcher = class CJSViteServiceLauncher {
    private instance?: any

    constructor (options: any) {
        this.instance = import('../index.js').then((ViteServiceLauncher) => (
            new ViteServiceLauncher.launcher(options)
        ))
    }

    async onPrepare () {
        const instance = await this.instance
        return instance.beforeSession()
    }
}
