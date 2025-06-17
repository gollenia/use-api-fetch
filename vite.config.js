import { defineConfig } from "vite"

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.js",
            name: "useApiFetch",
            fileName: (format) => `use-api-fetch.${format}.js`,
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["@wordpress/api-fetch", "react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "@wordpress/api-fetch": "wp.apiFetch",
                },
            },
        },
    },
})
