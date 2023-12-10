// https://velog.io/@pikadev1771/Next.js-%EB%A1%9C%EC%BB%AClocalhost%EC%97%90-https-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
// MAKE KEY FIRST: mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1

const http = require('http');
const { parse } = require('url');
const next = require('next');

const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 4000;

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });

  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT + 1, (err) => {
      if (err) throw err;
      console.log(`> HTTPS: Ready on https://localhost:${PORT + 1}`);
    });
});
