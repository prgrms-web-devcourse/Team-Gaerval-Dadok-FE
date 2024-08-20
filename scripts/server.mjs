import fs from 'fs';
import https from 'https';
import path from 'path';
import { parse } from 'url';
import { execSync } from 'child_process';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.argv[2];
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const SELF_CERTIFICATES_PATH = {
  ca: path.resolve(
    execSync('mkcert -CAROOT').toString().replace(/\s$/, ''),
    './rootCA.pem'
  ),
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
