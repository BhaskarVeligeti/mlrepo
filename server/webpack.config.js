const path = require('path')
const nodeExternals = require('webpack-node-externals')

/*
externals: [nodeExternals()] tells Webpack not to bundle external dependencies, thus the generated JavaScript file will only contain your code.
*/

module.exports = (env, argv) => {
    const SERVER_PATH = './src/server/prod.js'
    return ({
        // tell webpack the root file of my server application
        entry: { server: SERVER_PATH },

        // tells webpack where to put the output file generated
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js'
        },
        mode: argv.mode,
        // inform webpack that I am building a bundle for nodejs rather than for the browser
        target: 'node',
        stats: {
            all: undefined
        },
        node: {
            // Need this when working with express, otherwise the build fails
            __dirname: false,   // if you don't put this is, __dirname
            __filename: false,  // and __filename return blank or /
        },
        externals: [nodeExternals()], // we need this to avoid error when working with Express
    }) // end of return

} // end of module export











