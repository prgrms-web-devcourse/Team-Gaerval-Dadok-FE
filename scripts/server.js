/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const https = require('https');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.argv[2];
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const SELF_CERTIFICATES_PATH = {
  key: './.certificates/localhost-key.pem',
  cert: './.certificates/localhost.pem',
};

const option = {
  key: fs.readFileSync(SELF_CERTIFICATES_PATH.key),
  cert: fs.readFileSync(SELF_CERTIFICATES_PATH.cert),
};

app.prepare().then(() => {
  https
    .createServer(option, async (req, res) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    })
    .listen(port, error => {
      if (error) throw error;
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
