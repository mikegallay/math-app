/* eslint no-console: { allow: ["warn", "error"] } */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const basicAuth = require('basic-auth-connect');

const serverConfig = require('./config/config').getOptions().app_server;

const webpack = (serverConfig.isDev) ? require('webpack') : null;
const webpackConfig = (serverConfig.isDev) ? require('./webpack.config.js') : null;
const webpackMiddleware = (serverConfig.isDev) ? require('webpack-dev-middleware') : null;
const webpackHotMiddleware = (serverConfig.isDev) ? require('webpack-hot-middleware') : null;

const app = express();

require('console-stamp')(console, { pattern: 'yyyy-mm-dd HH:MM:ss.l' });

/*
 * Server configuration
 */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(compression());

if (serverConfig.auth_routes) {
  serverConfig.auth_routes.forEach((element) => {
    app.use(element, basicAuth(serverConfig.user, serverConfig.password));
  });

  app.get('/logout', (req, res) => {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  });
}

/*
 * Hook up webpack middleware in dev or serve static build
 */
if (serverConfig.isDev) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'app',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, 'public/build/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, 'public/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/build/index.html'));
  });
}

/*
 * Run Express server
 */
app.listen(serverConfig.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info(`Listening on port ${serverConfig.port}`);
    if (serverConfig.isDev) console.info('Wait for webpack to finish bundling...');
  }
});
