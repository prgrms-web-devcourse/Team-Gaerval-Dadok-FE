/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const https = require('https');
const { parse } = require('url');
const { execSync } = require('child_process');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.argv[2];
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const SELF_CERTIFICATES_PATH = {
  ca: `${execSync('mkcert -CAROOT').toString().replace(/\s/g, '')}/rootCA.pem`,
  key: './.certificates/localhost-key.pem',
  cert: './.certificates/localhost.pem',
};

const option = {
  key: fs.readFileSync(SELF_CERTIFICATES_PATH.key),
  cert: fs.readFileSync(SELF_CERTIFICATES_PATH.cert),
};

// To resolve the 'unable to verify first certificate' error
process.env.NODE_EXTRA_CA_CERTS = SELF_CERTIFICATES_PATH.ca;

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
      console.log('\x1b[32m%s', `> ready on https://${hostname}:${port}\n`);
    });
});
