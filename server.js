const Bundler = require('parcel-bundler');
const express = require('express');
const proxy = require('http-proxy-middleware');

const DJANGO_RUNSERVER_PORT = 8000;

const WS_URL = `ws://127.0.0.1:${DJANGO_RUNSERVER_PORT}/ws/`;
const ENTRY = 'frontend/index.html';
const PORT = Number(process.env.PORT || 1234);

const wsProxy = proxy(WS_URL);
const bundler = new Bundler(ENTRY);

const app = express();
app.use(wsProxy);
app.use(bundler.middleware());
const server = app.listen(PORT);
server.on('upgrade', wsProxy.upgrade);
console.log(`Listening on http://127.0.0.1:${PORT}`);
