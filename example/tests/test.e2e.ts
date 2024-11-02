import { browser, $, expect } from '@wdio/globals'

describe('Vite Service', () => {
    it('should have started server', async () => {
        await browser.url('/')
        await expect(browser).toHaveTitle('Vite + Lit + TS')
        await expect($('aria/Vite + Lit')).toBePresent()
    })
})
