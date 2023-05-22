import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                nested: resolve(__dirname, 'nested/index.html'),
                Bookshelf: resolve(__dirname, 'pages/Bookshelf/index.html'),
                feed: resolve(__dirname, 'pages/feed/index.html'),
                Profile: resolve(__dirname, 'pages/Profile/index.html'),
                readbook: resolve(__dirname, 'pages/readbook/index.html'),
                Search: resolve(__dirname, 'pages/Search/index.html'),
                Settings: resolve(__dirname, 'pages/Settings/index.html'),
                store: resolve(__dirname, 'pages/store/index.html'),
                template: resolve(__dirname, 'pages/template/index.html'),
            },
        },
    },
})