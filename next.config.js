const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
    /* turn on static export */
    output: 'export',
    images: {
        unoptimized: true,
    },

    /* module loading of .mp3 and .wav files */
    webpack: (config, options) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'app')
        config.module.rules.push(
            {
                test: /\.(mp3|wav)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[path][name].[contenthash][ext]'
                }
            },
        )
        return config
    }
}

module.exports = nextConfig
