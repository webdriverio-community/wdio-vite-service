import { browser, $, expect } from '@wdio/globals'

describe('Vite Service', () => {
    it('should have started server', async () => {
        await browser.url('/')
        await expect($('aria/Vite + Lit')).toBePresent()
    })
})
