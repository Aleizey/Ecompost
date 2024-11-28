import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/css/test.css', 'resources/js/app.js', 'resources/js/login.js', 'resources/js/crud.js'],
            refresh: true,
        }),
    ],
});
