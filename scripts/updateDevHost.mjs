import * as fs from 'fs';
import { EOL } from 'os';

const LOCALHOST = '127.0.0.1';
const IS_WINDOWS = process.platform === 'win32';
const HOSTS_PATH = IS_WINDOWS
  ? 'C:/Windows/System32/drivers/etc/hosts'
  : '/etc/hosts';

/**
 * @param {typeof HOSTS_PATH} filePath - hosts 파일의 path
 * @param {string} host - 사용할 dev server host
 * */
const updateHostFile = (filePath, host) => {
  /** @type {{origin: string, paresed: [ip: string, hostname: string]}[]} */
  const lines = [];

  fs.readFileSync(filePath, { encoding: 'utf8' })
    .split(/\r?\n/)
    .forEach(line => {
      const comments = line.replace(/#.*/, '');
      const matches = /^\s*?(.+?)\s+(.+?)\s*$/.exec(comments);

      if (matches && matches.length === 3) {
        /** line을 읽으면서 { parsed: [ip, hostname] } 추가 */
        const [_, ip, hostname] = matches;
        lines.push({ parsed: [ip, hostname], origin: line });
      } else {
        /** 주석인 경우, { origin } 에만 추가 */
        lines.push({ origin: line });
      }
    });

  /** 일치하는 hostname이 있으면 종료 */
  for (let idx = 0; idx < lines.length; idx += 1) {
    const { parsed } = lines[idx];

    if (parsed) {
      const [ip, hostname] = parsed;
      if (hostname === host) {
        console.log(
          `🚀 entry [ ${ip} ${host} ] already exists in ${filePath}!`
        );
        return true;
      }
    }
  }

  const length = lines.length;
  for (let idx = length - 1; idx >= 0; idx -= 1) {
    const { parsed } = lines[idx];

    if (!parsed) continue;

    /** 마지막 entry 아래에 host 추가 */
    const sliced = lines.slice(0, idx + 1);

    sliced.push({ origin: '# Added by Dadok' });
    sliced.push({ parsed: ['127.0.0.1', host], origin: `127.0.0.1 ${host}` });
    sliced.push(...lines.slice(idx + 1));

    const state = fs.statSync(filePath);
    fs.writeFileSync(filePath, sliced.map(({ origin }) => origin).join(EOL), {
      mode: state.mode,
    });

    console.log(`🚀 entry [ ${LOCALHOST} ${host} ] added in ${filePath}!`);
    return true;
  }

  return false;
};

/** node command를 통해 updateHostFile 함수 실행 */
try {
  const host = process.argv[2];

  if (!host) {
    throw Error('Expected 1 argument.');
  }

  updateHostFile(HOSTS_PATH, host);
} catch (err) {
  console.error(err);
}
