const express = require('express')
const { webpack } = require('webpack')
const path = require('path')
require('dotenv').config()


const app = express()

if (process.env.NODE_ENV === 'development') {

    console.log('Compiling for development environment')

    const middleware = require('webpack-dev-middleware')
    const compiler = webpack(require('../webpack.config'))
    app.use(middleware(compiler))
    app.use(require('webpack-hot-middleware')(compiler))
}

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/index.html'))
})

app.listen(3000)