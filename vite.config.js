import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/css/test.css', 'resources/css/principal.css', 'resources/js/app.js', 'resources/js/login.js', 'resources/js/web.js', 'resources/js/grafica.js'],
            refresh: true,
        }),
    ],
});
