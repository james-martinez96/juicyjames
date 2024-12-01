import {resolve, dirname} from 'path';
import {fileURLToPath} from 'url';
import HTMLWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'static'),
        clean: true,
        assetModuleFilename: '[name][ext]'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            },

            {
                test: /\.html$/i,
                use: ['html-loader'],
            },

            {
                test: /.css$/,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.(gltf|glb)$/,
                type: 'asset/resource'
            }
        ]
    }
};
