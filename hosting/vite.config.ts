import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                nested: resolve(__dirname, 'nested/index.html'),
                template: resolve(__dirname, 'pages/template/index.html'),
                feed: resolve(__dirname, 'pages\\feed\\index.html'),
                readbook: resolve(__dirname, 'pages/readbook/index.html'),
                store: resolve(__dirname, 'pages\\store\\index.html'),
            },
        },
    },
})