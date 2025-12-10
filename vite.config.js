
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    base: './',
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'supabase.js',
                    dest: '.'
                },
                {
                    src: 'dataviz-auth-client.js',
                    dest: '.'
                }
            ]
        })
    ],
    build: {
        outDir: 'docs',
        emptyOutDir: true,
    },
});
